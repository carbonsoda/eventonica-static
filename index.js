
const express = require('express');
const bodyParser = require('body-parser');
const { Eventonica, User, Event} = require('./static/js/models');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});


const eventonica = new Eventonica();

/*
 * ROUTES
 */

app.route('/events').get((req, res) => {
    res.send(eventonica.getAllEvents());
})

app.route('/events/:id').get((req, res) => {
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
}).delete((req, res) => {
    let eventId = req.params.id;
    let status = 404;
    let response = 'Unable to fetch data!';

    if (eventonica.deleteEvent(eventId)) {
        status = 200;
        response = 'Event successfully deleted';
    }

    res.status(status).send(response);

})



app.route('/users').get((req, res) => {
    res.send(eventonica.getAllUsers());
})

app.route('/users/:id').get((req, res) => {
    let userId = req.params.id;
    let status = 404;
    let response = 'Unable to fetch data!';


    eventonica.getAllUsers().forEach((user) => {
        if (user.id == userId) {
            status = 200;
            response = user;
        }
    })

    res.status(status).send(response);
}).delete((req, res) => {
    let userId = req.params.id;
    let status = 404;
    let response = 'Unable to fetch data!';

    if (eventonica.deleteUser(userId)) {
        status = 200;
        response = 'User successfully deleted';
    }

    res.status(status).send(response);

})