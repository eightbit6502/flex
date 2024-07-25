const { Rate } = require('../models/associations');

class RateController {
	
	static async create(req, res) {
		try {
			const authUser = req.user;

			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			const { name, type, value, startTime, endTime, dayOfWeek, siteId, status } = req.body;

			const newRate = await Rate.create({
				name,
				type,
				value,
				startTime,
				endTime,
				dayOfWeek,
				siteId,
				status,
				createdBy: authUser.id,
				updatedBy: authUser.id
			});

			res.status(201).json({ message: 'Rate created successfully', rate: newRate }); // 201 Created
		} catch (error) {
			console.error(error)
			if (error.name === 'SequelizeUniqueConstraintError') {
				return res.status(409).json({ message: 'Rate already exists', error }); // 409 Conflict
			}
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}

	static async read(req, res) {
		try {
			const rate = await Rate.findOne({ where: { id: req.params.id } });

			if (!rate) {
				return res.status(404).json({ message: 'Rate not found' }); // 404 Not Found
			}

			return res.status(200).json({ rate }); // 200 OK
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal Server Error', error }); // 500 Internal Server Error
		}
	}

	static async readAll(req, res) {
		try {
			const rate = await Rate.findAll();

			if (!rate) {
				return res.status(404).json({ message: 'Rate not found' }); // 404 Not Found
			}

			return res.status(200).json({ rate }); // 200 OK
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal Server Error', error }); // 500 Internal Server Error
		}
	}

	static async update(req, res) {
		try {
			const rateId = req.params.id;
			const { name, type, value, startTime, endTime, dayOfWeek, siteId, status } = req.body;
			const authUser = req.user;

			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			await Rate.update({ name, type, value, startTime, endTime, dayOfWeek, siteId, status, updatedBy: authUser.id }, { where: { id: rateId } });

			res.status(200).json({ message: 'Rate updated successfully' }); // 200 OK
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}

	static async delete(req, res) {
		try {
			const rateId = req.params.id;
			const authUser = req.user;

			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}

			await Rate.destroy({ where: { id: rateId } });

			res.status(200).json({ message: 'Rate deleted successfully' }); // 200 OK
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}
}

module.exports = RateController;
