
/** 
 * EVENT ELEMENTS
 */

let eventsList = document.querySelector('#events-list');

// FORMS
const addEventForm = document.querySelector("#add-event");
const removeEventForm = document.querySelector('#delete-event');
const faveEventForm = document.querySelector('#fave-event');
const updateEventForm = document.querySelector('#update-event');

/**
 * USER ELEMENTS
 */

let usersList = document.querySelector('#users-list');

// FORMS
const currentUserForm = document.querySelector('#set-current-user');
const addUserForm = document.querySelector('#add-user');
const removeUserForm = document.querySelector('#delete-user');
const updateUserForm = document.querySelector('#update-user');



/**
 * GENERAL STYLING
 * 
 * - Elements
 * - Functions
 */

const whiteStar = '\u2606';
const blackStar = '\u2605';

function toggleFave(selectorTag) {
    let eventID = document.querySelector(selectorTag);
}



/**
 * RESPONSE-RESULTS STYLING
 */

function eventOutputFormat(eventObj) {
    let output = `${eventObj.name}`;

    if (eventObj.date) {
        output += ` — ${eventObj.date.toDateString()}`;
    }
    return output;
}

// Sets dropdown options for either users or events
function setSelectOptions(selectObjTag, allObjs, defaultOption, isCategory = false) {
    // all relevant select-input elements
    const selectOptionsAll = document.querySelectorAll(selectObjTag);

    // formatted options to be inserted in each element
    const htmlDropdown = optionsFormat(allObjs, defaultOption, isCategory);

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
function optionsFormat(allObjs, defaultOption, isCategory) {
    let htmlSelect = `<option value="">----Pick ${defaultOption}-----</option>`;

    if (isCategory) {
        htmlSelect += allObjs.map((category) => `<option value='${category}'> ${category} </option>`
        ).join('\n');
    } else {
        htmlSelect += allObjs.map((obj) =>
            `<option value=${obj.id}> ${obj.name} (id: ${obj.id}) </option>`
        ).join('\n');
    }

    return htmlSelect;
}


/**
 * MAIN FUNCTIONS
 * 
 * - UI Updates
 * - Input(s) Parsing 
 * - Submit request handling
 * - EventListeners
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
            // also refresh all event select menus
            setSelectOptions('.event-select', Event.all, 'an event');
        }

        // set event-list to display the new html
        eventsList.innerHTML = eventsListHTML;
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
            // also refresh all user select menus
            setSelectOptions('.user-select', User.all, 'a user');
        }
        // set users-list to display the new html
        usersList.innerHTML = usersListHTML;
    };

    // Loading page for first time
    refreshEventsList();
    refreshUserList();

    setSelectOptions('.category-select', Event.categories, 'a category', isCategory=true);


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
     * EVENT RELATED
     * EVENTLISTENERS
     */

    // ADD EVENT
    addEventForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        // required
        let name = parseInput('#add-event-name');

        // optional
        let date = parseInput('#add-event-date');
        let time = parseInput('#add-event-time');
        let category = parseSelect('#add-event-category');

        // submit request
        defaultHandler('addEvent', 'Added event', name, date, time, category);

        refreshEventsList();
        addEventForm.reset();
    });

    // UPDATE EVENT
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

    // DELETE EVENT
    removeEventForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        let eventID = parseInput('#delete-event-id');

        // submit request
        defaultHandler('deleteEvent', 'Deleted event', eventID);

        // refresh
        refreshEventsList();
    });

    // FAVORITE/UNFAVORITE EVENT

    faveEventForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();

        if (app.currentUser) {
            let eventID = parseSelect('#fave-event-id');

            defaultHandler('updateUserFavorites', 'Favorite event added/removed', eventID);

            console.log(`${app.currentUser.name} favorites are ${[...app.currentUser.favorites].join(', ')}`);
        }
        
    });


    /**
     * USER RELATED
     * EVENTLISTENERS
     */

    // USER FORM'S EVENT LISTENERS
    addUserForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        let name = parseInput('#add-user-name');
        
        // Attempt add
        let newAdded = defaultHandler('addUser', 'Added user ', name);

        if (newAdded) {
            refreshUserList();
            addUserForm.reset();
        }
    });

    // REMOVE USER
    removeUserForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        // Which user
        let userID = parseSelect('#delete-user-id');

        // Attempt delete
        let deleted = defaultHandler('deleteUser', 'Deleted user', userID);

        if (deleted) {
            refreshUserList();
            removeUserForm.reset();
        };
    });

    // UPDATE USER
    updateUserForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        // Which user
        const userID = parseSelect('#update-user-id');
        const userNewName = document.querySelector('#update-user-name').value;

        // Attempt update
        let updated = defaultHandler('updateUser', 'User updated', userID, userNewName);

        if (updated) {
            refreshUserList();
            updateUserForm.reset();
        }
    });

    // CHANGE CURRENT USER
    currentUserForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();
        // Which user
        const userID = parseSelect('#current-user-select');

        // Attempt switch current user
        let newCurrent = defaultHandler('setCurrentUser', 'Current user is now ', userID);

        if (newCurrent && app.currentUser) {
            document.querySelector('#display-current-user').innerHTML += `${app.currentUser.name}`;

            currentUserForm.reset();
        }
    });

});