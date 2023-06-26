import { useEffect } from "react";
import styled from "styled-components";
import { PostInterface } from "../../types/types";
import Card from "../Card";
import useAxios from "../../hooks/useAxios";

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
	const BASE_URL = `http://localhost:5010/`;
	const { response, loading, error, sendData } =
		useAxios<FeaturedPostsInterface>({
			method: "GET",
			baseURL: BASE_URL,
			url: `posts`,
		});

	useEffect(() => {
		sendData();
	}, []);

	return (
		<>
			<h3>Featured posts</h3>
			{loading && <p>loading</p>}
			{error && <p>error</p>}
			{!error && !loading && (
				<CardsWrapper>
					{response?.data.data.slice(0, postsCount).map((item) => (
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
