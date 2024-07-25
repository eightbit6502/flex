// api/services/AuthService.js
import { API_BASE_URL, API_V1 } from '../config';

export default class authService {
    async handleSignUp(email, password, firstname, lastname) {
        const userDetails = { "email": email, "password": password, "first_name": firstname, "last_name": lastname };
    
        const response = await fetch(API_BASE_URL + API_V1 + '/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            return { status: response.status, message: data.message || 'Error occurred' };
        }
    
        return data;
    }

    async handleSignIn(email, password) {
        const credentials = { "email": email, "password": password };
    
        const response = await fetch(API_BASE_URL + API_V1 + '/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            return { status: response.status, message: data.message || 'Error occurred' };
        }
    
        return data;
    }

    async handleActivation(token) {
        const tokenDetails = { "activationToken": token };
    
        const response = await fetch(API_BASE_URL + API_V1 + '/user/activate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokenDetails),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            return { status: response.status, message: data.message || 'Error occurred' };
        }
    
        return data;
    }

    async handleForgotPassword(email) {
        const credentials = { "email": email };

        const response = await fetch(API_BASE_URL + API_V1 + '/user/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            return { status: response.status, message: data.message || 'Error occurred' };
        }
    
        return data;
    }

    async handleResetPassword(token, password) {
        const credentials = { "passwordResetToken": token, "newPassword": password };

        const response = await fetch(API_BASE_URL + API_V1 + '/user/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            return { status: response.status, message: data.message || 'Error occurred' };
        }
    
        return data;
    }
}
