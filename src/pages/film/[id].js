import FilmDetails from "@/components/FilmDetails";
import SEO from "@/components/SEO";
import axios from "axios";
import { useRouter } from "next/router";

const FilmDetailId = ({ data, data1 }) => {
	const router = useRouter();

	const seoTitle = data.name;
	const seoDescription = data.name + " " + data.announce;
	const seoKeywords =
		"film, cinema, KinoTicket, movie details, kino detallari, kinolar, kino, multfilmlar, biletlar, yangiliklar";

	return (
		<>
			<SEO
				title={seoTitle}
				description={seoDescription}
				keywords={seoKeywords}
			/>
			<FilmDetails data={data} data1={data1} />
		</>
	);
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
