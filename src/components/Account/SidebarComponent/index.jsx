import Link from "next/link";
import cls from "./sidebar.module.scss";
import { usePathname } from "next/navigation";
import { ExitIcon, TicketIconProfile, UserIconProfile } from "@/components/svg";
import { logOut } from "@/store/auth/login/loginSlice";
import { useDispatch } from "react-redux";
import { clear } from "@/store/account/accountSlice";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const logOutAccount = () => {
    dispatch(logOut());
    dispatch(clear());
  };

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
        <button onClick={logOutAccount} className={cls.bottom}>
          <div className={cls.item + " " + cls.exit}>
            <ExitIcon />
            <span>Выйти</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
