const models = require('../models.js');
const event = models.Event; 

// Event class only

let meditate = new event('Virtual Guided Meditation');
let yoga = new event('Outside Yoga Lesson');

// General
describe('Event ', () => {

    it('meditate.id == 100', () => {
        expect(meditate.id).toBe(100);
    });
    it('meditate is first one in Event.all[]', () => {
        expect(event.all[0]).toEqual(meditate);
    });
    it('all[] contains 2 events', () => {
        expect(event.all.length).toBe(2);
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


