/**
 * Add all your DOM event handlers and other UI code in this file.
 */

 /**
  * HELPER FUNCTIONS
  * To make the DOMContentLoaded section easier to read
  * + make formatting easier to manage
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

/**
 * MAIN
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
                ${eventOutputFormat(event)}
                </li>`
                ).join("\n");
        if (Event.all.length < 1) {
            document.querySelector("#events-list").
                innerHTML = 'No events planned yet';
        } else {
            // also refresh all users select-dropdowns
            setSelectOptions('.event-select', Event.all, 'an event');
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


    /** EVENTLISTENER HANDLERS
     * 
     * Handles User/Event form submits by calling our instance of Eventonica, `app`
     */

    // handles generic input
    const defaultHandler = (submitEvent, eventAction, eventSelector, logMsg, ...otherChanges) => {
        submitEvent.preventDefault();
        // nameID == either a user/event name or ID
        const nameID = document.querySelector(eventSelector).value;
        if (nameID) {
            const itemChanged = app[eventAction](nameID, ...otherChanges);
            console.log(logMsg, itemChanged, nameID);
            // true = refresh list
            return true;
        }
    };

    // handles select menu inputs
    function selectHandler(submitEvent, appAction, selectorTag, logMsg) {
        submitEvent.preventDefault();
        const selectItems = document.querySelector(selectorTag);
        const item = selectItems.options[selectItems.selectedIndex];

        if (item.value) {
            app[appAction](item.value);
            console.log(logMsg, item.value);
            // true = refresh list
            return true;
        }
    }

    /** 
     * EVENT ELEMENTS
     */
    
    // EVENT-RELATED FORMS
    const addEventForm = document.querySelector("#add-event");
    const removeEventForm = document.querySelector('#delete-event')

    // EVENT FORM'S EVENT LISTENERS
    addEventForm.addEventListener('submit', (submitEvent) => {
        let eventDate = document.querySelector('#add-event-date').value;

        defaultHandler(submitEvent, 'addEvent', "#add-event-name", 'Added event', eventDate);
        refreshEventsList();
        addEventForm.reset();
    });

    removeEventForm.addEventListener('submit', (submitEvent) => {
        selectHandler(submitEvent, 'deleteEvent', "#delete-event-id", 'Deleted event');
        refreshEventsList();
        addEventForm.reset();
    });

    /**
     * USER ELEMENTS
     */

    // USER-RELATED FORMS
    const addUserForm = document.querySelector('#add-user');
    const removeUserForm = document.querySelector('#delete-user');
    const updateUserForm = document.querySelector('#update-user');
    const currentUserForm = document.querySelector('#set-current-user');

    // USER FORM'S EVENT LISTENERS
    addUserForm.addEventListener('submit', (submitEvent) => {
        let newAdded = defaultHandler(submitEvent, 'addUser', '#add-user-name', 'Added user ');

        if (newAdded) {
            refreshUserList();
            addUserForm.reset();
        }
    });

    // REMOVE USER
    removeUserForm.addEventListener('submit', (submitEvent) => {
        let deleted = selectHandler(submitEvent, 'deleteUser', '#delete-user-id', 'Deleted user');
        
        if(deleted) refreshUserList();
    });

    // UPDATE USER
    updateUserForm.addEventListener('submit', (submitEvent) => {
        const userNewName = document.querySelector('#update-user-name').value;

        let updated = defaultHandler(submitEvent, 'updateUser', '#update-user-id', 'User updated', 'name', userNewName);
        
        if (updated) {
            refreshUserList();
            updateUserForm.reset();
        }
    });

    // CHANGE CURRENT USER
    currentUserForm.addEventListener('submit', (submitEvent) => {

        let newCurrent = selectHandler(submitEvent, 'setCurrentUser', '#current-user-select', 'Current user now');
        
        if (newCurrent && app.currentUser) {
            document.querySelector('#display-current-user').innerHTML += `${app.currentUser.name}`;
        }
    });

});