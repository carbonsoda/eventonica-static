/**
 * Add all your DOM event handlers and other UI code in this file.
 */




document.addEventListener("DOMContentLoaded", () => {
    const app = new Eventonica();

    // Builds HTML list for all events
    // Call after update, add, or remove an event
    const refreshEventsList = () => {
        
        document.querySelector("#events-list").
        innerHTML = Event.all
            .map((event) =>
                `<li>
                ${event.name} (id: ${event.id})
                </li>`
            ).join("\n");
        if (Event.all.length < 1) {
            document.querySelector("#events-list").
                innerHTML = 'No events planned yet';
        }
    };

    // Builds HTML list for all users.
    // Call after update, add, or remove a user
    const refreshUserList = () => {
        document.querySelector("#users-list").innerHTML = User.all
            .map((user) =>
                `<li>
                ${user.name}  <small>(id: ${user.id})</small>
                </li>`
        ).join("\n");
        
        if (User.all.length < 1) {
            document.querySelector("#users-list").
                innerHTML = 'No users registered yet';
        }
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
            const event = app[eventAction](nameID);
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
    const userHandle = (submitEvent, userAction, nameSelector, logMsg, ...otherChanges) => {
        submitEvent.preventDefault();
        // nameID == entered value, either a User's name or ID
        const nameID = document.querySelector(nameSelector).value;
        if (nameID) {
            app[userAction](nameID, ...otherChanges);
            console.log(logMsg);
            refreshUserList();
        }
    };

    // USER FIELDS
    const addUserForm = document.querySelector('#add-user');
    const removeUserForm = document.querySelector('#delete-user');
    const updateUserForm = document.querySelector('#update-user');

    // USER FORM'S EVENT LISTENERS
    addUserForm.addEventListener('submit', (submitEvent) => {
        userHandle(submitEvent, 'addUser', '#add-user-name', 'Added user ');
        addUserForm.reset();
    });

    removeUserForm.addEventListener('submit', (submitEvent) => {
        userHandle(submitEvent, 'deleteUser', "#delete-user-id", 'Removed user ');
        removeUserForm.reset();
    });

    updateUserForm.addEventListener('submit', (submitEvent) => {
        const userNewName = document.querySelector('#update-user-name').value;

        userHandle(submitEvent, 'updateUser', '#update-user-id', 'User updated', 'name', userNewName);
        updateUserForm.reset();
    });
});