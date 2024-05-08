import pandaImg from "/public/images/panda.jpeg";
import pandaImg1 from "/public/images/panda1.jpg";
import nextCinema1 from "/public/images/NextCinema1.webp";

export const cardInfo = [
	{
		id: 1,
		name: "Kung fu panda 1",
		details: {
			releaseYear: 2008,
			genre: {
				type1: "Фнатастика",
				type2: "Мультфильм",
			},
			rating: 4.2,
			ages: "5+",
			img: pandaImg,
			dates: "19/04/2023",
		},
	},
	{
		id: 2,
		name: "Kung fu panda 2",
		details: {
			releaseYear: 2013,
			genre: {
				type1: "Фнатастика",
				type2: "Мультфильм",
			},
			rating: 4.2,
			ages: "6+",
			img: pandaImg1,
			dates: "11/04/2024",
		},
	},
	{
		id: 3,
		name: "Kung fu panda 3",
		details: {
			releaseYear: 2016,
			genre: {
				type1: "Фнатастика",
				type2: "Мультфильм",
			},
			rating: 4.5,
			ages: "6+",
			img: pandaImg,
			dates: "11/04/2023",
		},
	},
	{
		id: 4,
		name: "Kung fu panda 4",
		details: {
			releaseYear: 2024,
			genre: {
				type1: "Фнатастика",
				type2: "Мультфильм",
			},
			rating: 4.5,
			ages: "6+",
			img: pandaImg1,
			dates: "11/04/2023",
		},
	},
];

export const cinemaName = [
	{
		id: 1,
		name: "Next Cinema",
		details: {
			address: "Яккасарайский район, ул. БОБУРА, 6, этаж 3",
			info: "Кинотеатр NEXT CINEMA расположился в ТРЦ Next. Здесь демонстрируются самые свежие хиты международного и отечественного кинопроката в обычном формате и в формате 3D. Для зрителей работают четыре кинозала, каждый из которых рассчитан на 63 места. Во всех залах установлено новейшее оборудование, включающее в себя проекторы Christie Digital Solaria One и систему звука Dolby Digital 5.1. Также в кинотеатре работает кинобар, где можно порадовать себя вкусными закусками и напитками.",
		},
		images: nextCinema1,
	},
	{
		id: 2,
		name: "Salom Cinema",
		details: {
			address: "ул. Буюк Ипак Йули, 158А",
			info: "Кинотеатр рядом с Чайхона Салом",
		},
		images: nextCinema1,
	},
];
