import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import FormCustom from "../../components/FormCustom";
import loginForm from "../../data/loginForm";
import { IInputItem, User } from "../../types/types";
import { login } from "../../store/authSlice";
import useFetch from "../../hooks/useFetch";

interface ApiResponse {
	message?: string;
	token?: string;
	result?: string;
}

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const BASE_URL = "http://localhost:5010/user/login";
	const { data, error, handler: setFetch } = useFetch<ApiResponse>("POST");
	const submitHandler = (values: IInputItem) => {
		setFetch(BASE_URL, values);
	};

	useEffect(() => {
		if (data && !data.message && data.result && data.token) {
			const user: User = data.result as unknown as User;
			dispatch(login({ token: data.token, result: user }));
			navigate("/");
		}
	}, [data, dispatch, navigate]);

	return (
		<Container>
			<h1>Login page</h1>
			{error && <p>{error.message}</p>}
			{data && data.message && <p>{data.message}</p>}
			<FormCustom inputs={loginForm} onSubmitHandler={submitHandler} />
		</Container>
	);
}

export default Login;
