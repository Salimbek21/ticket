import { useEffect, useState } from "react";
import Head from "next/head";
import ScrollToTop from "../ScrollToTop";
import Footer from "./footer";
import Header from "./header";
import { Cookies } from "react-cookie";

const Layout = ({ children, pageTitle, pageDescription, pageKeywords }) => {
	const cookie = new Cookies();
	const token = cookie.get("accessToken");
	const [data, setData] = useState(null);

	useEffect(() => {
		setData(token);
	}, [token]);

	const defaultTitle = "Главная - KinoTicket";
	const defaultDescription =
		"KinoTicket - Film biletlari, kino yangiliklari va ko'proq ma'lumot.";
	const defaultKeywords = "kinolar, biletlari, yangiliklari, kino, multfilmlar";

	const title = pageTitle ? `${pageTitle} - KinoTicket` : defaultTitle;
	const description = pageDescription || defaultDescription;
	const keywords = pageKeywords || defaultKeywords;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header token={data} />
			<ScrollToTop />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
