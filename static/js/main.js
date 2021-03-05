/**
 * EVENT ELEMENTS
 */

let eventsList = document.querySelector(".events-list");

// FORMS
const addEventForm = document.querySelector("#add-event");
const updateEventForm = document.querySelector("#update-event");

const searchEventForm = document.querySelector('#search');

/**
 * USER ELEMENTS
 */

let usersList = document.querySelector("#users-list");

// FORMS
const currentUserForm = document.querySelector("#set-current-user");
const addUserForm = document.querySelector("#add-user");
const removeUserForm = document.querySelector("#delete-user");
const updateUserForm = document.querySelector("#update-user");


/**
 * EVENTS-LIST STYLING
 */

// let eventBtns(eventId, ariaLbl)
function eventListOutput(event) {
    let eventHtml = '';

    // favorites-button
    eventHtml += `<button 
    class="fave bi bi-heart"
    value="${event.id}"
    aria-label="Favorite Event">
        </button>`;

    // delete button
    eventHtml += `<button
    class="delete bi bi-trash"
    value="${event.id}"
    aria-label="Delete Event">
    </button>`;


    eventHtml += eventOutputFormat(event);
    return eventHtml;
}

// Returns string containing all event details
// TODO: ADD SUPPORT FOR OTHER DETAILS
function eventOutputFormat(eventObj) {
    let output = `${eventObj.name}`;

    if (eventObj.category) {
        let categories = [...eventObj.category].join(', ');
        if (categories) {
            // If a category is later added
            // The first element is empty in the set 
            // and there's a leading ', '
            if (categories[0] == ',') {
                categories = categories.slice(2);
            }
            output += ` (${categories})`;
        }
        
    }
    if (eventObj.date) {
        output += ` — ${eventObj.date.toDateString()}`;
    } 

    return output;
}

/**
 * MENU OPTIONS STYLING
 */

