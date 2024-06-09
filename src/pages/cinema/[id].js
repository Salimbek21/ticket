import CinemaDetails from "@/components/CinemaDetails";
import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";

const CinemaDetailId = ({ data, data1 }) => {
	const router = useRouter();
	const pageTitle = data?.name;
	const pageDescription = `Details and information about ${data?.name}.`;
	const pageKeywords = `${data?.name}, cinema, movies, film information`;

	return <CinemaDetails data={data} data1={data1} />;
};

export const getServerSideProps = async (context) => {
	try {
		const baseURL = "http://185.196.213.181:32790/api/cinemas";
		// const res1 = await axios.get(
		// 	`${baseURL}/${context.query.id}/sessions?date=2024-06-08`
		// );
		// const data1 = res1.data.data;

		const res = await axios.get(`${baseURL}/${context.query.id}`);
		const data = res.data.data;

		return {
			props: {
				data: data || null,
				// data1: data1 || null,
			},
		};
	} catch (error) {
		console.error("Error fetching film data:", error);
		return {
			props: {
				data: null,
				// data1: null,
			},
		};
	}
};

export default CinemaDetailId;
