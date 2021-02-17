// TO-DO: determine how users+events will be accessed/looked up
// Looking up in the array doesn't seem like best idea right now

class Eventonica {

    addEvent(name, date, time = '', category = '', location = '', details = '') {
        let newEvent = new Event(name, date, time, category, location, details);
        // some sort of success message?
    }

    // Update existing Event
    updateEvent(updateProperty, eventID, ...changes) {
        // Use a switch case with updateProperty to call appropriate func
        switch (updateProperty) {
            case 'name':
                break;
            case 'date':
                break;
            case 'time':
                break;
            case 'category':
                break;
            case 'location':
                break;
            case 'details':
                break;
        }
    }

    deleteEvent(event) {
        // Deletes Event
    }

    findEventsByDate(findDate) {
        // Return items in Event.all with a specified date
    }

    findEventsbyCategory(findCategory) {
        // Return items in Event.all with a specified category
    }

    // Add new User
    addUser(name) {
        let newUser = new User(name);
        return `User #${newUser.id} ${newUser.name} registered.`;
    }

    // Update existing User
    updateUser(userID, updateProperty, ...changes) {
        switch (updateProperty) {
            case "name":
                User.all[userID - 200].updateName(...changes);
                break;
            case "favorites":
                User.all[userID - 200].updateFavorites(...changes);
                break;
            default:
                break;
        }
    }

    // Deletes User
    deleteUser(userID) {
        let deleteID;
        for (let user of User.all) {
            if (user.id == userID) {
                deleteID = user.id;
                break;
            }
        }
        if (deleteID) {
            User.all[userID - 200] = null;
        }
    }
}

class Event {
    static all = [];
    static _nextId = 100;

    constructor(name, date, time, category, location, details) {
        this.id = Event._nextId++;
        this.name = name;
        this.date = new Date(date);
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

        // TODO: Consider when to format search-term
        for (let event in all) {
            if (event.category.has(searchCategory)) {
                results.add(event);
            }
        }

        return results;
    }

    // Update event name
    updateName(newName) {
        this.name = newName;
    }
    
    // update event date
    updateDate(newDate) {
        this.date = new Date(newDate);
    }

    // update event time
    updateTime(newTime) {
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
        this.location = newLocation;
    }

    // update event details/description
    updateDetails(newDetails) {
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
        // not sure if this is ideal hashmap though
        // should not store event objects itself
        this.favorites = new Set();

        // later features: password + permission levels
        
        User.all.push(this); // keep track of all created instances
    }

    updateName(newName) {
        this.name = newName;
    }
    
    updateFavorites(eventID) {
        if (this.favorites.has(eventID)) {
            this.favorites.delete(eventID);
        } else {
            this.favorites.add(eventID);
        }
    }

}