// Sets dropdown options for either users or events
function setSelectOptions(selectObjTag, allObjs, defaultOption, isCategory = false) {
    // all relevant select-input elements
    const selectOptionsAll = document.querySelectorAll(selectObjTag);

    // formatted options to be inserted in each element
    const htmlDropdown = selectFormat(allObjs, defaultOption, isCategory);

    // replace all instances of that select menu
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
function selectFormat(allObjs, defaultOption, isCategory) {
    let htmlSelect = `<option value="">----Pick ${defaultOption}-----</option>`;

    if (isCategory) {
        htmlSelect += allObjs
            .map((category) => `<option value='${category}'> ${category} </option>`)
            .join("\n");
    } else {
        htmlSelect += allObjs
            .map(
                (obj) =>
                    `<option value=${obj.id}> ${obj.name} (id: ${obj.id}) </option>`
            )
            .join("\n");
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
        let eventsListHTML = Event.all
            .map(
                (event) =>
                    `<li value="${event.id}">
                ${eventListOutput(event)}
                </li>`
            )
            .join("\n");

        if (Event.all.length < 1) {
            eventsListHTML = "No events planned yet";
        } else {
            // also refresh all event select menus
            setSelectOptions(".event-select", Event.all, "an event");
        }

        // set event-list to display the new html
        eventsList.innerHTML = eventsListHTML;
    };

    // Builds HTML list for all users.
    // Call after update, add, or remove a user
    const refreshUserList = () => {
        let usersListHTML = User.all
            .map(
                (user) =>
                    `<li>
                ${user.name}</small>
                </li>`
            )
            .join("\n");

        if (User.all.length < 1) {
            usersListHTML = "No users registered yet";
        } else {
            // also refresh all user select menus
            setSelectOptions(".user-select", User.all, "a user");
        }
        // set users-list to display the new html
        usersList.innerHTML = usersListHTML;
    };

    // Loading page for first time
    refreshEventsList();
    refreshUserList();

    // Initialize category select-menu
    setSelectOptions(
        ".category-select",
        Event.categories,
        "a category",
        (isCategory = true)
    );

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
            return "";
        }

        return item.value;
    }

    /**
     * EVENT FORMS'
     * EVENTLISTENERS
     */

    // ADD EVENT
    addEventForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        // required
        let name = parseInput("#add-event-name");

        // optional
        let date = parseInput("#add-event-date");
        // let time = parseInput("#add-event-time");
        let time = ''; // disabled
        let category = parseSelect("#add-event-category");

        // submit request
        defaultHandler("addEvent", "Added event", name, date, time, category);

        refreshEventsList();
        addEventForm.reset();
    });

    // UPDATE EVENT
    updateEventForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        // required
        let eventID = parseSelect("#update-event-id");

        // optional
        let name = parseInput("#update-event-name");
        let date = parseInput("#update-event-date");
        // let time = parseInput("#update-event-time");
        let time = ''; // disabled
        let category = parseSelect("#update-event-category");

        // submit request
        defaultHandler(
            "updateEvent",
            "Updated event",
            eventID,
            name,
            date,
            time,
            category
        );

        refreshEventsList();
        updateEventForm.reset();
    });


    /**
     * USER FORMS'
     * EVENTLISTENERS
     */

    // USER FORM'S EVENT LISTENERS
    addUserForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        let name = parseInput("#add-user-name");

        // Attempt add
        let newAdded = defaultHandler("addUser", "Added user ", name);

        if (newAdded) {
            refreshUserList();
            addUserForm.reset();
        }
    });

    // REMOVE USER
    removeUserForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        // Which user
        let userID = parseSelect("#delete-user-id");

        // Attempt delete
        let deleted = defaultHandler("deleteUser", "Deleted user", userID);

        if (deleted) {
            refreshUserList();
            removeUserForm.reset();
        }
    });

    // UPDATE USER
    updateUserForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        // Which user
        const userID = parseSelect("#update-user-id");
        const userNewName = document.querySelector("#update-user-name").value;

        // Attempt update
        let updated = defaultHandler(
            "updateUser",
            "User updated",
            userID,
            userNewName
        );

        if (updated) {
            refreshUserList();
            updateUserForm.reset();
        }
    });

    // CHANGE CURRENT USER
    currentUserForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        // Which user
        const userID = parseSelect("#current-user-select");

        // Attempt switch current user
        let newCurrent = defaultHandler(
            "setCurrentUser",
            "Current user is now ",
            userID
        );

        if (newCurrent && app.currentUser) {
            document.querySelector(
                "#display-current-user"
            ).innerHTML += `${app.currentUser.name}`;

            currentUserForm.reset();
        }
    });

    /**
     * EVENT BUTTONS
     * 
     * Source: Scott Marcus
     * https://stackoverflow.com/a/59506192
     */

    // Either delete or add event to favorites
    function eventListClick(event) {

        // Check if delete button was clicked
        if (event.target.classList.contains("delete")) {
            // Retrieve eventID stored in the button
            let eventID = event.target.closest("li").value;

            // Attempt delete
            let deleted = defaultHandler("deleteEvent", "Deleted event", eventID);

            // successful deletion
            if (deleted) {
                // Remove the closest li ancestor to the clicked element
                event.target.closest("li").remove();

                //refresh all event select menus
                setSelectOptions(".event-select", Event.all, "an event");
            }

        }
        // Check if fave button was clicked
        else if (event.target.classList.contains("fave")) {
            let eventID = event.target.closest("li").value;

            if (app.currentUser) {
                defaultHandler(
                    "updateUserFavorites",
                    "Favorite event added/removed",
                    eventID
                );

                console.log(
                    `${app.currentUser.name} favorites are 
                    ${[...app.currentUser.favorites].join(", ")}`
                );

                console.log(app.currentUser.favorites);
            }
        }
    }

    eventsList.addEventListener("click", eventListClick);


    function findEvents(submitEvent) {
        submitEvent.preventDefault();

        let date = parseInput('#date-search');
        let category = parseSelect('#category-search');

        let results = 'Nothing found';
        if (date) {
            results = app.findEventsByDate(date);
        } else if (category) {
            results = app.findEventsByCategory(category);
        }

        console.log(results);
    }

    searchEventForm.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault();

        let date = parseInput('#date-search');
        let category = parseSelect('#category-search');

        let results = 'aa';
        if (date) {
            results = app.findEventsByDate(date);
        } else if (category) {
            results = app.findEventsByCategory(category);
        }

        console.log(results);
    });

});
