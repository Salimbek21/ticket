import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cls from "./orders.module.scss";
import {
	ArrowDownIcon,
	ArrowDownIconBlack,
	QrCodeIcon,
} from "@/components/svg";

const Orders = () => {
	const router = useRouter();
	const [activeFilter, setActiveFilter] = useState("");
	const [openIndex, setOpenIndex] = useState(-1);
	const [openDropdown, setOpenDropdown] = useState(false);

	const ordersData = [
		{
			orderDate: "Заказ от 06 июня",
			orderNumber: "#24",
			orderStatus: "Завершен",
			orderPrice: "50 000",
			dateTime: "06 июня 2023",
			time: "18:00",
			ticketCount: "2",
			discount: "0",
			totalAmount: "50 000",
			paymentMethod: "Payme",
		},
		{
			orderDate: "Заказ от 10 июля",
			orderNumber: "#32",
			orderStatus: "В ожидании",
			orderPrice: "35 000",
			dateTime: "10 июля 2023",
			time: "19:30",
			ticketCount: "1",
			discount: "0",
			totalAmount: "35 000",
			paymentMethod: "Visa",
		},
		{
			orderDate: "Заказ от 22 июля",
			orderNumber: "#45",
			orderStatus: "Завершен",
			orderPrice: "75 000",
			dateTime: "22 июля 2023",
			time: "15:00",
			ticketCount: "3",
			discount: "5000",
			totalAmount: "70 000",
			paymentMethod: "Mastercard",
		},
	];

	const handleToggleAccordion = (index) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	const handleToggleDropdown = () => {
		setOpenDropdown(!openDropdown);
	};

	const handleLinkClick = () => {
		setOpenDropdown(false);
	};

	useEffect(() => {
		const { filter } = router.query;
		setActiveFilter(filter || "");
	}, [router.query]);

	return (
		<div className={cls.personal_orders}>
			<div className={cls.filters + " " + (openDropdown ? cls.opened : "")}>
				<button onClick={handleToggleDropdown} className={cls.open_btn}>
					<span>
						{activeFilter === ""
							? "Все"
							: activeFilter === "1"
							? "В ожидании"
							: "Завершенные"}
					</span>
					<ArrowDownIcon />
				</button>
				<ul className={cls.list}>
					<li className={cls.item}>
						<Link
							onClick={handleLinkClick}
							href="/account/orders"
							className={
								cls.btn + " " + (activeFilter === "" ? cls.active : "")
							}
						>
							<span className={cls.checkbox}></span>
							<span className={cls.text}>Все</span>
						</Link>
					</li>
					<li className={cls.item}>
						<Link
							onClick={handleLinkClick}
							href="/account/orders?filter=1"
							className={
								cls.btn + " " + (activeFilter === "1" ? cls.active : "")
							}
						>
							<span className={cls.checkbox}></span>
							<span className={cls.text}>В ожидании</span>
						</Link>
					</li>
					<li className={cls.item}>
						<Link
							onClick={handleLinkClick}
							href="/account/orders?filter=2"
							className={
								cls.btn + " " + (activeFilter === "2" ? cls.active : "")
							}
						>
							<span className={cls.checkbox}></span>
							<span className={cls.text}>Завершенные</span>
						</Link>
					</li>
				</ul>
			</div>
			<div className={cls.orders_cards}>
				{ordersData.map((item, index) => (
					<div key={index} className={cls.card}>
						<div className={cls.card_top}>
							<div className={cls.main_info}>
								<div className={cls.order_info}>
									<div className={cls.order_date}>{item.orderDate}</div>
									<div className={cls.order_number}>{item.orderNumber}</div>
								</div>
								<div
									className={
										item.orderStatus === "В ожидании"
											? `${cls.order_status_waiting} ${cls.order_status}`
											: `${cls.order_status_completed} ${cls.order_status}`
									}
								>
									{item.orderStatus}
								</div>
								<div className={cls.order_price}>{item.orderPrice} сум</div>
							</div>
							<button
								className={`${cls.more_btn} ${
									openIndex === index ? cls.hidden : ""
								}`}
								onClick={() => handleToggleAccordion(index)}
							>
								<div className={cls.btn_text}>
									<span>Подробнее</span>
									<ArrowDownIconBlack />
								</div>
							</button>
						</div>
						{openIndex === index && (
							<div className={`${cls.accordion_content} ${cls.open}`}>
								<ul className={cls.accordion_list}>
									<li className={cls.accordion_item}>
										<div className={cls.accordion_title}>Дата / Время</div>
										<div className={cls.accordion_text}>
											<p>{item.dateTime}</p>
											<span></span>
											<p>{item.time}</p>
										</div>
									</li>
									<li className={cls.accordion_item}>
										<div className={cls.accordion_title}>
											Количество билетов
										</div>
										<div className={cls.accordion_text}>
											{item.ticketCount} билета
										</div>
									</li>
									<li className={cls.accordion_item}>
										<div className={cls.accordion_title}>Цена</div>
										<div className={cls.accordion_text}>
											{item.totalAmount} сум
										</div>
									</li>
									<li className={cls.accordion_item}>
										<div className={cls.accordion_title}>Скидка</div>
										<div className={cls.accordion_text}>
											{item.discount} сум
										</div>
									</li>
									<li className={cls.accordion_item}>
										<div className={cls.accordion_title}>Итоговая сумма</div>
										<div className={cls.accordion_text}>
											{item.totalAmount} сум
										</div>
									</li>
									<li className={cls.accordion_item}>
										<div className={cls.accordion_title}>Метод оплаты</div>
										<div className={cls.accordion_text}>
											{item.paymentMethod}
										</div>
									</li>
								</ul>
								<div className={cls.accordion_footer}>
									<button className={cls.accordion_btn_link}>
										<div className={cls.accordion_btn_text}>
											<QrCodeIcon />
											<span>Электронный билет</span>
										</div>
									</button>
									<button
										onClick={() => handleToggleAccordion(index)}
										className={`${cls.accordion_btn_link} ${cls.accordion_btn_hide}`}
									>
										<div className={cls.accordion_btn_text}>
											<span>Скрыть</span>
											<ArrowDownIconBlack />
										</div>
									</button>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Orders;
