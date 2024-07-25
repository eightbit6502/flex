const { Site } = require('../models/associations');
const ChangeLogController = require('./changeLogController');

class SiteController {
    static async create(req, res) {
        try {
            const authUser = req.user;
            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const { name, description, latitude, longitude, addressLine1, addressLine2, state, postcode, country, dailyOpen, dailyClose, siteMaxVehicleHeight, siteType, status } = req.body;

            const newSite = await Site.create({
                name,
                description,
                latitude,
                longitude,
                addressLine1,
                addressLine2,
                state,
                postcode,
                country,
                dailyOpen,
                dailyClose,
                siteMaxVehicleHeight, 
                siteType,
                status,
                createdBy: authUser.id,
                updatedBy: authUser.id
            });

            // log change
            await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'create',
                'Created Site',
                'Site',
                newSite.id
              );

            res.status(201).json({ message: 'Site created successfully', site: newSite });
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ message: 'Site already exists', error });
            }
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async read(req, res) {
        try {
            const site = await Site.findByPk(req.params.id);
            if (!site) {
                return res.status(404).json({ message: 'Site not found' });
            }
            return res.status(200).json({ site });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async readAll(req, res) {
        try {
            const site = await Site.findAll();
            if (!site) {
                return res.status(404).json({ message: 'Site not found' });
            }
            return res.status(200).json({ site });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async update(req, res) {
        try {
            const siteId = req.params.id;
            const authUser = req.user;

            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const site = await Site.findByPk(siteId);
            if (!site) {
                return res.status(404).json({ message: 'Site not found' });
            }

            const { name, description, latitude, longitude, addressLine1, addressLine2, state, postcode, country, dailyOpen, dailyClose, siteMaxVehicleHeight, siteType, status } = req.body;

            site = await site.update({
                name, description, latitude, longitude, addressLine1, addressLine2, state, postcode, country, dailyOpen, dailyClose, siteMaxVehicleHeight, siteType, status, updatedBy: authUser.id
            });

            // log change
            await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'update',
                'Updated Site',
                'Site',
                site.id
              );

            res.status(200).json({ message: 'Site updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

	static async delete(req, res) {
        try {
            const siteId = req.params.id;
            const authUser = req.user;

            // Check if the user is authorized (super_admin)
            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            // Check if the site exists before attempting to delete
            const site = await Site.findByPk(siteId);
            if (!site) {
                return res.status(404).json({ message: 'Site not found' });
            }

            // Perform the delete operation
            await Site.destroy({ where: { id: siteId } });

            // log change
            await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'delete',
                'Deleted Site',
                'Site',
                siteId
              );

            res.status(200).json({ message: 'Site deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}


module.exports = SiteController;
