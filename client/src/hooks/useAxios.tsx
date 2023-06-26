import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface UseAxiosResponse<T> {
	response: AxiosResponse<T> | undefined;
	error: AxiosError<unknown> | undefined;
	loading: boolean;
	sendData: () => Promise<void>;
}

const useAxios = <T,>(axiosParams: AxiosRequestConfig): UseAxiosResponse<T> => {
	const [response, setResponse] = useState<AxiosResponse<T> | undefined>();
	const [error, setError] = useState<AxiosError<unknown> | undefined>();
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = useCallback(async (params: AxiosRequestConfig) => {
		try {
			const result = await axios.request<T>(params);
			setResponse(result);
		} catch (err) {
			setError(err as AxiosError<unknown>);
		} finally {
			setLoading(false);
		}
	}, []);

	const sendData = useCallback(async () => {
		await fetchData(axiosParams);
	}, [fetchData, axiosParams]);

	useEffect(() => {
		sendData();
	}, [sendData]);

	return { response, error, loading, sendData };
};

export default useAxios;
