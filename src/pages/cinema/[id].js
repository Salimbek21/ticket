import CinemaDetails from "@/components/CinemaDetails";
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
		const today = new Date().toISOString().split("T")[0];

		const res1 = await axios.get(
			`${baseURL}/${context.query.id}/sessions?index=1&size=10&date=${today}`
		);
		const data1 = res1.data.data.items;

		const res = await axios.get(`${baseURL}/${context.query.id}`);
		const data = res.data.data;

		return {
			props: {
				data: data || null,
				data1: data1 || null,
			},
		};
	} catch (error) {
		console.error("Error fetching film data:", error);
		return {
			props: {
				data: null,
				data1: null,
			},
		};
	}
};

export default CinemaDetailId;
