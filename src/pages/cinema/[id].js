import CinemaDetails from "@/components/CinemaDetails";
import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";

const CinemaDetailId = ({ data }) => {
	const router = useRouter();
	const pageTitle = data.name;
	const pageDescription = `Details and information about ${data.name}.`;
	const pageKeywords = `${data.name}, cinema, movies, film information`;

	return (
		// <Layout
		// 	pageTitle={pageTitle}
		// 	pageDescription={pageDescription}
		// 	pageKeywords={pageKeywords}
		// >
		<CinemaDetails data={data} />
		// </Layout>
	);
};

export const getServerSideProps = async (context) => {
	const baseURL = "http://185.196.213.181:32790/api/cinemas";
	const res = await axios.get(`${baseURL}/${context.query.id}`);
	const data = res.data.data;
	return {
		props: {
			data: data || null,
		},
	};
};

export default CinemaDetailId;
