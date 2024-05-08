import { useState } from "react";
import Image from "next/image";
import {
	CancelLogo,
	ClickBlackIcon,
	MinusIcon,
	PaymeBlackIcon,
	PlusIcon,
	ScreenFullText,
	ScreenIcon,
} from "../svg";
import cls from "./payments-modal.module.scss";
import pandaImg from "/public/images/panda.jpeg";
import Link from "next/link";
import Seat from "./Seat";

const PaymentsModal = ({ onClose }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [activeButton, setActiveButton] = useState(null);
	const [seats, setSeats] = useState([
		{ id: 1, status: "unoccupied" },
		{ id: 2, status: "unoccupied" },
		{ id: 3, status: "unoccupied" },
		{ id: 4, status: "unoccupied" },
		{ id: 5, status: "unoccupied" },
		{ id: 6, status: "unoccupied" },
		{ id: 7, status: "unoccupied" },
		{ id: 8, status: "unoccupied" },
		{ id: 9, status: "unoccupied" },
		{ id: 10, status: "unoccupied" },
		{ id: 11, status: "unoccupied" },
		{ id: 12, status: "unoccupied" },
		{ id: 13, status: "unoccupied" },
		{ id: 14, status: "unoccupied" },
		{ id: 15, status: "unoccupied" },
		{ id: 16, status: "unoccupied" },
		{ id: 17, status: "unoccupied" },
		{ id: 18, status: "unoccupied" },
		{ id: 19, status: "unoccupied" },
	]);

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
							<div className={cls.pic}>
								<Image src={pandaImg} alt="Order image" />
							</div>
							<div className={cls.text}>
								<div className={cls.film_name}>Kung fu panda 1</div>
								<div className={cls.text_info}>
									<p>Next Cinema</p>
									<span></span>
									<p>ЗАЛ 3</p>
									<span></span>
									<p>3D</p>
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
						<span>19:40</span>
					</Link>
					<Link href="#" className={cls.item}>
						<span>22:15</span>
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
							<div className={cls.seatLine}>
								<div className={cls.line}>
									{seats.map((seat) => (
										<Seat
											seat={seat}
											key={seat.id}
											className={`${cls.seat} ${
												seat.status === "occupied" && cls.occupied
											} ${seat.status === "unoccupied" && cls.unoccupied}`}
											onClick={() => handleSeatClick(seat.id)}
										></Seat>
									))}
								</div>
							</div>
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
			<div className={cls.bottom}>
				<div className={cls.cont}>
					<div className={cls.info}>
						<div className={cls.total}>
							<span>Итого</span>
							<span>0 сум</span>
						</div>
						<div className={cls.count}>
							<span>0 билетов</span>
							<span>Комиссия - 0 сум</span>
						</div>
					</div>
					<div className={cls.delimeter}></div>
					<button onClick={handleNextStep} className={cls.btn}>
						Оформить
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
