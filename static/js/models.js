
class Eventonica {

    // Add event
    // Name is required
    addEvent(name, ...moreDetails) {
        return new Event(name, ...moreDetails);
    }

    // Update existing Event
    updateEvent(eventID, updateProperty, ...changes) {
        let eventIdx = indexLookup(Event.all, eventID);

        // Use a switch case with updateProperty to call appropriate func
        switch (updateProperty) {
            case 'name':
                Event.all[eventIdx].updateName(...changes);
                break;
            case 'date':
                Event.all[eventIdx].updateDate(...changes);
                break;
            case 'time':
                Event.all[eventIdx].updateTime(...changes);
                break;
            case 'category':
                Event.all[eventIdx].updateCategory(...changes);
                break;
            case 'location':
                Event.all[eventIdx].updateLocation(...changes);
                break;
            case 'details':
                Event.all[eventIdx].updateDetails(...changes);
                break;
        }
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
    updateUser(userID, updateProperty, ...changes) {
        let userIdx = indexLookup(userID);

        // User not found
        if (userIdx < 0) return;

        switch (updateProperty) {
            case "name":
                User.all[userIdx].updateName(...changes);
                break;
            case "favorites":
                User.all[userIdx].updateFavorites(...changes);
                break;
            default:
                break;
        }
    }

    // Deletes User
    deleteUser(userID) {
        let userIdx = indexLookup(User.all, userID);

        // if user correctly found
        if (userIdx >= 0) {
            User.all.splice(userIdx, 1);
        } else {
            // some error message here
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

    // empty values for now
    constructor(name, date = '', time = '', category = '', location = '', details = '') {
        this.id = Event._nextId++;
        this.name = name;
        this.date = date; // should be Date object
        this.time = time; // could be all day too
        this.category = new Set().add(category);
        this.location = location;
        this.details = details;

        Event.all.push(this); // keep track of all created instances
    }

    static findByDate(searchDate) {
        let results = []

        // Assuming same timezone for now
        // Need to make sure date only includes date, not time
        // ie set time to 00:00:00.00
        for (let event in all) {
            if (event.date.valueOf() == searchDate.valueOf()) {
                results.add(event);
            }
        }

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
        if (newName.length < 1) return;
        this.name = newName;
    }

    // update event date
    // typeof(newDate) == Date object
    updateDate(newDate) {
        this.date = newDate;
    }

    // update event time
    updateTime(newTime) {
        if (newTime.length < 1) return;
        // needs consideration of passed-in format
        // ie make sure its in UTC 
        this.time = newTime;
    }

    // update event category labels
    updateCategory(newCategory) {

        this.category.add(newCategory);
    }

    // update event location
    updateLocation(newLocation) {
        if (newLocation.length < 1) return;
        this.location = newLocation;
    }

    // update event details/description
    updateDetails(newDetails) {
        if (newDetails.length < 1) return;
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
        if (newName.length > 0) {
            this.name = newName;
        }
        
    }

    updateFavorites(eventID) {
        if (this.favorites.has(eventID)) {
            this.favorites.delete(eventID);
        } else {
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

// new Event('Virtual Guided Meditation');
// new Event('Outside Yoga Lesson');


// new User('Avery');
// new User('Mark');
// new User('Tanya');
// new User('Cool-Beans');