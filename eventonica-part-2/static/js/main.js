/**
 * Add all your DOM event handlers and other UI code in this file.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Use this to call all the logic we already created
    const app = new Eventonica();


    /** 
     * HTML LIST BUILDERS:
     * Call these functions after you change, add, or remove corresponding object
     */

    // Builds HTML list for all events. 
    const refreshEventsList = () => {
        document.querySelector("#events-list").innerHTML = Event.all
            .map((event) => `<li>${event.name}</li>`)
            .join("\n");
    };

    // Builds HTML list for all users.
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
        const eventID = document.querySelector(eventSelector).value;
        if (eventID) {
            const event = eventAction(eventID);
            console.log(logMsg, event);
            refreshEventsList();
        }
    };

    // EVENT ACTIONS
    const addEventForm = document.querySelector("#add-event");

    addEventForm.addEventListener('submit', (submitEvent) => {
        eventHandle(submitEvent, app.addEvent, "#add-event-name", 'Added event');
        addEventForm.reset();
    });


    // Handle USER form submit by calling our instance of Eventonica, `app`
    const userHandle = (submitEvent, userAction, nameSelector, logMsg) => {
        submitEvent.preventDefault();
        const nameID = document.querySelector(nameSelector).value;
        if (nameID) {
            const user = userAction(nameID);
            console.log(logMsg, user);
            refreshUserList();
        }


    };

    // USER FIELDS
    const addUserForm = document.querySelector('#add-user');
    const removeUserForm = document.querySelector('#delete-user');

    addUserForm.addEventListener('submit', (submitEvent) => {
        userHandle(submitEvent, app.addUser, "#add-user-name", 'Added user ');
        addUserForm.reset();
    });

    removeUserForm.addEventListener('submit', (submitEvent) => {
        userHandle(submitEvent, app.deleteUser, "#delete-user-id", 'Removed user ');
        removeUserForm.reset();
    });
});