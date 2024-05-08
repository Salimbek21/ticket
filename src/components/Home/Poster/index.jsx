import { useState, useEffect } from "react";
import cls from "./poster.module.scss";
import Link from "next/link";
import Image from "next/image";
import pandaImg from "/public/images/panda.jpeg";
import pandaImg1 from "/public/images/panda1.jpg";
import { ArrowDownIcon, ExclamationIcon } from "@/components/svg";
import { cardInfo } from "@/mock/temporary-data";
import { useDispatch, useSelector } from "react-redux";
import { filmsThunk } from "@/store/films/filmsThunk";
import { cinemasThunk } from "@/store/cinemas/cinemasThunk";

const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const months = [
	"январь",
	"февраль",
	"март",
	"апрель",
	"май",
	"июнь",
	"июль",
	"август",
	"сентябрь",
	"октябрь",
	"ноябрь",
	"декабрь",
];

const Poster = () => {
	const [dates, setDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState("Сегодня");
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
	const [openDropdown, setOpenDropdown] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);
	const [selectedCinema, setSelectedCinema] = useState(null);

	const dispatch = useDispatch();
	const cinemaData = useSelector((state) => state.cinemas);
	const filmsData = useSelector((state) => state.films?.films);

	useEffect(() => {
		dispatch(filmsThunk({ index: 1, size: 10, date: "2024-04-22" }));
		dispatch(cinemasThunk());
		generateDates();
	}, [dispatch]);

	const generateDates = () => {
		const today = new Date();
		const next7Days = [];

		for (let i = 0; i < 7; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);

			const dayOfWeek = daysOfWeek[date.getDay()];
			const formattedDate = date.getDate().toString().padStart(2, "0");
			const monthIndex = date.getMonth();
			const formattedMonth = months[monthIndex];

			const displayDate =
				i === 0 ? `Сегодня` : i === 1 ? `Завтра` : `${formattedDate}`;

			const dayInfo = {
				date: displayDate,
				dayOfWeek: dayOfWeek,
				monthIndex: monthIndex,
				isHighlighted: dayOfWeek === "Сб" || dayOfWeek === "Вс",
			};

			next7Days.push(dayInfo);
		}

		setDates(next7Days);
	};

	const handleToggleDropdown = () => {
		setOpenDropdown(!openDropdown);
	};

	const handleCinemaSelect = (cinemaName) => {
		setSelectedCinema(cinemaName);
		dispatch(filmsThunk({ cinemaName, date: "2024-04-22" }));

		setOpenDropdown(false);
	};

	const handleDayClick = (day, monthIndex) => {
		setSelectedDate(day);
		setSelectedMonth(monthIndex);
	};

	const isTodayOrTomorrow = (date) => {
		return date === "Сегодня" || date === "Завтра";
	};

	return (
		<div className="container">
			<div className={cls.poster} id="poster">
				<div className={cls.poster_top}>
					<div className={cls.poster_top_info}>
						<h2 className={cls.poster_header}>
							Афиша на{" "}
							{!isTodayOrTomorrow(selectedDate)
								? `${selectedDate} ${months[selectedMonth]}`
								: selectedDate}
						</h2>
						<div
							className={
								cls.poster_choice + " " + (openDropdown ? cls.opened : "")
							}
						>
							<button onClick={handleToggleDropdown} className={cls.choice_btn}>
								<span>Выбрать кинотеатр</span>
								<ArrowDownIcon />
							</button>
							{openDropdown && (
								<ul className={cls.cinema_list}>
									{cinemaData?.cinemas?.map((item) => (
										<li
											key={item.id}
											className={`${cls.item} ${
												selectedCinema === item.name ? cls.active : ""
											}`}
										>
											<button
												onClick={() => handleCinemaSelect(item.name)}
												className={cls.btn}
											>
												<span className={cls.checkbox}></span>
												<span className={cls.cinema_name}>{item.name}</span>
											</button>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
					<div className={cls.daysContainer}>
						<div className={cls.days_calendar}>
							{dates.map((day, index) => (
								<div key={index} className={cls.day_box}>
									<button
										className={`${cls.day}  ${
											selectedDate === day.date ? cls.selected : ""
										}`}
										onClick={() => handleDayClick(day.date, day.monthIndex)}
									>
										<div className={cls.day_date}>{day.date}</div>
										<div
											className={`${cls.day_week} ${
												day.isHighlighted ? cls.highlighted : ""
											}`}
										>
											{day.dayOfWeek}
										</div>
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={cls.poster_cards}>
					{filmsData.items &&
						filmsData.items.map((item) => {
							return (
								<Link
									key={item.id}
									className={cls.poster_card}
									href="/film/filmdetailid"
								>
									<div className={cls.card_top}>
										<div className={cls.top_pic}>
											<Image
												src={`https://kinoticket.uz${item?.picturePath}`}
												alt="Poster image"
												layout="fill"
											/>
										</div>
									</div>
									<div className={cls.card_bottom}>
										<div className={cls.bottom_name}>{item.name}</div>

										<div className={cls.bottom_genres}>
											<p>{item.genres.join(" • ")}</p>
										</div>
										<div className={cls.poster_card_line}></div>
										<div className={cls.poster_card_info}>
											<ExclamationIcon />
											<span>
												{item.sessionsCount} сеансов в {item.cinemasCount}{" "}
												кинотеатрах
											</span>
										</div>
									</div>
								</Link>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default Poster;
