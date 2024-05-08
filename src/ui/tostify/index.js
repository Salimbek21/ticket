import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { btoa } from "next/dist/compiled/@edge-runtime/primitives/encoding";

export const ok = (message) => {
  toast.success(message, {
    toastId: "success",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
export const anyMessage = (message) => {
  toast.warn(message, {
    toastId: "warn",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
export const errorMessage = (message) => {
  toast.error(message, {
    toastId: "error",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
