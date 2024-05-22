import { CancelLogoWhite } from "@/components/svg";
import cls from "./pop-up.module.scss";

const TrailerPopUp = ({ isOpen, onClose, iframe }) => {
  if (!isOpen) return null;
  return (
    <div className={cls.trailer_popup}>
      <div className={cls.popup_header}>{iframe.film?.name}</div>
      <div className={cls.popup_content}>
        <div className={cls.popup_iframe} dangerouslySetInnerHTML={{ __html: iframe.trailer?.url }} />
      </div>
      <button className={cls.popup_cancel} onClick={onClose}>
        <CancelLogoWhite />
      </button>
    </div>
  );
};

export default TrailerPopUp;
