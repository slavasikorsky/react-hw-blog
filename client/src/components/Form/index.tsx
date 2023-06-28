import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactQuill from "react-quill";
import * as yup from "yup";
import { useState } from "react";
import { PostInterface } from "../../types/types";
import "react-quill/dist/quill.snow.css";

type FormProps = {
	onSubmit: (data: PostInterface, editorState: string | null) => void;
	values: PostInterface | null;
};

const schema = yup.object().shape({
	title: yup.string().required("Please write title"),
	body: yup.string().required("Please write body"),
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

	const [editorState, setEditorState] = useState<string | null>(null);
	const [value, setValue] = useState<PostInterface>(values);

	const submitForm = () => {
		onSubmit(value, editorState);
	};

	const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		setValue({ ...value, [name]: files?.[0] });
	};

	const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	return (
		<>
			<h2>Create new post</h2>
			{errors?.title?.message}
			{errors?.body?.message}
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
					{...register("body")}
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
