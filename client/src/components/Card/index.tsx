import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostInterface } from "../../types/types";

const CardItem = styled.div`
	border: 1px solid #c2c3c4;
	padding: 10px 12px;
	width: calc(50% - 20px / 2);
	border-radius: 6px;
`;

function Card({ _id, title, body, thumbnail }: PostInterface) {
	const shortText = `${body?.slice(0, 10)} ...`;
	return (
		<CardItem key={_id}>
			<img src={thumbnail} alt={title} style={{ maxWidth: 150 }} />
			<h4>{title}</h4>
			<div
				dangerouslySetInnerHTML={{
					__html: shortText,
				}}
			/>
			<Link to={`/post/${_id}`}>Read more</Link>
		</CardItem>
	);
}

export default Card;
