const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User, Tenant } = require('../models/associations');
const passport = require('passport');
const constants = require('../config/constants');
const EmailService = require('../services/emailService');
const ChangeLogController = require('./changeLogController');

class UserController {
	static async createSuperAdmin(req, res) {
		try {
			const { email, password, firstName, lastName } = req.body;
			const hashedPassword = await bcrypt.hash(password, 10);
			
			const newUser = await User.create({
				email,
				password: hashedPassword,
				firstName,
				lastName,
				role: "super_admin"
			});
			
			// activate user ready to go
			newUser.status = constants.STATUS_ACTIVE;
			await newUser.save({ fields: ['status'] });
			
			res.status(201).json({ message: 'User created successfully', user: newUser }); // 201 Created
		} catch (error) {
			console.error(error);
			if (error.name === 'SequelizeUniqueConstraintError') {
				return res.status(409).json({ message: 'Username already exists', error }); // 409 Conflict
			}
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}
	
	static async signUp(req, res) {
		try {
			const { email, password, firstName, lastName } = req.body;
			const hashedPassword = await bcrypt.hash(password, 10);
			
			// generate a random activation token
			const activationToken = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
			
			// set the token expiry time to 15 minutes from now
			const activationTokenExpires = new Date();
			activationTokenExpires.setMinutes(activationTokenExpires.getMinutes() + 15);
			
			const newUser = await User.create({
				email,
				password: hashedPassword,
				firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
				lastName, //TODO capitalise last name?
				activationToken,
				activationTokenExpires
			});
			
			//const emailService = new EmailService();
			//await emailService.sendActivationEmail(email, activationToken);
			
			console.log("[userController] - signUp: " + newUser.id);
			res.status(201).json({ status: 201, message: 'User created successfully', user: newUser }); // 201
			
		} catch (error) {
			console.error(error);
			
			if (error.name === 'SequelizeUniqueConstraintError') {
				return res.status(409).json({ status: 409, message: 'This email is already taken.', error }); // 409 Conflict
			}
			
			if (error.message === 'Failed to send activation email') {
				return res.status(500).json({ status: 500, message: 'Failed to send activation email', error }); // 500 Internal Server Error
			}
			
			res.status(500).json({ status: 500, message: 'Internal Server Error', error });
		}
	}
	
	static async activateAccount(req, res) {
		try {
			const { activationToken } = req.body;
			const user = await User.findOne({ where: { activationToken } });
			
			if (!user) {
				console.log("[userController] - activateAccount - code not found " + activationToken);
				return res.status(404).json({ status: 404, message: 'Activation token not found' });
			}
			
			const currentTime = new Date();
			if (currentTime > user.activationTokenExpires) {
				
				// send new code as this one has expired
				// generate a random activation token
				const newActivationToken = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
				
				// set the token expiry time to 15 minutes from now
				const newActivationTokenExpires = new Date();
				newActivationTokenExpires.setMinutes(newActivationTokenExpires.getMinutes() + 15);
				
				user.activationToken = newActivationToken;
				user.activationTokenExpires = newActivationTokenExpires;
				await user.save();
				
				const emailService = new EmailService();
				await emailService.sendActivationEmail(user.email, newActivationToken);
				
				console.log("[userController] - activateAccount - code expired: " + user.id);
				return res.status(401).json({ status: 401, message: 'Activation token has expired' });
			}
			
			// remove the pending activation status
			user.activationToken = null;
			user.activationTokenExpires = null;
			user.status = constants.STATUS_ACTIVE;
			await user.save();
			
			// generate the users JWT
			const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || constants.ENV_JWTSECRET, {
				expiresIn: 60000 // Token expiration time
			});
			
			// welcome the user
			const emailService = new EmailService();
			await emailService.sendWelcomeEmail(user.email, user.first_name);
			
			console.log("[userController] - activateAccount - activated: " + user.id);
			return res.json({ status: 200, user, token });
			
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}
	
	static async forgotPassword(req, res) {
		try {
			const { email } = req.body;
			const user = await User.findOne({ where: { email } });
			
			if (!user) {
				console.log("[userController] - forgotPassword - no user found: " + email);
			}
			
			if (user) {
				// generate reset token and expiry time
				const passwordResetTokenExpires = new Date();
				passwordResetTokenExpires.setMinutes(passwordResetTokenExpires.getMinutes() + 15);
				
				const resetToken = crypto.randomBytes(20).toString('hex');
				user.passwordResetToken = resetToken;
				user.passwordResetTokenExpires = passwordResetTokenExpires;
				
				await user.save();
				
				// send reset password email
				const emailService = new EmailService();
				await emailService.sendResetPasswordEmail(user.email, user.first_name, `http://localhost:3001/reset/${resetToken}`);
				
				console.log("[userController] - forgotPassword - request password reset for: " + user.id);
			}
			
			return res.status(200).json({ status: 200, message: 'If your email is registered, you will receive a password reset link' });
			
		} catch (error) {
			console.error(error);
			res.status(500).json({ status: 500, message: 'Internal Server Error', error });
		}
	}
	
	static async resetPassword(req, res) {
		try {
			const { passwordResetToken, newPassword } = req.body;
			const user = await User.findOne({ where: { passwordResetToken } });
			
			// perform actions only if the user is found
			if (user) {
				const currentTime = new Date();
				if (currentTime > user.passwordResetTokenExpires) {
					const resetToken = crypto.randomBytes(20).toString('hex');
					const passwordResetTokenExpires = new Date(currentTime.getTime() + 15 * 60000); // 15 minutes from now
					
					user.passwordResetToken = resetToken;
					user.passwordResetTokenExpires = passwordResetTokenExpires;
					await user.save();
					
					const emailService = new EmailService();
					await emailService.sendResetPasswordEmail(user.email, user.first_name, `http://localhost:3001/reset/${resetToken}`);
					
					console.log("[userController] - resetPassword - password reset token expired: " + user);
					return res.status(401).json({ status: 401, message: 'Password reset token has expired' });
				} else {
					user.password = await bcrypt.hash(newPassword, 10);
					user.passwordResetToken = null;
					user.passwordResetTokenExpires = null;
					await user.save();
					
					const emailService = new EmailService();
					await emailService.newPassword(user.email, user.first_name);
					
					console.log("[userController] - resetPassword - password reset for: " + user.id);
					return res.status(200).json({ status: 200, message: 'Password has been reset' });
				}
			} else {
				console.log("[userController] - resetPassword - attempt password reset for no matching token: " + passwordResetToken + " " + newPassword);
				return res.status(400).json({ status: 400, message: 'No matching token, repeated attempts will result in a ban' });
			}
			
		} catch (error) {
			console.error(error);
			return res.status(500).json({ status: 500, message: 'Internal Server Error', error });
		}
	}
	
	
	static async signIn(req, res, next) {
		passport.authenticate('local', { session: false }, async (err, user, info) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ status: 500, message: 'Internal Server Error', error: err });
			}
			if (!user) {
				return res.status(401).json({ status: 401, message: info ? info.message : 'Login failed' });
			}
			
