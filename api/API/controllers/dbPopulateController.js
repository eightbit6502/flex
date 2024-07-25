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
			
			// super user -----------------------------------------------------------------------------------------
			let superAdmin = {
				"email": "hello@antonmills.com",
				"password": "12345",
				"firstName": "Han",
				"lastName": "Solo",
				"token": "",
			}

			// create super admin
			let sa = await axios.post(`http://localhost:3000/api/user/createsuperadmin`, superAdmin);
			
			// sign in sa
			sa = await axios.post(`http://localhost:3000/api/user/signin`, superAdmin);
			superAdmin = sa.data.user;
			superAdmin = sa.data.user;
			superAdmin.password = 12345;
			superAdmin.token = sa.data.token;

			const superAdminToken = superAdmin.token;





			




			// buildings ------------------------------------------------------------------------------------------- 
			let building1 = {
				"name": "The Death Star",
				"latitude": "-33.835400",
				"longitude": "151.213920",
				"addressLine1": "7/26-28 Eaton Street",
				"addressLine2": "Neutral Bay",
				"state": "NSW",
				"postcode": "2089",
				"status": constants.STATUS_ACTIVE,
				"country": "Australia",
				"contactName": "Darth Vader",
				"contactTel": "+61 415 974 089",
				"contactEmail": "darth.vader@sith.co"
			}
			
			let building2 = {
				"name": "Yoda's Hut",
				"latitude": "-38.1487292",
				"longitude": "144.3578939",
				"addressLine1": "1 Swamp Way",
				"addressLine2": "Dagobah",
				"state": "VIC",
				"postcode": "3220",
				"status": constants.STATUS_ACTIVE,
				"country": "Australia",
				"contactName": "Yoda",
				"contactTel": "+61 415 974 089",
				"contactEmail": "yoda@jedi-academy.com"
			}
			
			let building3 = {
				"name": "Uncle Owen and Aunt Beru's Farm",
				"latitude": "-34.8587550",
				"longitude": "138.5963876",
				"addressLine1": "10 Going Nowhere Way",
				"addressLine2": "Tatooine",
				"state": "SA",
				"postcode": "5084",
				"status": constants.STATUS_ACTIVE,
				"country": "Australia",
				"contactName": "Owen Lars",
				"contactTel": "+61 415 974 089",
				"contactEmail": "owen.l@tatfarm.com.au"
			}
			
			let building4 = {
				"name": "Cloud City",
				"latitude": "-34.8587550",
				"longitude": "138.5963876",
				"addressLine1": "32 Floating City",
				"addressLine2": "Bespin",
				"state": "SA",
				"postcode": "5084",
				"status": constants.STATUS_ACTIVE,
				"country": "Australia",
				"contactName": "Lando Calrissian",
				"contactTel": "+61 415 974 089",
				"contactEmail": "lando@cloudcity.co.uk"
			}
			
			let building5 = {
				"name": "Echo Base",
				"latitude": "-66.282434",
				"longitude": "110.526490",
				"addressLine1": "5 Ice Cave",
				"addressLine2": "Hoth",
				"state": "ANT",
				"postcode": "8901",
				"status": constants.STATUS_ACTIVE,
				"country": "Antarctica",
				"contactName": "Leia Organa",
				"contactTel": "+61 415 974 089",
				"contactEmail": "leia.organa@rebelscum.com"
			}
			
			let building6 = {
				"name": "Jabba's Palace",
				"latitude": "36.861897",
				"longitude": "10.304330",
				"addressLine1": "Desert Road",
				"addressLine2": "Tatooine",
				"state": "TN",
				"postcode": "1013",
				"status": constants.STATUS_ACTIVE,
				"country": "Tunisia",
				"contactName": "Jabba the Hutt",
				"contactTel": "+216 71 123 456",
				"contactEmail": "jabba@tatooine.com"
			}
			
			let building7 = {
				"name": "Theed Palace",
				"latitude": "40.748817",
				"longitude": "-73.985428",
				"addressLine1": "123 Main St",
				"addressLine2": "Naboo",
				"state": "NY",
				"postcode": "10001",
				"status": constants.STATUS_ACTIVE,
				"country": "USA",
				"contactName": "Padmé Amidala",
				"contactTel": "+1 212 123 4567",
				"contactEmail": "padme.amidala@naboo.gov"
			}
			
			let building8 = {
				"name": "Kamino Cloning Facility",
				"latitude": "-54.803833",
				"longitude": "-68.307497",
				"addressLine1": "1 Ocean Drive",
				"addressLine2": "Tipoca City",
				"state": "TF",
				"postcode": "9410",
				"status": constants.STATUS_ACTIVE,
				"country": "Argentina",
				"contactName": "Lama Su",
				"contactTel": "+54 2901 123 456",
				"contactEmail": "lama.su@kamino.co"
			}
			
			let building9 = {
				"name": "Geonosis Droid Factory",
				"latitude": "23.634501",
				"longitude": "-102.552784",
				"addressLine1": "42 Sand Dune",
				"addressLine2": "Geonosis",
				"state": "CH",
				"postcode": "31001",
				"status": constants.STATUS_ACTIVE,
				"country": "Mexico",
				"contactName": "Poggle the Lesser",
				"contactTel": "+52 55 1234 5678",
				"contactEmail": "poggle@geonosis.co"
			}
			
			let building10 = {
				"name": "Endor Rebel Base",
				"latitude": "37.774929",
				"longitude": "-122.419416",
				"addressLine1": "1 Forest Path",
				"addressLine2": "Endor",
				"state": "CA",
				"postcode": "94102",
				"status": constants.STATUS_ACTIVE,
				"country": "USA",
				"contactName": "Han Solo",
				"contactTel": "+1 415 123 4567",
				"contactEmail": "han.solo@rebelscum.com"
			}
			
			let building11 = {
				"name": "Mustafar Mining Complex",
				"latitude": "64.200841",
				"longitude": "-149.493673",
				"addressLine1": "12 Lava Lane",
				"addressLine2": "Mustafar",
				"state": "AK",
				"postcode": "99701",
				"status": constants.STATUS_ACTIVE,
				"country": "USA",
				"contactName": "Darth Vader",
				"contactTel": "+1 907 123 4567",
				"contactEmail": "darth.vader@sith.co"
			}
			
			let building12 = {
				"name": "Mos Eisley Cantina",
				"latitude": "31.046051",
				"longitude": "34.851612",
				"addressLine1": "2 Spaceport Drive",
				"addressLine2": "Tatooine",
				"state": "SOUTH",
				"postcode": "10500",
				"status": constants.STATUS_ACTIVE,
				"country": "Israel",
				"contactName": "Wuher",
				"contactTel": "+972 8 123 4567",
				"contactEmail": "wuher@canti.net"
			}
			
			let building13 = {
				"name": "Jedha City",
				"latitude": "35.689487",
				"longitude": "139.691711",
				"addressLine1": "6 Temple Road",
				"addressLine2": "Jedha",
				"state": "TK",
				"postcode": "100-0001",
				"status": constants.STATUS_ACTIVE,
				"country": "Japan",
				"contactName": "Chirrut Îmwe",
				"contactTel": "+81 3-1234-5678",
				"contactEmail": "chirrut.imwe@jedha.com"
			}
			
			let building14 = {
				"name": "Starkiller Base",
				"latitude": "64.963051",
				"longitude": "-19.020835",
				"addressLine1": "3 Ice Field",
				"addressLine2": "Unknown Regions",
				"state": "IC",
				"postcode": "101",
				"status": constants.STATUS_ACTIVE,
				"country": "Iceland",
				"contactName": "Kylo Ren",
				"contactTel": "+354 123 4567",
				"contactEmail": "kylo.ren@firstorder.com"
			}
			
			let building15 = {
				"name": "Lothal Jedi Temple",
				"latitude": "29.651634",
				"longitude": "-82.324826",
				"addressLine1": "9 Ancient Path",
				"addressLine2": "Lothal",
				"state": "FL",
				"postcode": "32601",
				"status": constants.STATUS_ACTIVE,
				"country": "USA",
				"contactName": "Ezra Bridger",
				"contactTel": "+1 352 123 4567",
				"contactEmail": "ezra.bridger@lothal.net"
			}
			

			const buildings = [
				building1, building2, building3, building4, building5, building6, 
				building7, building8, building9, building10, building11, building12, 
				building13, building14, building15
			  ];
			  
			  for (let i = 0; i < buildings.length; i++) {
				try {
				  let buildingResponse = await axios.post(`http://localhost:3000/api/building`, buildings[i], {
					headers: {
					  'Authorization': `Bearer ${superAdmin.token}`
					}
				  });
				  buildings[i] = buildingResponse.data;
				} catch (error) {
				  console.error(`Failed to create building ${buildings[i].name}:`, error);
				}
			  }
			  











			// sites ------------------------------------------------------------------------------------------- 
			const sites = [
				{
					"name": "Death Star Hangar",
					"description": "Main hangar of the Death Star",
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
				},
				{
					"name": "Death Star Basement",
					"description": "Basement parking of the Death Star",
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
				},
				{
					"name": "Yoda's Hut Swamp Parking",
					"description": "Parking near Yoda's Hut",
					"buildingId": 2,
					"latitude": -38.1487292,
					"longitude": 144.3578939,
					"addressLine1": "1 Swamp Way",
					"addressLine2": "Dagobah",
					"state": "VIC",
					"postcode": "3220",
					"country": "Australia",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Yoda's Hut Hidden Parking",
					"description": "Hidden parking near Yoda's Hut",
					"buildingId": 2,
					"latitude": -38.1487292,
					"longitude": 144.3578939,
					"addressLine1": "1 Swamp Way",
					"addressLine2": "Dagobah",
					"state": "VIC",
					"postcode": "3220",
					"country": "Australia",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Lars Farm Vehicle Parking",
					"description": "Vehicle parking at Lars Farm",
					"buildingId": 3,
					"latitude": -34.8587550,
					"longitude": 138.5963876,
					"addressLine1": "10 Going Nowhere Way",
					"addressLine2": "Tatooine",
					"state": "SA",
					"postcode": "5084",
					"country": "Australia",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Lars Farm Droid Parking",
					"description": "Droid parking at Lars Farm",
					"buildingId": 3,
					"latitude": -34.8587550,
					"longitude": 138.5963876,
					"addressLine1": "10 Going Nowhere Way",
					"addressLine2": "Tatooine",
					"state": "SA",
					"postcode": "5084",
					"country": "Australia",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Cloud City Landing Platform",
					"description": "Landing platform at Cloud City",
					"buildingId": 4,
					"latitude": -34.8587550,
					"longitude": 138.5963876,
					"addressLine1": "32 Floating City",
					"addressLine2": "Bespin",
					"state": "SA",
					"postcode": "5084",
					"country": "Australia",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Cloud City Underground Parking",
					"description": "Underground parking at Cloud City",
					"buildingId": 4,
					"latitude": -34.8587550,
					"longitude": 138.5963876,
					"addressLine1": "32 Floating City",
					"addressLine2": "Bespin",
					"state": "SA",
					"postcode": "5084",
					"country": "Australia",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Underground"
				},
				{
					"name": "Echo Base Hangar",
					"description": "Hangar at Echo Base",
					"buildingId": 5,
					"latitude": -66.282434,
					"longitude": 110.526490,
					"addressLine1": "5 Ice Cave",
					"addressLine2": "Hoth",
					"state": "ANT",
					"postcode": "8901",
					"country": "Antarctica",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Underground"
				},
				{
					"name": "Echo Base Ice Cave Parking",
					"description": "Ice cave parking at Echo Base",
					"buildingId": 5,
					"latitude": -66.282434,
					"longitude": 110.526490,
					"addressLine1": "5 Ice Cave",
					"addressLine2": "Hoth",
					"state": "ANT",
					"postcode": "8901",
					"country": "Antarctica",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Underground"
				},
				{
					"name": "Jabba's Palace Main Parking",
					"description": "Main parking at Jabba's Palace",
					"buildingId": 6,
					"latitude": "36.861897",
					"longitude": "10.304330",
					"addressLine1": "Desert Road",
					"addressLine2": "Tatooine",
					"state": "TN",
					"postcode": "1013",
					"country": "Tunisia",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Jabba's Palace Hidden Parking",
					"description": "Hidden parking at Jabba's Palace",
					"buildingId": 6,
					"latitude": "36.861897",
					"longitude": "10.304330",
					"addressLine1": "Desert Road",
					"addressLine2": "Tatooine",
					"state": "TN",
					"postcode": "1013",
					"country": "Tunisia",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Theed Palace Public Parking",
					"description": "Public parking at Theed Palace",
					"buildingId": 7,
					"latitude": "40.748817",
					"longitude": "-73.985428",
					"addressLine1": "123 Main St",
					"addressLine2": "Naboo",
					"state": "NY",
					"postcode": "10001",
					"country": "USA",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Theed Palace VIP Parking",
					"description": "VIP parking at Theed Palace",
					"buildingId": 7,
					"latitude": "40.748817",
					"longitude": "-73.985428",
					"addressLine1": "123 Main St",
					"addressLine2": "Naboo",
					"state": "NY",
					"postcode": "10001",
					"country": "USA",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Kamino Cloning Facility Main Parking",
					"description": "Main parking at Kamino Cloning Facility",
					"buildingId": 8,
					"latitude": "-54.803833",
					"longitude": "-68.307497",
					"addressLine1": "1 Ocean Drive",
					"addressLine2": "Tipoca City",
					"state": "TF",
					"postcode": "9410",
					"country": "Argentina",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Kamino Cloning Facility VIP Parking",
					"description": "VIP parking at Kamino Cloning Facility",
					"buildingId": 8,
					"latitude": "-54.803833",
					"longitude": "-68.307497",
					"addressLine1": "1 Ocean Drive",
					"addressLine2": "Tipoca City",
					"state": "TF",
					"postcode": "9410",
					"country": "Argentina",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Geonosis Droid Factory Parking",
					"description": "Parking at Geonosis Droid Factory",
					"buildingId": 9,
					"latitude": "23.634501",
					"longitude": "-102.552784",
					"addressLine1": "42 Sand Dune",
					"addressLine2": "Geonosis",
					"state": "CH",
					"postcode": "31001",
					"country": "Mexico",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Geonosis Droid Factory VIP Parking",
					"description": "VIP parking at Geonosis Droid Factory",
					"buildingId": 9,
					"latitude": "23.634501",
					"longitude": "-102.552784",
					"addressLine1": "42 Sand Dune",
					"addressLine2": "Geonosis",
					"state": "CH",
					"postcode": "31001",
					"country": "Mexico",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Endor Rebel Base Hangar",
					"description": "Hangar at Endor Rebel Base",
					"buildingId": 10,
					"latitude": "37.774929",
					"longitude": "-122.419416",
					"addressLine1": "1 Forest Path",
					"addressLine2": "Endor",
					"state": "CA",
					"postcode": "94102",
					"country": "USA",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Endor Rebel Base Forest Parking",
					"description": "Forest parking at Endor Rebel Base",
					"buildingId": 10,
					"latitude": "37.774929",
					"longitude": "-122.419416",
					"addressLine1": "1 Forest Path",
					"addressLine2": "Endor",
					"state": "CA",
					"postcode": "94102",
					"country": "USA",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Mustafar Mining Complex Lava Parking",
					"description": "Lava parking at Mustafar Mining Complex",
					"buildingId": 11,
					"latitude": "64.200841",
					"longitude": "-149.493673",
					"addressLine1": "12 Lava Lane",
					"addressLine2": "Mustafar",
					"state": "AK",
					"postcode": "99701",
					"country": "USA",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Mustafar Mining Complex Underground Parking",
					"description": "Underground parking at Mustafar Mining Complex",
					"buildingId": 11,
					"latitude": "64.200841",
					"longitude": "-149.493673",
					"addressLine1": "12 Lava Lane",
					"addressLine2": "Mustafar",
					"state": "AK",
					"postcode": "99701",
					"country": "USA",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Underground"
				},
				{
					"name": "Mos Eisley Cantina Parking",
					"description": "Parking at Mos Eisley Cantina",
					"buildingId": 12,
					"latitude": "31.046051",
					"longitude": "34.851612",
					"addressLine1": "2 Spaceport Drive",
					"addressLine2": "Tatooine",
					"state": "SOUTH",
					"postcode": "10500",
					"country": "Israel",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Mos Eisley Cantina Underground Parking",
					"description": "Underground parking at Mos Eisley Cantina",
					"buildingId": 12,
					"latitude": "31.046051",
					"longitude": "34.851612",
					"addressLine1": "2 Spaceport Drive",
					"addressLine2": "Tatooine",
					"state": "SOUTH",
					"postcode": "10500",
					"country": "Israel",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Underground"
				},
				{
					"name": "Jedha City Main Parking",
					"description": "Main parking at Jedha City",
					"buildingId": 13,
					"latitude": "35.689487",
					"longitude": "139.691711",
					"addressLine1": "6 Temple Road",
					"addressLine2": "Jedha",
					"state": "TK",
					"postcode": "100-0001",
					"country": "Japan",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Jedha City Underground Parking",
					"description": "Underground parking at Jedha City",
					"buildingId": 13,
					"latitude": "35.689487",
					"longitude": "139.691711",
					"addressLine1": "6 Temple Road",
					"addressLine2": "Jedha",
					"state": "TK",
					"postcode": "100-0001",
					"country": "Japan",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Underground"
				},
				{
					"name": "Starkiller Base Hangar",
					"description": "Hangar at Starkiller Base",
					"buildingId": 14,
					"latitude": "64.963051",
					"longitude": "-19.020835",
					"addressLine1": "3 Ice Field",
					"addressLine2": "Unknown Regions",
					"state": "IC",
					"postcode": "101",
					"country": "Iceland",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Underground"
				},
				{
					"name": "Starkiller Base Underground Parking",
					"description": "Underground parking at Starkiller Base",
					"buildingId": 14,
					"latitude": "64.963051",
					"longitude": "-19.020835",
					"addressLine1": "3 Ice Field",
					"addressLine2": "Unknown Regions",
					"state": "IC",
					"postcode": "101",
					"country": "Iceland",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Underground"
				},
				{
					"name": "Lothal Jedi Temple Main Parking",
					"description": "Main parking at Lothal Jedi Temple",
					"buildingId": 15,
					"latitude": "29.651634",
					"longitude": "-82.324826",
					"addressLine1": "9 Ancient Path",
					"addressLine2": "Lothal",
					"state": "FL",
					"postcode": "32601",
					"country": "USA",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				},
				{
					"name": "Lothal Jedi Temple Hidden Parking",
					"description": "Hidden parking at Lothal Jedi Temple",
					"buildingId": 15,
					"latitude": "29.651634",
					"longitude": "-82.324826",
					"addressLine1": "9 Ancient Path",
					"addressLine2": "Lothal",
					"state": "FL",
					"postcode": "32601",
					"country": "USA",
					"dailyOpen": "06:00",
					"dailyClose": "12:00",
					"siteMaxVehicleHeight": "2.1m",
					"siteType": "Outdoor"
				}
			];
			
			async function createSite(site, superAdminToken) {
				try {
					let siteResponse = await axios.post(`http://localhost:3000/api/site`, site, {
						headers: {
							'Authorization': `Bearer ${superAdminToken}`
						}
					});
					return siteResponse.data;
				} catch (error) {
					console.error(`Failed to create site ${site.name}:`, error);
					return null;
				}
			}
			
			const createdSites = [];
			for (let site of sites) {
				let createdSite = await createSite(site, superAdmin.token);
				if (createdSite) {
					createdSites.push(createdSite);
				}
			}
			
			  










			// tenants ------------------------------------------------------------------------------------------- 
			const tenants = [
				{
					"name": "Rebel Alliance",
					"addressLine1": "1 Echo Base",
					"addressLine2": "Hoth",
					"state": "ANT",
					"postcode": "8901",
					"country": "Antarctica",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Galactic Empire",
					"addressLine1": "1 Imperial Center",
					"addressLine2": "Coruscant",
					"state": "CR",
					"postcode": "10000",
					"country": "Coruscant",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Jedi Order",
					"addressLine1": "1 Jedi Temple",
					"addressLine2": "Coruscant",
					"state": "CR",
					"postcode": "10000",
					"country": "Coruscant",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Sith Order",
					"addressLine1": "1 Sith Academy",
					"addressLine2": "Korriban",
					"state": "KR",
					"postcode": "10100",
					"country": "Korriban",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Trade Federation",
					"addressLine1": "1 Federation Complex",
					"addressLine2": "Neimoidia",
					"state": "NM",
					"postcode": "10200",
					"country": "Neimoidia",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Clone Troopers",
					"addressLine1": "1 Kamino Cloning Facility",
					"addressLine2": "Tipoca City",
					"state": "TF",
					"postcode": "9410",
					"country": "Argentina",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Separatist Alliance",
					"addressLine1": "1 Separatist Headquarters",
					"addressLine2": "Raxus",
					"state": "RX",
					"postcode": "10300",
					"country": "Raxus",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Mandalorians",
					"addressLine1": "1 Mandalore",
					"addressLine2": "Keldabe",
					"state": "KL",
					"postcode": "10400",
					"country": "Mandalore",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Bounty Hunters Guild",
					"addressLine1": "1 Guild Hall",
					"addressLine2": "Nar Shaddaa",
					"state": "NS",
					"postcode": "10500",
					"country": "Nar Shaddaa",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Black Sun",
					"addressLine1": "1 Black Sun Fortress",
					"addressLine2": "Mustafar",
					"state": "MS",
					"postcode": "10600",
					"country": "Mustafar",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Wookiees",
					"addressLine1": "1 Tree City",
					"addressLine2": "Kashyyyk",
					"state": "KS",
					"postcode": "10700",
					"country": "Kashyyyk",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Tusken Raiders",
					"addressLine1": "1 Jundland Wastes",
					"addressLine2": "Tatooine",
					"state": "TN",
					"postcode": "10800",
					"country": "Tatooine",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Ewoks",
					"addressLine1": "1 Bright Tree Village",
					"addressLine2": "Endor",
					"state": "ED",
					"postcode": "10900",
					"country": "Endor",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "Resistance",
					"addressLine1": "1 D'Qar Base",
					"addressLine2": "D'Qar",
					"state": "DQ",
					"postcode": "11000",
					"country": "D'Qar",
					"status": constants.STATUS_ACTIVE
				},
				{
					"name": "First Order",
					"addressLine1": "1 Starkiller Base",
					"addressLine2": "Unknown Regions",
					"state": "IC",
					"postcode": "101",
					"country": "Iceland",
					"status": constants.STATUS_ACTIVE
				}
			];

			async function createTenant(tenant, token) {
				try {
					let tenantResponse = await axios.post(`http://localhost:3000/api/tenant`, tenant, {
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});
					return tenantResponse.data;
				} catch (error) {
					console.error(`Failed to create tenant ${tenant.name}:`, error);
					return null;
				}
			}

			const createdTenants = [];
			for (let tenant of tenants) {
				let createdTenant = await createTenant(tenant, superAdminToken);
				if (createdTenant) {
					createdTenants.push(createdTenant);
				}
			}

			// Ensure all tenants are created
			if (createdTenants.length !== tenants.length) {
				throw new Error("Failed to create all tenants");
			}











			
			// users ------------------------------------------------------------------------------------------- 
			const users = [
				{
				  "email": "luke.skywalker@rebelscum.com",
				  "password": "12345",
				  "firstName": "Luke",
				  "lastName": "Skywalker",
				  "tenantId": 1
				},
				{
				  "email": "leia.organa@rebelscum.com",
				  "password": "12345",
				  "firstName": "Leia",
				  "lastName": "Organa",
				  "tenantId": 1
				},
				{
				  "email": "han.solo@smuggler.com",
				  "password": "12345",
				  "firstName": "Han",
				  "lastName": "Solo",
				  "tenantId": 1
				},
				{
				  "email": "chewbacca@kashyyyk.com",
				  "password": "12345",
				  "firstName": "Chewbacca",
				  "lastName": "Wookiee",
				  "tenantId": 1
				},
				{
				  "email": "obiwan.kenobi@jediorder.com",
				  "password": "12345",
				  "firstName": "Obi-Wan",
				  "lastName": "Kenobi",
				  "tenantId": 1
				},
				{
				  "email": "darth.vader@sith.co",
				  "password": "12345",
				  "firstName": "Darth",
				  "lastName": "Vader",
				  "tenantId": 2
				},
				{
				  "email": "palpatine@empire.com",
				  "password": "12345",
				  "firstName": "Sheev",
				  "lastName": "Palpatine",
				  "tenantId": 2
				},
				{
				  "email": "tarkin@empire.com",
				  "password": "12345",
				  "firstName": "Wilhuff",
				  "lastName": "Tarkin",
				  "tenantId": 2
				},
				{
				  "email": "boba.fett@bountyhunter.com",
				  "password": "12345",
				  "firstName": "Boba",
				  "lastName": "Fett",
				  "tenantId": 2
				},
				{
				  "email": "jango.fett@bountyhunter.com",
				  "password": "12345",
				  "firstName": "Jango",
				  "lastName": "Fett",
				  "tenantId": 2
				},
				{
				  "email": "mace.windu@jediorder.com",
				  "password": "12345",
				  "firstName": "Mace",
				  "lastName": "Windu",
				  "tenantId": 3
				},
				{
				  "email": "yoda@jediorder.com",
				  "password": "12345",
				  "firstName": "Yoda",
				  "lastName": "Unknown",
				  "tenantId": 3
				},
				{
				  "email": "qui-gon.jinn@jediorder.com",
				  "password": "12345",
				  "firstName": "Qui-Gon",
				  "lastName": "Jinn",
				  "tenantId": 3
				},
				{
				  "email": "ahsoka.tano@jediorder.com",
				  "password": "12345",
				  "firstName": "Ahsoka",
				  "lastName": "Tano",
				  "tenantId": 3
				},
				{
				  "email": "anakin.skywalker@jediorder.com",
				  "password": "12345",
				  "firstName": "Anakin",
				  "lastName": "Skywalker",
				  "tenantId": 3
				}
			  ];
			  
			  async function createUser(user, superAdminToken) {
				try {
				  // Create user
				  let createdUserResponse = await axios.post(`http://localhost:3000/api/user`, user, {
					headers: {
					  'Authorization': `Bearer ${superAdminToken}`
					}
				  });
			  
				  // Manually alter their status to skip activation
				  let tmp = await User.findOne({ where: { email: user.email } });
				  tmp.status = constants.STATUS_ACTIVE;
				  tmp.activationToken = null;
				  tmp.activationTokenExpires = null;
				  await tmp.save();
			  
				  // Sign in user
				  let signInResponse = await axios.post(`http://localhost:3000/api/user/signin`, {
					email: user.email,
					password: user.password
				  });
			  
				  // Update user object with data from the sign-in response
				  user = signInResponse.data.user;
				  user.password = '12345';  // Update to match initial password
				  user.token = signInResponse.data.token;
			  
				  return user;
				} catch (error) {
				  console.error(`Failed to create user ${user.email}:`, error);
				  return null;
				}
			  }
			  
			  const createdUsers = [];
			  for (let user of users) {
				let createdUser = await createUser(user, superAdminToken);
				if (createdUser) {
				  createdUsers.push(createdUser);
				}
			  }
			









			// Define the buildings and their corresponding tenants ------------------------------------
			const buildingsWithTenants = [
				{ buildingId: 1, tenants: [2, 4, 6] },
				{ buildingId: 2, tenants: [3, 14] },
				{ buildingId: 3, tenants: [5] }
			];

			async function addTenantToBuilding(buildingId, tenantId, token) {
				try {
					let buildingTenant = { buildingId, tenantId };
					await axios.post(`http://localhost:3000/api/buildingtenant`, buildingTenant, {
						headers: { 'Authorization': `Bearer ${token}` }
					});
					console.log(`Tenant ${tenantId} added to Building ${buildingId}`);
				} catch (error) {
					console.error(`Failed to add tenant ${tenantId} to building ${buildingId}:`, error);
				}
			}

			for (let building of buildingsWithTenants) {
				for (let tenantId of building.tenants) {
					await addTenantToBuilding(building.buildingId, tenantId, superAdmin.token);
				}
			}

			
			








			// Define the buildings and their corresponding tenants ------------------------------------
			const buildingsWithSites = [
				{ buildingId: 1, sites: [1, 2] },
				{ buildingId: 2, sites: [3] },
				{ buildingId: 3, sites: [5] }
			];
			
			async function addSiteToBuilding(buildingId, siteId, token) {
				try {
					let buildingSite = { buildingId, siteId };
					await axios.post(`http://localhost:3000/api/buildingsite`, buildingSite, {
						headers: { 'Authorization': `Bearer ${token}` }
					});
					console.log(`Site ${siteId} added to Building ${buildingId}`);
				} catch (error) {
					console.error(`Failed to add site ${siteId} to building ${buildingId}:`, error);
				}
			}
			
			for (let building of buildingsWithSites) {
				for (let siteId of building.sites) {
					await addSiteToBuilding(building.buildingId, siteId, superAdmin.token);
				}
			}
			
			
			
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