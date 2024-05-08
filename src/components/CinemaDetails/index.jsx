import { useEffect } from "react";
import AboutCinema from "./AboutCinema";
import CinemaHero from "./CinemaHero";
import CinemaMap from "./CinemaMap";
import CinemaPoster from "./CinemaPoster";

const CinemaDetails = ({ data }) => {
  console.log(data, "data");
  useEffect(() => {
	window.scrollTo(0, 0);
	console.log('startt');
  }, []);
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
