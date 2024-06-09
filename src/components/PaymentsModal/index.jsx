import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
	CancelLogo,
	ClickBlackIcon,
	MinusIcon,
	PlusIcon,
	PaymeBlackIcon,
	ScreenIcon,
} from "../svg";
import cls from "./payments-modal.module.scss";
import { BASE_URL_IMAGE } from "@/api/url";
import { apiGetSession, apiGetSeatDetails } from "@/api/sessionApi";

const PaymentsModal = ({ onClose, data, session, dataImg }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [activeButton, setActiveButton] = useState(null);
	const [seats, setSeats] = useState([]);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [seatDetails, setSeatDetails] = useState([]);
	const [ticketPrice, setTicketPrice] = useState(0);

	const [zoomLevel, setZoomLevel] = useState(1);

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth;
			if (screenWidth >= 0) {
				setZoomLevel(0.7);
			}

			if (screenWidth >= 768) {
				setZoomLevel(1);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const MAX_SELECTION = 5;

	useEffect(() => {
		const fetchSeats = async () => {
			try {
				const params = {
					FilmSessionId: session.sessionId,
					FilmId: session.filmId,
					CinemaId: session.cinemaId,
					CinemaHallId: session.cinemaHallId,
				};
				const response = await apiGetSession(params);
				const { sessionHallPlaces, ticketPrice } = response.data.data;
				const formattedSeats = sessionHallPlaces.map((place) => ({
					id: `${place.rowNumber}-${place.placeNumber}`,
					row: place.rowNumber,
					number: place.placeNumber,
					status: place.status,
				}));
				setSeats(formattedSeats);
				setTicketPrice(ticketPrice);
			} catch (error) {
				console.error("Error:", error);
			}
		};
		fetchSeats();
	}, [session.sessionId]);

	const handleSeatClick = (id) => {
		const seat = seats.find((seat) => seat.id === id);
		if (seat.status === 2) return;

		if (seat.status === 0 && selectedSeats.length >= MAX_SELECTION) {
			alert("Нельзя выбрать больше 5 мест за одну сессию");
			return;
		}

		const updatedSeats = seats.map((seat) =>
			seat.id === id ? { ...seat, status: seat.status === 0 ? 1 : 0 } : seat
		);
		setSeats(updatedSeats);

		if (seat.status === 0) {
			setSelectedSeats([...selectedSeats, seat]);
		} else {
			setSelectedSeats(selectedSeats.filter((s) => s.id !== id));
		}
	};

	useEffect(() => {
		const fetchSeatDetails = async () => {
			if (selectedSeats.length > 0) {
				try {
					const response = await apiGetSeatDetails({
						seatIds: selectedSeats.map((seat) => seat.id),
					});
					setSeatDetails(response.data.data);
				} catch (error) {
					console.error("Error:", error);
				}
			} else {
				setSeatDetails([]);
			}
		};
		fetchSeatDetails();
	}, [selectedSeats]);

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

	const handleZoomIn = () => {
		setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 0.1, 1.5));
	};

	const handleZoomOut = () => {
		setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1, 0.5));
	};

	const formatCurrency = (amount) => {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const totalAmount = selectedSeats.length * ticketPrice;
	const commissionPerTicket = 5000;
	const totalCommission = selectedSeats.length * commissionPerTicket;

	return (
		<div className={cls.paymentsModal_wrapper}>
			{/* Agar kotta ekranda ham o'rindiqlar joylashuvi o'rtada emas, tepada joylansin deyilsa. Ushbu va style'dagi holatda kommentdan chiqarilib qo'yiladi */}
			{/* <div className={cls.data_top}> */}
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
					<div className={cls.innerWrapper}>
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
						<div className={cls.places}>
							<div
								className={cls.seatCont}
								style={{
									transform: `scale(${zoomLevel})`,
									transformOrigin: "top center",
								}}
							>
								<div className={cls.screen_cont}>
									<span>Экран</span>
									<ScreenIcon />
								</div>
								{[...new Set(seats.map((seat) => seat.row))].map((row) => (
									<div className={cls.seatLine} key={row}>
										<div className={cls.line}>
											{seats
												.filter((seat) => seat.row === row)
												.map((seat) => (
													<div
														key={seat.id}
														className={`${cls.seat} ${
															seat.status === 1 && cls.pendingSeat
														} ${seat.status === 2 && cls.nonAvailableSeat} ${
															seat.status === 0 && cls.unoccupiedSeat
														}`}
														onClick={() => handleSeatClick(seat.id)}
														style={{
															cursor:
																seat.status === 2 ? "not-allowed" : "pointer",
														}}
													>
														<span className={cls.seatNum}>{seat.number}</span>
													</div>
												))}
										</div>
									</div>
								))}
							</div>
							<div className={cls.zoom}>
								<button className={cls.zoom_btn} onClick={handleZoomIn}>
									<PlusIcon />
								</button>
								<button className={cls.zoom_btn} onClick={handleZoomOut}>
									<MinusIcon />
								</button>
							</div>
						</div>
						<div className={cls.chosen}>
							{selectedSeats.map((seat) => (
								<div className={cls.item} key={seat.id}>
									<span className={cls.text}>
										<p>Ряд {seat.row}</p>
										<span></span>
										<p>Место {seat.number}</p>
									</span>
									<button
										className={cls.item_cancel}
										onClick={() => handleSeatClick(seat.id)}
									>
										<CancelLogo />
									</button>
								</div>
							))}
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
									{selectedSeats.map((seat) => (
										<div className={cls.item} key={seat.id}>
											<span className={cls.text}>
												<p>Ряд {seat.row}</p>
												<span></span>
												<p>Место {seat.number}</p>
											</span>
											<span className={cls.price}>
												{formatCurrency(ticketPrice + totalCommission)} сум
											</span>
											<button
												className={cls.btn_close}
												onClick={() => handleSeatClick(seat.id)}
											>
												<CancelLogo />
											</button>
										</div>
									))}
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
										<Link href="/offer.docx" download={"offer.docx"}>
											Офертой
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{/* </div> */}
			<div className={cls.bottom}>
				<div className={cls.cont}>
					<div className={cls.info}>
						<div className={cls.total}>
							<span>Итого</span>
							<span>{formatCurrency(totalAmount + totalCommission)} сум</span>
						</div>
						<div className={cls.count}>
							<span>{selectedSeats.length} билетов</span>
							<span>Комиссия - {formatCurrency(totalCommission)} сум</span>
						</div>
					</div>
					<div className={cls.delimeter}></div>
					<button onClick={handleNextStep} className={cls.btn}>
						{currentStep === 1 ? "Оформить" : "Оплатить"}
					</button>
				</div>
				<div className={cls.bottom_phone}>
					<Link href={"tel:+998712007735"}>
						<span>Телефон для справок:</span>
						<span>+998712007735</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PaymentsModal;
