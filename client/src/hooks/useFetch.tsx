import { useState } from "react";

const useFetch = (method: "POST" | "PUT" | "DELETE" | "GET" | "PATCH") => {
	const [data, setData] = useState<any>(false);
	const [error, setError] = useState<string | unknown>(null);

	const handler = async (URL: string, body: FormData | null = null) => {
		const response = await fetch(URL, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : null,
		}).then(async (res) => {
			try {
				const newData = await res.json();
				return newData;
			} catch (err) {
				setError(err);
			}
			return false;
		});
		setData(response);
	};

	return [data, error, { handler }];
};

export default useFetch;
