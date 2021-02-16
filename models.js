class Eventonica {
    addEvent(/* arguments you decide go here */) {
        // Adds a new Event
    }

    updateEvent() {
        // Update existing Event
    }

    deleteEvent() {
        // Deletes Event
    }

    findEventsByDate() {
        // Return items in Event.all with a specified date
    }

    findEventsbyCategory() {
        // Return items in Event.all with a specified category
    }

    addUser() {
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

    constructor() {
        this.id = Event._nextId++;
        // decide what properties are required
        Event.all.push(this); // keep track of all created instances
    }

    static findByDate() {
        return [];
    }

    static findByCategory() {
        return [];
    }
}

class User {
    static all = [];
    static _nextId = 200;

    constructor() {
        this.id = User._nextId++;
        // decide what properties are required on an instance
        User.all.push(this); // keep track of all created instances
    }
}