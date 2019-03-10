import React, { Component, Fragment } from 'react';
import Event from './Event';
import PropTypes from 'prop-types';
export default class EventsList extends Component {
    static propTypes = {
        events: PropTypes.array.isRequired
    };
    render() {
        const { events } = this.props
        return (
            <Fragment>
            <ul>
            {events.length > 0 ?
                events.map((event,i) => (
                    <Event 
                    event={event} 
                    key={event.eventId}
                    />
                ))
            :
            <p>No events</p>
            }
            </ul>
            </Fragment>
        )
    }
};



