import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboards } from './leaderboards-slice';
import { LeaderboardsEntry } from '../domain';
import { AppState } from '../app/app-state';
import { sessionCleared } from '../player/player-slice';

export const Leaderboards = () => {
    const dispatch = useDispatch();

    const leaderboardsEntries = useSelector<AppState, LeaderboardsEntry[]>((state) => state.leaderboards.entries);

    useEffect(() => {
        dispatch(fetchLeaderboards());
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, []);

    const handleStartOverClick = () => {
        dispatch(sessionCleared());
    };

    return (
        <section>
            <h2>
                Leaderboards
            </h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leaderboardsEntries.map((entry) => 
                            <tr key={entry.name}>
                                <td>
                                    {entry.name}
                                </td>
                                <td>
                                    {entry.score}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <p>
                <Link to="/" onClick={handleStartOverClick}>
                    Start new game
                </Link>
            </p>
        </section>
    );
};