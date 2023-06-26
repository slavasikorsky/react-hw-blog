import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { PostInterface } from "../../types/types";
import Comments from "../Comments";
import useAxios from "../../hooks/useAxios";

function PostPage() {
	const routeParams = useParams<{ id: string | undefined }>();
	const [err, setErr] = useState<string | null>(null);
	const [view, setView] = useState(0);
	const { id } = routeParams;

	const BASE_URL = `http://localhost:5010/posts/`;
	const { response, loading, error, sendData } = useAxios<PostInterface>({
		method: "GET",
		baseURL: BASE_URL,
		url: `${id}`,
	});

	const viewHandler = async () => {
		await axios
			.patch(`${BASE_URL}/${id}/viewcount`)
			.then((res) => {
				setView(res.data.views);
			})
			.catch((errorMessage) => {
				setErr(errorMessage);
			});
	};

	const likesHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		axios
			.put(`${BASE_URL}/${id}/like`)
			.then(() => {
				sendData();
			})
			.catch((errorMessage) => {
				setErr(errorMessage);
			});
	};

	const dislikesHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		axios
			.delete(`${BASE_URL}/${id}/like`)
			.then(() => {
				sendData();
			})
			.catch((errorMessage) => {
				setErr(errorMessage);
			});
	};

	useEffect(() => {
		if (id) {
			sendData();
		}
	}, [id]);

	useEffect(() => {
		viewHandler();
	}, []);

	return (
		<Container>
			{err && <p>{err}</p>}
			{loading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			{!error && !loading && (
				<>
					<img
						src={response?.data.thumbnail}
						alt={response?.data.title}
						style={{ maxWidth: "100%" }}
					/>
					<h3>{response?.data.title}</h3>
					<p>{response?.data.body}</p>
					<span>Views: {view}</span>
					<br />
					<span>Likes:{response?.data.likes}</span>
					<br />
					<button type="button" onClick={(e) => likesHandler(e)}>
						Like
					</button>
					<button type="button" onClick={(e) => dislikesHandler(e)}>
						Dislike
					</button>
					<Comments id={response?.data._id} />
				</>
			)}
		</Container>
	);
}

export default PostPage;
