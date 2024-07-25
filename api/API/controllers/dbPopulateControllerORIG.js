const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');
const passport = require('passport');
const constants = require('../config/constants');
const EmailService = require('../services/emailService');
const axios = require('axios');
const { sequelize } = require('../config/database');

class DbPopulateController {
	static async resetDatabase(req, res) {
		try {
		  // Drop and recreate all tables
		  await sequelize.sync({ force: true });
		  console.log('All tables dropped and recreated.');
	
		  res.status(200).json({ message: 'Database reset successfully' });
		} catch (error) {
		  console.error(error);
		  res.status(500).json({ message: 'Internal Server Error', error });
		}
	  }

	static async defaultDummyData(req, res) {
		try {
			
			// super user
			let superAdmin = {
				"email": "hello@antonmills.com",
				"password": "12345",
				"firstName": "Bruce",
				"lastName": "Wayne",
				"token": "",
			}
			let user1_t1 = {
				"email": "alfred.pennyworth@wayneenterprises.com",
				"password": "12345",
				"firstName": "Alfred",
				"lastName": "Pennyworth",
				"tenantId": 1
			}
			let user2_t1 = {
				"email": "lucious.fox@wayneenterprises.com",
				"password": "12345",
				"firstName": "Lucious",
				"lastName": "Fox",
				"tenantId": 2
			}
			
			let building1 = {
				"name": "Wayne Manor",
				"latitude": "-33.835400",
				"longitude": "151.213920",
				"addressLine1": "7/26-28 Eaton Street",
				"addressLine2": "Neutral Bay",
				"state": "NSW",
				"postcode": "2089",
				"status": constants.STATUS_ACTIVE,
				"country": "Australia",
				"contactName": "Bruce Wayne",
				"contactTel": "+61 415 974 089",
				"contactEmail": "bruce@wayneenterprises.com"
			}
			
			let building2 = {
				"name": "Wayne Tower",
				"latitude": "-38.1487292",
				"longitude": "144.3578939",
				"addressLine1": "85-109 Ryrie Street",
				"addressLine2": "Geelong",
				"state": "VIC",
				"postcode": "3220",
				"status": constants.STATUS_ACTIVE,
				"country": "Australia",
				"contactName": "Bruce Wayne",
				"contactTel": "+61 415 974 089",
				"contactEmail": "bruce@wayneenterprises.com"
			}
			
			let building3 = {
				"name": "Arkham Asylum",
				"latitude": "-34.8587550",
				"longitude": "138.5963876",
				"addressLine1": "Lionel Ave",
				"addressLine2": "Blair Athol",
				"state": "SA",
				"postcode": "5084",
				"status": constants.STATUS_ACTIVE,
				"country": "Australia",
				"contactName": "Scarecrow",
				"contactTel": "+61 415 974 089",
				"contactEmail": "scarecr@aasylum.com"
			}
			
			let site1 = {
				"name": "Bat Cave",
				"description": "The Bat Cave under Wayne Manor",
				"buildingId": 1,
				"latitude": -33.8354,
				"longitude": 151.21392,
				"addressLine1": "7/26-28 Eaton Street",
				"addressLine2": "Neutral Bay",
				"state": "NSW",
				"postcode": "2089",
				"country": "Australia",
				"dailyOpen": "06:00",
				"dailyClose": "12:00",
				"siteMaxVehicleHeight": "2.1m",
				"siteType": "Underground"
			}
			
			let site2 = {
				"name": "Wayne Tower Parking",
				"description": "Parking at Wayne Tower",
				"buildingId": 2,
				"latitude": -38.1487292,
				"longitude": 144.3578939,
				"addressLine1": "85-109 Ryrie Street",
				"addressLine2": "Geelong",
				"state": "VIC",
				"postcode": "3220",
				"country": "Australia",
				"dailyOpen": "06:00",
				"dailyClose": "12:00",
				"siteMaxVehicleHeight": "2.1m",
				"siteType": "Underground"
			}
			
			
			
			let tenant1 = {
				"name": "Wayne Enterprises",
				"addressLine1": "7/26-28 Eaton Street",
				"addressLine2": "Neutral Bay",
				"state": "NSW",
				"postcode": "2089",
				"country": "Australia",
				"status": constants.STATUS_ACTIVE
			}
			
			let tenant2 = {
				"name": "Wayne R&D",
				"addressLine1": "7/26-28 Eaton Street",
				"addressLine2": "Neutral Bay",
				"state": "NSW",
				"postcode": "2089",
				"country": "Australia",
				"status": constants.STATUS_ACTIVE
			}
			
			let tenant3 = {
				"name": "Dell",
				"addressLine1": "7/26-28 Eaton Street",
				"addressLine2": "Neutral Bay",
				"state": "NSW",
				"postcode": "2089",
				"country": "Australia",
				"status": constants.STATUS_ACTIVE
			}
			
			let tenant4 = {
				"name": "FujiXerox",
				"addressLine1": "7/26-28 Eaton Street",
				"addressLine2": "Neutral Bay",
				"state": "NSW",
				"postcode": "2089",
				"country": "Australia",
				"status": constants.STATUS_ACTIVE
			}

			let bay = {
				"name": "Bay ",
				"size": "2.1m",
				"availableFrom": "03:00",
				"availableUntil": "12:00",
				"status": constants.STATUS_ACTIVE,
				"siteId": 1
			}
			
			let batmanStaffGroup = {
				"name": "Batman's Staff",
				"description": "Special hidden parking for Batman's staff only",
				"tenantId": 1
			}
			
			let wayneStaffGroup = {
				"name": "Wayne Enterprise Staff",
				"description": "Parking for Wayne Enterprises staff",
				"tenantId": 2
			}
			
			
			
			let site1_rates = [
				{
					"name": "Daily Batcave",
					"type": "daily",
					"value": 40,
					"startTime": "03:00",
					"endTime": "12:00",
					"dayOfWeek": "monday",
					"siteId": 1
				},{
					"name": "Daily Batcave",
					"type": "daily",
					"value": 40,
					"startTime": "03:00",
					"endTime": "12:00",
					"dayOfWeek": "tuesday",
					"siteId": 1
				},{
					"name": "Daily Batcave",
					"type": "daily",
					"value": 40,
					"startTime": "03:00",
					"endTime": "12:00",
					"dayOfWeek": "wednesday",
					"siteId": 1
				},{
					"name": "Daily Batcave",
					"type": "daily",
					"value": 40,
					"startTime": "03:00",
					"endTime": "12:00",
					"dayOfWeek": "thursday",
					"siteId": 1
				},{
					"name": "Daily Batcave",
					"type": "daily",
					"value": 40,
					"startTime": "03:00",
					"endTime": "12:00",
					"dayOfWeek": "friday",
					"siteId": 1
				},{
					"name": "Daily Batcave",
					"type": "daily",
					"value": 40,
					"startTime": "03:00",
					"endTime": "12:00",
					"dayOfWeek": "saturday",
					"siteId": 1
				},
				{
					"name": "Daily Batcave",
					"type": "daily",
					"value": 80,
					"startTime": "12:01",
					"endTime": "23:00",
					"dayOfWeek": "saturday",
					"siteId": 1
				},
				{
					"name": "Daily Batcave",
					"type": "daily",
					"value": 40,
					"startTime": "03:00",
					"endTime": "12:00",
					"dayOfWeek": "sunday",
					"siteId": 1
				},
				{
					"name": "Daily Batcave",
					"type": "special",
					"value": 1000,
					"startTime": "01:00",
					"endTime": "22:00",
					"specialStartDate": "2024-06-14",
					"specialEndDate": "2024-06-14",
					"siteId": 1
				}
			]
			
			// add alfred to bat group
			let groupuserBat = {
				"groupId": 1,
				"userId": 2
			}
			
			let groupuserWayne = {
				"groupId": 2,
				"userId": 3
			}
			
			
			let buildingTenant = {
				"buildingId": 1,
				"tenantId": 1
			}
			
			let buildingSite = {
				"buildingId": 1,
				"siteId": 1
			}
			
			let bayrate = {
				"bayId": 1,
				"rateId": 1,
				"groups":[1]
			}
			
			
			
			// create super admin
			let sa = await axios.post(`http://localhost:3000/api/user/createsuperadmin`, superAdmin);
			
			// sign in sa
			sa = await axios.post(`http://localhost:3000/api/user/signin`, superAdmin);
			superAdmin = sa.data.user;
			superAdmin = sa.data.user;
			superAdmin.password = 12345;
			superAdmin.token = sa.data.token;
			
			

			// create buildings
			let buildingResponse = await axios.post(`http://localhost:3000/api/building`, building1, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			building1 = buildingResponse.data;
			
			buildingResponse = await axios.post(`http://localhost:3000/api/building`, building2, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			building2 = buildingResponse.data;
			
			buildingResponse = await axios.post(`http://localhost:3000/api/building`, building3, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			building3 = buildingResponse.data;
			

			// create sites
			let siteResponse = await axios.post(`http://localhost:3000/api/site`, site1, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			site1 = siteResponse.data;
			
			siteResponse = await axios.post(`http://localhost:3000/api/site`, site2, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			site2 = siteResponse.data;
			
			
			// assocate building sites
			await axios.post(`http://localhost:3000/api/buildingsite`, buildingSite, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			
			buildingSite.buildingId = 2;
			buildingSite.siteId = 2;
			await axios.post(`http://localhost:3000/api/buildingsite`, buildingSite, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			


			//////////
			
			// create tenants
			let tenantResponse = await axios.post(`http://localhost:3000/api/tenant`, tenant1, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			tenant1 = tenantResponse.data;
			
			tenantResponse = await axios.post(`http://localhost:3000/api/tenant`, tenant2, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			tenant2 = tenantResponse.data;
			
			tenantResponse = await axios.post(`http://localhost:3000/api/tenant`, tenant3, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			tenant3 = tenantResponse.data;
			
			tenantResponse = await axios.post(`http://localhost:3000/api/tenant`, tenant4, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			tenant4 = tenantResponse.data;
			
			
			// add 15 bays
			let bayCount = 10;
			for (let index = 0; index < bayCount; index++) {
				bay.name = "Bay " + (index+1);
				
				await axios.post(`http://localhost:3000/api/bay`, bay, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}

			// add 5 bays to site 1
			bay.siteId = 1;
			bay.tenantId = 1;
			for (let index = 0; index < 5; index++) {
				await axios.put(`http://localhost:3000/api/bay/${index+1}`, {siteId:1, tenantId:1}, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}

			// add 5 bays to site 2
			bay.siteId = 1;
			bay.tenantId = 2;
			for (let index = 5; index < 10; index++) {
				await axios.put(`http://localhost:3000/api/bay/${index+1}`, {siteId:1, tenantId:2}, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}

			

			
			// assocate building tenants
			// building 1 gets 1 tenant
			await axios.post(`http://localhost:3000/api/buildingtenant`, buildingTenant, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			
			// building 2 gets 3 tenants
			buildingTenant.buildingId = 2;
			buildingTenant.tenantId = 2;
			await axios.post(`http://localhost:3000/api/buildingtenant`, buildingTenant, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			
			buildingTenant.tenantId = 3;
			await axios.post(`http://localhost:3000/api/buildingtenant`, buildingTenant, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			
			
			buildingTenant.buildingId = 2
			buildingTenant.tenantId = 4;
			await axios.post(`http://localhost:3000/api/buildingtenant`, buildingTenant, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			
			
			
			
			// create user 1
			let u1_t1 = await axios.post(`http://localhost:3000/api/user`, user1_t1, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			
			// manually alter their status to skip activation
			let tmp = await User.findOne({ where: { email: user1_t1.email } });
			tmp.status = constants.STATUS_ACTIVE;
			tmp.activationToken = null;
			tmp.activationTokenExpires = null;
			await tmp.save();
			
			// sign in user 1
			u1_t1 = await axios.post(`http://localhost:3000/api/user/signin`, user1_t1);
			user1_t1 = u1_t1.data.user;
			user1_t1.password = 12345;
			user1_t1.token = u1_t1.data.token;
			
			
			// have to go after tenants
			// create user 2
			let u2_t1 = await axios.post(`http://localhost:3000/api/user`, user2_t1, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			
			// manually alter their status to skip activation
			tmp = await User.findOne({ where: { email: user2_t1.email } });
			tmp.status = constants.STATUS_ACTIVE;
			tmp.activationToken = null;
			tmp.activationTokenExpires = null;
			await tmp.save();
			
			// sign in user 1
			u2_t1 = await axios.post(`http://localhost:3000/api/user/signin`, user2_t1);
			user2_t1 = u2_t1.data.user;
			user2_t1.password = 12345;
			user2_t1.token = u2_t1.data.token;
			
			
			
			
			// create two groups
			let groupResponse = await axios.post(`http://localhost:3000/api/group`, batmanStaffGroup, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			batmanStaffGroup = groupResponse.data;
			
			groupResponse = await axios.post(`http://localhost:3000/api/group`, wayneStaffGroup, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			wayneStaffGroup = groupResponse.data;
			
			

			// add 5 bays to site 1
			// let bayCount = 5;
			// bay.tenantId = 1;
			// for (let index = 0; index < bayCount; index++) {
			// 	await axios.put(`http://localhost:3000/api/bay`, bay, {
			// 		headers: {
			// 			'Authorization': `Bearer ${superAdmin.token}`
			// 		}
			// 	});
			// }
			
			// // add 5 bays to site 2
			// // bay.siteId = 2;
			// bay.tenantId = 2;
			// for (let index = 1; index < 6; index++) {
			// 	await axios.put(`http://localhost:3000/api/bay`, bay, {
			// 		headers: {
			// 			'Authorization': `Bearer ${superAdmin.token}`
			// 		}
			// 	});
			// }

			
			// create rates
			for (const rate in site1_rates) {
				await axios.post(`http://localhost:3000/api/rate`, site1_rates[rate], {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// site 1
			// create a monday rate for both groups and all bays
			for (let index = 0; index < bayCount; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [1,2];
				bayrate.rateId = 1;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// create a tuesday rate for both groups and all bays
			for (let index = 0; index < bayCount; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [1,2];
				bayrate.rateId = 2;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// create a wednesday rate for group1 (bat) and all bays
			for (let index = 0; index < bayCount; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [1];
				bayrate.rateId = 3;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// create a thuesday rate for group2 (wayne) and all bays
			for (let index = 0; index < bayCount; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [2];
				bayrate.rateId = 4;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// create a friday rate for group1 (bat) and 3 bays
			for (let index = 0; index < 3; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [1];
				bayrate.rateId = 5;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// create a saturday rate for all
			for (let index = 0; index < bayCount; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [1,2];
				bayrate.rateId = 6;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// create a saturday evening rate for all
			for (let index = 0; index < bayCount; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [1,2];
				bayrate.rateId = 7;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			
			// create a sunday rate for all
			for (let index = 0; index < bayCount; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [1,2];
				bayrate.rateId = 8;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// create a special rate for group2 (ways)
			for (let index = 0; index < 3; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [2];
				bayrate.rateId = 9;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// create a special rate for group1 (bat) and 2 bays
			for (let index = 3; index < bayCount; index++) {
				
				bayrate.bayId = index+1;
				bayrate.groups = [1];
				bayrate.rateId = 9;
				
				await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
					headers: {
						'Authorization': `Bearer ${superAdmin.token}`
					}
				});
			}
			
			// add users to groups
			await axios.post(`http://localhost:3000/api/groupuser`, groupuserBat, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			
			await axios.post(`http://localhost:3000/api/groupuser`, groupuserWayne, {
				headers: {
					'Authorization': `Bearer ${superAdmin.token}`
				}
			});
			
			
			
			res.status(200).json({ message: 'db populated successfully' });
			
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}
	
}

module.exports = DbPopulateController;



/*
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');
const passport = require('passport');
const constants = require('../config/constants');
const EmailService = require('../services/emailService');
const axios = require('axios');

class DbPopulateController {
  static async defaultFill(req, res) {
    try {
      const users = [
        { email: "hello@antonmills.com", password: "12345", firstName: "Bruce", lastName: "Wayne", token: "" },
        { email: "alfred.pennyworth@wayneenterprises.com", password: "12345", firstName: "Alfred", lastName: "Pennyworth" },
        { email: "lucious.fox@wayneenterprises.com", password: "12345", firstName: "Lucious", lastName: "Fox" }
      ];

      const buildings = [
        { name: "Wayne Manor", latitude: "-33.835400", longitude: "151.213920", addressLine1: "7/26-28 Eaton Street", addressLine2: "Neutral Bay", state: "NSW", postcode: "2089", tenantCount: 0, siteCount: 0, status: constants.STATUS_ACTIVE, country: "Australia" },
        { name: "Wayne Tower", latitude: "-38.1487292", longitude: "144.3578939", addressLine1: "85-109 Ryrie Street", addressLine2: "Geelong", state: "VIC", postcode: "3220", tenantCount: 0, siteCount: 0, status: constants.STATUS_ACTIVE, country: "Australia" },
        { name: "Arkham Asylum", latitude: "-34.8587550", longitude: "138.5963876", addressLine1: "Lionel Ave", addressLine2: "Blair Athol", state: "SA", postcode: "5084", tenantCount: 0, siteCount: 0, status: constants.STATUS_ACTIVE, country: "Australia" }
      ];

      const sites = [
        { name: "Bat Cave", description: "The Bat Cave under Wayne Manor", buildingId: 1, latitude: -33.8354, longitude: 151.21392, addressLine1: "7/26-28 Eaton Street", addressLine2: "Neutral Bay", state: "NSW", postcode: "2089", country: "Australia", dailyOpen: "06:00", dailyClose: "12:00", siteMaxVehicleHeight: "2.1m", siteType: "Underground" },
        { name: "Wayne Tower Parking", description: "Parking at Wayne Tower", buildingId: 2, latitude: -38.1487292, longitude: 144.3578939, addressLine1: "85-109 Ryrie Street", addressLine2: "Geelong", state: "VIC", postcode: "3220", country: "Australia", dailyOpen: "06:00", dailyClose: "12:00", siteMaxVehicleHeight: "2.1m", siteType: "Underground" }
      ];

      const bay = { name: "Bay ", size: "2.1m", availableFrom: "03:00", availableUntil: "12:00", status: constants.STATUS_ACTIVE, siteId: 1 };

      const tenants = [
        { name: "Wayne Enterprises", addressLine1: "7/26-28 Eaton Street", addressLine2: "Neutral Bay", state: "NSW", postcode: "2089", country: "Australia", status: constants.STATUS_ACTIVE, totalUsers: "0", totalSites: "0" },
        { name: "Wayne R&D", addressLine1: "7/26-28 Eaton Street", addressLine2: "Neutral Bay", state: "NSW", postcode: "2089", country: "Australia", status: constants.STATUS_ACTIVE, totalUsers: "0", totalSites: "0" },
        { name: "Dell", addressLine1: "7/26-28 Eaton Street", addressLine2: "Neutral Bay", state: "NSW", postcode: "2089", country: "Australia", status: constants.STATUS_ACTIVE, totalUsers: "0", totalSites: "0" },
        { name: "FujiXerox", addressLine1: "7/26-28 Eaton Street", addressLine2: "Neutral Bay", state: "NSW", postcode: "2089", country: "Australia", status: constants.STATUS_ACTIVE, totalUsers: "0", totalSites: "0" }
      ];

      const groups = [
        { name: "Batman's Staff", description: "Special hidden parking for Batman's staff only", tenantId: 1 },
        { name: "Wayne Enterprise Staff", description: "Parking for Wayne Enterprises staff", tenantId: 2 }
      ];

      const site1_rates = [
        { name: "Daily Batcave", type: "daily", value: 40, startTime: "03:00", endTime: "12:00", dayOfWeek: "monday", siteId: 1 },
        { name: "Daily Batcave", type: "daily", value: 40, startTime: "03:00", endTime: "12:00", dayOfWeek: "tuesday", siteId: 1 },
        { name: "Daily Batcave", type: "daily", value: 40, startTime: "03:00", endTime: "12:00", dayOfWeek: "wednesday", siteId: 1 },
        { name: "Daily Batcave", type: "daily", value: 40, startTime: "03:00", endTime: "12:00", dayOfWeek: "thursday", siteId: 1 },
        { name: "Daily Batcave", type: "daily", value: 40, startTime: "03:00", endTime: "12:00", dayOfWeek: "friday", siteId: 1 },
        { name: "Daily Batcave", type: "daily", value: 40, startTime: "03:00", endTime: "12:00", dayOfWeek: "saturday", siteId: 1 },
        { name: "Daily Batcave", type: "daily", value: 80, startTime: "12:01", endTime: "23:00", dayOfWeek: "saturday", siteId: 1 },
        { name: "Daily Batcave", type: "daily", value: 40, startTime: "03:00", endTime: "12:00", dayOfWeek: "sunday", siteId: 1 },
        { name: "Daily Batcave", type: "special", value: 1000, startTime: "01:00", endTime: "22:00", specialStartDate: "2024-06-14", specialEndDate: "2024-06-14", siteId: 1 }
      ];

      const groupUsers = [
        { groupId: 1, userId: 2 },
        { groupId: 2, userId: 3 }
      ];

      const buildingTenant = { buildingId: 1, tenantId: 1 };
      const buildingSite = { buildingId: 1, siteId: 1 };
      const bayrate = { bayId: 1, rateId: 1, groups: [1] };

      // Create and sign in super admin
      const superAdmin = await DbPopulateController.createUser(users[0], true);

      // Update users with tokens
      users[0] = superAdmin;
      users[1] = await DbPopulateController.createUser(users[1]);
      users[2] = await DbPopulateController.createUser(users[2]);

      // Create buildings
      const createdBuildings = await DbPopulateController.createEntities('building', buildings, users[0].token);

      // Create sites
      const createdSites = await DbPopulateController.createEntities('site', sites, users[0].token);

      // Associate buildings and sites
      await DbPopulateController.associateEntities('buildingsite', buildingSite, createdBuildings, createdSites, users[0].token);

      // Create bays for sites
      await DbPopulateController.createBays(bay, 5, users[0].token, 1);
      await DbPopulateController.createBays(bay, 5, users[0].token, 2);

      // Create tenants
      const createdTenants = await DbPopulateController.createEntities('tenant', tenants, users[0].token);

      // Associate buildings and tenants
      await DbPopulateController.associateTenants('buildingtenant', buildingTenant, createdBuildings, createdTenants, users[0].token);

      // Create groups
      const createdGroups = await DbPopulateController.createEntities('group', groups, users[0].token);

      // Create rates
      await DbPopulateController.createRates(site1_rates, users[0].token);

      // Create bay rates
      await DbPopulateController.createBayRates(bayrate, 5, users[0].token);

      // Associate group users
      await DbPopulateController.associateGroupUsers(groupUsers, users[0].token);

      res.status(200).json({ message: 'db populated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  static async createUser(user, isSuperAdmin = false) {
    const endpoint = isSuperAdmin ? 'createsuperadmin' : 'signup';
    let response = await axios.post(`http://localhost:3000/api/user/${endpoint}`, user);

    if (isSuperAdmin) {
      user.token = response.data.token;
      user.id = response.data.user.id;
    } else {
      await this.activateUser(user.email);
      response = await axios.post(`http://localhost:3000/api/user/signin`, user);
      user.token = response.data.token;
      user.id = response.data.user.id;
    }
    return user;
  }

  static async activateUser(email) {
    let user = await User.findOne({ where: { email } });
    user.status = constants.STATUS_ACTIVE;
    user.activationToken = null;
    user.activationTokenExpires = null;
    await user.save();
  }

  static async createEntities(endpoint, entities, token) {
    return await Promise.all(entities.map(async entity => {
      const response = await axios.post(`http://localhost:3000/api/${endpoint}`, entity, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    }));
  }

  static async associateEntities(endpoint, association, buildings, sites, token) {
    for (let i = 0; i < buildings.length; i++) {
      association.buildingId = buildings[i].id;
      association.siteId = sites[i].id;
      await axios.post(`http://localhost:3000/api/${endpoint}`, association, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  }

  static async createBays(bay, count, token, siteId) {
    bay.siteId = siteId;
    for (let i = 1; i <= count; i++) {
      bay.name = `Bay S${siteId} ${i}`;
      await axios.post(`http://localhost:3000/api/bay`, bay, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  }

  static async associateTenants(endpoint, association, buildings, tenants, token) {
    for (let i = 0; i < tenants.length; i++) {
      association.buildingId = buildings[i % buildings.length].id;
      association.tenantId = tenants[i].id;
      await axios.post(`http://localhost:3000/api/${endpoint}`, association, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  }

  static async createRates(rates, token) {
    for (const rate of rates) {
      await axios.post(`http://localhost:3000/api/rate`, rate, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  }

  static async createBayRates(bayrate, count, token) {
    for (let i = 1; i <= count; i++) {
      bayrate.bayId = i;
      bayrate.groups = [1, 2];
      bayrate.rateId = i;
      await axios.post(`http://localhost:3000/api/bayrate`, bayrate, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  }

  static async associateGroupUsers(groupUsers, token) {
    for (const groupUser of groupUsers) {
      await axios.post(`http://localhost:3000/api/groupuser`, groupUser, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  }
}

module.exports = DbPopulateController;
*/