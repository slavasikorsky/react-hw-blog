import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { PostInterface } from "../../types/types";
import "react-quill/dist/quill.snow.css";

type FormProps = {
	onSubmit: (data: PostInterface) => Promise<void>;
	values: PostInterface | null;
};

const schema = yup.object().shape({
	title: yup.string().required("Please write title"),
	body: yup.string(),
	categories: yup.string(),
	tag: yup.string(),
	thumbnail: yup.mixed(),
});

function Form({ onSubmit, values }: FormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PostInterface>({
		resolver: yupResolver(schema),
	});

	const [value, setValue] = useState<PostInterface | null>(values);
	const [editorState, setEditorState] = useState<string>(values?.body || "");
	const submitForm = async () => {
		if (value) {
			onSubmit(value);
		}
	};

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		setValue({ ...value, [name]: files?.[0] });
	};

	const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setValue({ ...value, body: editorState });
	}, [editorState]);

	return (
		<>
			<h2>Create new post</h2>
			{errors?.title?.message}
			{errors?.thumbnail?.message}
			<form onSubmit={handleSubmit(submitForm)}>
				<input
					type="text"
					placeholder="Title..."
					value={value?.title || ""}
					{...register("title", { required: true })}
					onChange={changeForm}
				/>
				<ReactQuill
					theme="snow"
					value={editorState}
					onChange={setEditorState}
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
				<label htmlFor="thumbnail" className="label">
					<span>
						{JSON.stringify(value?.thumbnail) ||
							"No file selected..."}
					</span>
					<input
						id="thumbnail"
						type="file"
						placeholder="File..."
						{...register("thumbnail")}
						onChange={changeFile}
					/>
				</label>
				<input type="submit" />
			</form>
		</>
	);
}

export default Form;
