# Eventonica Project


## Contents

  - [Description](#description)
  - [Progress](#progress)


### Description
This project is a part of Techtonica's curriculum ([source]("https://github.com/Techtonica/curriculum/tree/main/projects/eventonica")), where the goal is to make an event management web application. The app will "let users browse from a variety of events and save the ones they are interested in." The final product will be a full-stack web app thats uses ReactJS and a database.

The project is split into seven parts.

### Progress

- Models.js has three main classes: Eventonica, Event, and User. They have basic implementations for now.
  - At this time I won't worry about event location and time
    - In HTML5 the input type="time" is [unsupported in Safari](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#browser_compatibility). I'll need to further consider input and validation.
  - The findByDate and findByCategory are still a work in progress
  - I want to display events as a [listbox](https://a11y-guidelines.orange.com/en/web/components-examples/listbox/), ideally one with [checkboxes](https://a11y-guidelines.orange.com/en/web/components-examples/listbox-with-checkboxes/). The a11y reference materials use jQuery and the [MDN documents](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role) have a setup of the sorts, so I need to study them further to figure out how to implement it without jQuery.
- Jasmine tests are partially setup
