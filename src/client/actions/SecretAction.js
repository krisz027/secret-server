import axios from 'axios';

export function searchSecretByHash(hash) {
    return axios.get(`${location.origin}/secret/${hash}`);
}