import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Seat from "./Seat";
import {
	CancelLogo,
	ClickBlackIcon,
	MinusIcon,
	PaymeBlackIcon,
	PlusIcon,
	ScreenIcon,
} from "../svg";
import cls from "./payments-modal.module.scss";
import { BASE_URL_IMAGE } from "@/api/url";

const PaymentsModal = ({ onClose, data, session, dataImg }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [activeButton, setActiveButton] = useState(null);
	const [seats, setSeats] = useState([]);

	console.log(seats, "seats");

	console.log(Seat);

	useEffect(() => {
		const fetchSeats = async () => {
			try {
				const response = await axios.get("/api/booking-sessions", {
					params: { sessionId: session.filmSessionId },
				});
				console.log("API response data:", response.data);
				const { sessionHallPlaces } = response.data.data;
				const formattedSeats = sessionHallPlaces.map((place) => ({
					id: `${place.rowNumber}-${place.placeNumber}`,
					row: place.rowNumber,
					number: place.placeNumber,
					status: place.status === 0 ? "unoccupied" : "occupied",
				}));
				console.log("Formatted seats", formattedSeats);
				setSeats(formattedSeats);
			} catch (error) {
				console.error("Error:", error);
			}
		};
		fetchSeats();
	}, [session.filmSessionId]);

	console.log("Session ID:", session.filmSessionId);

	const handleSeatClick = (id) => {
		const updatedSeats = seats.map((seat) =>
			seat.id === id
				? {
						...seat,
						status: seat.status === "unoccupied" ? "occupied" : "unoccupied",
				  }
				: seat
		);
		setSeats(updatedSeats);
	};

	const handleNextStep = () => {
		if (currentStep === 1) {
			setCurrentStep(2);
		}
	};

	const handlePreviousStep = () => {
		if (currentStep === 2) {
			setCurrentStep(1);
		}
	};

	const handlePhoneNumberChange = (e) => {
		const inputPhoneNumber = e.target.value;
		const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
		setPhoneNumber(formattedPhoneNumber);
	};

	const handleButtonClick = (buttonName) => {
		setActiveButton(buttonName);
	};

	const formatPhoneNumber = (inputPhoneNumber) => {
		const phoneNumberOnlyDigits = inputPhoneNumber.replace(/\D/g, "");

		let formattedPhoneNumber = "";
		for (let i = 0; i < phoneNumberOnlyDigits.length && i < 10; i++) {
			if (i === 2 || i === 5 || i === 7) {
				formattedPhoneNumber += " ";
			}
			formattedPhoneNumber += phoneNumberOnlyDigits[i];
		}

		return formattedPhoneNumber;
	};

	return (
		<div className={cls.paymentsModal_wrapper}>
			<div className={cls.head}>
				<div className={cls.cont}>
					<div className={cls.main_info}>
						<div className={cls.info}>
							{dataImg.trailers?.map((img, i) => (
								<div className={cls.pic} key={i}>
									<Image
										src={`${BASE_URL_IMAGE}/${img?.picturePath}`}
										alt={`${dataImg.name} Image`}
										width={400}
										height={400}
									/>
								</div>
							))}
							<div className={cls.text}>
								<div className={cls.film_name}>{dataImg.name}</div>
								<div className={cls.text_info}>
									<p>{data.name}</p>
									<span></span>
									<p>{session.hallName}</p>
									<span></span>
									<p>{session.format}</p>
								</div>
							</div>
						</div>
					</div>
					<button onClick={onClose} className={cls.close}>
						<CancelLogo />
					</button>
				</div>
				<div className={cls.seances}>
					<Link href="#" className={`${cls.item} ${cls.active}`}>
						<span>{session.showTime}</span>
					</Link>
				</div>
			</div>
			{currentStep === 1 && (
				<>
					<div className={cls.places}>
						<div className={cls.tags}>
							<div className={cls.item}>
								<span className={cls.empty}></span>
								<span>Свободно</span>
							</div>
							<div className={cls.item}>
								<span className={cls.pending}></span>
								<span>В ожидании</span>
							</div>
							<div className={cls.item}>
								<span className={cls.nonAvailable}></span>
								<span>Недоступно</span>
							</div>
						</div>
						<div className={cls.screen_cont}>
							<span>Экран</span>
							<ScreenIcon />
						</div>
						<div className={cls.seatCont}>
							{[...new Set(seats.map((seat) => seat.row))].map((row) => (
								<div className={cls.seatLine} key={row}>
									<div className={cls.line}>
										{seats
											.filter((seat) => seat.row === row)
											.map((seat) => (
												<Seat
													seat={seat}
													key={seat.id}
													className={`${cls.seat} ${
														seat.status === "occupied" && cls.occupied
													} ${seat.status === "unoccupied" && cls.unoccupied}`}
													onClick={() => handleSeatClick(seat.id)}
												/>
											))}
									</div>
								</div>
							))}
						</div>
						<div className={cls.zoom}>
							<button className={cls.zoom_btn}>
								<PlusIcon />
							</button>
							<button className={cls.zoom_btn}>
								<MinusIcon />
							</button>
						</div>
						<div className={cls.chosen}>
							<div className={cls.item}>
								<span className={cls.text}>
									<p>Ряд 5</p>
									<span></span>
									<p>Место 1</p>
								</span>
								<button className={cls.item_cancel}>
									<CancelLogo />
								</button>
							</div>
						</div>
					</div>
				</>
			)}
			{currentStep === 2 && (
				<>
					<div className={cls.pay_wrapper}>
						<div className={cls.pay}>
							<div className={cls.tickets}>
								<div className={cls.title}>Билеты</div>
								<div className={cls.list}>
									<div className={cls.item}>
										<span className={cls.text}>
											<p>Ряд 4</p>
											<span></span>
											<p>Место 2</p>
										</span>
										<span className={cls.price}>60&nbsp;000 сум</span>
										<button className={cls.btn_close}>
											<CancelLogo />
										</button>
									</div>
								</div>
							</div>
							<div className={cls.form}>
								<div className={cls.block}>
									<div className={cls.title}>
										Номер телефона для получения билетов
									</div>
									<div className={cls.phone_input}>
										<span>+998</span>
										<input
											type="text"
											value={phoneNumber}
											onChange={handlePhoneNumberChange}
											placeholder="00 000 00 00"
											maxLength={12}
										/>
									</div>
								</div>
								<div className={cls.block}>
									<div className={cls.title}>Способ оплаты</div>
									<div className={cls.variant_list}>
										<button
											className={`${cls.item} ${
												activeButton === "click" ? cls.active : ""
											}`}
											onClick={() => handleButtonClick("click")}
										>
											<span className={cls.radio}>
												<span></span>
											</span>
											<ClickBlackIcon />
										</button>
										<button
											className={`${cls.item} ${
												activeButton === "payme" ? cls.active : ""
											}`}
											onClick={() => handleButtonClick("payme")}
										>
											<span className={cls.radio}>
												<span></span>
											</span>
											<PaymeBlackIcon />
										</button>
									</div>
								</div>
								<div className={cls.block}>
									<div className={cls.top_line}></div>
									<div className={cls.text}>
										Нажимая кнопку “Оплатить” Вы даете согласие на обработку
										персональных данных и соглашаетесь с{" "}
										<a href="#">офертой Click</a>
									</div>
									<button className={cls.btn}>Оплатить</button>
								</div>
							</div>
						</div>
					</div>
					<div className={cls.payment_back}>
						<button className={cls.btn_back} onClick={handlePreviousStep}>
							Назад
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default PaymentsModal;
