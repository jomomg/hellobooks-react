import jwt_decode from 'jwt-decode';

const isTokenValid = ()=> {
    let isExpired = false;
    let decoded = jwt_decode(localStorage.getItem('accessToken'));
    let now = new Date();

    if (decoded.exp < Math.round(now.getTime()/1000)) {
        isExpired = true
    }
    return !isExpired;
};

const Auth = {
    isAuthenticated: isTokenValid(),

    authenticate() {
        this.isAuthenticated = true;
    },

    logout() {
        this.isAuthenticated = false;
    },

    isAdmin() {
        try {
            let accessToken = localStorage.getItem('accessToken');
            let decoded = jwt_decode(accessToken);
            console.log(decoded);
            return decoded.user_claims.is_admin;
        } catch (e) {
            console.log(e)
        }
    },

    getUserInfo() {
        try{
            let accessToken = localStorage.getItem('accessToken');
            let decoded = jwt_decode(accessToken);
            return {
                first_name: decoded.user_claims.first_name,
                last_name: decoded.user_claims.last_name,
                email: decoded.identity,
            }
        } catch (e) {
            console.log(e)
        }
    }

};

export default Auth;