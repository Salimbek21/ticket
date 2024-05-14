import React, { useEffect, useState } from "react";
import cls from "./modal-popup.module.scss";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { CancelLogo } from "../svg";
import { apiSignUp } from "@/api/auth";
import { ok, errorMessage } from "@/ui/tostify";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/store/auth/login/loginThunk";

const ModalPopUp = ({ onClose }) => {
  const router = useRouter();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login);

  const [activeTab, setActiveTab] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [phoneNumberSignUp, setPhoneNumberSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (event) => {
    const loginForm = {
      phone: phoneNumber,
      password: password,
    };
    dispatch(loginThunk(loginForm));
  };

  useEffect(() => {
    if (loginData?.data?.succeeded) {
      router.push("/account/personal");
      onClose();
    }
  }, [loginData.data?.data?.token]);

  const handleSignup = async () => {
    const signUpForm = {
      phone: phoneNumberSignUp,
      password: passwordSignUp,
      email: email,
    };

    try {
      const res = await apiSignUp(signUpForm);
      if (res.data?.succeeded == true) {
        ok("Вы успешно авторизовались!");
        setActiveTab("login");
      }
      return res;
    } catch (error) {
      console.error(error);
      errorMessage(error.data?.message);
    }
  };

  return (
    <div className={cls.modal_wrapper}>
      <div className={cls.modal}>
        <button onClick={onClose} className={cls.popup_close}>
          <CancelLogo />
        </button>
        {/* {suc} */}
        <div className={cls.tabs}>
          <label
            className={`${activeTab === "login" ? cls.active : ""} ${
              cls.tabs_item
            }`}
            onClick={() => setActiveTab("login")}
          >
            <span>Вход</span>
          </label>
          <label
            className={`${activeTab === "signup" ? cls.active : ""} ${
              cls.tabs_item
            }`}
            onClick={() => setActiveTab("signup")}
          >
            <span>Регистрация</span>
          </label>
        </div>
        {activeTab === "login" && (
          <div className={cls.tabContent}>
            <div className={cls.tabContent_inputs}>
              <div className={cls.inputs_item}>
                <label htmlFor="phone-input">Телефон</label>
                <div className={cls.item_input}>
                  <span>+998</span>
                  <input
                    id="phone-input"
                    type="text"
                    placeholder="00 000 00 00"
                    maxLength={9}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className={cls.inputs_item}>
                <label htmlFor="psw-input">Пароль</label>
                <div className={cls.item_input}>
                  <input
                    id="psw-input"
                    type="password"
                    placeholder="*****"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleLogin();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={cls.content_bottom}>
              <button className={cls.bottom_btn} onClick={() => handleLogin()}>
                Войти
              </button>
              <div className={cls.bottom_ps}>
                <label htmlFor="bottom_reset">Сбросить пароль</label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "signup" && (
          <div className={cls.tabContent}>
            <div className={cls.tabContent_inputs}>
              <div className={cls.inputs_item}>
                <label htmlFor="phone-input">Телефон</label>
                <div className={cls.item_input}>
                  <span>+998</span>
                  <input
                    id="phone-input"
                    type="text"
                    placeholder="00 000 00 00"
                    value={phoneNumberSignUp}
                    onChange={(e) => setPhoneNumberSignUp(e.target.value)}
                  />
                </div>
              </div>
              <div className={cls.inputs_item}>
                <label htmlFor="email-input">Email</label>
                <div className={cls.item_input}>
                  <input
                    id="email-input"
                    type="text"
                    placeholder="test@test.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={cls.inputs_item}>
                <label htmlFor="psw-input">Пароль</label>
                <div className={cls.item_input}>
                  <input
                    id="psw-input"
                    type="password"
                    placeholder="*****"
                    value={passwordSignUp}
                    onChange={(e) => setPasswordSignUp(e.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleSignup();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={cls.content_bottom}>
              <button className={cls.bottom_btn} onClick={handleSignup}>
                Зарегистрироваться
              </button>
              <div className={cls.bottom_ps}>
                <label htmlFor="bottom_reset">
                  Нажимая кнопку “Получить пароль” Вы даете согласие на
                  обработку персональных данных
                </label>
              </div>
            </div>
          </div>
        )}

        {/* {activeTab === "verify" && (
          <div className={cls.tabContent}>
            <div className={cls.tabContent_inputs}>
              <div className={cls.inputs_item}>
                <label htmlFor="verification">Введите код из SMS</label>
                <div className={cls.item_input}>
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={cls.content_bottom}>
              <button className={cls.bottom_btn} onClick={handleVerify}>
                Зарегистрироваться
              </button>
              <div className={cls.bottom_ps}>
                <label htmlFor="bottom_reset">Сбросить пароль</label>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ModalPopUp;
