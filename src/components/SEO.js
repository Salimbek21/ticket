import Head from "next/head";

const defaultMetadata = {
	title: {
		default: "Главная - KinoTicket",
		template: "%s - KinoTicket",
	},
	description:
		"This is the main page of KinoTicket, where you can find and book tickets for the latest movies.",
	keywords: "movies, cinema, tickets, KinoTicket, films, showtimes",
};

const SEO = ({ title: pageTitle, description, keywords, children }) => {
	const title = pageTitle
		? defaultMetadata.title.template.replace("%s", pageTitle)
		: defaultMetadata.title.default;

	const metaDescription = description || defaultMetadata.description;
	const metaKeywords = keywords || defaultMetadata.keywords;

	return (
		<Head>
			{children}
			<title>{title}</title>
			<meta name="description" content={metaDescription} />
			<meta name="keywords" content={metaKeywords} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={metaDescription} />
		</Head>
	);
};

export default SEO;
