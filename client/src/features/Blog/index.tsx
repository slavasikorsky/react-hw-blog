import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { PostInterface } from "../../types/types";
import { RootState } from "../../store/store";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Pagination from "../../components/Pagination";

const CardsWrapper = styled.div`
	display: flex;
	flex-flow: wrap;
	gap: 20px;
`;

function Blog() {
	const [posts, setPosts] = useState<PostInterface[] | null>(null);
	const count = useSelector((state: RootState) => state.counter.value);

	const BASE_URL = `http://localhost:5010/posts?page=${count}`;
	const [numberOfPages, setNumberOfPages] = useState(0);

	const getAllPosts = async () => {
		try {
			const result = await axios.get(BASE_URL, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setNumberOfPages(result.data.numberOfPages);
			setPosts(result.data.data);
		} catch (err) {
			console.log("Error:", err);
		}
	};
	useEffect(() => {
		getAllPosts();
	}, [count]);

	return (
		<Container>
			<h3>Posts</h3>
			<>
				<CardsWrapper>
					{posts &&
						posts.map((item: PostInterface) => (
							<Card
								key={item._id}
								_id={item._id}
								title={item.title}
								thumbnail={item.thumbnail}
								body={item.body}
							/>
						))}
				</CardsWrapper>

				<Pagination numberOfPages={numberOfPages} />
			</>
		</Container>
	);
}

export default Blog;
