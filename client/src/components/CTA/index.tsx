import styled from "styled-components";
import { useState } from "react";
import Popup from "../Popup";
import FormCustom from "../FormCustom";
import CTAForm from "../../data/CTAForm";

type CTAProps = {
	color?: string;
	backgroundColor?: string;
	heading: string;
	text: string;
	buttonLabel?: string;
};

const CTABlock = styled.div`
	margin: 20px 0;
	padding: 40px 20px;
	border: 1px solid #ccc;
	background-color: #646cff;
	text-align: center;
	border-radius: 5px;
`;

function CTA({ color, backgroundColor, heading, text, buttonLabel }: CTAProps) {
	const [openPopup, setOpenPopup] = useState(false);
	return (
		<>
			<CTABlock style={{ backgroundColor, color }}>
				<h3>{heading}</h3>
				<p>{text}</p>
				<br />
				{buttonLabel && (
					<button
						type="button"
						onClick={() => {
							setOpenPopup(!openPopup);
						}}
					>
						{buttonLabel}
					</button>
				)}
			</CTABlock>
			<Popup trigger={openPopup} setTrigger={setOpenPopup}>
				<FormCustom inputs={CTAForm} />
			</Popup>
		</>
	);
}

export default CTA;

CTA.defaultProps = {
	buttonLabel: null,
	backgroundColor: "#CCC",
	color: "#000",
};
