import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { PostInterface } from "../../types/types";
import Card from "../Card";

type PostProps = {
	postsCount: number;
};

const CardsWrapper = styled.div`
	display: flex;
	flex-flow: wrap;
	gap: 20px;
`;

function FeaturedPosts({ postsCount }: PostProps) {
	const [lastPosts, setLastPosts] = useState<PostInterface[] | null>(null);
	const [error, setError] = useState<unknown | boolean>(false);

	const BASE_URL = `http://localhost:5010/posts`;
	const getAllPosts = async () => {
		try {
			const result = await axios.get(BASE_URL, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setLastPosts(result.data.data.slice(0, postsCount));
			setError(false);
		} catch (err) {
			setError(err);
		}
	};
	useEffect(() => {
		getAllPosts();
	}, []);
	return (
		<>
			<h3>Featured posts</h3>
			{error}
			{!error && (
				<CardsWrapper>
					{lastPosts?.map((item: PostInterface) => (
						<Card
							key={item._id}
							_id={item._id}
							title={item.title}
							thumbnail={item.thumbnail}
							body={item.body}
						/>
					))}
				</CardsWrapper>
			)}
		</>
	);
}

export default FeaturedPosts;
