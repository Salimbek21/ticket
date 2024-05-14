import { useEffect, useState } from "react";
import ScrollToTop from "../ScrollToTop";
import Footer from "./footer";
import Header from "./header";
import { Cookies } from "react-cookie";

const Layout = ({ children }) => {
  const cookie = new Cookies();
  const token = cookie.get("accessToken");
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(token);
  }, [token]);
  return (
    <>
      <Header token={data} />
      <ScrollToTop />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
