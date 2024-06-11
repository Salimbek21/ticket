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

	const [resetPhoneNumber, setResetPhoneNumber] = useState("");

	const [isLoginFormValid, setIsLoginFormValid] = useState(false);
	const [isSignupFormValid, setIsSignupFormValid] = useState(false);
	const [isResetFormValid, setIsResetFormValid] = useState(false);

	const handleLogin = () => {
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
	}, [loginData?.data?.succeeded]);

	useEffect(() => {
		setIsLoginFormValid(phoneNumber.length === 12 && password.length > 0);
	}, [phoneNumber, password]);

	useEffect(() => {
		setIsSignupFormValid(
			phoneNumberSignUp.length === 12 &&
				passwordSignUp.length > 0 &&
				email.includes("@")
		);
	}, [phoneNumberSignUp, passwordSignUp, email]);

	useEffect(() => {
		setIsResetFormValid(resetPhoneNumber.length === 12);
	}, [resetPhoneNumber]);

	const handleSignup = async () => {
		const signUpForm = {
			phone: phoneNumberSignUp,
			password: passwordSignUp,
			email: email,
		};

		try {
			const res = await apiSignUp(signUpForm);
			if (res.data?.succeeded === true) {
				ok("Вы успешно авторизовались!");
				setActiveTab("login");
			}
			return res;
		} catch (error) {
			console.error(error);
			errorMessage(error.data?.message);
		}
	};

	const handleResetPassword = () => {
		ok("Инструкция по сбросу пароля отправлена!");
		setActiveTab("login");
	};

	const formatPhoneNumber = (phone) => {
		const cleaned = phone.replace(/\D/g, "");
		const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
		if (match) {
			return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`.trim();
		}
		return phone;
	};

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
										placeholder="99 999 99 99"
										maxLength={12}
										value={phoneNumber}
										onChange={(e) =>
											setPhoneNumber(formatPhoneNumber(e.target.value))
										}
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
											if (event.key === "Enter" && isLoginFormValid) {
												handleLogin();
											}
										}}
									/>
								</div>
							</div>
						</div>
						<div className={cls.content_bottom}>
							<button
								className={`${cls.bottom_btnLogin} ${
									!isLoginFormValid ? cls.disabled : ""
								}`}
								onClick={handleLogin}
								disabled={!isLoginFormValid}
							>
								Войти
							</button>
							<div className={`${cls.bottom_ps} ${cls.bottom_ps_click}`}>
								<label onClick={() => setActiveTab("reset")}>
									Сбросить пароль
								</label>
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
										placeholder="99 999 99 99"
										value={phoneNumberSignUp}
										onChange={(e) =>
											setPhoneNumberSignUp(formatPhoneNumber(e.target.value))
										}
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
											if (event.key === "Enter" && isSignupFormValid) {
												handleSignup();
											}
										}}
									/>
								</div>
							</div>
						</div>
						<div className={cls.content_bottom}>
							<button
								className={`${cls.bottom_btnSignup} ${
									!isSignupFormValid ? cls.disabled : ""
								}`}
								onClick={handleSignup}
								disabled={!isSignupFormValid}
							>
								Зарегистрироваться
							</button>
							<div className={cls.bottom_ps}>
								<label>
									Нажимая кнопку “Получить пароль” Вы даете согласие на
									обработку персональных данных
								</label>
							</div>
						</div>
					</div>
				)}

				{activeTab === "reset" && (
					<div className={cls.tabContent}>
						<div className={cls.tabContent_inputs}>
							<div className={cls.inputs_item}>
								<label htmlFor="reset-phone-input">Телефон</label>
								<div className={cls.item_input}>
									<span>+998</span>
									<input
										id="reset-phone-input"
										type="text"
										placeholder="99 999 99 99"
										maxLength={12}
										value={resetPhoneNumber}
										onChange={(e) =>
											setResetPhoneNumber(formatPhoneNumber(e.target.value))
										}
									/>
								</div>
							</div>
						</div>
						<div className={cls.content_bottom}>
							<button
								className={`${cls.bottom_btnReset} ${
									!isResetFormValid ? cls.disabled : ""
								}`}
								onClick={handleResetPassword}
								disabled={!isResetFormValid}
							>
								Сбросить пароль
							</button>
							<div className={`${cls.bottom_ps} ${cls.bottom_ps_click}`}>
								<label onClick={() => setActiveTab("login")}>
									Назад к входу
								</label>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ModalPopUp;
