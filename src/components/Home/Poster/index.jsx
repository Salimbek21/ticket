import { useState, useEffect } from "react";
import cls from "./poster.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownIcon, ExclamationIcon } from "@/components/svg";
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
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
	const [openDropdown, setOpenDropdown] = useState(false);
	const [selectedCinema, setSelectedCinema] = useState(null);

	const dispatch = useDispatch();
	const cinemaData = useSelector((state) => state.cinemas);
	const filmsData = useSelector((state) => state.films?.films);

	useEffect(() => {
		dispatch(cinemasThunk());
		generateDates();
	}, [dispatch]);

	useEffect(() => {
		dispatch(
			filmsThunk({
				index: 1,
				size: 10,
				date: selectedDate,
				cinemaId: selectedCinema ? selectedCinema.id : null,
			})
		);
	}, [dispatch, selectedDate, selectedCinema]);

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
			const isoDate = date.toISOString().split("T")[0]; // ISO formatda saqlash

			const displayDate =
				i === 0 ? `Сегодня` : i === 1 ? `Завтра` : `${formattedDate}`;

			const dayInfo = {
				date: isoDate, // ISO formatda saqlash
				displayDate: displayDate,
				dayOfWeek: dayOfWeek,
				monthIndex: monthIndex,
				isHighlighted: dayOfWeek === "Сб" || dayOfWeek === "Вс",
			};

			next7Days.push(dayInfo);
		}

		setDates(next7Days);
	};

	const handleDayClick = (day, monthIndex) => {
		let selectedDate;

		if (day === "Сегодня") {
			selectedDate = new Date().toISOString().split("T")[0];
		} else if (day === "Завтра") {
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			selectedDate = tomorrow.toISOString().split("T")[0];
		} else {
			const today = new Date();
			const daysAhead = parseInt(day) - today.getDate();
			const selected = new Date(today.setDate(today.getDate() + daysAhead));
			selectedDate = selected.toISOString().split("T")[0];
		}

		setSelectedDate(selectedDate);
		setSelectedMonth(monthIndex);
	};

	const handleToggleDropdown = () => {
		setOpenDropdown(!openDropdown);
	};

	const handleCinemaSelect = (cinema) => {
		setSelectedCinema(cinema);
		setOpenDropdown(false);
	};

	const isTodayOrTomorrow = (date) => {
		return date === "Сегодня" || date === "Завтра";
	};

	const getPosterHeader = () => {
		if (selectedDate === new Date().toISOString().split("T")[0]) {
			return "Афиша на Сегодня";
		} else if (
			selectedDate ===
			new Date(new Date().setDate(new Date().getDate() + 1))
				.toISOString()
				.split("T")[0]
		) {
			return "Афиша на Завтра";
		} else {
			return `Афиша на ${selectedDate.split("-")[2]} ${months[selectedMonth]}`;
		}
	};

	return (
		<div className="container">
			<div className={cls.poster} id="poster">
				<div className={cls.poster_top}>
					<div className={cls.poster_top_info}>
						<h2 className={cls.poster_header}>{getPosterHeader()}</h2>
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
									<li
										className={`${cls.item} ${
											selectedCinema === null ? cls.active : ""
										}`}
									>
										<button
											onClick={() => handleCinemaSelect(null)}
											className={cls.btn}
										>
											<span className={cls.checkbox}></span>
											<span className={cls.cinema_name}>Все</span>
										</button>
									</li>
									{cinemaData?.cinemas?.map((item) => (
										<li
											key={item.id}
											className={`${cls.item} ${
												selectedCinema?.name === item.name ? cls.active : ""
											}`}
										>
											<button
												onClick={() => handleCinemaSelect(item)}
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
										className={`${cls.day} ${
											selectedDate === day.date ? cls.selected : ""
										}`}
										onClick={() =>
											handleDayClick(day.displayDate, day.monthIndex)
										}
									>
										<div className={cls.day_date}>{day.displayDate}</div>
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
					{filmsData?.items?.length > 0 ? (
						filmsData.items.map((item) => (
							<Link
								className={cls.poster_card}
								key={item.id}
								href={{
									pathname: "/film/[id]",
								}}
								as={`/film/${item.id}`}
								title={item.name}
							>
								<div className={cls.card_top}>
									<div className={cls.top_pic}>
										<Image
											src={`http://185.196.213.181:32790${item?.picturePath}`}
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
						))
					) : (
						<div className={cls.no_movie}>С этим сеансом не найдено</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Poster;
