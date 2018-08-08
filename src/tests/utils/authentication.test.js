import Auth from '../../utils/authentication';

describe('Auth', ()=>{
    beforeEach(()=>{
        Auth.authenticate()
    });

    test('it authenticates a user', ()=>{
        expect(Auth.isAuthenticated()).toBeDefined();
    });

    test('it logs out a user', ()=>{
        Auth.logout();
        expect(Auth.isAuthenticated()).toEqual(false);
    });

    test('it returns admin status', ()=>{
        expect(Auth.isAdmin()).toEqual(true)
    });

    test('it returns user info', ()=>{
        expect(Auth.getUserInfo().email).toEqual('jomo@user.com')
    })

});