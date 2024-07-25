const constants = require('../config/constants');
const { Building, BuildingTenant, BuildingSite } = require('../models/associations');
const ChangeLogController = require('./changeLogController');


class BuildingController {
    static async create(req, res) {
        try {
            const authUser = req.user;
            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const { name, latitude, longitude, addressLine1, addressLine2, state, postcode, country, status, contactName, contactTel, contactEmail } = req.body;
            const newBuilding = await Building.create({
                name,
                latitude,
                longitude,
                addressLine1,
                addressLine2,
                state,
                postcode,
                country,
                status,
                contactName,
                contactTel,
                contactEmail,
                createdBy: authUser.id,
                updatedBy: authUser.id
            });


            // log change
            await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'create',
                'Created Building',
                'Building',
                newBuilding.id,
                newBuilding
              );

            res.status(201).json({ message: 'Building created successfully', building: newBuilding });
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ message: 'Building already exists', error });
            }
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async readAll(req, res) {
        try {
            const buildings = await Building.findAll();
            if (!buildings) {
                return res.status(404).json({ message: 'No Building not found' });
            }

            return res.status(200).json({ buildings });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async read(req, res) {
        try {
            const building = await Building.findByPk(req.params.id);
            if (!building) {
                return res.status(404).json({ message: 'Building not found' });
            }

            return res.status(200).json({ building });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async update(req, res) {
        try {
            const buildingId = req.params.id;
            const { name, latitude, longitude, addressLine1, addressLine2, state, postcode, country, status, contactName, contactEmail, contactTel } = req.body;
            const authUser = req.user;
    
            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }
    
            const building = await Building.findByPk(buildingId);
            if (!building) {
                return res.status(404).json({ message: 'Building not found' });
            }
    
            // Check if status is being changed from ACTIVE and there are linked buildingSites or buildingTenants
            if (building.status === constants.STATUS_ACTIVE && status !== constants.STATUS_ACTIVE) {
                const linkedSites = await BuildingSite.findAll({ where: { buildingId } });
                const linkedTenants = await BuildingTenant.findAll({ where: { buildingId } });
    
                if (linkedSites.length > 0 || linkedTenants.length > 0) {
                    return res.status(400).json({ message: 'Cannot change status until all linked Sites and Tenants are removed' });
                }
            }
    
            // Determine which properties are different
            const updatedFields = {};
            const fieldsToUpdate = { name, latitude, longitude, addressLine1, addressLine2, state, postcode, country, status, contactName, contactEmail, contactTel };
            for (const key in fieldsToUpdate) {
                if (fieldsToUpdate[key] !== building[key]) {
                    updatedFields[key] = fieldsToUpdate[key];
                }
            }
    
            await building.update({
                ...fieldsToUpdate,
                updatedBy: authUser.id
            });
    
            // Log change
            await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'update',
                'Updated Building',
                'Building',
                building.id,
                updatedFields // store only the changed properties
            );
    
            res.status(200).json({ message: 'Building updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
    


    static async delete(req, res) {
        try {
            const buildingId = req.params.id;
            const authUser = req.user;

            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const numDeleted = await Building.destroy({ where: { id: buildingId } });
            if (numDeleted === 0) {
                return res.status(404).json({ message: 'Building not found' });
            }

            // log change
            await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName, 
                'delete',
                'Deleted Building',
                'Building',
                buildingId
              );

            res.status(200).json({ message: 'Building deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

module.exports = BuildingController;