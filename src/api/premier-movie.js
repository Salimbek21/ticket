import { httpGet } from ".";

export const apiPremierMovieGet = (params) => {
	return httpGet({
		url: "/premiere-slides/weekly",
		params: {
			index: 1,
			size: 10,
		},
	});
};

export const apiFilmsDetail = (id) => {
	return httpGet({
		url: `films/${id}`,
	});
};
