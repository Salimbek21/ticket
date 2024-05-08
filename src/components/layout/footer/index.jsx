import Link from "next/link";
import cls from "./footer.module.scss";
import {
	ClickIcon,
	InstagramIcon,
	LogoIcon,
	PaymeIcon,
	TelegramIcon,
	UzumIcon,
} from "@/components/svg";

const Footer = () => {
	return (
		<div className={cls.footer_wrapper}>
			<div className="container">
				<div className={cls.footer_top}>
					<div className={cls.top_logo}>
						<Link href="/">
							<LogoIcon />
						</Link>
					</div>
					<div className={cls.top_nav}>
						<Link className={cls.nav_item} href="#poster">
							Киноафиша
						</Link>
						<Link className={cls.nav_item} href="#cinemas">
							Кинотеатры
						</Link>
					</div>
					<div className={cls.top_socials}>
						<div className={cls.socials_phone}>
							<Link className={cls.phone_link} href="tel:+998900625141">
								+998 90 062 51 41
							</Link>
							<p>Для справок</p>
						</div>
						<ul className={cls.socials_list}>
							<li>
								<Link href="#">
									<TelegramIcon />
								</Link>
							</li>
							<li>
								<Link href="#">
									<InstagramIcon />
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className={cls.footer_line}></div>
				<div className={cls.footer_bottom}>
					<div className={cls.bottom_rights}>
						<p>© 2023. Все права защищены</p>
					</div>
					<div className={cls.bottom_offer}>
						<Link href="/offer.docx" download="offer.docx">
							Публичная оферта
						</Link>
					</div>
					<div className={cls.bottom_pay}>
						<div className={cls.pay_item}>
							<ClickIcon />
						</div>
						<div className={cls.pay_item}>
							<UzumIcon />
						</div>
						<div className={cls.pay_item}>
							<PaymeIcon />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
