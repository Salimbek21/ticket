import CinemaDetails from "@/components/CinemaDetails";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CinemaDetailId = ({ data }) => {
  const router = useRouter();


  return <CinemaDetails data={data} />;
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
