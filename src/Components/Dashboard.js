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

        const finishedEvents = JSON.parse(sessionStorage.getItem('scores')).map((score, index) => (
            <div key={`${score.eventName}${index}`}>
                Event: {score.eventName} <br/>
                Positions: <br/>
                {score.contenders.map((name, index) => (
                    <div key={`${name}${index}`}>
                        {index+1 === 1 ? 'Winner:' : `${index+1}${index+1 === 2 ? 'nd' : index+1 === 3 ? 'rd' : 'th'} Place:`} {name}
                    </div>
                ))}
                Participants get {score.defaultPoints} Point{score.defaultPoints > 1 ? 's' : ''}: <br/>
                {score.participants.map((name, index) => (
                    <div key={`${name}${index}`}>
                        {name}
                    </div>
                ))}
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
                <br/>
                Finished Events:
                {finishedEvents}
            </div>
        );
    }
}