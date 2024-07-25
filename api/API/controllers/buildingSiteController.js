const { BuildingSite, User, Building, Site } = require('../models/associations');
const ChangeLogController = require('./changeLogController');

class BuildingSiteController {
  static async create(req, res) {
    try {
      const authUser = req.user;
      if (!authUser || authUser.role !== 'super_admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const { buildingId, siteId } = req.body;
      
      const buildingExists = await Building.findByPk(buildingId);
      const siteExists = await Site.findByPk(siteId);
      
      if (!buildingExists || !siteExists) {
        return res.status(404).json({ message: 'Building or Site not found' });
      }
      
      const newBuildingSite = await BuildingSite.create({
        buildingId,
        siteId,
        createdBy: authUser.id,
        updatedBy: authUser.id
      });
      
      
      // Update the site's count
      await buildingExists.increment('totalSites', { by: 1 });

      await ChangeLogController.logChange(
        authUser.id,
        authUser.firstName + " " + authUser.lastName,
        'add site',
'Added Site: ' + siteExists.name,
        'Building',
        buildingId
      );
      
      res.status(201).json({ message: 'BuildingSite created successfully', buildingSite: newBuildingSite });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
  
  static async read(req, res) {
    try {
      const buildingSiteId = req.params.id;
      const buildingSite = await BuildingSite.findByPk(buildingSiteId);
      if (!buildingSite) {
        return res.status(404).json({ message: 'BuildingSite not found' });
      }
      res.status(200).json({ buildingSite });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
  
  
  
  static async delete(req, res) {
    try {
      const buildingSiteId = req.params.id;
      const authUser = req.user;
      
      if (!authUser || authUser.role !== 'super_admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const buildingSite = await BuildingSite.findByPk(buildingSiteId);
      if (!buildingSite) {
        return res.status(404).json({ message: 'BuildingSite not found' });
      }
      
      const siteExists = await Site.findByPk(buildingSite.siteId);
      if (!siteExists) {
        return res.status(404).json({ message: 'Site not found' });
      }

      const buildingId = buildingSite.buildingId;
      const numDeleted = await BuildingSite.destroy({ where: { id: buildingSiteId } });
      
      if (numDeleted > 0) {
        // Decrement the site count for the building
        const building = await Building.findByPk(buildingId);
        if (building) {
          await building.decrement('totalSites', { by: 1 });
        }
      }

      await ChangeLogController.logChange(
        authUser.id,
        authUser.firstName + " " + authUser.lastName,
        'remove site',
'Removed Site: ' + siteExists.name,
        'Building',
        buildingId
      );
      
      res.status(200).json({ message: 'BuildingSite deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
  
  // FE related
  
  static async getSitesByBuilding(req, res) {
    try {
      const { buildingId } = req.params;
      const authUser = req.user;
      
      if (!authUser || authUser.role !== 'super_admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const buildingExists = await Building.findByPk(buildingId);
      if (!buildingExists) {
        return res.status(404).json({ message: 'Building not found' });
      }
      
      const sites = await BuildingSite.findAll({
        where: { buildingId },
        include: [Site]
      });
      
      res.status(200).json({ sites });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async deleteSiteFromBuilding(req, res) {
    try {
      const authUser = req.user;
      
      if (!authUser || authUser.role !== 'super_admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const { buildingId, siteId } = req.params;


      // if (!buildingSite) {
      //   return res.status(404).json({ message: 'BuildingSite not found' });
      // }

      const siteExists = await Site.findByPk(siteId);
      if (!siteExists) {
        return res.status(404).json({ message: 'Site not found' });
      }
      
      const numDeleted = await BuildingSite.destroy({ where: { buildingId: buildingId, siteId: siteId } });
      
      if (numDeleted > 0) {
        // Decrement the site count for the building
        const building = await Building.findByPk(buildingId);
        if (building) {
          await building.decrement('totalSites', { by: 1 });
        } else {
          return res.status(404).json({ message: 'BuildingSite not found' });
        }
      }

      await ChangeLogController.logChange(
        authUser.id,
        authUser.firstName + " " + authUser.lastName,
        'remove site',
'Removed Site: ' + siteExists.name,
        'Building',
        buildingId
      );
      
      res.status(200).json({ message: 'BuildingSite deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async getSitesByBuilding(req, res) {
    try {
      const { buildingId } = req.params;
      const authUser = req.user;
      
      if (!authUser || authUser.role !== 'super_admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const buildingExists = await Building.findByPk(buildingId);
      if (!buildingExists) {
        return res.status(404).json({ message: 'Building not found' });
      }
      
      const sites = await BuildingSite.findAll({
        where: { buildingId },
        include: [Site]
      });
      
      res.status(200).json({ sites });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}

module.exports = BuildingSiteController;