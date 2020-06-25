import React from 'react';
import { mount } from 'enzyme';
import { GameCell } from './game-cell';

describe('GameCell', () => {
    it('should match snapshot without highlight', () => {
        const gameCell = mount(<GameCell x={0} y={0} onClick={jest.fn()} revealedCells={[]} cellsToReveal={[]}/>);

        expect(gameCell).toMatchSnapshot();
    });

    it('should match snapshot with highlight', () => {
        const gameCell = mount(<GameCell x={0} y={0} onClick={jest.fn()} revealedCells={[]} cellsToReveal={[{x: 0, y: 0}]}/>);

        expect(gameCell).toMatchSnapshot();
    });

    it('should display the cell content', () => {
        const gameCell = mount(<GameCell x={0} y={0} onClick={jest.fn()} revealedCells={[{x: 0, y: 0, content: 'T'}]} cellsToReveal={[]}/>);

        expect(gameCell).toMatchSnapshot();
    });

    it('should display placeholder if content is absent', () => {
        const gameCell = mount(<GameCell x={0} y={0} onClick={jest.fn()} revealedCells={[{x: 1, y: 2, content: 'T'}]} cellsToReveal={[]}/>);

        expect(gameCell).toMatchSnapshot();
    });

    it('should call the callback with given coordinates', () => {
        const clickHandler = jest.fn();
        const gameCell = mount(<GameCell x={0} y={0} onClick={clickHandler} revealedCells={[{x: 1, y: 2, content: 'T'}]} cellsToReveal={[]}/>);

        gameCell.simulate('click');

        expect(clickHandler).toHaveBeenCalledTimes(1);
        expect(clickHandler).toHaveBeenCalledWith(0, 0);
    });
});