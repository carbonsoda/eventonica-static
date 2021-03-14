
const express = require('express');
const bodyParser = require('body-parser');
const { Eventonica, User, Event } = require('./static/js/models');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});


const eventonica = new Eventonica();

/**
 * EVENT ROUTES
 */

app.route('/events')
    .get((req, res) => {
        res.send(eventonica.getAllEvents());
    })
    .post((req, res) => {
        let eventName = req.body.name;
        let status = 200;
        let response = `Event ${eventName} could not be added`;

        if (eventName) {
            // name is required
            // all other info kept in 'details'
            eventonica.addEvent(
                eventName,
                ...Object.values(req.body.details)
            );

            // compare last element
            if (eventonica.getAllEvents().slice(-1)[0].name == eventName) {
                status = 201;
                response = `Event ${eventName} was successfully added`;
            }
        }

        res.status(status).send(response);
    })

app.route('/events/:id')
    .get((req, res) => {
        let eventId = req.params.id;
        let status = 404;
        let response = 'Unable to fetch data!';


        eventonica.getAllEvents().forEach((event) => {
            if (event.id == eventId) {
                status = 200;
                response = event;
            }
        })

        res.status(status).send(response);
    })
    // DELETE EVENT
    .delete((req, res) => {
        let eventId = req.params.id;
        let status = 404;
        let response = 'Unable to fetch data!';

        if (eventonica.deleteEvent(eventId)) {
            status = 204;
            response = 'Event successfully deleted';
        }

        res.status(status).send(response);
    })


/**
 * USER ROUTES
 */

app.route('/users')
    .get((req, res) => {
        res.send(eventonica.getAllUsers());
    })
    // ADD NEW USER
    .post((req, res) => {
        let userName = req.body.name;
        let status = 200;
        let response = `User "${userName}" could not be added`;

        if (userName) {
            eventonica.addUser(userName);

            // if name of the last added user == input name
            if (eventonica.getAllUsers().slice(-1)[0].name == userName) {
                status = 201;
                response = `User "${userName}" was added!`;
            }
        }

        res.status(status).send(response);
    })

app.route('/users/:id')
    .get((req, res) => {
        let userId = req.params.id;
        let status = 404;
        let response = 'Unable to fetch user!';

        eventonica.getAllUsers().forEach((user) => {
            if (user.id == userId) {
                status = 200;
                response = user;
            }
        })

        res.status(status).send(response);
    })
    // UPDATE USER
    .put((req, res) => {
        let userId = req.params.id;
        let newName = req.body.name;
        let status = 404;
        let response = 'Unable to fetch user!';

        console.log(newName);

        if (eventonica.updateUser(userId, newName)) {
            status = 204;
            response = 'User successfully updated';
        }

        res.status(status).send(response);
    })
    // DELETE USER
    .delete((req, res) => {
        let userId = req.params.id;
        let status = 404;
        let response = 'Unable to fetch user!';

        if (eventonica.deleteUser(userId)) {
            status = 204;
            response = 'User successfully deleted';
        }

        res.status(status).send(response);
    })

app.route('/current-user/:id')
    .get((req, res) => {
        res.send(eventonica.currentUser);
    })
    .put((req, res) => {
        let userId = req.params.id;
        let status = 404;
        let response = 'Unable to fetch user!';

        if (eventonica.setCurrentUser(userId)) {
            status = 200;
            response = eventonica.currentUser;
        }

        res.send(response);
    })
