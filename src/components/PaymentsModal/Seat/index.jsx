const Seat = ({ seat, onClick }) => {
	const seatStyle = {
		width: "32px",
		height: "26px",
		borderRadius: seat.isSelected ? "50%" : "inheri",
		borderTopLeftRadius: "10px",
		borderTopRightRadius: "10px",
		backgroundColor: seat.status === "occupied" ? "#f37905" : "#0f131d66",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
	};

	return (
		<div style={seatStyle} onClick={onClick}>
			{seat.status === "occupied" ? "" : ""}
		</div>
	);
};

export default Seat;
