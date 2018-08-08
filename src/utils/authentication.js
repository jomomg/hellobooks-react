import jwt_decode from 'jwt-decode';

const isTokenExpired = ()=> {
    let decoded = jwt_decode(localStorage.getItem('accessToken'));
    let now = new Date();
    return decoded.exp < Math.round(now.getTime()) / 1000;
};

const Auth = {
    authenticate() {
        localStorage.setItem('isAuthenticated', 'true');
    },

    logout() {
        localStorage.setItem('isAuthenticated', 'false');
    },
    isAuthenticated: () => JSON.parse(localStorage.getItem('isAuthenticated')) && !isTokenExpired(),

    isAdmin() {
        let accessToken = localStorage.getItem('accessToken');
        let decoded = jwt_decode(accessToken);
        return decoded.user_claims.is_admin;
    },

    getUserInfo() {
        let accessToken = localStorage.getItem('accessToken');
        let decoded = jwt_decode(accessToken);
        return {
            first_name: decoded.user_claims.first_name,
            last_name: decoded.user_claims.last_name,
            email: decoded.identity,
        }
    }

};

export default Auth;