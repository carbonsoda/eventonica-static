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
        // assume just one category for now
        output += ` (${eventObj.category})`;
    }
    if (eventObj.date) {
        // convert from string to date to formatted dateString
        const date = new Date(eventObj.date);
        output += ` — ${date.toDateString()}`;
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

allObjs = either all events or all users
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
    function refreshEventsList() {
        fetch('/events')
            .then(response => response.json())
            .then(allEventData => {
                // Formatting
                let newEventHtml = allEventData.map(
                    (event) => `<li 
                    value="${event.id}">
                    ${eventListOutput(event)}
                    </li>`
                ).join("\n");

                // No events exist yet
                if (allEventData.length < 1) {
                    newEventHtml = "No events planned yet";
                } else {
                    // also refresh all event select menus
                    setSelectOptions(".event-select", allEventData, "an event");
                }
                eventsList.innerHTML = newEventHtml;
            });
    }

    // Builds HTML list for all users.
    // Call after update, add, or remove a user
    function refreshUserList() {
        fetch('/users')
            .then(response => response.json())
            .then(allUsers => {
                // Formatting
                let userListHtml = allUsers.map(
                    (user) => `<li> ${user.name} </li>`
                ).join("\n");

                // No users exist yet
                if (allUsers.length < 1) {
                    usersListHTML = "No users registered yet";
                } else {
                    // also refresh all user select menus
                    setSelectOptions(".user-select", allUsers, "a user");
                }
                // set users-list to display the new html
                usersList.innerHTML = userListHtml;
            });
    };

    // Loading page for first time
    refreshEventsList();
    refreshUserList();

    // Initialize category select-menu
    // TODO: update to do fetch 
    setSelectOptions(
        ".category-select",
        Event.categories,
        "a category",
        isCategory = true
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

        // only name is required
        // time is disabled for now
        let data = {
            "name": parseInput("#add-event-name"),
            "details": {
                "date": parseInput("#add-event-date"),
                "time": '',
                "category": parseSelect("#add-event-category")
            }
        }

        fetch('/events',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.status == 201) {
                    refreshEventsList();
                    addEventForm.reset();
                }
            });
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

    addUserForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        const name = parseInput("#add-user-name");

        if (name) {
            let data = {
                "name": name
            }

            fetch('/users',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    if (response.status == 201) {
                        refreshUserList();
                        addUserForm.reset();
                    }
                });
        }


    })

    // REMOVE USER
    removeUserForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        // Which user
        const userID = parseSelect("#delete-user-id");

        if (userID) {
            const userUrl = `/users/${userID}`;

            fetch(userUrl, { method: 'DELETE' })
                .then((response) => {
                    if (response.status == 200) {
                        refreshUserList();
                        removeUserForm.reset();
                    }
                })
        }
    });

    // UPDATE USER
    updateUserForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        // Which user
        const userID = parseSelect("#update-user-id");
        const userNewName = document.querySelector("#update-user-name").value;

        if (userID && userNewName) {
            const userUrl = `/users/${userID}`;
            let data = {
                "name": userNewName
            }

            fetch(userUrl,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    if (response.status == 200) {
                        refreshUserList();
                        updateUserForm.reset();
                    }
                });
        }
    });

    // CHANGE CURRENT USER
    currentUserForm.addEventListener("submit", (submitEvent) => {
        submitEvent.preventDefault();
        // Which user
        const userID = parseSelect("#current-user-select");

        if (userID) {
            const userUrl = `/current-user/${userID}`;

            // Not sure if need to add a GET call for the user
            // because if no user found, response.json() throws error
            fetch(userUrl, { method: 'PUT' })
                .then((response) => response.json())
                .then((user) => {
                    document.querySelector(
                        "#display-current-user"
                    ).innerHTML += user.name;
                    currentUserForm.reset();
                });
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
                setSelectOptions(".event-select", app.getAllEvents(), "an event");
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
