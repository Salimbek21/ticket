import Link from "next/link";
import cls from "./cinemas.module.scss";
import { ArrowIcon } from "@/components/svg";
import { cinemaName } from "@/mock/temporary-data";
import { cinemasThunk } from "@/store/cinemas/cinemasThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cinemas = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cinemasThunk());
  }, []);
  const cinemasData = useSelector((state) => state.cinemas?.cinemas);
  return (
    <div className="container" id="cinemas">
      <div className={cls.cinemas}>
        <div className={cls.cinemas_header}>Кинотеатры Ташкента</div>
        <ul className={cls.cinemas_list}>
          {cinemasData?.map((item, i) => {
            return (
              <li key={i}>
                <Link
                  className={cls.cinemas_item}
                  href={{
                    pathname: "/cinema/[id]",
                  }}
                  as={`/cinema/${item.id}`}
                >
                  <div className={cls.cinemas_info}>
                    <span className={cls.item_name}>{item.name}</span>
                    <span className={cls.item_address}>{item.address}</span>
                  </div>
                  <ArrowIcon />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Cinemas;
