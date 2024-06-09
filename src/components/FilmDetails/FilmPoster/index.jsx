import { useEffect, useState } from "react";
import Link from "next/link";
import cls from "./film-poster.module.scss";
import PaymentsModal from "@/components/PaymentsModal";
import { useDispatch, useSelector } from "react-redux";

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

const FilmPoster = ({ data1, data }) => {
	console.log(data1, "Film details data 1 poster");
	console.log(data, "Film details data ");
	const dispatch = useDispatch();
	const [paymentModal, setPaymentModal] = useState(false);
	const [selectedCinema, setSelectedCinema] = useState(null);
	const [selectedSession, setSelectedSession] = useState(null);
	const [dates, setDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState("Сегодня");
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

	const handleOpenModal = (cinema, session) => {
		setSelectedCinema(cinema);
		setSelectedSession(session);
		setPaymentModal(true);
	};

	const handleCloseModal = () => {
		setPaymentModal(false);
		setSelectedCinema(null);
		setSelectedSession(null);
	};

	const handleDayClick = (day, monthIndex) => {
		setSelectedDate(day);
		setSelectedMonth(monthIndex);
	};

	const isTodayOrTomorrow = (date) => {
		return date === "Сегодня" || date === "Завтра";
	};

	useEffect(() => {
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

		generateDates();
	}, []);

	if (!data1.length) return null;

	return (
		<div className="container">
			<div className={cls.film_poster} id="poster">
				<h2 className={cls.film_poster_header}>
					Афиша на{" "}
					{!isTodayOrTomorrow(selectedDate)
						? `${selectedDate} ${months[selectedMonth]}`
						: selectedDate}
				</h2>
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
				<div className={cls.film_poster_general}>
					{data1.map((cinema, index) => (
						<div className={cls.film_poster_info} key={index}>
							<div className={cls.info_left}>
								<div className={cls.cinema_name}>{cinema.name}</div>
								<div className={cls.cinema_address}>{cinema.address}</div>
							</div>
							<div className={cls.info_right}>
								{cinema.sessions.map((session, sessionIndex) => (
									<div
										className={cls.right_card}
										onClick={() => handleOpenModal(cinema, session)}
										key={sessionIndex}
									>
										<div className={cls.card_top}>
											<div className={cls.top_hall}>
												<div className={cls.hall_num}>{session.hallName}</div>
											</div>
											<div className={cls.hall_format}>{session.format}</div>
											<div className={cls.hall_price}>
												{session.ticketPrice} сум
											</div>
										</div>
										<div className={cls.card_btn_time}>
											<div className={cls.btn_time}>{session.showTime}</div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
					<div className={cls.film_poster_more_btn}>
						<button className={cls.more_btn}>Показать еще</button>
					</div>
				</div>
			</div>
			{paymentModal && (
				<PaymentsModal
					data={selectedCinema}
					dataImg={data}
					session={selectedSession}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default FilmPoster;
