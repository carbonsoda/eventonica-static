const models = require('../models.js');
const event = models.Event; 

// Event class only

let meditate = new event('Virtual Guided Meditation');
let yoga = new event('Outside Yoga Lesson');
let drawing = new event('Drawing Workshop', '2021-02-21');
let seminar = new event('Twitter Security 101', '2021-3-1', "1:00pm","Seminar");

// General
describe('Event ', () => {

    it('meditate.id == 100', () => {
        expect(meditate.id).toBe(100);
    });
    it('meditate is first one in Event.all[]', () => {
        expect(event.all[0]).toEqual(meditate);
    });
    it('all[] contains 4 events', () => {
        expect(event.all.length).toBe(4);
    });
});

// updateName(newName)
describe('Event.updateName():', () => {
    
    it('Outside Yoga Lesson is now Virtual Yoga Lesson', () => {
        yoga.updateName('Virtual Yoga Lesson');
        expect(yoga.name).toBe('Virtual Yoga Lesson');
    });

    it('passing in blank arg does not change name', () => {
        yoga.updateName('');
        expect(yoga.name).toBe('Outside Yoga Lesson');
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

    it('passing nothing will change nothing', () => {
        yoga.updateDate('');

        expect(yoga.date.toDateString()).toBe(tempDate.toDateString());
    });

});


// updateTime(newTime)
// updateLocation(newLocation)


// TO-DO

// updateCategory(newCategory)
// updateDetails(newDetails)


// FINDER FUNCTIONS:

// findByDate(searchDate)
describe('findByDate():', () => {
    let searchDate = '02/20/2021';
    yoga.updateDate(searchDate);

    it('02/20/2021 should return 1 event', () => {
        expect(event.findByDate(searchDate).length).toBe(1);
    });

});

// findByCategory(searchCategory)


