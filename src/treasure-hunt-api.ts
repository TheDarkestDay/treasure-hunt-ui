import { Point, RevealedCell } from './domain/index';
import axios from 'axios';

const API_ROOT = 'http://localhost:3000';

export const treasureHuntApi = {
    createGame(name: string): Promise<string> {
        return axios.post(`${API_ROOT}/game`, {
            name
        }).then((response) => response.data.sessionId);
    },
    checkFields(sessionId: string, points: Point[]): Promise<RevealedCell[]> {
        return axios.get(`${API_ROOT}/field`, {
            params: {
                sessionId,
                points
            },
        }).then((response) => response.data.result);
    },
    getLeaderboards(): Promise<any[]> {
        return axios.get(`${API_ROOT}/leaderboards`).then((response) => response.data.result);
    }
}