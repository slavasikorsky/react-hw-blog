import { Link } from "react-router-dom";
import Container from "../../components/Container";

function NotFound() {
	return (
		<Container>
			<h1>Not found page</h1>
			<p>404</p>
			<Link to="/">Go to homepage</Link>
		</Container>
	);
}

export default NotFound;
