# Neighborhood Map

This project is part of Udacity's FEND.

## Project Overview

The objective of this project is to develop a single page application featuring a map of a neighborhood and to add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

This application features a few interesting places in Brno. Users can filter places by name and display more information about venues by clicking on a marker or venue's name.

## How to run the application

1. Download or clone this repository and unzip the files
2. Install all project dependencies with `npm install`
3. Start the server with `npm start`
4. A new browser window will open. If nothing happens, visit http://localhost:3000/

Service worker works only in production mode. In order to be able to use it, you need to follow these steps:
1. Build the application using `npm run build`
2. Run `serve -s build` and visit http://localhost:5000

## Dependencies

* This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
* It is necessary to have [Node.js](https://nodejs.org/en/download/) installed to be able to run the application
* [Foursquare API](https://developer.foursquare.com/places-api)
* [Google Maps API](https://cloud.google.com/maps-platform/maps/)
* [Google Fonts](https://fonts.google.com/)
* [google-maps-react](https://github.com/fullstackreact/google-maps-react)
* Favicon comes from [freefavicon.com](https://www.freefavicon.com)