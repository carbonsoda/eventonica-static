class Eventonica {

    addEvent(name, date, time = '', category = '', location = '', details = '') {
        // Adds a new Event
    }

    updateEvent(event) {
        // Update existing Event
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

    addUser(name) {
        // Adds a new User
    }

    updateUser() {
        // Update existing User
    }

    deleteUser() {
        // Deletes User
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
        this.category = category;
        this.location = location;
        this.details = details;

        Event.all.push(this); // keep track of all created instances
    }

    static findByDate() {
        return [];
    }

    static findByCategory() {
        return [];
    }

    // Update event name
    updateName(newName) { }
    
    // update event date
    updateDate(newDate) { }

    // update event time
    updateTime(newTime) { }
    
    // update event category labels
    updateCategory(newCategory) { }
    
    // update event location
    updateLocation(newLocation) { }

    // update event details/description
    updateDetails(newDetails) { }
    
}

class User {
    static all = [];
    static _nextId = 200;

    constructor(name) {
        this.id = User._nextId++;
        this.name = name;
        // for now just using array, to store event ids
        this.favorites = [];
        
        User.all.push(this); // keep track of all created instances
    }

    updateName(newName) {
        this.name = newName;
    }
    
    addFavorite(eventID) { }

    removeFavorite(eventID) { }

}