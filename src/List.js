import React, { Component } from 'react';

class List extends Component {

  render() {

    let visibleLocationListClass = this.props.visibleLocationList ? 'location-list-show' : '';

    return (
      <div className="location-list">
        <header>
          <h2>Places in Brno</h2>
          <button
            tabIndex="1"
            role="button"
            id="toggle"
            onClick={ this.props.toggleMenu }
          >
            {/* Spans for hamburger menu */}
            <span></span>
            <span></span>
            <span></span>
          </button>
        </header>
        <div className={visibleLocationListClass}>
          <input
            role="textbox" contentEditable="true"
            id="input-text"
            aria-label="Search place name"
            tabIndex="1"
            type="text"
            placeholder="Enter place name"
            onChange={(event) => this.props.updateQuery(event.target.value)} // Update query
          />
          <ul role="list">
            {/* Filter locations, turn locations into lower case and return those that match query */}
            {(this.props.locations
              .filter(location => {
                return (location.name.toLowerCase().includes(this.props.query.toLowerCase()))
              })
              .map(location => {
                return (
                  <li
                    key={location.id}
                    tabIndex={location.id}
                    onClick={(event) => this.props.handleListClick(event.target)}
                    onKeyPress={(event) => this.props.handleEnterPress(event, event.target)}>
                    {location.name}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default List;
