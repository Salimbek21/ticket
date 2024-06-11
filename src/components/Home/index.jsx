import Cinemas from "./Cinemas";
import Hero from "./Hero";
import Poster from "./Poster";
import Premieres from "./Premieres";
import ReleasedSoon from "./ReleasedSoon";

const Home = () => {
	return (
		<>
			<Hero />
			<Poster />
			<Premieres />
			<ReleasedSoon />
			<Cinemas />
		</>
	);
};

export default Home;
