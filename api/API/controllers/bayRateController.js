const { BayRate, Bay, Rate, GroupUser } = require('../models/associations');

class BayRateController {
    // Create method
    static async create(req, res) {
        try {
            const authUser = req.user;
            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const { bayId, rateId, groups } = req.body;

            const bayExists = await Bay.findByPk(bayId);
            const rateExists = await Rate.findByPk(rateId);

            if (!bayExists || !rateExists) {
                return res.status(404).json({ message: 'Bay or Rate not found' });
            }

            const newBayRate = await BayRate.create({
                bayId,
                rateId,
                groups: groups || [],
                createdBy: authUser.id,
                updatedBy: authUser.id
            });

            res.status(201).json({ message: 'BayRate created successfully', bayRate: newBayRate });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    // Read a single BayRate association
    static async read(req, res) {
        try {
            const bayRate = await BayRate.findByPk(req.params.id);
            if (!bayRate) {
                return res.status(404).json({ message: 'BayRate not found' });
            }
            res.status(200).json({ bayRate });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    // Update a BayRate association
    static async update(req, res) {
        try {
            const bayRateId = req.params.id;
            const { bayId, rateId, groups } = req.body;
            const authUser = req.user;

            const bayRate = await BayRate.findByPk(bayRateId);
            if (!bayRate) {
                return res.status(404).json({ message: 'BayRate not found' });
            }

            // if (authUser.role !== 'super_admin') {
            //     // Check if the user is part of the groups that the bay rate is assigned to
            //     const userGroups = await GroupUser.findAll({ where: { userId: authUser.id } });
            //     const userGroupIds = userGroups.map(groupUser => groupUser.groupId);

            //     const bayRateGroups = bayRate.groups || [];
            //     const hasAccess = bayRateGroups.some(groupId => userGroupIds.includes(groupId));

            //     if (!hasAccess) {
            //         return res.status(403).json({ message: 'Forbidden' });
            //     }

            //     // Regular users cannot update the groups field
            //     await bayRate.update({ bayId, rateId, updatedBy: authUser.id });
            // } else {
                // Super admins can update everything
                await bayRate.update({ bayId, rateId, groups, updatedBy: authUser.id });
            // }

            res.status(200).json({ message: 'BayRate updated successfully', bayRate });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    // Delete a BayRate association
    static async delete(req, res) {
        try {
            const bayRateId = req.params.id;
            const authUser = req.user;

            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const numDeleted = await BayRate.destroy({ where: { id: bayRateId } });
            if (numDeleted === 0) {
                return res.status(404).json({ message: 'BayRate not found' });
            }

            res.status(200).json({ message: 'BayRate deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

module.exports = BayRateController;
