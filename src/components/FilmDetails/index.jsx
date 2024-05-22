import React, { useEffect, useState } from "react";
import FilmHero from "./FilmHero";
import FilmPoster from "./FilmPoster";
import AboutFilm from "./AboutFilm";
import Premieres from "../Home/Premieres";
import BASE_URL from "@/api/url";

const FilmDetails = ({ data, data1 }) => {
	return (
		<>
			<FilmHero data={data} />
			<FilmPoster data1={data1} data={data} />
			<AboutFilm data={data} />
			<Premieres data={data} />
		</>
	);
};

export default FilmDetails;
