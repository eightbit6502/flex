// api/services/AuthService.js

export default class AuthService {
    async handleSignUp(email, password, firstname, lastname) {
        const userDetails = { "email": email, "password": password, "first_name": firstname, "last_name": lastname };
    
        const response = await fetch('http://localhost:3000/api/user/signup', {
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
    
        const response = await fetch('http://localhost:3000/api/user/signin', {
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
    
        const response = await fetch('http://localhost:3000/api/user/activate', {
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

        const response = await fetch('http://localhost:3000/api/user/forgot', {
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

        const response = await fetch('http://localhost:3000/api/user/reset', {
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
