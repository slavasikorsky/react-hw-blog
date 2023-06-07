import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import IPost from "../../types/types";
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
	const count = useSelector((state: RootState) => state.counter.value);

	const URL = "https://jsonplaceholder.typicode.com";
	const pageCount = 10;
	const postsLength = 100;
	const { response, loading, error, sendData } = useAxios({
		method: "GET",
		baseURL: URL,
		url: `/posts?_start=${count}&_limit=10`,
	});

	useEffect(() => {
		sendData();
	}, [count]);

	return (
		<Container>
			<h3>Posts</h3>
			<>
				{loading && <p>Loading...</p>}
				{error && <p>{error.message}</p>}
				{!loading && !error && (
					<CardsWrapper>
						{response?.data.map((item: IPost) => (
							<Post
								key={item.id}
								id={item.id}
								title={item.title}
							/>
						))}
					</CardsWrapper>
				)}
				<Pagination pageCount={pageCount} postsLength={postsLength} />
			</>
		</Container>
	);
}

export default Blog;
