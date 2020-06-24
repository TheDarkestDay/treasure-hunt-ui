import { Point } from './domain/index';
import axios from 'axios';

const API_ROOT = 'http://localhost:3000';

export const treasureHuntApi = {
    createGame(name: string): Promise<string> {
        return axios.post(`${API_ROOT}/game`, {
            name
        }).then((response) => response.data.sessionId);
    },
    checkFields(name: string, points: Point[]): Promise<void> {
        return Promise.resolve();
    }
}