const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");


// db
const { sequelize } = require('./config/database');

// auth
const passportConfig = require('./config/passportConfig');

// routes
const userRoutes = require('./routes/userRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const siteRoutes = require('./routes/siteRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const bayRoutes = require('./routes/bayRoutes');
const rateRoutes = require('./routes/rateRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const searchRoutes = require('./routes/searchRoutes');
const groupRoutes = require('./routes/groupRoutes');
const logRoutes = require('./routes/logRoutes');
const groupUserRoutes = require('./routes/groupUserRoutes');
const bayRateRoutes = require('./routes/bayRateRoutes');
const buildingTenantRoutes = require('./routes/buildingTenantRoutes');
const buildingSiteRoutes = require('./routes/buildingSiteRoutes');
const dbPopulateRoutes = require('./routes/dbPopulateRoutes');

const constants = require('./config/constants');


const app = express();

// Cors
//if (process.env.NODE_ENV !== "production") {
//  require("dotenv").config()
//}

const domainsFromEnv = process.env.CORS_DOMAINS || "http://localhost:3001,http://127.0.0.1:3001,http://localhost:3002,http://127.0.0.1:3002"
// const domainsFromEnv = "http://localhost:3001,http://127.0.0.1:3001,http://192.168.20.7:3001,http://192.168.20.11:3001"

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
  origin: function (origin, callback) {
	if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

// app.options('*', cors())
// app.use(cors());


// Body parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
passportConfig(passport); // If you have a function to configure passport

// Sequelize database connection
sequelize.authenticate()
	.then(() => console.info('Database connected'))
	.catch(err => console.error(err));

// Sync all models
sequelize.sync({ force: true })
	.then(() => {
		console.info('Database & tables created');
	})
	.catch(err => console.error('Error during database sync:', err));

// api routes
app.use('/api/user', userRoutes);
app.use('/api/building', buildingRoutes);
app.use('/api/site', siteRoutes);
app.use('/api/tenant', tenantRoutes);
app.use('/api/bay', bayRoutes);
app.use('/api/rate', rateRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/bayrate', bayRateRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/groupuser', groupUserRoutes);
app.use('/api/buildingtenant', buildingTenantRoutes);
app.use('/api/buildingsite', buildingSiteRoutes);
app.use('/api/buildingtenant', buildingTenantRoutes);

// Simple route for home or test
app.get('/', (req, res) => res.send('Welcome to the API'));
app.get('/ready', (req, res) => res.send('ready'));

app.use('/db/', dbPopulateRoutes);


// swagger init
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "FlexPark API",
			version: "0.1.0",
			description: "WIP API",
		},
		servers: [
			{
				url: "http://" + process.env.HOST || constants.ENV_HOST+ ":" + process.env.PORT || constants.ENV_PORT,
			},
		],
	},
	apis: ["./routes/*.js"], // Path to your route files
};

const specs = swaggerJsDoc(options);
app.use(
	"/api-docs",
	swaggerUI.serve,
	swaggerUI.setup(specs)
);



// Set up a port
const PORT = process.env.PORT || constants.ENV_PORT;

// Start the server
app.listen(PORT, console.info(`Server started on port ${PORT}`));