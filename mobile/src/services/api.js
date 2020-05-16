import axios from 'axios';

const Api = axios.create({
    baseURL: "http://10.0.0.105:3333"
});

export default Api;