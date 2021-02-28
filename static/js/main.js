/**
 * Add all your DOM event handlers and other UI code in this file.
 */

 /**
  * HELPER FUNCTIONS
  * To make the DOMContentLoaded section easier to read
  * + make formatting easier to manage
  */

const whiteStar = '\u2606';
const blackStar = '\u2605';

function toggleFave(selectorTag) {
    let eventID = document.querySelector('selectorTag')
}

/**
 * STYLING SPECIFIC
 */

function eventOutputFormat(eventObj) {
    let output = `${eventObj.name}`;

    if (eventObj.date) {
        output += ` — ${eventObj.date.toDateString()}`;
    }
    return output;
}


// Sets dropdown options for either users or events
function setSelectOptions(selectObjTag, allObjs, defaultOption) {
    // all relevant select-input elements
    const selectOptionsAll = document.querySelectorAll(selectObjTag);

    // formatted options to be inserted in each element
    const htmlDropdown = optionsFormat(allObjs, defaultOption);

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
function optionsFormat(allObjs, defaultOption) {
    let htmlSelect = `<option value="">----Pick ${defaultOption}-----</option>`;

    htmlSelect += allObjs.map((obj) =>
        `<option value=${obj.id}> ${obj.name} (id: ${obj.id}) </option>`
    ).join('\n');

    return htmlSelect;
}


/**
 * MAIN FUNCTIONS
 */
document.addEventListener("DOMContentLoaded", () => {
    const app = new Eventonica();

    // Builds HTML list for all events
    // Call after update, add, or remove an event
    const refreshEventsList = () => {
        let eventsListHTML = Event.all.map((event) =>
                `<li>
                <button class="fave-event" value="${event.id}"> ${blackStar} </button>
                ${eventOutputFormat(event)}
                </li>`
        ).join("\n");
        
        if (Event.all.length < 1) {
            eventsListHTML = 'No events planned yet';
        } else {
            // also refresh all users select-dropdowns
            setSelectOptions('.event-select', Event.all, 'an event');
        }
        document.querySelector("#events-list").
            innerHTML = eventsListHTML;
    };

    // Builds HTML list for all users.
    // Call after update, add, or remove a user
    const refreshUserList = () => {
        
        let usersListHTML = User.all.map((user) =>
                `<li>
                ${user.name}  <small>(id: ${user.id})</small>
                </li>`
            ).join('\n');

        if (User.all.length < 1) {
            usersListHTML = 'No users registered yet';
        } else {
            // also refresh all users-select dropdowns
            setSelectOptions('.user-select', User.all, 'a user');
        }
        // set the users-list's html to usersListHTML
        document.querySelector('#users-list').innerHTML = usersListHTML;
    };

    // Loading page for first time
    refreshEventsList();
    refreshUserList();


    /** 
     * 
     * INPUT HANDLING
     * 
     */

    //  Handles User/Event form submits by calling our instance of Eventonica, 'app'
    function defaultHandler(whichAction, logMsg, elementID, ...changes) {
        // an ID of an event, or user
        // unless adding event/user, then its a name
        if (elementID) {
            // pass in the ID + any other parameters as needed (all other changes)

            const itemChanged = app[whichAction](elementID, ...changes);
            
            console.log(logMsg, elementID, itemChanged);
            // true = refresh list of events/users
            return true;
        }
    }

    // Handles string/value inputs
    function parseInput(elementTag) {
        let item = document.querySelector(elementTag);

        if (!item) {
            return '';
        }
        return item.value;
    }

    // Handles select-menu input/chosen option
    function parseSelect(elementTag) {
        const selectItems = document.querySelector(elementTag);
        const item = selectItems.options[selectItems.selectedIndex];

        if (!item.value) {
            return '';
        }

        return item.value;
    }

    /** 
     * EVENT ELEMENTS
     */
    
    // EVENT-RELATED FORMS
    const addEventForm = document.querySelector("#add-event");
    const removeEventForm = document.querySelector('#delete-event');
    const faveEventForm = document.querySelector('#fave-event');
    const updateEventForm = document.querySelector('#update-event');

    // EVENT-LIST
    let eventsList = document.querySelector('#events-list');


    // EVENT FORM'S EVENT LISTENERS
    addEventForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        // required
        let name = parseInput('#add-event-name');

        // optional
        let date = parseInput('#add-event-date');
        let time = parseInput('#add-event-time');
        let category = parseSelect('#add-event-category');

        // submit request
        defaultHandler(submitEvent, 'addEvent', 'Added event', name, date, time, category);

        refreshEventsList();
        addEventForm.reset();
    });

    updateEventForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        // required
        let eventID = parseInput('#update-event-id');

        // optional
        let name = parseInput('#update-event-name')
        let date = parseInput('#update-event-date');
        let time = parseInput('#update-event-time');
        let category = parseSelect('#update-event-category');

        // submit request
        defaultHandler(submitEvent,
            'updateEvent', 'Updated event', eventID,
            name, date, time, category
        );

        refreshEventsList();
        addEventForm.reset();
    });

    removeEventForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        let eventID = parseInput('#delete-event-id');
        
        // submit request
        defaultHandler(submitEvent, 'deleteEvent', 'Deleted event', eventID);

        // refresh
        refreshEventsList();
    });

    faveEventForm.addEventListener('submit', (submitEvent) => {
        selectHandler(submitEvent, 'updateUserFavorites', "#fave-event-id", 'Favorite event added/removed');

        console.log(`${app.currentUser.name} favorites are ${[...app.currentUser.favorites].join(', ')}`);
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