import React, { useState } from "react";
import cls from "./modal-popup.module.scss";

import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { loginAuth } from "@/store/auth/loginThunk";
import { useDispatch, useSelector } from "react-redux";
import { CancelLogo } from "../svg";
import axios from "axios";
import { apiLogin } from "@/api/auth";
import { ok } from "@/ui/tostify";

const ModalPopUp = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();
  const access_token = useSelector((state) => state?.login);
  const handleLogin = () => {
    const form = {
      phone: phoneNumber,
      password: password,
    };
    dispatch(loginAuth(form));

    if (phoneNumber && password) {
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleSignup = () => {
    // Signup logic
    if (phoneNumber && email) {
      setActiveTab("verify");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleVerify = () => {
    // Verification logic
    if (verificationCode) {
      router.push("/account/personal");
      onClose();
    } else {
      alert("Please enter the verification code.");
    }
  };

  //   const formatPhoneNumber = (input) => {
  //     let numbers = phoneNumber.replace(/\D/g, "");

  //     let countryCode = numbers.slice(0, 2);
  //     let areaCode = numbers.slice(2, 5);
  //     let partOne = numbers.slice(5, 7);
  //     let partTwo = numbers.slice(7, 9);

  //     let formattedNumber = countryCode;
  //     if (areaCode.length > 0) formattedNumber += " " + areaCode;
  //     if (partOne.length > 0) formattedNumber += " " + partOne;
  //     if (partTwo.length > 0) formattedNumber += " " + partTwo;
  //     console.log(formattedNumber, "formattedNumber");
  //     setPhoneNumber(formattedNumber);
  //     return formattedNumber;
  //   };

  return (
    <div className={cls.modal_wrapper}>
      <div className={cls.modal}>
        <button onClick={onClose} className={cls.popup_close}>
          <CancelLogo />
        </button>
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
                  />
                </div>
              </div>
            </div>
            <div className={cls.content_bottom}>
              <button className={cls.bottom_btn} onClick={handleLogin}>
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
            </div>
            <div className={cls.content_bottom}>
              <button className={cls.bottom_btn} onClick={handleSignup}>
                Получить пароль
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
        {activeTab === "verify" && (
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
        )}
      </div>
    </div>
  );
};

export default ModalPopUp;
