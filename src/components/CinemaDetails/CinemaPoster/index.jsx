import Image from "next/image";
import cls from "./cinema-poster.module.scss";
import pandaImg1 from "/public/images/panda1.jpg";
import Link from "next/link";

const CinemaPoster = ({ data }) => {
	console.log(data, "Cinema poster data");
	// console.log(data1, "Cinema poster data1");

	return (
		<div className="container">
			<div className={cls.cinema_poster} id="poster">
				<h2 className={cls.cinema_poster_header}>Афиша на сегодня</h2>
				<div className={cls.cinema_poster_general}>
					<div className={cls.cinema_poster_info}>
						<div className={cls.info_left}>
							<div className={cls.left_image}>
								<Image src={pandaImg1} alt="Poster photo" />
							</div>
							<div className={cls.left_info}>
								<div className={cls.left_name_top}>
									<Link href="#" className={cls.left_name}>
										{data.name}
									</Link>
								</div>
								<div className={cls.left_genres}>
									<p>Мультфильм</p>
									<span></span>
									<p>Фнатастика</p>
								</div>
							</div>
						</div>
						<div className={cls.info_right}>
							{Array.from({ length: 7 }).map((_, index) => (
								<Link href="#" className={cls.right_card}>
									<div className={cls.card_top}>
										<div className={cls.top_hall}>
											<div className={cls.hall_num}>Зал 1</div>
										</div>
										<div className={cls.hall_format}>2D</div>
										<div className={cls.hall_price}>60 000 сум</div>
									</div>
									<div className={cls.card_btn_time}>
										<div className={cls.btn_time}>10:00</div>
									</div>
								</Link>
							))}
						</div>
					</div>
					<div className={cls.cinema_poster_more_btn}>
						<button className={cls.more_btn}>Показать еще</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CinemaPoster;
