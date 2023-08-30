import {AxiosError, AxiosResponse} from 'axios';
import {axiosInstance} from './config.ts';

//TODO:
// 1. add put, get, delete
// 2. add general error handling, 401, 403, error page

export class httpClient {
	static post<P>(url: string, payload: P) {
		return axiosInstance.post(url, payload).then(handlePromiseResolve).catch(handlePromiseReject);
	}
}

function handlePromiseResolve<T>(response: AxiosResponse<T>) {
	return response.data;
}

function handlePromiseReject(error: AxiosError) {
	return Promise.reject(error);
}
