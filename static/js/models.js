
class Eventonica {

    constructor() {
        // used to favorite events per user
        this.currentUser;
    }

    // Add event
    // Name is required
    addEvent(name, ...moreDetails) {
        return new Event(name, ...moreDetails);
    }

    getEvent(eventID) {
        let eventIdx = this.indexLookup(Event.all, eventID);

        // Event not found
        if (eventIdx < 0) return;

        // Event found
        return Event.all[eventIdx];
    }

    // Update existing Event
    updateEvent(eventID, name = '', date = '', time = '', category = '', location = '', details = '') {
        let eventIdx = this.indexLookup(Event.all, eventID);

        if (eventIdx < 0) return false;

        let currEvent = Event.all[eventIdx];

        // Check through each parameter
        // If not blank, then it update that field
        if (name) {
            currEvent.updateName(name);
        }
        if (date) {
            currEvent.updateDate(date);
        }
        if (time) {
            currEvent.updateTime(time);
        }
        if (category) {
            currEvent.updateCategory(category);
        }
        if (location) {
            currEvent.updateLocation(location);
        }
        if (details) {
            currEvent.updateDetails(details);
        }

        // overwrite the old event
        Event.all[eventIdx] = currEvent;

        return true;
    }

    // Deletes Event
    deleteEvent(eventID) {
        let eventIdx = this.indexLookup(Event.all, eventID);

        // if event correctly found
        if (eventIdx >= 0) {
            Event.all.splice(eventIdx, 1);
            return true;
        }

        return false;
    }

    // Get all existing events
    getAllEvents() {
        return Event.all;
    }

    getEventCategories() {
        return Event.categories;
    }

    // Return items in Event.all with a specified date
    findEventsByDate(findDate) {
        searchDate = new Date(findDate);

        let results = []

        // Assuming same timezone for now
        for (let event of Event.all) {
            if (
                event.date.getMonth() == searchDate.getMonth()
                && event.date.getDay() == searchDate.getDay()
                && event.date.getYear() == searchDate.getYear()
            ) {
                results.add(event);
            }
        }
        console.log(results);
        return results;
    }

    findEventsByCategory(findCategory) {
        // Return items in Event.all with a specified category
        let results = []

        for (let event in all) {
            if (event.category.has(findCategory)) {
                results.add(event);
            }
        }

        return results;
    }

    // Add new User
    addUser(name) {
        return new User(name);
    }

    // Get User
    getUser(userID) {
        let userIdx = this.indexLookup(User.all, userID);

        // User not found
        if (userIdx < 0) return;

        return User.all[userIdx];
    }

    // Update existing User
    updateUser(userID, name = '') {
        let userIdx = this.indexLookup(User.all, userID);

        // User found
        if (userIdx >= 0 && name) {
            User.all[userIdx].updateName(name);
            return true;
        }

        return false;
    }

    // Deletes User
    deleteUser(userID) {
        let userIdx = this.indexLookup(User.all, userID);

        // if user correctly found
        if (userIdx >= 0) {
            User.all.splice(userIdx, 1);
            return true;
        }

        return false;
    }

    // Get all existing users
    getAllUsers() {
        return User.all;
    }

    // Get all existing users
    getAllUsers() {
        return User.all;
    }

    // Handles adding/removing favorites
    updateUserFavorites(eventID) {
        
        if (this.currentUser && eventId) {
            this.currentUser.updateFavorites(eventIDs);
            return true;
        }
        return false;
    }

    // returns a user object based on a userID
    setCurrentUser(userID) {
        let userIdx = this.indexLookup(User.all, userID);

        if (userIdx >= 0) {
            this.currentUser = User.all[userIdx];

            // confirm who current user is
            return this.currentUser.id == userID;
        }

        return false;
    }

    // Find the index of a user or event object
    // using binary search and object's id
    indexLookup(arrAllObjs, findID) {
        // Set lowest and highest possible indexes
        let minIdx = 0;
        let maxIdx = arrAllObjs.length - 1;

        while (minIdx <= maxIdx) {
            // check at middle
            let midIdx = Math.floor((maxIdx + minIdx) / 2);
            let guessID = arrAllObjs[midIdx].id;

            if (guessID == findID) {
                return midIdx;
            } else if (guessID > findID) {
                maxIdx = midIdx - 1;
            } else {
                minIdx = midIdx + 1;
            }
        }

        return -1;
    }
}

class Event {
    static all = [];
    static _nextId = 100;
    static categories = [
        'Workshop', 'Presentation', 'Seminar', 'Concert', '1:1'
    ];

    // empty values for now
    constructor(name, date = '', time = '', category = '', location = '', details = '') {
        this.id = Event._nextId++;
        this.name = name;
        this.date = date;
        this.time = time; // could be all day too
        this.category = category;
        this.location = location;
        this.details = details;
        this.faveCount = 0;

        // if actual date string passed in
        if (date.length > 1) this.date = new Date(date);

        // keep track of all created instances
        Event.all.push(this);
    }

    static findByDate(searchDate) {
        let results = []

        // Assuming same timezone for now
        for (let event of this.all) {
            if (
                event.date.getMonth() == searchDate.getMonth()
                && event.date.getDay() == searchDate.getDay()
                && event.date.getYear() == searchDate.getYear()
            ) {
                results.add(event);
            }
        }
        console.log(results);
        return results;
    }

    // Returns filtered array of events that have given category label
    static findByCategory(searchCategory) {
        let results = []

        for (let event in all) {
            if (event.category.has(searchCategory)) {
                results.add(event);
            }
        }
        return results;
    }

    // update event name
    updateName(newName) {
        if (!newName) return;
        this.name = newName;
    }

    // update event date
    updateDate(newDate) {
        if (!newDate) return;

        this.date = new Date(newDate);
    }

    // update event time
    updateTime(newTime) {
        if (!newTime) return;
        // needs consideration of passed-in format
        // ie make sure its in UTC 
        this.time = newTime;
    }

    // update event category labels
    updateCategory(newCategory) {
        if (!newCategory) return;

        this.category = newCategory;

    }

    // update event location
    updateLocation(newLocation) {
        if (!newLocation) return;
        this.location = newLocation;
    }

    // update event details/description
    updateDetails(newDetails) {
        if (!newDetails) return;
        this.details = newDetails;
    }

}

class User {
    static all = [];
    static _nextId = 200;

    constructor(name) {
        this.id = User._nextId++;
        this.name = name;
        // for now just using Set, to store event ids
        // should not store event objects itself
        this.favorites = new Set();

        // later features: password + permission levels

        // keep track of all created instances
        User.all.push(this);
    }

    updateName(newName) {
        if (!newName) return;
        this.name = newName;
    }

    // Add/removes an event from user.favorites
    updateFavorites(eventID) {
        // remove event from favorites
        if (this.favorites.has(eventID)) {
            this.favorites.delete(eventID);
        } else {
            // add event to favorites
            this.favorites.add(eventID);
        }
    }

}

// JASMINE TESTING
if (typeof module !== 'undefined') {
    module.exports = { Eventonica, User, Event };
}

// COMMENT OUT BEFORE JASMINE TESTS
// Example events + users for now

new Event('Virtual Guided Meditation');
new Event('Outside Yoga Lesson');
new Event('Drawing Workshop', '2021-02-21', '', 'Workshop');
new Event('Twitter Security 101', '2021-3-1', "1:00pm", "Seminar");


new User('Avery');
new User('Mark');
new User('Tanya');
new User('Cool-Beans');
