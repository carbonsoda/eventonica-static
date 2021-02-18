/**
 * Add all your DOM event handlers and other UI code in this file.
 */


document.addEventListener("DOMContentLoaded", () => {
    const app = new Eventonica();

    // Builds HTML list for all events
    // Call after update, add, or remove an event
    const refreshEventsList = () => {
        document.querySelector("#events-list").innerHTML = Event.all
            .map((event) => `<li>${event.name}</li>`)
            .join("\n");
    };

    // Builds HTML list for all users.
    // Call after update, add, or remove a user
    const refreshUserList = () => {
        document.querySelector("#users-list").innerHTML = User.all
            .map((user) => `<li>${user.name}</li>`)
            .join("\n");
    };

    // Loading page for first time
    refreshEventsList();
    refreshUserList();

    // Handle EVENT form submit by calling our instance of Eventonica, `app`
    const eventHandle = (submitEvent, eventAction, eventSelector, logMsg) => {
        submitEvent.preventDefault();
        // nameID == entered value, either an event name or event ID
        const nameID = document.querySelector(eventSelector).value;
        if (nameID) {
            const event = app[eventAction](eventID);
            console.log(logMsg, event);
            refreshEventsList();
        }
    };

    // EVENT ACTIONS
    const addEventForm = document.querySelector("#add-event");
    const removeEventForm = document.querySelector('#delete-event')

    // EVENT FORM'S EVENT LISTENERS
    addEventForm.addEventListener('submit', (submitEvent) => {
        eventHandle(submitEvent, 'addEvent', "#add-event-name", 'Added event');
        addEventForm.reset();
    });

    removeEventForm.addEventListener('submit', (submitEvent) => {
        eventHandle(submitEvent, 'deleteEvent', "#delete-event-id", 'Deleted event');
        addEventForm.reset();
    });


    // Handle USER form submit by calling our instance of Eventonica, `app`
    const userHandle = (submitEvent, userAction, nameSelector, logMsg) => {
        submitEvent.preventDefault();
        // nameID == entered value, either a User's name or ID
        const nameID = document.querySelector(nameSelector).value;
        if (nameID) {
            const user = app[userAction](nameID);
            console.log(logMsg, user);
            refreshUserList();
        }
    };

    // USER FIELDS
    const addUserForm = document.querySelector('#add-user');
    const removeUserForm = document.querySelector('#delete-user');

    // USER FORM'S EVENT LISTENERS
    addUserForm.addEventListener('submit', (submitEvent) => {
        userHandle(submitEvent,'addUser', "#add-user-name", 'Added user ');
        addUserForm.reset();
    });

    removeUserForm.addEventListener('submit', (submitEvent) => {
        userHandle(submitEvent, 'deleteUser', "#delete-user-id", 'Removed user ');
        removeUserForm.reset();
    });
});