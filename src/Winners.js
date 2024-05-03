import React, { useState } from 'react';

export const Winners = (props) => {
    
    return <div>
        {props.winners.map(winner => {
            <div>
                <h2>{winner}</h2>
                <h3>{props.amount/props.winners.length}</h3>
                <hr  style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .5,
                    borderColor : '#000000'
                }}/>
            </div>
        })}
    </div>
}