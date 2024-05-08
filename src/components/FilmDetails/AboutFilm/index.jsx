import Image from "next/image";
import cls from "./about-film.module.scss";
import pandaImg from "/public/images/panda.jpeg";
import pandaImg1 from "/public/images/panda1.jpg";

const AboutFilm = () => {
	return (
		<div className="container">
			<div className={cls.about_film}>
				<div className={cls.film_header}>О фильме</div>
				<div className={cls.film_content}>
					<div className={cls.film_content_table}>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Дата премьеры</div>
							<div className={cls.item_value}>2016</div>
						</div>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Страны</div>
							<div className={cls.item_value}>США</div>
						</div>
					</div>
					<div className={cls.film_content_actors}>
						<div className={cls.actors_header}>Актеры</div>
						<div className={cls.actors_list}>
							<div className={cls.list_item}>
								<div className={cls.item_pic}>
									<Image src={pandaImg} alt="Actor image" />
								</div>
								<div className={cls.item_name}>Марк Уолберг</div>
							</div>
							<div className={cls.list_item}>
								<div className={cls.item_pic}>
									<Image src={pandaImg1} alt="Actor image" />
								</div>
								<div className={cls.item_name}>Марк Уолберг</div>
							</div>
							<div className={cls.list_item}>
								<div className={cls.item_pic}>
									<Image src={pandaImg} alt="Actor image" />
								</div>
								<div className={cls.item_name}>Марк Уолберг</div>
							</div>
							<div className={cls.list_item}>
								<div className={cls.item_pic}>
									<Image src={pandaImg1} alt="Actor image" />
								</div>
								<div className={cls.item_name}>Марк Уолберг</div>
							</div>
							<div className={cls.list_item}>
								<div className={cls.item_pic}>
									<Image src={pandaImg} alt="Actor image" />
								</div>
								<div className={cls.item_name}>Марк Уолберг</div>
							</div>
							<div className={cls.list_item}>
								<div className={cls.item_pic}>
									<Image src={pandaImg1} alt="Actor image" />
								</div>
								<div className={cls.item_name}>Марк Уолберг</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutFilm;
