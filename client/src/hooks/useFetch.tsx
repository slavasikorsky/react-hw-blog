import { useState } from "react";
import IPost, { IInputItem, PostInterface } from "../types/types";

type FetchResult<T> = {
	data: T | null;
	error: { message: string } | null;
};

type BodyType = Record<string, unknown> | IInputItem | PostInterface | IPost;

const useFetch = <T,>(
	method: "POST" | "PUT" | "DELETE" | "GET" | "PATCH"
): FetchResult<T> & {
	handler: (url: string, body?: BodyType) => void;
} => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<FetchResult<T>["error"]>(null);

	const handler = async (URL: string, body?: BodyType) => {
		await fetch(URL, {
			method,
			body: body ? JSON.stringify(body) : null,
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async (res) => {
			try {
				const newData = await res.json();
				setData(newData);
			} catch (err) {
				setError({ message: "An error occurred while data fetching" });
			}
		});
	};

	return { data, error, handler };
};

export default useFetch;
