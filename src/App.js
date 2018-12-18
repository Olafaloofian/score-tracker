import React, { Component } from 'react';
import AddThings from './Components/AddThings'
import EnterScores from './Components/EnterScores';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import NavBar from './Components/NavBar';
import Scoreboard from './Components/Scoreboard';
import Dashboard from './Components/Dashboard';

class App extends Component {
componentDidMount() {
  // Dummy data
  sessionStorage.setItem('events', JSON.stringify([{eventName: "Smash", defaultPoints: "10", pointValues: ["1", "2", "3", "4"]}, {eventName: "Trash Toss", defaultPoints: "10", pointValues: ["1", "2", "3", "4"]}]))
  sessionStorage.setItem('participants', JSON.stringify([{name: "Freeps", score: 0}, {name: "Greeps", score: 0}, {name: "Woking", score: 0}, {name: "Kony", score: 0}, {name: "Tofers", score: 0}, {name: "Zambit", score: 0}, {name: "Teenaw", score: 0}, {name: "Krintle", score: 0}]))
  sessionStorage.setItem('scores', JSON.stringify([
  {eventName: "Smash", 
  defaultPoints: "10", 
  pointValues: ["1", "2", "3", "4"],
  contenders: ["Freeps", "Woking", "Tofers", "Greeps"],
  participants: ["Zambit", "Krintle"],
  pointValues: ["1", "2", "3", "4"]}, 
  {eventName: "Trash Bin Toss", 
  defaultPoints: "10", 
  pointValues: ["1", "2", "3", "4"],
  contenders: ["Woking", "Freeps", "Tofers","Krintle"],
  participants: ["Zambit", "Greeps"],
  pointValues: ["1", "2", "3", "4"]}]
  ))

    // sessionStorage.setItem('events', JSON.stringify([]))
  // sessionStorage.setItem('participants', JSON.stringify([]))
}

  render() {
    return (
      <div className="App">
        <NavBar />
        DevMountain Hackathon Tracker
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/add/event' key='addEvent' render={() => <AddThings type='event' />} />
          <Route path='/add/participant' key='addParticipant' render={() => <AddThings type='participant' />} />
          <Route path='/scorecard' component={EnterScores} />
          <Route path='/leaderboard' component={Scoreboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
