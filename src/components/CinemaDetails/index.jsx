import AboutCinema from "./AboutCinema";
import CinemaHero from "./CinemaHero";
import CinemaMap from "./CinemaMap";
import CinemaPoster from "./CinemaPoster";

const CinemaDetails = ({ data, data1 }) => {
	return (
		<>
			<CinemaHero data={data} />
			<CinemaPoster data={data} data1={data1} />
			<AboutCinema data={data} />
			<CinemaMap data={data} />
		</>
	);
};

export default CinemaDetails;
