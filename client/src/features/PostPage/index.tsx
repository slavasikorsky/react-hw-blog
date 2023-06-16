import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { PostInterface } from "../../types/types";

function PostPage() {
	const routeParams = useParams<{ id: string | undefined }>();
	const [post, setPost] = useState<PostInterface | undefined>();
	const [error, setError] = useState<unknown | null>(null);
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
	useEffect(() => {
		getPost();
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
					<span>{post?.createdAt}</span>
				</>
			)}
		</Container>
	);
}

export default PostPage;
