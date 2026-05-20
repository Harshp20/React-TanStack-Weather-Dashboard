import { Toaster } from "react-hot-toast";
import { toastOptions } from "@/lib/toast";

export default function AppToaster() {
	return <Toaster position="top-right" toastOptions={toastOptions} />;
}
