import FilmDetails from "@/components/FilmDetails";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FilmDetailId = ({ data, data1 }) => {
	const router = useRouter();

	return <FilmDetails data={data} data1={data1} />;
};

export const getServerSideProps = async (context) => {
	try {
		const baseURL = "http://185.196.213.181:32790/api/films";
		const today = new Date().toISOString().split("T")[0];

		const res1 = await axios.get(
			`${baseURL}/${context.query.id}/sessions?index=1&size=10&date=${today}`
		);
		const data1 = res1.data.data;

		const res = await axios.get(`${baseURL}/${context.query.id}`);
		const data = res.data.data;

		return {
			props: {
				data1: data1 || null,
				data: data || null,
			},
		};
	} catch (error) {
		console.error("Error fetching film data:", error);
		return {
			props: {
				data1: null,
				data: null,
			},
		};
	}
};

export default FilmDetailId;
