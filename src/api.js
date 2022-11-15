import axios from "axios";

const api = axios.create({
    baseURL: "https://bussifinder-server.herokuapp.com/"
});

export default api;