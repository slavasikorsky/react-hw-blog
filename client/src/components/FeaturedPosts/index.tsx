import { useEffect } from "react";
import styled from "styled-components";
import { PostInterface } from "../../types/types";
import Card from "../Card";
import useFetch from "../../hooks/useFetch";

type PostProps = {
	postsCount: number;
};

interface FeaturedPostsInterface {
	data: PostInterface[];
}

const CardsWrapper = styled.div`
	display: flex;
	flex-flow: wrap;
	gap: 20px;
`;

function FeaturedPosts({ postsCount }: PostProps) {
	const BASE_URL = `http://localhost:5010/posts`;
	const {
		data,
		error,
		handler: setFetch,
	} = useFetch<FeaturedPostsInterface>("GET");

	useEffect(() => {
		setFetch(BASE_URL);
	}, []);

	return (
		<>
			<h3>Featured posts</h3>
			{error && <p>error.message</p>}
			{!error && (
				<CardsWrapper>
					{data?.data.slice(0, postsCount).map((item) => (
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
