import { useState, useEffect } from "react";
import Link from "next/link";
import { CancelLogo, HamburgerMenu, LogoIcon, User } from "@/components/svg";
import cls from "./header.module.scss";
import TopSide from "@/components/Home/TopSide";
import ModalPopUp from "@/components/ModalPopUp";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const openMenu = () => {
		setIsOpen(true);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<>
			<TopSide />
			<div className="container">
				<div className={cls.header}>
					<nav className={cls.navbar}>
						<Link href="/" className={cls.logo}>
							<LogoIcon />
						</Link>
					</nav>
					<div className={cls.navigation}>
						<ul className={cls.nav_list}>
							<li className={cls.nav_item}>
								<Link className={cls.nav_link} href="/#poster">
									Киноафиша
								</Link>
							</li>
							<li className={cls.nav_item}>
								<Link className={cls.nav_link} href="/#cinemas">
									Кинотеатры
								</Link>
							</li>
						</ul>
					</div>
					<div className={cls.user_definite}>
						<button onClick={handleOpenModal} className={cls.btn_login}>
							<User />
							<span>Войти</span>
						</button>
					</div>
					<div className={cls.hamburger_menu}>
						<button className={cls.menu_btn} onClick={openMenu}>
							<HamburgerMenu />
						</button>
					</div>
					<div
						className={`${cls.rightSidebar} ${
							isOpen ? cls.rightSidebarOpen : cls.rightSidebarClose
						}`}
					>
						<TopSide />
						<div className={cls.top}>
							<Link href="/" className={cls.logo}>
								<LogoIcon />
							</Link>
							<div className={cls.cancel_menu}>
								<button className={cls.cancel_times} onClick={closeMenu}>
									<CancelLogo />
								</button>
							</div>
						</div>
						<ul className={cls.nav_list_mobile}>
							<li className={cls.nav_item_mobile} onClick={closeMenu}>
								<Link className={cls.nav_link_mobile} href="/#poster">
									Киноафиша
								</Link>
							</li>
							<li className={cls.nav_item_mobile}>
								<Link
									className={cls.nav_link_mobile}
									href="/#cinemas"
									onClick={closeMenu}
								>
									Кинотеатры
								</Link>
							</li>
						</ul>
						<div className={cls.user_definite_mobile}>
							<button
								className={cls.btn_login_mobile}
								onClick={handleOpenModal}
							>
								<User />
								<span>Войти</span>
							</button>
						</div>
						<div className={cls.bottom_link}>
							<Link className={cls.link} href="tel:+998900625141">
								+998 90 062 51 41
							</Link>
						</div>
					</div>
				</div>
				{showModal && <ModalPopUp onClose={handleCloseModal} />}
			</div>
		</>
	);
};

export default Header;
