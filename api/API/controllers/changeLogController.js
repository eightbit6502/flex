const { ChangeLog } = require('../models/associations');
const { Op } = require('sequelize');
const { DateTime } = require('luxon');

class ChangeLogController {
  static async logChange(userId, userName, action, description, entityType, entityId, newValue) {
    try {
      await ChangeLog.create({
        userId,
        userName,
        action,
        description,
        entityType,
        entityId,
        newValue
      });
    } catch (error) {
      console.error('Failed to log change:', error);
    }
  }

  static async getAllLogs() {
    try {
      return await ChangeLog.findAll();
    } catch (error) {
      console.error('Failed to fetch change logs:', error);
      throw error;
    }
  }

  static async getLogsByUser(userId) {
    try {
      return await ChangeLog.findAll({ where: { userId } });
    } catch (error) {
      console.error('Failed to fetch change logs by user:', error);
      throw error;
    }
  }

  static async getRecentLogsByEntity(req, res) {
    const id  = req.params.id;
    const entityType = req.entityType;
  
    try {
      const logs = await ChangeLog.findAll({
        where: { entityId: id, entityType: entityType },
        limit: 10,
        order: [['createdAt', 'DESC']]
      });
  
      if (!logs.length) {
        return res.status(404).json({ message: 'No logs found' });
      }
  
      return res.status(200).json({ logs });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  }


  static async getLogsByEntity(req, res) {
    const id = req.params.id;
    const entityType = req.entityType || 'Building';
    const count = req.query.count || 10;

    // Parse the start and end dates from the query parameters or set default values
    const startDate = req.query.startDate ? DateTime.fromISO(req.query.startDate).toJSDate() : DateTime.local().minus({ days: 30 }).toJSDate();
    const endDate = req.query.endDate ? DateTime.fromISO(req.query.endDate).toJSDate() : DateTime.local().toJSDate();

    console.log(startDate)
    console.log(endDate)

    try {
      const logs = await ChangeLog.findAll({
        where: {
          entityId: id,
          entityType: entityType,
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        },
        limit: count,
        order: [['createdAt', 'DESC']]
      });

      if (!logs.length) {
        return res.status(404).json({ message: 'No logs found' });
      }

      return res.status(200).json({ logs });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

}
module.exports = ChangeLogController;
