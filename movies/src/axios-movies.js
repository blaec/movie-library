import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.100.102.4:8081/api/v1/'
});

export default instance;