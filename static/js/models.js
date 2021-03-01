
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

    // Update existing Event
    updateEvent(eventID, name = '', date = '', time = '', category = '', location = '', details = '') {
        let eventIdx = this.indexLookup(Event.all, eventID);

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
    }

    // Deletes Event
    deleteEvent(eventID) {
        let eventIdx = this.indexLookup(Event.all, eventID)

        // if event correctly found
        if (eventIdx >= 0) {
            Event.all.splice(eventIdx, 1);
        } else {
            // some error message here
        }
    }

    // Return items in Event.all with a specified date
    findEventsByDate(findDate) {
        // TO-DO: ensure findDate's format
        return Event.findByDate(findDate);
    }

    findEventsByCategory(findCategory) {
        // Return items in Event.all with a specified category
        return Event.findByCategory(findCategory);
    }

    // Add new User
    addUser(name) {
        return new User(name);
    }

    // Update existing User
    updateUser(userID, name = '') {
        let userIdx = this.indexLookup(User.all, userID);

        // User not found
        if (userIdx < 0) return;

        if (name) {
            User.all[userIdx].updateName(name);
        }
    }

    // Deletes User
    deleteUser(userID) {
        let userIdx = this.indexLookup(User.all, userID);

        // if user correctly found
        if (userIdx >= 0) {
            User.all.splice(userIdx, 1);
        } else {
            // some error message here
        }
    }

    // Handles adding/removing favorites
    // eventIDs = array of ids
    updateUserFavorites(eventIDs) {
        // for now make it just single variable

        if (this.currentUser && eventIDs) {
            this.currentUser.updateFavorites(eventIDs);
        }
    }

    // returns a user object based on a userID
    setCurrentUser(userID) {
        let userIdx = this.indexLookup(User.all, userID);

        if (userIdx >= 0) {
            this.currentUser = User.all[userIdx];
        }
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
        this.category = new Set().add(category);
        this.location = location;
        this.details = details;
        this.faveCount = 0;

        // if actual date string passed in
        if (this.date) this.date = new Date(date);

        Event.all.push(this);
        // keep track of all created instances
    }

    static findByDate(searchDate) {
        let results = []
        // Assuming same timezone for now
        for (let event of Event.all) {
            if (event.date.valueOf() == searchDate.valueOf()) {
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
        if (this.category.has(newCategory)) {
            this.category.delete(newCategory);
        } else {
            this.category.add(newCategory);
        }
        
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
new Event('Drawing Workshop', '2021-02-21');
new Event('Twitter Security 101', '2021-3-1', "1:00pm","Seminar");


new User('Avery');
new User('Mark');
new User('Tanya');
new User('Cool-Beans');