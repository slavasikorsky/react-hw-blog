import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { PostInterface } from "../../types/types";

function PostPage() {
	const routeParams = useParams<{ id: string | undefined }>();
	const [post, setPost] = useState<PostInterface | undefined>();
	const [error, setError] = useState<unknown | null>(null);
	const [view, serView] = useState(0);
	const { id } = routeParams;

	const BASE_URL = `http://localhost:5010/posts`;
	const getPost = async () => {
		try {
			const result = await axios.get(`${BASE_URL}/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setPost(result.data);
		} catch (err) {
			setError(err);
		}
	};

	const viewHandler = async () => {
		await axios
			.patch(`${BASE_URL}/${id}/viewcount`)
			.then((res) => {
				serView(res.data.views);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const likesHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		axios
			.put(`${BASE_URL}/${id}/like`)
			.then((res) => {
				setPost(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const dislikesHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		axios
			.delete(`${BASE_URL}/${id}/like`)
			.then((res) => {
				setPost(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};

	useEffect(() => {
		getPost();
		viewHandler();
	}, []);

	return (
		<Container>
			{error && <p>{error.message}</p>}
			{!error && (
				<>
					<img
						src={post?.thumbnail}
						alt={post?.title}
						style={{ maxWidth: "100%" }}
					/>
					<h3>{post?.title}</h3>
					<p>{post?.body}</p>
					<span>Views: {view}</span>
					<br />
					<span>Likes:{post?.likes}</span>
					<br />
					<button type="button" onClick={(e) => likesHandler(e)}>
						Like
					</button>
					<button type="button" onClick={(e) => dislikesHandler(e)}>
						Dislike
					</button>
				</>
			)}
		</Container>
	);
}

export default PostPage;
