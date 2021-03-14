
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



app.route('/users')
    .get((req, res) => {
        res.send(eventonica.getAllUsers());
    })
    .post((req, res) => {  // Adding users
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
        let response = 'Unable to fetch data!';

        eventonica.getAllUsers().forEach((user) => {
            if (user.id == userId) {
                status = 200;
                response = user;
            }
        })

        res.status(status).send(response);
    })
    .delete((req, res) => {
        let userId = req.params.id;
        let status = 404;
        let response = 'Unable to fetch data!';

        if (eventonica.deleteUser(userId)) {
            status = 200;
            response = 'User successfully deleted';
        }

        res.status(status).send(response);

    })