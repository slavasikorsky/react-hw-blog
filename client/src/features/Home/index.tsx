import Container from "../../components/Container";
import CTA from "../../components/CTA";
import FeaturedPosts from "../../components/FeaturedPosts";

function Home() {
	return (
		<Container>
			<h1>Home page</h1>
			<CTA
				color="#000"
				backgroundColor="#97fdfb"
				heading="Lorem ipsum"
				text="default text"
				buttonLabel="Link"
			/>
			<FeaturedPosts postsCount={4} />
		</Container>
	);
}

export default Home;
