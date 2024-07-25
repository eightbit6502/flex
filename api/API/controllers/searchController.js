const { Op } = require('sequelize');
const { Site, Bay, Rate, Booking, BayRate, GroupUser } = require('../models/associations');
const constants = require('../config/constants');

class SearchController {
    
    // helper function to calculate distance between two coordinates using Haversine formula
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // earth's radius in meters
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;
        return distance;
    }

    // search for daily parking
    static async searchDailyParking(req, res) {
        try {
            const { latitude, longitude, radius, startDate, endDate, userId } = req.body;
            const degreeDiff = radius / 111; // convert radius to degrees
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);

            // get user groups
            const userGroups = await GroupUser.findAll({
                where: { userId },
                attributes: ['groupId']
            });
            const userGroupIds = userGroups.map(groupUser => groupUser.groupId);
            // console.log(`User groups for userId ${userId}:`, userGroupIds);

            // find sites within the specified latitude and longitude range
            const sitesInRange = await Site.findAll({
                where: {
                    latitude: { [Op.between]: [latitude - degreeDiff, latitude + degreeDiff] },
                    longitude: { [Op.between]: [longitude - degreeDiff, longitude + degreeDiff] },
                    status: constants.STATUS_ACTIVE // only include active sites
                },
                include: [{
                    model: Bay,
                    where: {
                        status: constants.STATUS_ACTIVE // only include active bays
                    },
                    include: [
                        {
                            model: Booking,
                            required: false,
                            where: {
                                // include bookings that overlap with the specified date range
                                [Op.or]: [
                                    { startDate: { [Op.between]: [startDate, endDate] } },
                                    { endDate: { [Op.between]: [startDate, endDate] } }
                                ]
                            }
                        },
                        {
                            model: BayRate,
                            required: false,
                            include: [
                                {
                                    model: Rate,
                                    required: false
                                }
                            ]
                        }
                    ]
                }]
            });

            const availableSites = sitesInRange.map(site => {
                // calculate the distance between the search location and the site
                const siteDist = SearchController.calculateDistance(latitude, longitude, site.latitude, site.longitude);

                // filter bays based on availability and rate matching
                const availableBays = site.Bays.filter(bay => {
                    // check if the bay is not booked within the specified date range
                    const isNotBooked = !bay.Bookings.some(booking =>
                        booking.startDate <= endDateObj && booking.endDate >= startDateObj
                    );

                    if (isNotBooked) {
                        let validRates = [];
                        let currentDate = new Date(startDateObj);
                        let totalCost = 0;

                        // iterate through each day in the specified date range
                        while (currentDate <= endDateObj) {
                            const dayOfWeek = constants.DAY_WEEK_ARRAY[currentDate.getDay()];
                            const formattedDate = currentDate.toISOString().split('T')[0];
                            const requestedStartTime = startDateObj.toTimeString().split(' ')[0];
                            const requestedEndTime = endDateObj.toTimeString().split(' ')[0];

                            // check for special rates first
                            const specialRate = bay.BayRates.find(bayRate => {
                                // console.log(`Checking special rate for bayRate id ${bayRate.id}`);
                                // console.log(`BayRate groups: ${JSON.stringify(bayRate.groups)}`);
                                return bayRate.Rate.type === 'special' &&
                                    bayRate.Rate.specialStartDate <= formattedDate && bayRate.Rate.specialEndDate >= formattedDate &&
                                    bayRate.groups && bayRate.groups.some(groupId => userGroupIds.includes(groupId)) &&
                                    requestedStartTime >= bayRate.Rate.startTime && requestedEndTime <= bayRate.Rate.endTime;
                            });

                            if (specialRate) {
                                // console.log(`Special rate found: ${specialRate.Rate.id}`);
                                totalCost += specialRate.Rate.value;
                                validRates.push({
                                    id: specialRate.Rate.id,
                                    name: specialRate.Rate.name,
                                    date: formattedDate,
                                    value: specialRate.Rate.value,
                                    type: specialRate.Rate.type,
                                    startTime: specialRate.Rate.startTime,
                                    endTime: specialRate.Rate.endTime
                                });
                            } else {
                                // if no special rate, use daily rate
                                const rateForDay = bay.BayRates.find(bayRate => {
                                    // console.log(`Checking daily rate for bayRate id ${bayRate.id}`);
                                    // console.log(`BayRate groups: ${JSON.stringify(bayRate.groups)}`);
                                    return bayRate.Rate.type === 'daily' && bayRate.Rate.dayOfWeek === dayOfWeek &&
                                        bayRate.groups && bayRate.groups.some(groupId => userGroupIds.includes(groupId)) &&
                                        requestedStartTime >= bayRate.Rate.startTime && requestedEndTime <= bayRate.Rate.endTime;
                                });
                                if (rateForDay) {
                                    // console.log(`Daily rate found: ${rateForDay.Rate.id}`);
                                    totalCost += rateForDay.Rate.value;
                                    validRates.push({
                                        id: rateForDay.Rate.id,
                                        name: rateForDay.Rate.name,
                                        date: formattedDate,
                                        value: rateForDay.Rate.value,
                                        type: rateForDay.Rate.type,
                                        startTime: rateForDay.Rate.startTime,
                                        endTime: rateForDay.Rate.endTime
                                    });
                                } else {
                                    // console.log(`No rate available for this day and time: ${formattedDate} ${requestedStartTime} - ${requestedEndTime}`);
                                    return false; // no rate available for this day and time
                                }
                            }
                            currentDate.setDate(currentDate.getDate() + 1);
                        }

                        bay.selectedRate = validRates;
                        bay.totalCost = totalCost; // add total cost to the bay

                        return true;
                    }
                    return false;
                });

                // return site information with available bays or an empty array if no bays match
                return {
                    siteId: site.id,
                    siteName: site.name,
                    siteAddress: site.addressLine1,
                    siteDist: Math.round(siteDist),
                    position: {
                        lat: site.latitude,
                        lng: site.longitude
                    },
                    availableBays: availableBays.length > 0 ? availableBays.map(bay => ({
                        bayId: bay.id,
                        bayName: bay.name,
                        selectedRate: bay.selectedRate,
                        totalCost: bay.totalCost
                    })) : []
                };
            });

            // check if there are no available sites
            if (!availableSites.length) {
                return res.status(404).json({ status: 404, message: 'No available sites found' });
            }

            // return the available sites
            res.status(200).json({ status: 200, sites: availableSites });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Internal Server Error', error });
        }
    }
}

module.exports = SearchController;
