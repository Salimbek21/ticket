import Home from "@/components/Home";
import SEO from "@/components/SEO";
import { sliders } from "@/store/slider/sliderThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Root() {
	return (
		<>
			<SEO
				title={"Главная - KinoTicket"}
				description={
					"Это главная страница КиноТикет, где вы можете найти и забронировать билеты на новинки кино."
				}
				keywords={"cinema, KinoTicket, home, main, Главная"}
			/>
			<Home />
		</>
	);
}
