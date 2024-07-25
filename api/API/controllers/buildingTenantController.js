const { BuildingTenant, User, Building, Tenant } = require('../models/associations');
const ChangeLogController = require('./changeLogController');

class BuildingTenantController {
  static async create(req, res) {
    try {
      const authUser = req.user;
      if (!authUser || authUser.role !== 'super_admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const { buildingId, tenantId } = req.body;
      
      const buildingExists = await Building.findByPk(buildingId);
      const tenantExists = await Tenant.findByPk(tenantId);
      
      if (!buildingExists || !tenantExists) {
        return res.status(404).json({ message: 'Building or Tenant not found' });
      }
      
      const newBuildingTenant = await BuildingTenant.create({
        buildingId,
        tenantId,
        createdBy: authUser.id,
        updatedBy: authUser.id
      });
      
      // Update the tenant's count
      await buildingExists.increment('totalTenants', { by: 1 });

      await ChangeLogController.logChange(
        authUser.id,
        authUser.firstName + " " + authUser.lastName,
        'add tenant',
'Added Tenant: ' + tenantExists.name,
        'Building',
        buildingId
      );
      
      res.status(201).json({ message: 'BuildingTenant created successfully', buildingTenant: newBuildingTenant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async read(req, res) {
    try {
      const buildingTenantId = req.params.id;
      const buildingTenant = await BuildingTenant.findByPk(buildingTenantId);
      if (!buildingTenant) {
        return res.status(404).json({ message: 'BuildingTenant not found' });
      }
      res.status(200).json({ buildingTenant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
  
  
  
  static async delete(req, res) {
    try {
      const buildingTenantId = req.params.id;
      const authUser = req.user;
      
      if (!authUser || authUser.role !== 'super_admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const buildingTenant = await BuildingTenant.findByPk(buildingTenantId);
      if (!buildingTenant) {
        return res.status(404).json({ message: 'BuildingTenant not found' });
      }

      const tenantExists = await Tenant.findByPk(buildingTenant.tenantId);
      if (!tenantExists) {
        return res.status(404).json({ message: 'Tenant not found' });
      }
      
      const buildingId = buildingTenant.buildingId;
      const numDeleted = await BuildingTenant.destroy({ where: { id: buildingTenantId } });
      
      if (numDeleted > 0) {
        // Decrement the tenant count for the building
        const building = await Building.findByPk(buildingId);
        if (building) {
          await building.decrement('totalTenants', { by: 1 });
        }
      }

      await ChangeLogController.logChange(
        authUser.id,
        authUser.firstName + " " + authUser.lastName,
        'remove tenant',
'Removed Tenant: ' + tenantExists.name,
        'Building',
        buildingId
      );
      
      res.status(200).json({ message: 'BuildingTenant deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async deleteTenantFromBuilding(req, res) {
    try {
      const authUser = req.user;
      
      if (!authUser || authUser.role !== 'super_admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const { buildingId, tenantId } = req.params;

      // const buildingTenant = await BuildingTenant.findAll({
      //   where: {
      //     buildingId: buildingId,
      //     tenantId: tenantId
      //   },
      // });
      
      // if (!buildingTenant) {
      //   return res.status(404).json({ message: 'BuildingTenant not found' });
      // }


      const tenantExists = await Tenant.findByPk(tenantId);
      if (!tenantExists) {
        return res.status(404).json({ message: 'Tenant not found' });
      }
      
      const numDeleted = await BuildingTenant.destroy({ where: { buildingId: buildingId, tenantId: tenantId } });
      
      if (numDeleted > 0) {
        // Decrement the tenant count for the building
        const building = await Building.findByPk(buildingId);
        if (building) {
          await building.decrement('totalTenants', { by: 1 });
        } else {
          return res.status(404).json({ message: 'BuildingTenant not found' });
        }
      }

      await ChangeLogController.logChange(
        authUser.id,
        authUser.firstName + " " + authUser.lastName,
        'remove tenant',
'Removed Tenant: ' + tenantExists.name,
        'Building',
        buildingId
      );
      
      res.status(200).json({ message: 'BuildingTenant deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async getTenantsByBuilding(req, res) {
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
      
      const tenants = await BuildingTenant.findAll({
        where: { buildingId },
        include: [Tenant]
      });
      
      res.status(200).json({ tenants });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}

module.exports = BuildingTenantController;
