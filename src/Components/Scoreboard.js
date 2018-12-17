import React from 'react';

export default function Scoreboard(){

    const winnersList = JSON.parse(sessionStorage.getItem('participants')).sort((a, b) => b.score - a.score)

    return (
        <div>
            Scoreboard
            {winnersList.map((person, index) => (
                <div key={`scoreboard${index}`}>
                    {`${index + 1}${index + 1 === 1 ? 'st' : index + 1 === 2 ? 'nd' : index + 1 === 3 ? 'rd' : 'th'} Place:`} {person.name}
                    <div>Score: {person.score}</div>
                </div>
            ))}
        </div>
    );
}