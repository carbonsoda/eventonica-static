/**
 * Add all your DOM event handlers and other UI code in this file.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Use this to call all the logic we already created
    const app = new Eventonica();

    // Builds HTML list for all event. You must call this function after you
    // change, add, or remove any events.
    const refreshEventsList = () => {
        document.querySelector("#events-list").innerHTML = Event.all
            .map((event) => `<li>${event.name}</li>`)
            .join("\n");
    };

    // Builds HTML list for all users. You must call this function after you
    // change, add, or remove any events.
    const refreshUserList = () => {
        document.querySelector("#users-list").innerHTML = User.all
            .map((user) => `<li>${user.name}</li>`)
            .join("\n");
    };

    // Set to load when page loads first time
    refreshEventsList();
    refreshUserList();
    

    const addEventForm = document.querySelector("#add-event");

    // Handle add event form submit by calling our instance of Eventonica, `app`
    addEventForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        const name = document.querySelector("#add-event-name").value;
        const event = app.addEvent(name);
        console.log("Added event ", event);
        refreshEventsList();
        addEventForm.reset();
    });


    const userEvent = (submitEvent, userAction, nameSelector, logMsg) => {
        submitEvent.preventDefault();
        const nameID = document.querySelector(nameSelector).value;
        if (nameID) {
            const user = userAction(nameID);
            console.log(logMsg, user);
            refreshUserList();
        }


    };

    const addUserForm = document.querySelector('#add-user');

    // Handle add user form submit by calling our instance of Eventonica, `app`
    addUserForm.addEventListener('submit', (submitEvent) => {
        userEvent(submitEvent, app.addUser, "#add-user-name", 'Added user ');
        addUserForm.reset();
    });

    const removeUserForm = document.querySelector('#delete-user');

    removeUserForm.addEventListener('submit', (submitEvent) => {
        userEvent(submitEvent, app.deleteUser, "#delete-user-id", 'Removed user ');
        removeUserForm.reset();
    });
});