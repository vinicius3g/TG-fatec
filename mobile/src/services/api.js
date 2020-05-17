import axios from 'axios';

const Api = axios.create({
    baseURL: "https://fatec-backend.herokuapp.com"
});

export default Api;