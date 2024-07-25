const { Bay, Site, Tenant } = require('../models/associations');
const ChangeLogController = require('./changeLogController');
const constants = require('../config/constants');

class BayController {
    static async create(req, res) {
        try {
            const authUser = req.user;
            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const { name, size, availableFrom, availableUntil, siteId, tenantId, status } = req.body;

            const siteExists = await Site.findByPk(siteId);
            if (!siteExists) {
                return res.status(404).json({ message: 'Site not found' });
            }

            let tenantExists = null;
            if (tenantId) {
                tenantExists = await Tenant.findByPk(tenantId);
                if (!tenantExists) {
                    return res.status(404).json({ message: 'Tenant not found' });
                }
            }

            const newBay = await Bay.create({
                name,
                size,
                availableFrom,
                availableUntil,
                siteId,
                tenantId: tenantId || null, // Set tenantId to null if not provided
                status: status || constants.STATUS_ACTIVE, // Set default status to ACTIVE if not provided
                createdBy: authUser.id,
                updatedBy: authUser.id
            });

            // Update the site's bay count
            await siteExists.increment('totalBays', { by: 1 });
            if (tenantExists) {
                await tenantExists.increment('totalBays', { by: 1 });
            }

            // Log change
            await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'create',
				'Created Bay',
                'Bay',
                newBay.id
              );

            res.status(201).json({ message: 'Bay created successfully', bay: newBay });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async read(req, res) {
        try {
            const bay = await Bay.findByPk(req.params.id);
            if (!bay) {
                return res.status(404).json({ message: 'Bay not found' });
            }

            return res.status(200).json({ bay });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async update(req, res) {
        try {
            const bayId = req.params.id;
            const { name, size, availableFrom, availableUntil, siteId, tenantId, status } = req.body;
            const authUser = req.user;

            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const bay = await Bay.findByPk(bayId);
            if (!bay) {
                return res.status(404).json({ message: 'Bay not found' });
            }

            const oldSiteId = bay.siteId;
            const oldTenantId = bay.tenantId;
            const newSiteId = siteId;
            const newTenantId = tenantId;

            if (newSiteId && newSiteId !== oldSiteId) {
                const newSiteExists = await Site.findByPk(newSiteId);
                if (!newSiteExists) {
                    return res.status(404).json({ message: 'New site not found' });
                }
                await Site.decrement('totalBays', { by: 1, where: { id: oldSiteId } });
                await Site.increment('totalBays', { by: 1, where: { id: newSiteId } });
            }

            if (newTenantId && newTenantId !== oldTenantId) {
                const newTenantExists = await Tenant.findByPk(newTenantId);
                if (!newTenantExists) {
                    return res.status(404).json({ message: 'New tenant not found' });
                }
                await Tenant.decrement('totalBays', { by: 1, where: { id: oldTenantId } });
                await Tenant.increment('totalBays', { by: 1, where: { id: newTenantId } });
            }

            await bay.update({ name, size, availableFrom, availableUntil, siteId, tenantId, status, updatedBy: authUser.id });

            // Log change
            await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'update',
				'Updated Bay',
                'Bay',
                bay.id
              );

            res.status(200).json({ message: 'Bay updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }

    static async delete(req, res) {
        try {
            const bayId = req.params.id;
            const authUser = req.user;

            if (!authUser || authUser.role !== 'super_admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const bay = await Bay.findByPk(bayId);
            if (!bay) {
                return res.status(404).json({ message: 'Bay not found' });
            }

            const siteId = bay.siteId;
            const tenantId = bay.tenantId;

            await bay.destroy();

            // Update the tenant's and site's bay count
            await Site.decrement('totalBays', { by: 1, where: { id: siteId } });
            if (tenantId) {
                await Tenant.decrement('totalBays', { by: 1, where: { id: tenantId } });
            }

            // Log change
            await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'delete',
				'Deleted Bay',
                'Bay',
                bayId
              );

            res.status(200).json({ message: 'Bay deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}

module.exports = BayController;
