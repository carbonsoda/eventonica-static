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
describe('Event.updateName():', () => {
    
    it('Outside Yoga Lesson is now Virtual Yoga Lesson', () => {
        yoga.updateName('Virtual Yoga Lesson')
        expect(yoga.name).toBe('Virtual Yoga Lesson');
    });

    it('passing in blank arg does not change name', () => {
        yoga.updateName('');
        expect(yoga.name).toBe('Virtual Yoga Lesson');
    });

});

// updateDate(newDate)
describe('Event.updateDate():', () => {
    let tempDate = new Date('1/18/2021');
    it('meditate happened 1/18/2021 ', () => {
        meditate.updateDate('1/18/2021');

        expect(meditate.date.toDateString()).toBe(tempDate.toDateString());
    });

    it('passing in a date object will have same result as passing in a string', () => {
        yoga.updateDate(tempDate);

        expect(yoga.date.toDateString()).toBe(tempDate.toDateString());
    });

});

// updateTime(newTime)


// updateCategory(newCategory)


// updateLocation(newLocation)

// updateDetails(newDetails)


// FINDER FUNCTIONS:

// findByDate(searchDate)


// findByCategory(searchCategory)


