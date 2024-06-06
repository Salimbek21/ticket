import Head from "next/head";

const defaultMetadata = {
	title: {
		default: "Главная - KinoTicket",
		template: "%s - KinoTicket",
	},
	description:
		"This is the main page of KinoTicket, where you can find and book tickets for the latest movies.",
	keywords: "movies, cinema, tickets, KinoTicket, films, showtimes",
	openGraph: {
		url: "https://kinoticket.uz",
		site_name: "KinoTicket",
		image: "https://kinoticket.uz/og-image.jpg",
		imageWidth: 800,
		imageHeight: 600,
		imageAlt: "KinoTicket Open Graph Image",
	},
	twitter: {
		card: "summary_large_image",
		site: "@KinoTicket",
	},
};

const SEO = ({
	title: pageTitle,
	description,
	keywords,
	openGraph,
	twitter,
	children,
}) => {
	const title = pageTitle
		? defaultMetadata.title.template.replace("%s", pageTitle)
		: defaultMetadata.title.default;

	const metaDescription = description || defaultMetadata.description;
	const metaKeywords = keywords || defaultMetadata.keywords;
	const og = openGraph || {};
	const tw = twitter || {};

	return (
		<Head>
			{children}
			<title>{title}</title>
			<meta name="description" content={metaDescription} />
			<meta name="keywords" content={metaKeywords} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={metaDescription} />
			<meta
				property="og:url"
				content={og.url || defaultMetadata.openGraph.url}
			/>
			<meta
				property="og:site_name"
				content={og.site_name || defaultMetadata.openGraph.site_name}
			/>
			<meta
				property="og:image"
				content={og.image || defaultMetadata.openGraph.image}
			/>
			<meta
				property="og:image:width"
				content={og.imageWidth || defaultMetadata.openGraph.imageWidth}
			/>
			<meta
				property="og:image:height"
				content={og.imageHeight || defaultMetadata.openGraph.imageHeight}
			/>
			<meta
				property="og:image:alt"
				content={og.imageAlt || defaultMetadata.openGraph.imageAlt}
			/>
			<meta
				name="twitter:card"
				content={tw.card || defaultMetadata.twitter.card}
			/>
			<meta
				name="twitter:site"
				content={tw.site || defaultMetadata.twitter.site}
			/>
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={metaDescription} />
			<meta
				name="twitter:image"
				content={og.image || defaultMetadata.openGraph.image}
			/>
		</Head>
	);
};

export default SEO;
