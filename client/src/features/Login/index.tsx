import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import FormCustom from "../../components/FormCustom";
import loginForm from "../../data/loginForm";
import { IInputItem } from "../../types/types";
import { login } from "../../store/authSlice";
import useFetch from "../../hooks/useFetch";

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const BASE_URL = "http://localhost:5010/user/login";
	const [data, error, { handler: setFetch }] = useFetch("POST");
	const submitHandler = (values: IInputItem) => {
		setFetch(BASE_URL, values);
	};

	useEffect(() => {
		if (data && !data.message) {
			dispatch(login(data));
			navigate("/");
		}
	}, [data]);

	return (
		<Container>
			<h1>Login page</h1>
			{error && <p>{error.message}</p>}
			{data.message && <p>{data.message}</p>}
			<FormCustom inputs={loginForm} onSubmitHandler={submitHandler} />
		</Container>
	);
}

export default Login;
