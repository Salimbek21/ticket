import Image from "next/image";
import cls from "./about-film.module.scss";
import pandaImg from "/public/images/panda.jpeg";
import pandaImg1 from "/public/images/panda1.jpg";
import { BASE_URL_IMAGE } from "@/api/url";

const AboutFilm = ({ data }) => {
	const formatDuration = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;

		const formattedHours = hours < 10 ? `0${hours}` : hours;
		const formattedMinutes =
			remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;

		return `${formattedHours}:${formattedMinutes}`;
	};

	return (
		<div className="container">
			<div className={cls.about_film}>
				<div className={cls.film_header}>О фильме</div>
				<div className={cls.film_content}>
					<div className={cls.film_content_table}>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Дата премьеры</div>
							<div className={cls.item_value}>
								{data.premiereDateWorldWide.split("/")[2]}
							</div>
						</div>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Страны</div>
							<div className={cls.item_value}>США</div>
						</div>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Жанры</div>
							<div className={cls.item_value}>{data.genres.join(" • ")}</div>
						</div>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Режиссер</div>
							<div className={cls.item_value}>{data.director}</div>
						</div>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Продолжительность</div>
							<div className={cls.item_value}>
								{`${data.duration} мин. / ${formatDuration(data.duration)}`}
							</div>
						</div>
					</div>
					<div className={cls.film_content_actors}>
						<div className={cls.actors_header}>Актеры</div>
						<div className={cls.actors_list}>
							{data.actors
								.sort((a, b) => a.order - b.order)
								.map((item, i) => (
									<div key={i} className={cls.list_item}>
										<div className={cls.item_pic}>
											<Image
												src={`${BASE_URL_IMAGE}${item.picturePath}`}
												alt={item.name}
												width={400}
												height={400}
											/>
										</div>
										<div className={cls.item_name}>{item.name}</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutFilm;
