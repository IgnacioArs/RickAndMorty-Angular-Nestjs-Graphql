import axios from 'axios';

const axiosConfig = (apiUrl: string) => {
    return axios.create({
        baseURL: apiUrl,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export default axiosConfig;

