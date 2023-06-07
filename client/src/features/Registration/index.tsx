import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import FormCustom from "../../components/FormCustom";
import registrationForm from "../../data/registrationForm";
import { IInputItem } from "../../types/types";
import { login } from "../../store/authSlice";
import useFetch from "../../hooks/useFetch";

function Registration() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const BASE_URL = "http://localhost:5010/user/registration";
	const [data, error, { handler: setFetch }] = useFetch(BASE_URL, "POST");
	const submitHandler = (newUser: IInputItem) => {
		setFetch(newUser);
	};

	useEffect(() => {
		if (data && !data.message) {
			console.log(data);
			dispatch(login(data));
			navigate("/");
		} else {
			console.log(data);
		}
	}, [data]);

	return (
		<Container>
			<h1>Registration page</h1>
			{data.message && <p>{data.message}</p>}
			{error && <p>{error}</p>}
			<FormCustom
				inputs={registrationForm}
				onSubmitHandler={submitHandler}
			/>
		</Container>
	);
}

export default Registration;
