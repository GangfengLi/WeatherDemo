import axios from "axios";

export const instance = axios.create({
    timeout: 10000,
    baseURL: 'http://localhost:3001/api/v1',
});

export const fetchData = async (code: number) => {
    return await instance.get<any>(
        `/query?code=${code}`
    );
}
