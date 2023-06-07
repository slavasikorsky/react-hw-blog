import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Container from "../../components/Container";

function PostPage() {
	const routeParams = useParams<{ id: string | undefined }>();
	const id = routeParams.id ? parseInt(routeParams.id, 10) : undefined;

	const URL = "https://jsonplaceholder.typicode.com";
	const { response, loading, error, sendData } = useAxios({
		method: "GET",
		baseURL: URL,
		url: `/posts/${id}`,
	});

	useEffect(() => {
		if (id) {
			sendData();
		}
	}, [id, sendData]);

	return (
		<Container>
			{loading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			{!loading && !error && (
				<>
					<h3>{response?.data.title}</h3>
					<p>{response?.data.body}</p>
					<span>Author: {response?.data.userId}</span>
				</>
			)}
		</Container>
	);
}

export default PostPage;
