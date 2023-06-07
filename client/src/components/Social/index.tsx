import styled from "styled-components";
import { ISocialItem } from "../../types/types";

interface ISocial {
	socialList: ISocialItem[];
}

const SocialList = styled.div`
	list-style: none;
	display: flex;
	li {
		margin-right: 20px;
	}
`;

function Social({ socialList }: ISocial) {
	return (
		<>
			<h3>Social links</h3>
			{socialList && (
				<SocialList>
					{socialList.map((social: ISocialItem) => (
						<li key={social.name}>
							<a href={social.url}>{social.name}</a>
						</li>
					))}
				</SocialList>
			)}
		</>
	);
}

export default Social;