			try {
				if (user.status != constants.STATUS_ACTIVE) {
					return res.status(403).json({ status: 403, message: 'Account is not active' });
				}
				
				const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || constants.ENV_JWTSECRET, {
					expiresIn: 60000
				});
				
				console.log("[userController] - signIn: " + user.id);
				return res.status(200).json({ status: 200, user: user, token });
				
			} catch (updateError) {
				console.error(updateError);
				return res.status(500).json({ status: 500, message: 'Failed to update user data', error: updateError });
			}
		})(req, res, next);
	}
	
	
	
	
	static async signOut(req, res) {
		req.logout();
		res.status(200).json({ status: 200, message: 'Successfully signed out' }); // 200 OK
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	static async create(req, res) {
		try {
			const authUser = req.user;
			
			if (!authUser || authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}
			const { email, password, firstName, lastName, tenantId } = req.body;

			const tenantExists = await Tenant.findByPk(tenantId);
			
			if (!tenantExists) {
				return res.status(404).json({ message: 'Tenant not found' });
			}
			
			
			const hashedPassword = await bcrypt.hash(password, 10);
			
			const newUser = await User.create({
				email,
				password: hashedPassword,
				firstName,
				lastName,
				tenantId
			});

			// Update the tenant's count
			await tenantExists.increment('totalUsers', { by: 1 });
			
			// log change
			await ChangeLogController.logChange(
                authUser.id,
                authUser.firstName + " " + authUser.lastName,
                'create',
				'Created User',
                'User',
                newUser.id
              );
			
			return res.status(201).json({ message: 'User created successfully', user: newUser }); // 201 Created
		} catch (error) {
			console.error(error);
			if (error.name === 'SequelizeUniqueConstraintError') {
				return res.status(409).json({ message: 'Username already exists', error }); // 409 Conflict
			}
			return res.status(500).json({ message: 'Internal Server Error', error }); // 500 Internal Server Error
		}
	}
	
	static async read(req, res) {
		try {
			const authUser = req.user;
			
			if (!authUser) {
				return res.status(401).json({ message: 'Unauthorized' }); // 401 Unauthorized
			}
			
			const user = await User.findOne({ where: { id: authUser.id } });
			
			if (!user) {
				return res.status(404).json({ message: 'User not found' }); // 404 Not Found
			}
			
			if (authUser.id === user.id || authUser.role === 'super_admin') {
				return res.status(200).json({ user }); // 200 OK
			}
			
			return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal Server Error', error }); // 500 Internal Server Error
		}
	}
	
	static async readAll(req, res) {
		try {
			const authUser = req.user;
			
			if (!authUser) {
				return res.status(401).json({ message: 'Unauthorized' }); // 401 Unauthorized
			}
			
			const user = await User.findAll();
			
			if (!user) {
				return res.status(404).json({ message: 'User not found' }); // 404 Not Found
			}
			
			if (authUser.id === user.id || authUser.role === 'super_admin') {
				return res.status(200).json({ user }); // 200 OK
			}
			
			return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal Server Error', error }); // 500 Internal Server Error
		}
	}
	
	static async update(req, res) {
		try {
			const userId = req.params.id;
			const { email, password } = req.body;
			const authUser = req.user;
			
			if (authUser.id !== userId && authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}
			
			const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
			await User.update({ email, password: hashedPassword }, { where: { id: userId } });
			
			res.status(200).json({ message: 'User updated successfully' }); // 200 OK
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}
	
	static async delete(req, res) {
		try {
			const userId = req.params.id;
			const authUser = req.user;
			
			if (authUser.id !== userId && authUser.role !== 'super_admin') {
				return res.status(403).json({ message: 'Forbidden' }); // 403 Forbidden
			}
			
			await User.destroy({ where: { id: userId } });
			
			res.status(200).json({ message: 'User deleted successfully' }); // 200 OK
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal Server Error', error });
		}
	}
}

module.exports = UserController;
