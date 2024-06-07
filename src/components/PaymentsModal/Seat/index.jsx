const Seat = ({ seat, onClick }) => {
	const seatStyle = {
		width: "32px",
		height: "26px",
		borderRadius: seat.isSelected ? "50%" : "inherit",
		borderTopLeftRadius: "10px",
		borderTopRightRadius: "10px",
		backgroundColor: seat.status === "occupied" ? "#f37905" : "#0f131d66",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
	};

	const seatNum = {
		fontSize: "16px",
		fontWeight: "600",
		lineHeight: "100%",
		letterSpacing: "0%",
		color: "white",
		display: "none",
	};

	if (seat.status === "occupied") {
		seatNum.display = "block";
	}

	return (
		<div style={seatStyle} onClick={onClick}>
			{/* {seat.status === "occupied" ? "" : ""} */}
			<div style={seatNum}>{seat.number}</div>
		</div>
	);
};

export default Seat;
