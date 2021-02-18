const models = require('../models.js');
const User  = models.User;


// User Class only
let a = new User('Avery');
let b = new User('Bill');
let c = new User('Carol');
let d = new User('Bill');


describe('User ', () => {

    // Constructor
    it('Carol id == 202', () => {
        expect(c.id).toBe(202);
    });
    it('all list should have 4 users', () => {
        expect(User.all.length).toBe(4);
    });  
    it('with same names are separate objects', () => {
        expect(b == c).toBe(false);
    });
    // Making sure previous one tests as intended
    it('b == User b', () => {
        expect(b == b).toBe(true);
    });

    // updateName(newName)
    c.updateName('Caroline');
    it('Carol is now Caroline', () => {
        expect(c.name).toBe('Caroline');
    });

    c.updateName('Caroline');
    it('Caroline is now Caroline', () => {
        expect(c.name).toBe('Caroline');
    });

    // TO-DO updateFavorites(eventID)

});

