import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, RatingMarkLogo } from "@/components/svg";
import cls from "./premieres.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { cardInfo } from "@/mock/temporary-data";
import { premierMoviesThunk } from "@/store/premierMovies/premierMoviesThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Premieres = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(premierMoviesThunk());
	}, []);
	const weeklyMovie = useSelector(
		(state) => state.premierMoviesWeekly.premierMovie
	);

	return (
		<div className="container">
			<div className={cls.premieres}>
				<div className={cls.premieres_top}>
					<h2 className={cls.premieres_header}>Премьеры недели</h2>
					<div className={cls.premieres_manage}>
						<button className={`${cls.manage_btns} ${cls.btn_prev}`}>
							<ArrowLeftIcon />
						</button>
						<button className={`${cls.manage_btns} ${cls.btn_next}`}>
							<ArrowLeftIcon />
						</button>
					</div>
				</div>
				<Swiper
					className={cls.premieres_slider}
					modules={[Navigation, Autoplay]}
					spaceBetween={30}
					slidesPerView={3}
					breakpoints={{
						0: {
							slidesPerView: 2.2,
							spaceBetween: 10,
						},
						430: {
							slidesPerView: 2.4,
							spaceBetween: 15,
						},
						520: {
							slidesPerView: 2.7,
						},
						635: {
							slidesPerView: 3.2,
						},
						690: {
							slidesPerView: 3.7,
							spaceBetween: 15,
						},
						768: {
							slidesPerView: 3,
						},
					}}
					navigation={{
						prevEl: `.${cls.btn_prev}`,
						nextEl: `.${cls.btn_next}`,
					}}
					loop={true}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
				>
					{weeklyMovie.map((item) => {
						return (
							<SwiperSlide key={item.id}>
								<Link
									className={cls.premieres_card}
									href={{
										pathname: "/film/[id]",
									}}
									as={`/film/${item.id}`}
									title={item?.film?.name}
								>
									<div className={cls.card_top}>
										<div className={cls.top_pic}>
											<Image
												src={`https://kinoticket.uz${item?.filmFrame?.picturePath}`}
												layout="fill"
												alt="Premieres image"
											/>
										</div>
										<div className={cls.top_rating}>
											<span className={cls.rating_icon}>
												<RatingMarkLogo />
											</span>
											<span className={cls.rating_text}>
												{/* {item.details.rating} */}
												{item.film.rating}
											</span>
										</div>
									</div>
									<div className={cls.card_bottom}>
										<div className={cls.bottom_name}>{item?.film?.name}</div>
										<div className={cls.bottom_genres}>
											<p>{item.film.genres}</p>
										</div>
										<div className={cls.bottom_time}>
											{item?.film.premiereDateUzbekistan}
										</div>
									</div>
								</Link>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default Premieres;
