import React, { Component } from 'react';
import './App.css';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import List from './List';

class App extends Component {

  state = {
    locations: [],
    query: '',
    selectedMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    visibleLocationList: true,
  }

  componentDidMount() {

    const foursquare = {
      client_id: 'KJT14HNW0GRX5ZCRDCXMNXEO5A5KPQZDPZOQHN0DN1NNOUIS',
      client_secret: '1D3GKVKFETIAUTZ2QWUKNL3UWJRRKAPLMICTDMJG12PKDHEO',
      lat: '49.195392',
      lng: '16.599223',
    }

    // List of venues
    const venueList = [
      { id: "4b745c7bf964a520b7d72de3" }, // Lužánky
      { id: "4bef03dfd1b7d13a6732cdec" }, // Stará radnice
      { id: "4bf819c3abdaef3bde9ea184" }, // Katedrála sv. Petra a Pavla (Petrov)
      { id: "4be18bdd4ed5c9b66898ccce" }, // Hrad Špilberk
      { id: "4b90b90cf964a5206a9533e3" }, // Zelný trh
      { id: "4da6c8854df0260c3e99226a" }, // Restaurace Zdravý život
      { id: "57c3f97ecd1044d8976d5fa7" }, // Čajovna za zrcadlem
    ]

    // Fetch venue's data from Foursquare API
    venueList.map(venue => {
      fetch(`https://api.foursquare.com/v2/venues/${venue.id}?client_id=${foursquare.client_id}
        &client_secret=${foursquare.client_secret}
        &v=20180323
        &locale=en`) // Get data in English if possible
        // Convert venue's data into json
        .then(result => result.json())
        // Add venue data to state
        .then(json => {
          this.setState({ locations: [...this.state.locations, json.response.venue] })
        })
        .catch(error => alert("Error with fetching data from Foursquare API. Please refresh your browser window or try again later."));
    })

    window.gm_authFailure = function() {
      alert("Google maps failed to load. Please refresh your browser window or try again later.");
    }
  }

  // Show info window when marker is clicked
  handleMarkerClick = (props, marker, event) => {
    this.setState({
      selectedPlace: props,
      selectedMarker: marker,
      showingInfoWindow: true
    })
  }

  // Handle clicks on the list of locations
  handleListClick = (target) => {
    // Save name of the location
    let place = target.innerText
    // Connect locations' list with a marker and show info window
    this.setState({
      selectedPlace: this.refs[place].props, // e.g. this.refs[Petrov].props
      selectedMarker: this.refs[place].marker, // e.g. this.refs[Petrov].marker
      showingInfoWindow: true
    })
  }

  // Hide info window when clicking on the map
  handleMapClick = () => {
    this.setState({
      selectedPlace: {},
      selectedMarker: {},
      showingInfoWindow: false
    })
  }

  // Call handleListClick function when pressing Enter/Return key
  handleEnterPress = (event, target) => {
    if (event.key === 'Enter') {
      this.handleListClick(target)
    }
  }

  // Filter search
  updateQuery = (query) => {
    this.setState({query: query})
  }

  // Show/hide location's list by clicking hamburger menu
  toggleMenu = () => {
       this.setState({visibleLocationList: !this.state.visibleLocationList})
   }

  render() {
    let icon = "http://maps.google.com/mapfiles/ms/icons/purple-dot.png" // marker icon
    let animation = null // marker animation

    return (
      <div className="App">
        {/* Passing component props to child component */}
        <List
          role="navigation"
          locations={this.state.locations}
          query={this.state.query}
          updateQuery={this.updateQuery}
          handleListClick={this.handleListClick}
          toggleMenu={this.toggleMenu}
          visibleLocationList={this.state.visibleLocationList}
          handleEnterPress={this.handleEnterPress}
        />
        {/* Render Map component from google-maps-react */}
        <Map
          ref="mapa"
          className="map"
          role="application"
          onClick={this.handleMapClick}
          initialCenter={{ lat: 49.195392, lng: 16.599223}}
          google={this.props.google}>
            {/* Filter locations, turn locations into lower case and return those that match query */}
            {(this.state.locations
              .filter(location => {
              	return (location.name.toLowerCase().includes(this.state.query.toLowerCase()))
              })
              .map(location => {
              {/* Check if names of the selected marker and the current marker are the same – if they match, set marker animation to BOUNCE */}
                (location.name === this.state.selectedPlace.title) ? (animation = this.props.google.maps.Animation.BOUNCE) : (animation = null);
                return (
                  // Render Marker component from google-maps-react
                  <Marker
                    ref={location.name}
                    key={location.id}
                    position={{lat: location.location.lat, lng: location.location.lng}}
                    title={location.name}
                    icon={icon}
                    onClick={this.handleMarkerClick}
                    animation={animation}
                  />
                )
              })
            )}
          {/* Render InfoWindow component from google-maps-react */}
          <InfoWindow
            ref="infoWindow"
            marker={this.state.selectedMarker}
            visible={this.state.showingInfoWindow}
          >
            <body>
              <header className="infoWindow">
                <h2>{this.state.selectedPlace.title}</h2>
                {/* Check if selected place has a title and filter location from state that matches selected place */}
                {
                  (this.state.selectedPlace.title) ? (<p>{this.state.locations
                  .filter(location => {
                    return (location.name.toLowerCase() === this.state.selectedPlace.title.toLowerCase())
                  })
                  .map(location => {
                    // Return (location.description) from Foursquare API
                    return (location.tips.groups[0].items[0].text)
	                })
                  } </p>) : (<p>Test</p>)
                }
              </header>
            </body>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAu9IT9vn0fqqRMnwZg15EdcoGy1wlzKhM'
})(App);
