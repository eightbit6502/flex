const { Group } = require('../models/associations');

class GroupController {
	
	static async create(req, res) {
		try {
			const authUser = req.user;

			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			const { name, tenantId, description, status } = req.body;

			const newGroup = await Group.create({
				name,
				tenantId,
				description,
				status,
				createdBy: authUser.id,
				updatedBy: authUser.id
			});

			res.status(201).json({ message: 'Group created successfully', group: newGroup }); // 201 Created
		} catch (error) {
			console.error(error);
			if (error.name === 'SequelizeUniqueConstraintError') {
				return res.status(409).json({ message: 'Group already exists', error }); // 409 Conflict
			}
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}

	static async read(req, res) {
		try {
			const group = await Group.findOne({ where: { id: req.params.id } });

			if (!group) {
				return res.status(404).json({ message: 'Group not found' }); // 404 Not Found
			}

			return res.status(200).json({ group }); // 200 OK
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal Server Error', error }); // 500 Internal Server Error
		}
	}

	static async update(req, res) {
		try {
			const groupId = req.params.id;
			const { name, tenantId, description, status } = req.body;
			const authUser = req.user;

			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			await Group.update({ name, tenantId, description, updatedBy: authUser.id, status }, { where: { id: groupId } });

			res.status(200).json({ message: 'Group updated successfully' }); // 200 OK
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}

	static async delete(req, res) {
		try {
			const groupId = req.params.id;
			const authUser = req.user;

			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			await Group.destroy({ where: { id: groupId } });

			res.status(200).json({ message: 'Group deleted successfully' }); // 200 OK
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}
}

module.exports = GroupController;
