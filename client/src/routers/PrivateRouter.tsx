import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

type LayoutProps = {
	children: JSX.Element;
};

function PrivateRouter({ children }: LayoutProps) {
	const { user } = useSelector((state: RootState) => state.auth);
	if (!user) {
		return <Navigate to="/login" />;
	}
	return children;
}

export default PrivateRouter;
