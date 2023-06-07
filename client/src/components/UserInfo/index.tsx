import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";

const UserBlock = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	a {
		margin: 0 5px;
	}
	span {
		padding: 0 0 5px;
	}
`;
const LinksWrapper = styled.div`
	display: flex;
`;

function UserInfo() {
	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		try {
			dispatch(logout());
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<UserBlock>
			{auth.user && <span>Hello {auth.user.email}</span>}
			{auth.user ? (
				<button type="button" onClick={() => logoutHandler()}>
					Logout
				</button>
			) : (
				<LinksWrapper>
					<Link to="/login">Login</Link>/
					<Link to="/registration">Registration</Link>
				</LinksWrapper>
			)}
		</UserBlock>
	);
}

export default UserInfo;
