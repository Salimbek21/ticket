import Orders from "@/components/Account/Orders";
import cls from "./account-page.module.scss";
import Sidebar from "@/components/Account/SidebarComponent";

const OrdersPage = () => {
	return (
		<div className="container">
			<div className={cls.account}>
				<div className={cls.title}>Личный кабинет</div>
				<div className={cls.title_mobile}>Заказы</div>
				<div className={cls.cont}>
					<Sidebar />
					<Orders />
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;
