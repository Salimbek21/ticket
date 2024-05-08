import { useEffect, useState } from "react";
import Link from "next/link";
import cls from "./cinema-map.module.scss";
import { BlackPathIcon } from "@/components/svg";
import {
  Map,
  Placemark,
  RulerControl,
  TrafficControl,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";

const CinemaMap = ({ data }) => {
  const [mapHeight, setMapHeight] = useState(450);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 758) {
        setMapHeight(250);
      } else {
        setMapHeight(450);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container">
      <div className={cls.map_wrapper}>
        <div className={cls.map_top}>
          <div className={cls.map_header}>Адрес</div>
          <Link
            href={`${data.mapLink}`}
            target="_blank"
            className={cls.map_link}
          >
            <BlackPathIcon />
            <span>Проложить маршрут</span>
          </Link>
        </div>
        <div className={cls.map_area}>
          {/* <YMaps query={{ lang: "en_RU" }}>
						<Map
							width={"100%"}
							height={`${mapHeight}px`}
							defaultState={{
								center: [41.2646, 69.2163],
								zoom: 12,
								controls: [],
							}}
						>
							<ZoomControl options={{ position: { top: 130, right: 15 } }} />
							<RulerControl options={{ position: { top: 10, right: 100 } }} />
							<Placemark
								geometry={[41.2646, 69.2163]}
								options={{
									iconColor: "#f37905",
								}}
							/>
							<TrafficControl options={{ float: "right" }} />
						</Map>
					</YMaps> */}
          <div dangerouslySetInnerHTML={{ __html: data.mapFrameCode }} />
        </div>
      </div>
    </div>
  );
};

export default CinemaMap;
