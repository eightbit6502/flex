const ChangeLog = require('./changeLog');
const Tenant = require('./tenant');
const User = require('./user');
const Bay = require('./bay');
const Group = require('./group');
const BayRate = require('./bayRate');
const GroupUser = require('./groupUser');
const Site = require('./site');
const Rate = require('./rate');
const Booking = require('./booking');
const Building = require('./building');
const BuildingTenant = require('./buildingTenant'); // Import BuildingTenant model
const BuildingSite = require('./buildingSite'); // Import BuildingSite model

// Tenant to Group Association
Tenant.hasMany(Group, { foreignKey: 'tenantId' });
Group.belongsTo(Tenant, { foreignKey: 'tenantId' });

// Group to User Association (many-to-many)
Group.belongsToMany(User, { through: GroupUser, foreignKey: 'groupId' });
User.belongsToMany(Group, { through: GroupUser, foreignKey: 'userId' });

// Site to Bay Association
Site.hasMany(Bay, { foreignKey: 'siteId' });
Bay.belongsTo(Site, { foreignKey: 'siteId' });

// Site to Rate Association
Site.hasMany(Rate, { foreignKey: 'siteId' });
Rate.belongsTo(Site, { foreignKey: 'siteId' });

// Bay to Booking Association
Bay.hasMany(Booking, { foreignKey: 'bayId' });
Booking.belongsTo(Bay, { foreignKey: 'bayId' });

// Bay to BayRate Association
Bay.hasMany(BayRate, { foreignKey: 'bayId' });
BayRate.belongsTo(Bay, { foreignKey: 'bayId' });

// Rate to BayRate Association
Rate.hasMany(BayRate, { foreignKey: 'rateId' });
BayRate.belongsTo(Rate, { foreignKey: 'rateId' });

// Bay to Rate (Many-to-Many) Association through BayRate
Bay.belongsToMany(Rate, { through: BayRate, foreignKey: 'bayId' });
Rate.belongsToMany(Bay, { through: BayRate, foreignKey: 'rateId' });

// User to Booking Association
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

// User to Site Association (for createdBy and updatedBy)
User.hasMany(Site, { foreignKey: 'createdBy' });
User.hasMany(Site, { foreignKey: 'updatedBy' });
Site.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
Site.belongsTo(User, { as: 'updater', foreignKey: 'updatedBy' });

// User to Bay Association (for createdBy and updatedBy)
User.hasMany(Bay, { foreignKey: 'createdBy' });
User.hasMany(Bay, { foreignKey: 'updatedBy' });
Bay.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
Bay.belongsTo(User, { as: 'updater', foreignKey: 'updatedBy' });

// User to Rate Association (for createdBy and updatedBy)
User.hasMany(Rate, { foreignKey: 'createdBy' });
User.hasMany(Rate, { foreignKey: 'updatedBy' });
Rate.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
Rate.belongsTo(User, { as: 'updater', foreignKey: 'updatedBy' });

// User to BayRate Association (for createdBy and updatedBy)
User.hasMany(BayRate, { foreignKey: 'createdBy' });
User.hasMany(BayRate, { foreignKey: 'updatedBy' });
BayRate.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
BayRate.belongsTo(User, { as: 'updater', foreignKey: 'updatedBy' });

// Building to Tenant (Many-to-Many) Association through BuildingTenant
Building.belongsToMany(Tenant, { through: BuildingTenant, foreignKey: 'buildingId' });
Tenant.belongsToMany(Building, { through: BuildingTenant, foreignKey: 'tenantId' });

// Building to Site (Many-to-Many) Association through BuildingSite
Building.belongsToMany(Site, { through: BuildingSite, foreignKey: 'buildingId' });
Site.belongsToMany(Building, { through: BuildingSite, foreignKey: 'siteId' });

// Correct association for Site with BuildingSite
BuildingSite.belongsTo(Site, { foreignKey: 'siteId' });
BuildingSite.belongsTo(Building, { foreignKey: 'buildingId' });
Site.hasMany(BuildingSite, { foreignKey: 'siteId' });
Building.hasMany(BuildingSite, { foreignKey: 'buildingId' });

BuildingTenant.belongsTo(Tenant, { foreignKey: 'tenantId' });
BuildingTenant.belongsTo(Building, { foreignKey: 'buildingId' });
Tenant.hasMany(BuildingTenant, { foreignKey: 'tenantId' });
Building.hasMany(BuildingTenant, { foreignKey: 'buildingId' });

module.exports = {
  ChangeLog,
  Bay,
  Site,
  Rate,
  Booking,
  Building,
  BayRate,
  Group,
  Tenant,
  User,
  GroupUser,
  BuildingTenant,
  BuildingSite
};
