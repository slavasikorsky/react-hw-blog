import { useEffect } from "react";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import IPost from "../../types/types";
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
	const URL = "https://jsonplaceholder.typicode.com";
	// hardcoded
	const { response, loading, error, sendData } = useAxios({
		method: "GET",
		baseURL: URL,
		url: `/posts?_start=0&_limit=${postsCount}`,
	});

	useEffect(() => {
		sendData();
	}, []);
	return (
		<>
			<h3>Featured posts</h3>
			{loading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			{!loading && !error && (
				<CardsWrapper>
					{response?.data.map((item: IPost) => (
						<Card key={item.id} id={item.id} title={item.title} />
					))}
				</CardsWrapper>
			)}
		</>
	);
}

export default FeaturedPosts;
