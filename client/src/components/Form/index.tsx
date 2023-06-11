import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Inputs } from "../../types/types";

type FormProps = {
	onSubmit: (data: Inputs) => void;
	values?: Inputs;
};

const schema = yup.object().shape({
	title: yup.string().required("Please write title"),
	body: yup.string().required("Please write body"),
	categories: yup.string(),
	tag: yup.string(),
	file: yup.string().required("Please add image"),
});

function Form({ onSubmit, values }: FormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
	});

	const [value, setValue] = useState<Inputs | undefined>(values);

	const submitForm = (data: Inputs) => {
		onSubmit(data);
	};

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		setValue({ ...value, [name]: files?.[0] });
	};

	const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(value);
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	return (
		<>
			<h2>Create new post</h2>
			{errors?.title?.message}
			{errors?.body?.message}
			{errors?.file?.message}
			<form onSubmit={handleSubmit(submitForm)}>
				<input
					type="text"
					placeholder="Title..."
					value={value?.title || ""}
					{...register("title", { required: true })}
					onChange={changeForm}
				/>
				<input
					type="text"
					placeholder="Body..."
					value={value?.body || ""}
					{...register("body")}
					onChange={changeForm}
				/>
				<input
					type="text"
					placeholder="Category..."
					value={value?.categories || ""}
					{...register("categories")}
					onChange={changeForm}
				/>
				<input
					type="text"
					placeholder="Tags..."
					value={value?.tag || ""}
					{...register("tag")}
					onChange={changeForm}
				/>
				<label htmlFor="file" className="label">
					<span>
						{JSON.stringify(value?.file) || "No file selected..."}
					</span>
					<input
						id="file"
						type="file"
						placeholder="File..."
						{...register("file")}
						onChange={changeFile}
					/>
				</label>
				{errors?.file?.message}
				<input type="submit" />
			</form>
		</>
	);
}

export default Form;

Form.defaultProps = {
	values: null,
};
