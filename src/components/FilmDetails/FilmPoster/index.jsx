import { useEffect, useState } from "react";
import Link from "next/link";
import cls from "./film-poster.module.scss";
import PaymentsModal from "@/components/PaymentsModal";

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

const FilmPoster = () => {
	const [paymentModal, setPaymentModal] = useState(false);
	const [dates, setDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState("Сегодня");
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
	
	const handleOpenModal = () => {
		setPaymentModal(true);
	};

	const handleCloseModal = () => {
		setPaymentModal(false);
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
					<div className={cls.film_poster_info}>
						<div className={cls.info_left}>
							<Link href="#" className={cls.cinema_name}>
								Parus Cinema
							</Link>
							<div className={cls.cinema_address}>обводная ул. Нурафшон, 4</div>
						</div>
						<div className={cls.info_right}>
							{Array.from({ length: 8 }).map((_, index) => (
								<div
									key={index}
									className={cls.right_card}
									onClick={handleOpenModal}
								>
									<div className={cls.card_top}>
										<div className={cls.top_hall}>
											<div className={cls.hall_num}>Зал {index + 1}</div>
										</div>
										<div className={cls.hall_format}>2D</div>
										<div className={cls.hall_price}>60 000 сум</div>
									</div>
									<div className={cls.card_btn_time}>
										<div className={cls.btn_time}>10:00</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={cls.film_poster_more_btn}>
						<button className={cls.more_btn}>Показать еще</button>
					</div>
				</div>
			</div>
			{paymentModal && <PaymentsModal onClose={handleCloseModal} />}
		</div>
	);
};

export default FilmPoster;
