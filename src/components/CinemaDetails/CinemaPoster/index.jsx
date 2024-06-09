import { useState } from "react";
import Image from "next/image";
import cls from "./cinema-poster.module.scss";
import PaymentsModalCinema from "@/components/PaymentsModal/PaymentsModalCinema";

const CinemaPoster = ({ data, data1 }) => {
	const [paymentModal, setPaymentModal] = useState(false);
	const [selectedCinema, setSelectedCinema] = useState(null);
	const [selectedSession, setSelectedSession] = useState(null);

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

	if (!data1.length) return null;

	return (
		<div className="container">
			<div className={cls.cinema_poster} id="poster">
				<h2 className={cls.cinema_poster_header}>Афиша на сегодня</h2>
				<div className={cls.cinema_poster_general}>
					{data1.map((cinema) => (
						<div key={cinema.id} className={cls.cinema_poster_info}>
							<div className={cls.info_left}>
								<div className={cls.left_image}>
									<Image
										src={cinema.poster}
										width={400}
										height={400}
										alt={cinema.name}
									/>
								</div>
								<div className={cls.left_info}>
									<div className={cls.left_name_top}>
										<div className={cls.left_name}>{cinema.name}</div>
									</div>
									<div className={cls.left_genres}>
										<p>{cinema.genres?.join(" • ")}</p>
									</div>
								</div>
							</div>
							<div className={cls.info_right}>
								{cinema.sessions.map((session) => (
									<div
										className={cls.right_card}
										key={session.sessionId}
										onClick={() => handleOpenModal(cinema, session)}
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
				</div>
			</div>
			{paymentModal && (
				<PaymentsModalCinema
					data={selectedCinema}
					dataImg={data}
					session={selectedSession}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default CinemaPoster;
