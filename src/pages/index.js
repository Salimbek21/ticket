import Home from "@/components/Home";
import { sliders } from "@/store/slider/sliderThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Root() {

  return (
    <>
      <Home />
    </>
  );
}
