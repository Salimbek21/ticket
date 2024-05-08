import { User } from "@/components/svg";
import cls from "./personal.module.scss";

const Personal = () => {
	return (
		<div className={cls.account_personal}>
			<div className={cls.data}>
				<div className={cls.inputs}>
					<div className={cls.block}>
						<label htmlFor="personal-name-input">Имя</label>
						<input
							className={cls.input}
							type="text"
							placeholder="Ваше имя"
							id="personal-name-input"
						/>
					</div>
					<div className={cls.block}>
						<label htmlFor="personal-email-input">Email</label>
						<input
							className={cls.input}
							type="text"
							placeholder="Почта"
							id="personal-email-input"
						/>
					</div>
					<div className={cls.block}>
						<label htmlFor="personal-password-input">Изменить пароль</label>
						<input
							className={cls.input}
							type="password"
							placeholder="*****"
							id="personal-password-input"
						/>
					</div>
					<div className={cls.block}>
						<label htmlFor="personal-password-repeat-input">
							Повторить пароль
						</label>
						<input
							className={cls.input}
							type="password"
							placeholder="*****"
							id="personal-password-repeat-input"
						/>
					</div>
				</div>
				<button className={cls.btn_save}>Сохранить</button>
				<div className={cls.delete}>
					<button className={cls.delete_btn}>
						Удалить аккаунт: +998222585697
					</button>
				</div>
			</div>
			<div className={cls.upload_photo}>
				<div className={cls.photo_preview}>
					<div className={cls.preview_default}>
						<User />
					</div>
				</div>
				<input
					class={cls.visually_hidden}
					type="file"
					accept="image/png;image/jpeg;image/jpg"
					id="personal-photo-input"
				/>
				<label className={cls.upload_btn} htmlFor="personal-photo-input">
					<span>Загрузить фото</span>
				</label>
			</div>
		</div>
	);
};

export default Personal;
