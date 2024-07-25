const { Booking } = require('../models/associations');
const { Op } = require('sequelize');

class BookingController {
    static async create(req, res) {
        try {
            const { startDate, endDate, userId, siteId, bayId, transactionId, carRegistration, transactionAmount, salesInvoiceId } = req.body;

            const existingBooking = await Booking.findOne({
                where: {
                    bayId: bayId,
                    [Op.or]: [{
                        startDate: {
                            [Op.lte]: new Date(endDate)
                        },
                        endDate: {
                            [Op.gte]: new Date(endDate)
                        }
                    }]
                }
            });

            if (existingBooking) {
                return res.status(409).json({ message: 'Bay is already booked for the requested time' });
            }

            const newBooking = await Booking.create({
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                userId,
                siteId,
                bayId,
                transactionId,
                carRegistration,
                transactionAmount,
                salesInvoiceId,
                createdBy: req.user.id,
                updatedBy: req.user.id
            });

            res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async read(req, res) {
        try {
            const booking = await Booking.findByPk(req.params.id);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            return res.status(200).json({ booking });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async update(req, res) {
        try {
            const bookingId = req.params.id;
            const { startDate, endDate, userId, siteId, bayId, transactionId, carRegistration, salesInvoiceId, transactionAmount } = req.body;

            const booking = await Booking.findByPk(bookingId);
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            await booking.update({
                startDate,
                endDate,
                userId,
                siteId,
                bayId,
                transactionId,
                carRegistration,
                transactionAmount,
                salesInvoiceId,
                updatedBy: req.user.id
            });

            res.status(200).json({ message: 'Booking updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async delete(req, res) {
        try {
            const bookingId = req.params.id;

            const numDeleted = await Booking.destroy({ where: { id: bookingId } });
            if (numDeleted === 0) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            res.status(200).json({ message: 'Booking deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

module.exports = BookingController;
