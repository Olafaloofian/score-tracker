import React, { Component } from 'react';

class AddEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputElements: [],
            inputs: this.props.type === 'event' ? 
                {
                    eventName: '',
                    defaultPoints: '',
                    pointValues: ['', '', '']
                } : 
                [] 
        }
    }

    addInput = () => {
        const { inputElements, inputs } = this.state
        const newInput = this.props.type === 'event' ?
            <div key={`position${inputElements.length}`} className='position'>{`${inputElements.length + 4}th Place`}
                <input type='number' min={1} value={inputs.pointValues[inputElements.length + 4]} onChange={(e) => this.handlePoints((inputElements.length + 3), e)}/> Points
            </div>
            :
            <div key={`name${inputElements.length}`} className='participant'>
                Name: <input type="text" value={inputs[inputElements.length + 2]} onChange={(e) => this.handleName(e, (inputElements.length + 1))}/>
            </div>
        this.setState(prevState => {
            return {
                inputElements: [...prevState.inputElements, newInput]
            }
        })
    }

    checkForEmptyElements = (arr) => {
        for(let i=0; i<arr.length; i++) {
            if(!arr[i]) {
                return false
            }
        }
        return true
    }

    resetState = () => {
        this.setState({
            inputElements: [],
            inputs: this.props.type === 'event' ? 
            {
                eventName: '',
                defaultPoints: '',
                pointValues: ['', '', '']
            } : 
            [{ name: '', score: 0 }]
        })
    }

    handleSubmit = () => {
        const { inputs } = this.state
        if(this.props.type === 'event') {
            if(this.state.inputs.eventName && this.checkForEmptyElements(this.state.inputs.pointValues)) {
                const currentEvents = JSON.parse(sessionStorage.getItem('events'))
                currentEvents.push({...inputs})
                sessionStorage.setItem('events', JSON.stringify(currentEvents))
                this.resetState()
            } else {
                window.alert('Please enter event information!')
            }
        } else if (this.props.type === 'participant') {
            if(this.state.inputs[0] && this.checkForEmptyElements(this.state.inputs)) {
                const currentParticipants = JSON.parse(sessionStorage.getItem('participants'))
                for(let index in inputs) {
                    currentParticipants.push(inputs[index])
                }
                sessionStorage.setItem('participants', JSON.stringify(currentParticipants))
                this.props.refreshData && this.props.refreshData()
                this.resetState()
            } else {
                window.alert('Please fill out all input fields!')
            }
        }
    }

    handleInput = (key, e) => {
        const currentInputs = this.state.inputs
        this.setState({inputs: {...currentInputs, [key]: e.target.value}})
    }

    handlePoints = (index, e) => {
        const currentInputs = {...this.state.inputs}
        currentInputs.pointValues[index] = e.target.value
        this.setState({inputs: currentInputs})
    }

    handleName = (e, index) => {
        const currentInputs = [...this.state.inputs]
        console.log('------------ Index editing', [this.state.inputs.length - 1])
        currentInputs[index] = { name: e.target.value, score: 0 }
        this.setState({ inputs: currentInputs })
    }

    render() {
        console.log('------------ this.state', this.state)
        const { inputs } =  this.state
        return (
            this.props.type === 'event' ? 
            <div>
                Add Hackathon Event
                <form onSubmit={(e) => e.preventDefault()}>
                    Event name: <input type='text' value={inputs.eventName} onChange={(e) => this.handleInput('eventName', e)}/><br/>
                    Point values:<br/>
                    <div className='position'>1st Place <input type="number" value={inputs.pointValues[0]} min={1} onChange={(e) => this.handlePoints(0, e)}/> Points</div>
                    <div className='position'>2nd Place <input type="number" value={inputs.pointValues[1]} min={1} onChange={(e) => this.handlePoints(1, e)}/> Points</div>
                    <div className='position'>3rd Place <input type="number" value={inputs.pointValues[2]} min={1} onChange={(e) => this.handlePoints(2, e)}/> Points</div>
                    {this.state.inputElements}
                    <button onClick={this.addInput}>Add More Places</button>
                    <div>Default Participation Points: <input type='number' min={1} value={inputs.defaultPoints} onChange={(e) => this.handleInput('defaultPoints', e)}/></div>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
            : this.props.type === 'participant' ?
            <div>
                Add Participant
                <form onSubmit={(e) => e.preventDefault()}>
                    Name: <input type='text' value={inputs[0] ? inputs[0].name : ''} onChange={(e) => this.handleName(e, 0)}/>
                    {this.state.inputElements}
                    <div><button onClick={this.addInput}>Add More Participants</button></div>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
            :
            <div>
                No add type selected
            </div>
        )
    }
}

export default AddEvent