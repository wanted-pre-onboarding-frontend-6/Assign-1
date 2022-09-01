import axios from 'axios';
import TokenService from 'services/tokenService';

type tokenType = string | null;

export const axiosApiInstance = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosApiInstance.interceptors.request.use(
    async config => {
        const accessToken: tokenType = TokenService.get(process.env.REACT_APP_TOEKN_KEY as string);

        if (!accessToken) {
            return config;
        } else {
            config.headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            return config;
        }
    },
    error => {
        Promise.reject(error);
    },
);
