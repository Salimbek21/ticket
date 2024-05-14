import { useEffect, useState } from "react";
import { User } from "@/components/svg";
import cls from "./personal.module.scss";
import { ok, errorMessage } from "@/ui/tostify";
import { apiUpdate, apiDeleteAccount, apiUploadImg } from "@/api/account";
import { useSelector, useDispatch } from "react-redux";
import { accountMe } from "@/store/account/accountThunk";
import { logOut } from "@/store/auth/login/loginSlice";
import Image from "next/image";

const Personal = () => {
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
  });

  const dispatch = useDispatch();

  const accountData = useSelector((state) => state.account.data);

  const handleUpdate = async () => {
    try {
      const res = await apiUpdate(form);
      if (res.data?.succeeded == true) {
        ok("Вы успешно обновлены!");
        dispatch(accountMe());
      }
      return res;
    } catch (error) {
      console.error(error);
      errorMessage(error.data?.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await apiDeleteAccount();
      if (res.data?.succeeded == true) {
        ok("Вы удалили свою учетную запись!");
        dispatch(logOut());
      }
      return res;
    } catch (error) {
      console.error(error);
      errorMessage(error.data?.message);
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await apiUploadImg(formData);
      if (res.data?.succeeded == true) {
        ok("Вы успешно загрузили фотографию!");
        dispatch(accountMe());
      }
      return res;
    } catch (error) {
      console.error(error);
      errorMessage(error.data?.message);
    }
  };

  useEffect(() => {
    dispatch(accountMe());
  }, []);

  useEffect(() => {
    setForm({
      name: accountData?.name,
      password: accountData?.password,
      email: accountData?.email,
    });
  }, [accountData]);

  return (
    <div className={cls.account_personal}>
      <div className={cls.data}>
        <div className={cls.inputs}>
          <div className={cls.block}>
            <label htmlFor="personal-name-input">Имя</label>
            <input
              name="name"
              className={cls.input}
              type="text"
              placeholder="Ваше имя"
              id="personal-name-input"
              value={form.name}
              onChange={handleForm}
            />
          </div>
          <div className={cls.block}>
            <label htmlFor="personal-email-input">Email</label>
            <input
              name="email"
              className={cls.input}
              type="text"
              placeholder="Почта"
              id="personal-email-input"
              value={form.email}
              onChange={handleForm}
            />
          </div>
          <div className={cls.block}>
            <label htmlFor="personal-password-input">Изменить пароль</label>
            <input
              name="password"
              className={cls.input}
              type="password"
              placeholder="*****"
              id="personal-password-input"
              value={form.password}
              onChange={handleForm}
            />
          </div>

          {/* <div className={cls.block}>
            <label htmlFor="personal-password-repeat-input">
              Повторить пароль
            </label>
            <input
              name="password"
              className={cls.input}
              type="password"
              placeholder="*****"
              id="personal-password-repeat-input"
              value={form.password}
              onChange={handleForm}
            />
          </div> */}
        </div>
        <button className={cls.btn_save} onClick={() => handleUpdate()}>
          Сохранить
        </button>
        <div className={cls.delete}>
          <button className={cls.delete_btn} onClick={() => handleDelete()}>
            Удалить аккаунт: {accountData?.phone}
          </button>
        </div>
      </div>

      <div className={cls.upload_photo}>
        <div className={cls.photo_preview}>
          {accountData?.picturePath == null ? (
            <div className={cls.preview_default}>
              <User />
            </div>
          ) : (
            <Image
              src={`https://kinoticket.uz/${accountData?.picturePath}`}
              layout="fill"
              alt="User Image"
            />
          )}
        </div>

        <input
          className={cls.visually_hidden}
          type="file"
          accept="image/png;image/jpeg;image/jpg"
          id="personal-photo-input"
          onChange={handleUpload}
        />
        <label className={cls.upload_btn} htmlFor="personal-photo-input">
          <span>Загрузить фото</span>
        </label>
      </div>
    </div>
  );
};

export default Personal;
