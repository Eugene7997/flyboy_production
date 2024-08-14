<a id="readme-top"></a>
<div align="center">
  <h1 align="center">FlyBoy</h3>
  <p align="center">
    An simple web application created using MERN stack
    <br />
    <br />
    <a href="#video-demo">View Demo</a>
</div>


## About The Project

This project is done as a take-home coding assignment for ST engineering aerospace division.

Decided to create the web application using MERN stack.

Here's why:
* Both frontend and backend are able to be implemented using a single langauge, Javascript.
* JSON (JavaScript Object Notation) is used for data interchange between all parts of the stack, from the database (MongoDB) to the client (React). This greatly simplifies development and maintenance.
* Scalable.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

This section details how I set up the web application development.

### Installation

clone the repo:

```sh
git clone https://github.com/Eugene7997/flyboy.git
cd flyboy
```

create a `.env` file and add the following to it:

```txt
DB_URI={your_api_key}
JWT_SECRET={your_secret_key}
```

To install the client dependencies:

```sh
cd client
npm install
```

To install the client dependencies:

``` sh
cd server
npm install
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

To start the client:

```sh
cd client
npm start
```

To start the server:

```sh
cd server
nodemon src/index.js
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Requirement specifications

Create a single-page application (SPA) with database for users to create and view flight log entries.

You may use any language, framework, and database that you are comfortable with.
Requirements

1. Users shall be able to log in via a login page with username and password
2. Users shall be able to retrieve and display all flight log entries
3. Users shall be able to create flight log entries with the following fields:
    1. tailNumber
    2. flightlD
    3. takeoff
    4. landing
    5. Duration
4. Users shall be able to update existing flight log
5. Users shall be able to delete flight log

Optional

1. Create and delete users
2. Authenticate users
3. Search using parameters: flightlD to display all flight logs pertaining to flightlD
4. Deploy your app to any cloud hosting platform (heroku, firebase, aws etc.)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# video-demo
[![Watch the video](https://raw.githubusercontent.com/Eugene7997/flyboy/main/video.mp4)](https://raw.githubusercontent.com/username/repository/branch/path/to/video.mp4)
