import React, { Component } from 'react';

export default class Dashboard extends Component {
    render() {
        const activeParticipants = JSON.parse(sessionStorage.getItem('participants')).map(person => (
            <div key={person.name}>
                {person.name}
            </div>
        ))

        const activeEvents = JSON.parse(sessionStorage.getItem('events')).map((event, index) => (
            <div key={`${event.eventName}${index}`}>
                {event.eventName}
            </div>
        ))
        return (
            <div>
                Dashboard
                Active Participants:
                {activeParticipants}
                <br/>
                Active Events:
                {activeEvents}
            </div>
        );
    }
}