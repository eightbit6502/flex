const constants = require('../config/constants');
const Tenant = require('../models/tenant'); // Adjust the path as needed
const ChangeLogController = require('./changeLogController');

class TenantController {
	static async create(req, res) {
		try {
			const authUser = req.user;

			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			const { name, addressLine1, addressLine2, state, postcode, country, status } = req.body;

			const newTenant = await Tenant.create({
				name,
				addressLine1,
				addressLine2,
				state,
				postcode,
				country,
				status,
				createdBy: authUser.id,
                updatedBy: authUser.id
			});

			 // log change
			 await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'create',
				'Created Tenant',
                'Tenant',
                newTenant.id
              );

			res.status(201).json({ message: 'Tenant created successfully', tenant: newTenant }); // 201 Created
		} catch (error) {
			console.error(error);
			if (error.name === 'SequelizeUniqueConstraintError') {
				return res.status(409).json({ message: 'Tenant already exists', error }); // 409 Conflict
			}
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}

	static async read(req, res) {
		try {
			const tenant = await Tenant.findOne({ where: { id: req.params.id } });

			if (!tenant) {
				return res.status(404).json({ message: 'Tenant not found' }); // 404 Not Found
			}

			return res.status(200).json({ tenant }); // 200 OK
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal Server Error', error }); // 500 Internal Server Error
		}
	}

	static async readAll(req, res) {
		try {
			const authUser = req.user;

			if (!authUser || 
				(authUser.role !== constants.ROLE_ADMIN
				&& authUser.role !== constants.ROLE_FINANCE
				&& authUser.role !== constants.ROLE_OPERATIONS
				&& authUser.role !== constants.ROLE_SUPPORT)
			) {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			const tenant = await Tenant.findAll();

			if (!tenant) {
				return res.status(404).json({ message: 'Tenant not found' }); // 404 Not Found
			}

			return res.status(200).json({ tenant }); // 200 OK
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal Server Error', error }); // 500 Internal Server Error
		}
	}

	static async update(req, res) {
		try {
			const tenantId = req.params.id;
			const { name, addressLine1, addressLine2, state, postcode, country, status, createdBy, updatedBy } = req.body;
			const authUser = req.user;

			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			const tenant = await Tenant.update({ name, addressLine1, addressLine2, state, postcode, country, status, createdBy, updatedBy }, { where: { id: tenantId } });

			 // log change
			 await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'update',
				'Updated Tenant',
                'Tenant',
                tenant.id
              );

			res.status(200).json({ message: 'Tenant updated successfully' }); // 200 OK
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}

	static async delete(req, res) {
		try {
			const tenantId = req.params.id;
			const authUser = req.user;

			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			await Tenant.destroy({ where: { id: tenantId } });

			 // log change
			 await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'delete',
				'Deleted Tenant',
                'Tenant',
                tenantId
              );

			res.status(200).json({ message: 'Tenant deleted successfully' }); // 200 OK
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}
}

module.exports = TenantController;
