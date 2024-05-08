import ScrollToTop from "../ScrollToTop";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<ScrollToTop />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
