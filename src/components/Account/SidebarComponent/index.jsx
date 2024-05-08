import Link from "next/link";
import cls from "./sidebar.module.scss";
import { usePathname } from "next/navigation";
import { ExitIcon, TicketIconProfile, UserIconProfile } from "@/components/svg";

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<>
			<div className={cls.sidebar}>
				<div className={cls.top}>
					<Link
						href="/account/orders"
						className={
							cls.item +
							" " +
							(pathname === "/account/orders" ? cls.active : "")
						}
					>
						<TicketIconProfile />
						<span>Заказы</span>
					</Link>
					<Link
						href="/account/personal"
						className={
							cls.item +
							" " +
							(pathname === "/account/personal" ? cls.active : "")
						}
					>
						<UserIconProfile />
						<span>Личные данные</span>
					</Link>
				</div>
				<div className={cls.bottom}>
					<Link href={"#"} className={cls.item + " " + cls.exit}>
						<ExitIcon />
						<span>Выйти</span>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
