import AboutCinema from "./AboutCinema";
import CinemaHero from "./CinemaHero";
import CinemaMap from "./CinemaMap";
import CinemaPoster from "./CinemaPoster";

const CinemaDetails = ({ data }) => {
  return (
    <>
      <CinemaHero data={data} />
      <CinemaPoster data={data} />
      <AboutCinema data={data} />
      <CinemaMap data={data} />
    </>
  );
};

export default CinemaDetails;
