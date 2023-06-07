import { useState } from "react";

const useHttp = (
	URL: string,
	method: string,
	body: any
	// action: (data: any) => void
) => {
	const [errorMessage, setErrorMessage] = useState(null);

	const sendRequest = () => {
		fetch(URL, {
			method,
			body: body ? JSON.stringify(body) : null,
		}).then(async (res) => {
			try {
				const newData = await res.json();
				return newData;
			} catch (err) {
				setErrorMessage(err);
			}
			return false;
		});
	};
	return [errorMessage, sendRequest];
};

export default useHttp;
