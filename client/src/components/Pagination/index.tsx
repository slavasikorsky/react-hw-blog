import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { decrement, increment, goToPage } from "../../store/counterSlice";
import { RootState } from "../../store/store";
import Button from "../Button";

interface IPagination {
	pageCount: number;
	postsLength: number;
}

const PaginationWrapper = styled.div`
	margin: 20px auto 0;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

function Pagination({ pageCount, postsLength }: IPagination) {
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.counter.value);

	return (
		<PaginationWrapper>
			{count > 0 && (
				<Button onClick={() => dispatch(decrement())}>PREV!</Button>
			)}
			{count < postsLength - pageCount && (
				<Button onClick={() => dispatch(increment())}>NEXT!</Button>
			)}
			<span>Page: </span>
			<select
				value={count / pageCount}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
					dispatch(goToPage(parseInt(e.target.value, 10)))
				}
			>
				{[...Array(pageCount).keys()].map((page) => (
					<option key={page} value={page}>
						{page + 1}
					</option>
				))}
			</select>
		</PaginationWrapper>
	);
}

export default Pagination;
