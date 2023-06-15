import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { Inputs } from "../../types/types";
import { RootState } from "../../store/store";
import Post from "../../components/Card";
import Container from "../../components/Container";
import Pagination from "../../components/Pagination";

const CardsWrapper = styled.div`
	display: flex;
	flex-flow: wrap;
	gap: 20px;
`;

function Blog() {
	const [posts, setPosts] = useState(null);
	const count = useSelector((state: RootState) => state.counter.value);

	const BASE_URL = "http://localhost:5010/posts/";
	const pageCount = 10;
	const postsLength = 100;

	const getAllPosts = async () => {
		try {
			const result = await axios.get(BASE_URL, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setPosts(result.data.data);
		} catch (err) {
			console.log("Error:", err);
		}
	};
	useEffect(() => {
		getAllPosts();
	}, []);

	return (
		<Container>
			<h3>Posts</h3>
			<>
				{count}
				<CardsWrapper>
					{posts &&
						posts.map((item: Inputs) => (
							<Post
								key={item._id}
								id={item._id}
								title={item.title}
							/>
						))}
				</CardsWrapper>

				<Pagination pageCount={pageCount} postsLength={postsLength} />
			</>
		</Container>
	);
}

export default Blog;
