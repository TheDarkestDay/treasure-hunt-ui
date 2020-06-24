import React, { useState, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { createNewGame } from './player-slice';

export const NewPlayerForm = () => {
    const [state, setState] = useState({
        name: ''
    });
    const dispatch = useDispatch();

    const handleNameChange = (event: SyntheticEvent) => {
        setState({
            name: (event.target as HTMLInputElement).value
        });
    };

    const handleFormSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(createNewGame(state.name));
    };

    return (
        <section>
            <h2>
                Enter your name:
            </h2>

            <form onSubmit={handleFormSubmit}>
                <label htmlFor="playerName">
                    Name:
                </label>
                <input id="playerName" type="text" value={state.name} onChange={handleNameChange}/>
            </form>
        </section>
    );
};