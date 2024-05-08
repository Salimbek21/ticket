import Personal from "@/components/Account/Personal";
import cls from "./account-page.module.scss";
import Sidebar from "@/components/Account/SidebarComponent";

const PersonalPage = () => {
	return (
		<div className="container">
			<div className={cls.account}>
				<div className={cls.title}>Личный кабинет</div>
				<div className={cls.title_mobile}>Личные данные</div>
				<div className={cls.cont}>
					<Sidebar />
					<Personal />
				</div>
			</div>
		</div>
	);
};

export default PersonalPage;
