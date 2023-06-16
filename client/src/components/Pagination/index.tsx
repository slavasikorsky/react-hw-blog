import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { decrement, increment, goToPage } from "../../store/counterSlice";
import { RootState } from "../../store/store";
import Button from "../Button";

interface IPagination {
	numberOfPages: number;
}

const PaginationWrapper = styled.div`
	margin: 20px auto 0;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

function Pagination({ numberOfPages }: IPagination) {
	const dispatch = useDispatch();
	const count = useSelector((state: RootState) => state.counter.value);

	return (
		<PaginationWrapper>
			{count > 1 && (
				<Button onClick={() => dispatch(decrement())}>PREV!</Button>
			)}
			{count < numberOfPages && (
				<Button onClick={() => dispatch(increment())}>NEXT!</Button>
			)}
			<span>Page: </span>
			<select
				value={count}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
					dispatch(goToPage(parseInt(e.target.value, 10)))
				}
			>
				{[...Array(numberOfPages).keys()].map((page) => (
					<option key={page + 1} value={page + 1}>
						{page + 1}
					</option>
				))}
			</select>
		</PaginationWrapper>
	);
}

export default Pagination;
