import React, { useEffect } from 'react';
import { getRange } from '../utils';
import styles from './game.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../app/app-state';
import { RevealedCell, Point } from '../domain';
import { addPoint } from './game-slice';
import { GameCell } from './game-cell';
import history from '../history';

export const Game = () => {
    const FIELD_SIZE = 5;
    const CELLS_PER_TURN = 3;

    const dispatch = useDispatch();
    const sessionId = useSelector<AppState, string>((state) => state.player.sessionId);
    const isSessionLoaded = useSelector<AppState, boolean>((state) => !state.player.isLoading);
    const revealedPoints = useSelector<AppState, RevealedCell[]>((state) => state.game.revealedPoints);
    const pointsToReveal = useSelector<AppState, Point[]>((state) => state.game.pointsToReveal);
    const pointsToRevealCount = pointsToReveal.length;
    const turnsTaken = useSelector<AppState, number>((state) => state.game.turnsTaken);

    const handleCellClick = (i: number, j: number) => {
        if (!revealedPoints.some((point) => point.x === i && point.y === j)) {
            dispatch(addPoint({x: i, y: j}));
        }
    };

    useEffect(() => {
        if (isSessionLoaded && !sessionId) {
            history.push('/');
        }
    }, [sessionId, isSessionLoaded]);

    useEffect(() => {
        const foundTreasures = revealedPoints.filter((point) => point.content === 'T');
        if (foundTreasures.length === 3) {
            history.push('/leaderboards');
        }
    }, [revealedPoints]);

    return (
      <section>
          <h2>
              A Treasure Hunt
          </h2>

          <p>
              Turns taken: {turnsTaken}
          </p>

          <p>
              Cells to select: {CELLS_PER_TURN - pointsToRevealCount}
          </p>

          <div className={styles.gameField}>
              {
                  getRange(FIELD_SIZE).map((i) => {
                      return getRange(FIELD_SIZE).map((j) => 
                        <GameCell key={`${i}-${j}`} x={i} y={j} cellsToReveal={pointsToReveal} revealedCells={revealedPoints} onClick={handleCellClick}/>
                      )
                  })
              }
          </div>
      </section>  
    );
};