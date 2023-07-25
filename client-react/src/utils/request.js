import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
});

export default request;
