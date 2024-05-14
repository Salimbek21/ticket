import { httpGet } from ".";

export const apiGetFilms = (params) => {
	return httpGet({
		url: "films/active-sessions",
		params,
	});
};

export const apiFilmsDetail = (id) => {
	return httpGet({
		url: `films/${id}`,
	});
};
