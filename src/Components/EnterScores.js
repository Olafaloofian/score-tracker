import React, { Component } from 'react';
import AddThings from './AddThings'

class EnterScores extends Component {
    state = {
        events: JSON.parse(sessionStorage.getItem('events')),
        selectedEvent: null,
        participants: JSON.parse(sessionStorage.getItem('participants')),
        selectedContenders: [],
        selectedParticipants: []
    }

    componentDidMount() {
        this.getDataFromSessionStorage()
    }

    getDataFromSessionStorage = () => {
        this.setState({
            events: JSON.parse(sessionStorage.getItem('events')),
            participants: JSON.parse(sessionStorage.getItem('participants'))
        })
    }

    selectContenders = (e, place) => {
        const currentContenders = [...this.state.selectedContenders]
        if (e.target.value === '') {
            currentContenders.splice(currentContenders.findIndex(e => e === this.state.selectedContenders[place-1]), 1, '')
            this.setState({ 
                selectedContenders: currentContenders,
            })
        } else {
            currentContenders[place-1] = e.target.value
            this.setState({
                selectedContenders: currentContenders
            })
        }
    }

    checkboxParticipant = (e) => {
        const currentParticipants = [...this.state.selectedParticipants]
        if(currentParticipants.includes(e.target.value)) {
            currentParticipants.splice(currentParticipants.indexOf(e.target.value), 1)
            this.setState({ selectedParticipants: currentParticipants })
        } else {
            currentParticipants.push(e.target.value)
            this.setState({ selectedParticipants: currentParticipants })
        }
    }

    checkSubmission = () => {
        if(JSON.parse(sessionStorage.getItem('scores')).find(e => e.eventName === this.state.selectedEvent.eventName)) {
            const confirm = window.confirm('There are already scores entered for this event. Are you sure you want to submit these?')
            if(confirm) {
                this.submitScores()
            }
        } else {
            this.submitScores()
        }
    }

    submitScores = () => {
        const { selectedContenders, selectedEvent, selectedParticipants } = this.state
        const participantArr = [...this.state.participants]
            for(let i=0; i<selectedContenders.length; i++) {
                if(selectedContenders[i]) {
                    const matchedPerson = participantArr.find(person => person.name === selectedContenders[i])
                    participantArr.splice(participantArr.findIndex(person => person.name === selectedContenders[i]), 1, {name: matchedPerson.name, score: +matchedPerson.score + +selectedEvent.pointValues[i]})
                } else {
                    alert('Please fill in all event places!')
                    return
                }
            }
            for(let i=0; i<selectedParticipants.length; i++) {
                    const matchedPerson = participantArr.find(person => person.name === selectedParticipants[i])
                    participantArr.splice(participantArr.findIndex(person => person.name === selectedParticipants[i]), 1, {name: matchedPerson.name, score: +matchedPerson.score + +selectedEvent.defaultPoints})
            } 
        console.log('------------ participantArr', participantArr)
        sessionStorage.setItem('participants', JSON.stringify(participantArr))
        const currentScores = JSON.parse(sessionStorage.getItem('scores'))
        sessionStorage.setItem('scores', JSON.stringify([...currentScores, { ...selectedEvent, contenders: selectedContenders, participants: selectedParticipants}]))
        this.setState({
            selectedContenders: [],
            selectedParticipants: [],
            selectedEvent: '',
        }, this.getDataFromSessionStorage())
    }

    render() {
        const { selectedEvent, events, participants, selectedContenders, selectedParticipants } = this.state
        console.log('------------ this.state', this.state)

        const eventNameOptions = events.map(event => ( 
            <option key={event.eventName} value={JSON.stringify(event)}>{event.eventName}</option>
        ))

        const contenderOptions = selectedEvent && selectedEvent.pointValues.map((point, index) => (
            <div key={`point${index}`}>
                {`${index+1}${index+1 === 1 ? 'st' : index+1 === 2 ? 'nd' : index+1 === 3 ? 'rd' : 'th'} Place: ${point} Point${+point === 1  ? '' : 's'}`}
                <select value={this.state.selectedContenders[index]} onChange={(e) => this.selectContenders(e, (index+1))}>
                    <option value='' />
                    {participants.map((person, index) => (
                        selectedContenders.includes(person.name) || selectedParticipants.includes(person.name) ?
                            <option key={person.name+index} disabled>{person.name}</option>
                        :
                            <option key={person.name+index}>{person.name}</option>
                    ))}
                </select>
            </div>
        ))

        const participantOptions = participants.map((person, index) => (
            !this.state.selectedContenders.includes(person.name) && 
            <div key={`name${index}`}>
                <input type="checkbox" value={person.name} onChange={(e) => this.checkboxParticipant(e)}/> {person.name}
            </div>
        ))

        return (
            <div>
                Enter Scores
                Select Event:
                <select onChange={(e) => e.target.value === '' ? this.setState({ selectedEvent: '' }) : this.setState({ selectedEvent: JSON.parse(e.target.value) })} value={selectedEvent ? selectedEvent.name : ''}>
                    <option value="" />
                    {eventNameOptions}
                </select>
                {selectedEvent &&
                    <div>
                        {selectedEvent.eventName}
                        {contenderOptions}
                        These people get {selectedEvent.defaultPoints} Participation Point{+selectedEvent.defaultPoints === 1 ? '' : 's'}
                        {participantOptions}
                        <button onClick={this.checkSubmission}>Submit</button>
                    </div>
                }
                <AddThings type='participant' refreshData={this.getDataFromSessionStorage.bind(this)}/>
            </div>
        );
    }
}

export default EnterScores