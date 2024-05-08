import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, EffectFade, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "swiper/css/thumbs";
import Image from "next/image";
import Link from "next/link";
import { TicketIcon } from "@/components/svg";
import cls from "./cinema-hero.module.scss";
import { cinemaName } from "@/mock/temporary-data";
import BASE_URL, { BASE_URL_IMAGE } from "@/api/url";

const CinemaHero = ({ data }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [spaceBetween, setSpaceBetween] = useState(10);
	const [activeSlideKey, setActiveSlideKey] = useState(0);

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
		<div className="container">
			<div className={cls.cinema_hero_details_wrapper}>
				<div className={cls.cinema_hero_details_gallery}>
					<Swiper
						spaceBetween={spaceBetween}
						watchSlidesProgress={true}
						modules={[Thumbs, Autoplay, EffectFade, FreeMode]}
						effect="fade"
						fadeEffect={{ crossFade: true }}
						loop={true}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						freeMode={true}
						thumbs={{
							swiper:
								thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
						}}
						className={cls.gallery_window}
						onSlideChange={(swiper) => handleSlideChange(swiper)}
					>
						{data.photos.map((item, i) => {
							return (
								<SwiperSlide
									key={i}
									className={`${cls.gallery_swiper_slide} ${
										activeSlideKey === i ? cls.gallery_swiper_slide_active : ""
									}`}
								>
									<div className={cls.window_pic}>
										<Image
											src={`${BASE_URL_IMAGE}${item?.path}`}
											alt={`Cinema ${item.name} Image`}
											width={400}
											height={400}
										/>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={spaceBetween}
						slidesPerView={4}
						modules={[Thumbs, Autoplay, EffectFade, FreeMode]}
						loop={true}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						className={cls.gallery_preview}
					>
						{data.photos.map((item, i) => {
							return (
								<SwiperSlide
									key={i}
									className={`${cls.gallery_swiper_slide} ${
										activeSlideKey === i ? cls.gallery_swiper_slide_active : ""
									}`}
								>
									<div className={cls.window_pic}>
										<Image
											src={`${BASE_URL_IMAGE}${item?.path}`}
											alt={`Cinema ${item.name} Image`}
											width={400}
											height={400}
										/>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
				<div className={cls.cinema_hero_details_info}>
					<div className={cls.info_title}>{data.name}</div>
					<div className={cls.info_title_address}>{data.address}</div>
					<div className={cls.info_session_btn}>
						<Link className={cls.info_session_link} href="#poster">
							<span className={cls.link_icon}>
								<TicketIcon />
							</span>
							<span className={cls.link_text}>Сеансы</span>
						</Link>
					</div>
					<div className={cls.info_desc}>{data.description}</div>
					<div className={cls.info_facilities}>
						{data.features.map((item, i) => (
							<div key={i} className={cls.facilities_item}>
								<img src={`${BASE_URL_IMAGE}${item.icon}`} alt="" />
								<span>{item.text}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CinemaHero;
