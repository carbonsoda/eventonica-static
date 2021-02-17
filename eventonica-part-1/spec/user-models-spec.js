const models = require('../models.js');
const User  = models.User;


// User Class only

// Construction
describe('User ', () => {
    let a = new User('Avery');
    let b = new User('Bill');
    let c = new User('Carol');

    it('Carol id == 202', () => {
        expect(c.id).toBe(202);
    });
    it('all list should have 3 users', () => {
        expect(User.all.length).toBe(3);
    });
    
});

// updateName(newName)

// updateFavorites(eventID)
