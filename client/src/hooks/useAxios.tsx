import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const useAxios = (axiosParams: AxiosRequestConfig) => {
	const [response, setResponse] = useState<AxiosResponse | undefined>();
	const [error, setError] = useState<AxiosError<unknown, any> | undefined>();
	const [loading, setLoading] = useState(true);

	const fetchData = async (params: AxiosRequestConfig) => {
		try {
			const result = await axios.request(params);
			setResponse(result);
		} catch (err) {
			setError(err as AxiosError<unknown, any>);
		} finally {
			setLoading(false);
		}
	};

	const sendData = () => {
		if (axiosParams) {
			fetchData(axiosParams);
		}
	};

	useEffect(() => {
		if (axiosParams.method === "GET" || axiosParams.method === "get") {
			fetchData(axiosParams);
		}
	}, []);

	return { response, error, loading, sendData };
};

export default useAxios;
