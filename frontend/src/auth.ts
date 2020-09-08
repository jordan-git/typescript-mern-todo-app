import axios, { AxiosInstance } from 'axios';
import jwtDecode from 'jwt-decode';

class authClient {
    axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: 'http://localhost:4000/',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    setToken(token: string): string {
        localStorage.setItem('token', token);
        return token;
    }

    getCurrentUser(): string | null {
        const token = this.getToken();
        if (token) return jwtDecode(token);
        return null;
    }

    async register(data: object): Promise<boolean> {
        const response = await this.axios({
            method: 'POST',
            url: 'api/register',
            data: data,
        });

        const token = response.data.token;
        if (!token) return false;

        this.axios.defaults.headers.common.authorization = this.setToken(token);
        return true;
    }

    async login(data: object): Promise<boolean> {
        const response = await this.axios({
            method: 'POST',
            url: 'api/log-in',
            data: data,
        });

        console.log(response);

        const token = response.data.token;
        if (!token) return false;

        this.axios.defaults.headers.common.authorization = this.setToken(token);
        return true;
    }

    logout(): void {
        localStorage.removeItem('token');
        delete this.axios.defaults.headers.common.authorization;
    }
}

const client = new authClient();
client.axios.defaults.headers.common.authorization = client.getToken();

export default client;
