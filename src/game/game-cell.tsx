import React from 'react';
import { RevealedCell, Point } from '../domain';
import styles from './game-cell.module.css';

export interface GameCellProps {
    x: number;
    y: number;
    revealedCells: RevealedCell[];
    cellsToReveal: Point[];
    onClick: (i: number, j: number) => void;
}

export const GameCell = ({revealedCells, x, y, onClick, cellsToReveal}: GameCellProps) => {
    const cellContent = revealedCells.find((cell) => cell.x === x && cell.y === y)?.content;
    const isCellAboutToBeRevealed = cellsToReveal.some((cell) => cell.x === x && cell.y === y);

    let cellClass = styles.gameFieldCell;
    if (isCellAboutToBeRevealed) {
        cellClass += ` ${styles.gameFieldCellToReveal}`
    }

    const handleClick = () => {
        onClick(x, y);
    };

    return (
        <div className={cellClass} onClick={handleClick}>
            {cellContent || ''}
        </div>
    );
};