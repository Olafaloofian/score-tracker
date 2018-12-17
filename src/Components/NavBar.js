import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/add/event'>Add Event</Link>
            <Link to='/add/participant'>Add Participant</Link>
            <Link to='/scorecard'>Enter Scores</Link>
            <Link to='/leaderboard'>Leaderboard</Link>
        </div>
    );
};

export default NavBar;