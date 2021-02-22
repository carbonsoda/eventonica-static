/**
 * Add all your DOM event handlers and other UI code in this file.
 */

function eventOutputFormat(eventObj) {
    let output = `${eventObj.name} (id: ${eventObj.id})`;

    if (eventObj.date) {
        output += ` on ${eventObj.date.toDateString()}`;
    }
    return output;
}


// Sets dropdown options for either users or events
function setSelectOptions(selectObjTag, allObjs, defaultOption) {
    // all relevant select-input elements
    const selectOptionsAll = document.querySelectorAll(selectObjTag);

    // formatted options to be inserted in each element
    const htmlDropdown = dropdownFormat(allObjs, defaultOption);

    for (let dropdown of selectOptionsAll) {
        dropdown.innerHTML = htmlDropdown;
    }
}

/*
returns string of all <options> for <select>
including all list of users or events

allObjs = either Event.all or User.all
defaultOptions = string, for "Pick ${defaultOption}"
*/
function dropdownFormat(allObjs, defaultOption) {
    let htmlSelect = `<option value="">----Pick ${defaultOption}-----</option>`;

    htmlSelect += allObjs.map((obj) =>
        `<option value=${obj.id}> ${obj.name} (id: ${obj.id}) </option>`
    ).join('\n');

    return htmlSelect;
}


document.addEventListener("DOMContentLoaded", () => {
    const app = new Eventonica();

    // Builds HTML list for all events
    // Call after update, add, or remove an event
    const refreshEventsList = () => {

        document.querySelector("#events-list").
            innerHTML = Event.all
                .map((event) =>
                    `<li>
                ${eventOutputFormat(event)}
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
            ).join('\n');

        if (User.all.length < 1) {
            document.querySelector("#users-list").
                innerHTML = 'No users registered yet';
        } else {
            // also refresh all users select-dropdowns
            setSelectOptions('.user-select', User.all, 'a user');
        }
    };

    // Loading page for first time
    refreshEventsList();
    refreshUserList();

    // Handle EVENT form submit by calling our instance of Eventonica, `app`
    const eventHandle = (submitEvent, eventAction, eventSelector, logMsg, ...otherChanges) => {
        submitEvent.preventDefault();
        // nameID == entered value, either an event name or event ID
        const nameID = document.querySelector(eventSelector).value;
        if (nameID) {
            const event = app[eventAction](nameID, ...otherChanges);
            console.log(logMsg, event);
            refreshEventsList();
        }
    };

    // EVENT ACTIONS
    const addEventForm = document.querySelector("#add-event");
    const removeEventForm = document.querySelector('#delete-event')

    // EVENT FORM'S EVENT LISTENERS
    addEventForm.addEventListener('submit', (submitEvent) => {
        let eventDate = document.querySelector('#add-event-date').value;

        eventHandle(submitEvent, 'addEvent', "#add-event-name", 'Added event', eventDate);
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
            const user = app[userAction](nameID, ...otherChanges);
            console.log(logMsg, user, nameID);
            refreshUserList();
        }
    };

    // USER FIELDS
    const addUserForm = document.querySelector('#add-user');
    const removeUserForm = document.querySelector('#delete-user');
    const updateUserForm = document.querySelector('#update-user');
    const currentUserForm = document.querySelector('#set-current-user');

    // USER FORM'S EVENT LISTENERS
    addUserForm.addEventListener('submit', (submitEvent) => {
        userHandle(submitEvent, 'addUser', '#add-user-name', 'Added user ');
        addUserForm.reset();
    });

    removeUserForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        const selectUsers = document.querySelector('#delete-user-id');
        let user = selectUsers.options[selectUsers.selectedIndex];

        if (user.value) {
            app.deleteUser(user.value);
            console.log('Deleted user', user.value);
            refreshUserList();
        }
    });

    updateUserForm.addEventListener('submit', (submitEvent) => {
        const userNewName = document.querySelector('#update-user-name').value;

        userHandle(submitEvent, 'updateUser', '#update-user-id', 'User updated', 'name', userNewName);
        updateUserForm.reset();
    });
    
    currentUserForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        const selectUsers = document.querySelector('#current-user-select');
        let user = selectUsers.options[selectUsers.selectedIndex];

        if (user.value) {
            app.setCurrentUser(user.value);
            if (app.currentUser) {
                document.querySelector('#display-current-user').innerHTML += `${app.currentUser.name}`;
            }
        }
    });

});