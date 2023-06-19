import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { User } from "../../../types/types";

type FormProps = {
	onSubmit: (data: User) => void;
	values: User;
};

const schema = yup.object().shape({
	fullName: yup.string().required("Please write name"),
	email: yup.string().email(),
});

function UserForm({ onSubmit, values }: FormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>({
		resolver: yupResolver(schema),
	});

	const [value, setValue] = useState<User>(values);

	const submitForm = () => {
		onSubmit(value);
	};

	const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	return (
		<>
			<h2>Update user info</h2>
			{errors?.fullName?.message}
			<form onSubmit={handleSubmit(submitForm)}>
				<input
					type="text"
					placeholder="fullName"
					value={value?.fullName || ""}
					{...register("fullName")}
					onChange={changeForm}
				/>
				<input
					type="email"
					placeholder="email"
					value={value?.email || ""}
					{...register("email")}
					onChange={changeForm}
				/>
				<input type="submit" value="Update" />
			</form>
		</>
	);
}

export default UserForm;
