# React Take Home Question

## Intro
We have been impressed by the programming ability and technical experience that you've demonstrated so far. To further evaluate your skill set in a more realistic scenario we have furnished this take home assignment encompassing a variety of directly applicable concepts and methodologies that will be required as you work at Luminopia. Though the task may appear large for someone working from scratch, we attempted to align it with your recent work experience so that you can directly apply the skills you've gained over the past year to this challenge.

This assignment consists of several core features as well as a few optional "icing-on-the-cake" feature(s). The optional feature(s) are not expected nor evaluated as a means to boost your performance rating, instead they are simply additional context items that may provide a more enjoyable program for you to work on that more closely mimics the application you will be working on at Luminopia.

## Features

### Overview

You will produce a simple React application that authenticates with a remote endpoint, downloads video category information for the authenticated user, then parses and displays that information to the user in an interactive list form.

### Criteria

1. Authenticate at an HTTP API to receive an access token.
   * This interaction should be isolated in the code in a manner that will allow easy mocking for testing.
   * The data format is described under the **References** section as `POST /patients/login`.
   * This data will return a token that is structured as a [JWT](https://jwt.io). This token will need to be included with all other requests in the header as `Authorization: Bearer ${JWT}` to authenticate the user to the API.
   * Prior to authenticating, the user should see a login page requesting the user's credentials (an access code, as specified in the **References** section).
   * Some visual element should indicate to the user when the request is pending.
   * The user should be notified if they have provided invalid credentials.
2. Query an HTTP API that returns a JSON serialized response.
   * This interaction should be isolated in the code in a manner that will allow easy mocking for testing.
   * The data format is described under the **References** section.
   * This data will contain information about various channels (groupings of videos such as series (Pokemon) or topics (Travel)).
   * Some visual element should indicate to the user when the information is loading.
3. The channels should be presented to the user in a list that is sorted by name and is searchable/filterable.
   * The channels should be displayed in a lexigraphically sorted list by name along with the number of videos in the channel.
   * The list of channels should be filterable using an input field above the channels list. This field should filter on the channels' names.
   * The list and input field should have appealing styling.
4. The project should incorporate Redux for state mangement.
   * The login, search and data load events would be structured around Redux actions.
   * The UI would be generated as a function of the atomic Redux state (AKA standard Rexux usage).
   * Asynchonous activity should be handled in a clean manner (redux-thunk, redux-saga, etc.).
5. **(Optional)** Unit testing of each component.
   * The React components should be tested in isolation to demonstrate that they produce expected DOM output when provided specified input.
   * Processing elements should be tested in isolation to demonstrate that they produce expected data output when provided specific data input.
   * Reminder: this is by no means a required feature and is only to be completed if you wish to have an environment that better mimics the projects we will actually be working on.

## References

### Seed Projects

[create-react-app](https://github.com/facebookincubator/create-react-app) is a great seed project that provides most of the tools necessary to complete the required elements on this assignment. `fetch` is recommended for AJAX interaction, with the `whatwg-fetch` polyfill ensuring functionality in older browsers. `redux` will also need to be installed, and `react-redux` would probably be useful along with it.

### API Reference

All responses from the API will be `application/json` and be UTF-8 encoded. All requests are expected to be serialized as `application/json`.

The base url is [https://api.ct1-staging.luminopia.com](https://api.ct1-staging.luminopia.com).

All requests should include the header `X-Client: TECH-INT` for tracking purposes.

**Response Codes:**

| Code  | Description                                                                       |
|-------|-----------------------------------------------------------------------------------|
| 200   | Request succeeded                                                                 |
| 400   | Supplied parameters are invalid. Look for an error response with more information |
| 401   | Invalid authentication was provided (or missing)                                  |
| 403   | The provided security element does not allow access to that endpoint              |
| Other | Let the interviewer know!                                                         |

#### `POST /patients/login`

> Provide credentials in exchange for a long-lived access token that should be used to authenticate other requests.

**Request:**

| Key         | Type   | Description |
|-------------|--------|-------------|
| access_code | string | Doctor provided access\_code. This access\_code will be a single word mnemonic string. A valid code is `moth`. |

**Response:**

```json
{
  "token": "...",
  "user": {...}
}
```

#### `GET /patients/recommended_content`

> Retrieve a list of recommended YouTube videos for each category. This is provided so that Patients can review what content they will receive on the device. This endpoint requires Patient authentication in order to target videos to the Patients viewing habits/age.

**Response:**

```json
{
  "COMEDY": {
    "video_uris": [...],
    "name": "Comedy"
  },
  "SPORTS": {
    "video_uris": [...],
    "name": "Sports"
  }
}
```

**Additional:**

This endpoint requires an authentication header to the request in order to retrieve a response. The format is: `Authorization: Bearer BEARER_TOKEN`. This header should be included in the request with the key `Authorization` and the value `Bearer BEARER_TOKEN`, with `BEARER_TOKEN` being the JWT received from the login endpoint.

## Evaluated Criteria

Several elements of the resulting project will be focused on by the reviewer.

1. Project structure
2. Code readability (no magic numbers, appropriate variable names)
3. Code maturity (idiomatic, modular, encapsulated, suitable abstraction)
4. Thoroughness / Compliance with the requirements (if there are any questions, email the interviewer!)
5. Development history (make sure to commit code as you work on the project, we're trying to understand what it would be realistically like to work with you)
5. Lower priority (but still a priority!): appropriate styling & design

There is no need to show off fancy coding style! Code that is understandable is much preferable to code that is cool.

## Deliverable

On completion of the project, a git repository should be made accessible, with the resulting React project and code, to the interviewer. This can either be done by hosting the project on a non-publicly accessible git hosting service, or by sending a git bundle of repository via email/other file sharing service (`git bundle create luminopia.bundle --all`). The project should be executable by running `npm install && npm start`, which should serve the project on http://localhost:3000, and should require no additional configuration. If additional configuration is required, the project should contain a README detailing the instructions.
