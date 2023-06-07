type TextProps = {
	title: string;
	text: string;
};

function Text({ title, text }: TextProps) {
	return (
		<>
			<h2>{title}</h2>
			<p>{text}</p>
		</>
	);
}

export default Text;
