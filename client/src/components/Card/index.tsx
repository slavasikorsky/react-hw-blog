import { Link } from "react-router-dom";
import styled from "styled-components";
import IPost from "../../types/types";

const CardItem = styled.div`
	border: 1px solid #c2c3c4;
	padding: 10px 12px;
	width: calc(50% - 20px / 2);
	border-radius: 6px;
`;

function Card({ id, title }: IPost) {
	return (
		<CardItem key={id}>
			<small>id: {id}</small>
			<h5>{title}</h5>
			<Link to={`/post/${id}`}>Read more</Link>
		</CardItem>
	);
}

export default Card;
