import cls from "./releasedSoon.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, RatingMarkLogo } from "@/components/svg";
import pandaImg from "/public/images/panda.jpeg";
import pandaImg1 from "/public/images/panda1.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { cardInfo } from "@/mock/temporary-data";
import { useDispatch, useSelector } from "react-redux";
import { upComingMoviesThunk } from "@/store/upComingMovies/upComingMoviesThunk";
import { useEffect } from "react";

const ReleasedSoon = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(upComingMoviesThunk());
	}, []);
	const upcomingMovies = useSelector(
		(state) => state.upComingMovies.upComingMovie
	);

	return (
		<div className="container">
			{upcomingMovies.length == 0 ? (
				"NotEnought"
			) : (
				<div className={cls.releasedsoon}>
					<div className={cls.releasedsoon_top}>
						<h2 className={cls.releasedsoon_header}>Скоро в прокате</h2>
						<div className={cls.releasedsoon_manage}>
							<button className={`${cls.manage_btns} ${cls.btn_prev}`}>
								<ArrowLeftIcon />
							</button>
							<button className={`${cls.manage_btns} ${cls.btn_next}`}>
								<ArrowLeftIcon />
							</button>
						</div>
					</div>
					<Swiper
						className={cls.releasedsoon_slider}
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
						{upcomingMovies.map((item) => {
							return (
								<SwiperSlide key={item.id}>
									<Link
										className={cls.releasedsoon_card}
										href={{
											pathname: "/film/[id]",
										}}
										as={`/film/${item.id}`}
									>
										<div className={cls.card_top}>
											<div className={cls.top_pic}>
												<Image
													src={item.details.img}
													alt="releasedsoon image"
												/>
											</div>
											<div className={cls.top_rating}>
												<span className={cls.rating_icon}>
													<RatingMarkLogo />
												</span>
												<span className={cls.rating_text}>
													{item.details.rating}
												</span>
											</div>
										</div>
										<div className={cls.card_bottom}>
											<div className={cls.bottom_name}>{item.name}</div>
											<div className={cls.bottom_genres}>
												<p>{item.details.genre.type1}</p>
												<span></span>
												<p>{item.details.genre.type2}</p>
											</div>
											<div className={cls.bottom_time}>
												{item.details.dates}
											</div>
										</div>
									</Link>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			)}
		</div>
	);
};

export default ReleasedSoon;
