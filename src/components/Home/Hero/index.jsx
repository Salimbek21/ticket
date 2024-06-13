import { useState, useEffect } from "react";
import Link from "next/link";
import cls from "./hero.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import Image from "next/image";
import { ArrowLeftIcon, PlayIcon, RatingMarkLogo } from "@/components/svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import TrailerPopUp from "./PopUp";
import { useSelector, useDispatch } from "react-redux";
import { sliders } from "@/store/slider/sliderThunk";

const Hero = () => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const dispatch = useDispatch();
  const slidersData = useSelector((state) => state.slider.sliders);
  useEffect(() => {
    dispatch(
      sliders({
        index: 1,
        size: 10,
      })
    );
  }, []);
  const [isFadeEffect, setIsFadeEffect] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isSpace, setIsSpace] = useState(30);
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
        setSlidesPerView(2.3);
        setIsSpace(10);
      }

      if (screenWidth >= 768) {
        setIsFadeEffect(!isFadeEffect);
        setSlidesPerView(1);
        setIsSpace(30);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="container">
        <Swiper
          observer={true}
          observeParents={true}
          className={cls.banner_wrapper}
          modules={[Navigation, EffectFade, Autoplay]}
          spaceBetween={isSpace}
          slidesPerView={slidesPerView}
          navigation={{
            prevEl: `.${cls.btn_prev}`,
            nextEl: `.${cls.btn_next}`,
          }}
          onNavigationPrev={() => {
            setIsOpenPopUp(false);
          }}
          onNavigationNext={() => {
            setIsOpenPopUp(false);
          }}
          effect={isFadeEffect ? "fade" : "slide"}
          fadeEffect={{ crossFade: true }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {slidersData?.map((item) => (
            <SwiperSlide key={item.film.id}>
              <div className={cls.cover_item}>
                <div className={cls.cover_item_top}>
                  <div className={cls.cover_item_top_pic}>
                    <Image
                      src={`${baseUrl}${item?.trailer?.picturePath}`}
                      layout="fill"
                      alt="Movie banner"
                    />
                    <button
                      className={cls.cover_item_play_btn}
                      onClick={() => openPopUp(item)}
                    >
                      <span>
                        <PlayIcon />
                      </span>
                    </button>
                  </div>
                  <div className={cls.cover_item_rating}>
                    <span className={cls.cover_item_rating_icon}>
                      <RatingMarkLogo />
                    </span>
                    <span className={cls.cover_item_rating_text}>
                      {item?.film?.rating}
                    </span>
                  </div>
                </div>
                <div className={cls.cover_item_bottom}>
                  <div className={cls.bottom_info}>
                    <div className={cls.bottom_info_film}>
                      <div className={cls.film_name}>{item?.film?.name}</div>
                      <div className={cls.film_desc}>
                        <div className={cls.desc_tags}>
                          <span>{item?.film?.premiereDateUzbekistan}</span>
                          <span>{item?.film?.ratingMPAA}</span>
                        </div>
                        {item.film.genres.slice(0, 2).map((genreItem, i) => (
                          <div key={i} className={cls.desc_genres}>
                            <p>{genreItem}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={cls.bottom_manage}>
                    <Link
                      className={cls.manage_more}
                      key={item.id}
                      href={{
                        pathname: "/film/[id]",
                      }}
                      as={`/film/${item.film.id}`}
                      title={item.film.name}
                    >
                      <span>Подробнее</span>
                    </Link>
                    <div className={cls.manage_btns}>
                      <button className={`${cls.manage_btn} ${cls.btn_prev}`}>
                        <ArrowLeftIcon />
                      </button>
                      <button className={`${cls.manage_btn} ${cls.btn_next}`}>
                        <ArrowLeftIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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

export default Hero;
