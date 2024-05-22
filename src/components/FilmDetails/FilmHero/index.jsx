import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, EffectFade, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "swiper/css/thumbs";
import Image from "next/image";
import cls from "./film-hero.module.scss";
import pandaImg from "/public/images/panda.jpeg";
import pandaImg1 from "/public/images/panda1.jpg";
import Link from "next/link";
import { PlayIcon, RatingMarkLogo, TicketIcon } from "@/components/svg";
import BASE_URL, { BASE_URL_IMAGE } from "@/api/url";
import TrailerPopUp from "@/components/Home/Hero/PopUp";

const FilmHero = ({ data }) => {
	console.log(data, "Data hero");
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [spaceBetween, setSpaceBetween] = useState(10);
	const [activeSlideKey, setActiveSlideKey] = useState(0);
	const [isOpenPopUp, setIsOpenPopUp] = useState(false);
	const [iframe, setIframe] = useState(null);

	const openPopUp = (item) => {
		setIframe(item);
		setIsOpenPopUp(true);
	};

	const closePopUp = () => {
		setIsOpenPopUp(false);
	};

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth;
			if (screenWidth >= 0) {
				setSpaceBetween(5);
			}

			if (screenWidth >= 768) {
				setSpaceBetween(10);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleSlideChange = (swiper) => {
		setActiveSlideKey(swiper.realIndex);
	};

	return (
		<>
			<div className="container">
				<div className={cls.details_wrapper}>
					<div className={cls.details_gallery}>
						<Swiper
							loop={true}
							spaceBetween={spaceBetween}
							watchSlidesProgress={true}
							modules={[Thumbs, Autoplay, EffectFade, FreeMode]}
							effect="fade"
							fadeEffect={{ crossFade: true }}
							freeMode={true}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							thumbs={{
								swiper:
									thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
							}}
							className={cls.gallery_window}
							onSlideChange={(swiper) => handleSlideChange(swiper)}
						>
							{data.frames?.map((item, i) => {
								return (
									<SwiperSlide
										className={`${cls.gallery_swiper_slide} ${
											activeSlideKey === i
												? cls.gallery_swiper_slide_active
												: ""
										}`}
									>
										<div className={cls.window_pic}>
											<Image
												src={`${BASE_URL_IMAGE}/${item?.picturePath}`}
												alt={`Film ${item.name} Image`}
												width={400}
												height={400}
											/>
										</div>
										{i === 0 && (
											<button
												className={cls.cover_item_play_btn}
												onClick={() => openPopUp(item)}
											>
												<span>
													<PlayIcon />
												</span>
											</button>
										)}
									</SwiperSlide>
								);
							})}
						</Swiper>
						<Swiper
							onSwiper={setThumbsSwiper}
							loop={true}
							spaceBetween={spaceBetween}
							slidesPerView={4}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							modules={[Thumbs, Autoplay, EffectFade, FreeMode]}
							className={cls.gallery_preview}
						>
							{data.frames.map((item, i) => {
								return (
									<SwiperSlide
										key={i}
										className={`${cls.gallery_swiper_slide} ${
											activeSlideKey === i
												? cls.gallery_swiper_slide_active
												: ""
										}`}
									>
										<div className={cls.window_pic}>
											<Image
												src={`${BASE_URL_IMAGE}/${item.picturePath}`}
												alt={`Film ${item.name} Image`}
												width={400}
												height={400}
											/>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
					<div className={cls.details_info}>
						<div className={cls.info_title}>{data.name}</div>
						<div className={cls.info_title_en}>{data.nameEn}</div>
						<div className={cls.info_rating}>
							<span className={cls.info_rating_icon}>
								<RatingMarkLogo />
							</span>
							<span className={cls.info_rating_value}>{data.rating}</span>
						</div>
						<div className={cls.info_pay_btn}>
							<Link className={cls.info_pay_link} href="#poster">
								<span className={cls.link_icon}>
									<TicketIcon />
								</span>
								<span className={cls.link_text}>Купить билеты</span>
							</Link>
						</div>
						<div className={cls.info_shorts}>
							<p>{data.premiereDateUzbekistan.split("/")[2]}</p>
							<span></span>
							<p>{data.ratingMPAA}</p>
							<span></span>
							<p>{data.genres.join(" • ")}</p>
						</div>
						<div className={cls.info_desc}>
							<p>{data.announce}</p>
						</div>
					</div>
				</div>
			</div>
			{openPopUp && (
				<TrailerPopUp
					iframe={iframe}
					isOpen={isOpenPopUp}
					onClose={closePopUp}
				/>
			)}
		</>
	);
};

export default FilmHero;
