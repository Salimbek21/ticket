import Premieres from "../Home/Premieres";
import AboutFilm from "./AboutFilm";
import FilmHero from "./FilmHero";
import FilmPoster from "./FilmPoster";

const FilmDetails = () => {
	return (
		<>
			<FilmHero />
			<FilmPoster />
			<AboutFilm />
			<Premieres />
		</>
	);
};

export default FilmDetails;
