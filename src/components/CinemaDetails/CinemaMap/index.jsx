import { useEffect, useState } from "react";
import Link from "next/link";
import cls from "./cinema-map.module.scss";
import { BlackPathIcon } from "@/components/svg";

const CinemaMap = ({ data }) => {
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
					<div dangerouslySetInnerHTML={{ __html: data.mapFrameCode }} />
				</div>
			</div>
		</div>
	);
};

export default CinemaMap;
