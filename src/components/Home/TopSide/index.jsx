import Link from "next/link";
import cls from "./topSide.module.scss";

const TopSide = () => {
	return (
		<div className={cls.topSide}>
			<div className="container">
				<div className={cls.topSide_Wrapper}>
					<div className={cls.left}>
						<div className={cls.city}>
							<p>г. Ташкент</p>
						</div>
						<div className={cls.about}>
							<ul>
								<li>Онлайн покупка билетов в кино </li>
							</ul>
						</div>
					</div>
					<div className={cls.right}>
						<Link className={cls.link} href="tel:+998900625141">
							+998 90 062 51 41
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopSide;
