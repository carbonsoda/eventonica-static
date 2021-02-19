const models = require('../models.js');
const event = models.Event; 
// for some reason if I don't do it like this
// it won't work

// Event class only

let meditate = new event('Virtual Guided Meditation');
let yoga = new event('Outside Yoga Lesson');

// Constructor
describe('Event ', () => {

    it('meditate ', () => {
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
});

// findByDate(searchDate)

// findByCategory(searchCategory)

// updateName(newName)

// updateDate(newDate)

// updateTime(newTime)

// updateCategory(newCategory)

// updateLocation(newLocation)

// updateDetails(newDetails)


