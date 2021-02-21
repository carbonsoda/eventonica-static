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

// updateName(newName)
describe('Event updateName', () => {
    
    it('Outside Yoga Lesson is now Virtual Yoga Lesson', () => {
        yoga.updateName('Virtual Yoga Lesson')
        expect(yoga.name).toBe('Virtual Yoga Lesson');
    });

    it('passes blank arg, yoga.name doesnt change', () => {
        yoga.updateName('')
        expect(yoga.name).toBe('Virtual Yoga Lesson');
    });

});

// updateDate(newDate)

// updateTime(newTime)

// updateCategory(newCategory)

// updateLocation(newLocation)

// updateDetails(newDetails)


// FINDER FUNCTIONS:

// findByDate(searchDate)


// findByCategory(searchCategory)


