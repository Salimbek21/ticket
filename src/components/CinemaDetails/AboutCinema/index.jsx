import Image from "next/image";
import cls from "./about-cinema.module.scss";
import { ScreenIcon } from "@/components/svg";

const AboutCinema = ({ data }) => {
	return (
		<div className="container">
			<div className={cls.about_cinema}>
				<div className={cls.cinema_header}>О кинотеатре</div>
				<div className={cls.cinema_content}>
					<div className={cls.cinema_content_table}>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Звук</div>
							<div className={cls.item_value}>{data.sound}</div>
						</div>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Кинопроекторы</div>
							<div className={cls.item_value}>{data.projector} </div>
						</div>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Парковка</div>
							<div className={cls.item_value}>{data.parking} </div>
						</div>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Еда</div>
							<div className={cls.item_value}>{data.food} </div>
						</div>

						<div className={cls.table_item}>
							<div className={cls.item_key}>Экран</div>
							<div className={cls.item_value}>{data.screen} </div>
						</div>

						<div className={cls.table_item}>
							<div className={cls.item_key}>График</div>
							<div className={cls.item_value}>{data.schedule} </div>
						</div>
						<div className={cls.table_item}>
							<div className={cls.item_key}>Телефон</div>
							<div className={cls.item_value}>{data.phone} </div>
						</div>
					</div>
					<div className={cls.cinema_content_hall}>
						<div className={cls.hall_header}>Залы</div>
						<div className={cls.hall_lists}>
							{data.halls.map((hall) => (
								<div className={cls.lists_item}>
									<div className={cls.lists_item_top}>
										<p>{hall.name}</p>
										<span></span>
										<p>{hall.capacity} мест</p>
									</div>
									<div
										className={cls.lists_item_visual}
										style={{
											gridTemplateColumns: `repeat(${hall.gridColumns}, 7.06px)`,
											gridTemplateRows: `repeat(${hall.gridRows}, 7.06px)`,
										}}
									>
										{hall.places.map((place, idx) => (
											<>
												<span
													key={idx}
													style={{
														gridColumn: `${place.fromColumn} / ${place.toColumn}`,
														gridRow: `${place.fromRow} / ${place.toRow}`,
													}}
												></span>
												{/* <div>
													<span>Экран</span>
													<ScreenIcon />
												</div> */}
											</>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutCinema;
