import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.100.102.4:8081/'
});

export default instance;