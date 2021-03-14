# Eventonica Project


## Contents

  - [Description](#description)
  - [Requirements](#project-requirements)
  - [Build Instructions](#build-instructions)
  - [Progress](#progress)


### Description
This project is a part of Techtonica's curriculum ([source]("https://github.com/Techtonica/curriculum/tree/main/projects/eventonica")), where the goal is to make an event management web application. The app will "let users browse from a variety of events and save the ones they are interested in." The final product will be a full-stack web app thats uses ReactJS and a database.

The project is split into multiple parts.

### Project Requirements

- **Events**
  - Add a new Event
  - Delete an Event
  - Search for events...
    - by date
    - by category
- **Users**
  - Add a new User
  - Delete a User
  - A User can...
    - *favorite* an Event
    - *unfavorite* an Event
    - view their list of previously favorite events

#### Build instructions

At the moment, to run `index.js` properly you will need Node.

All the required packages can be installed using the following command in the project directory:
```
npm install
```


### Progress

- Models.js has three main classes: Eventonica, Event, and User. 
  - At this time I won't worry about event location and time
  - I want to display events as a [listbox](https://a11y-guidelines.orange.com/en/web/components-examples/listbox/), ideally one with [checkboxes](https://a11y-guidelines.orange.com/en/web/components-examples/listbox-with-checkboxes/). The a11y reference materials use jQuery and the [MDN documents](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role) have a setup of the sorts, so I need to study them further to figure out how to implement it without jQuery.
- Jasmine tests are partially setup
- Basic Express routes are set up and work within Postman

#### To-Dos

- Response messages in `index.js` need to be more descriptive
- The findByDate and findByCategory are still a work in progress
    - In the next part I will be adding Postgres, which should help me implement these better.

### Bugs

- Input "time"
  - On certain versions of Chrome, you can input the "seconds" field and it will reject it no matter what/mark as invalid
  -  In HTML5 the input type="time" is [unsupported in Safari](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#browser_compatibility). I'll need to further consider input and validation. For now it will be disabled.

  
  