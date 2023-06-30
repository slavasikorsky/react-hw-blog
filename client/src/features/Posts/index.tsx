import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import Form from "../../components/Form";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
import { PostInterface } from "../../types/types";
import useFetch from "../../hooks/useFetch";

interface DataRow {
	_id: number;
	title: string;
	body: string;
}

interface IPost {
	data?: PostInterface[];
}

function Posts() {
	const [openPopup, setOpenPopup] = useState(false);
	const [posts, setPosts] = useState<PostInterface[] | undefined>(undefined);
	const [editPost, setEditPost] = useState<PostInterface | null>(null);
	const [errorMessage, setErrorMessage] = useState<Error | null>(null);

	const BASE_URL = "http://localhost:5010/posts/";

	// get all posts hook
	const { data, error, handler: setFetch } = useFetch<IPost>("GET");
	// delete current post hook
	const { handler: deleteFetch } = useFetch<IPost>("DELETE");
	// edit post hook
	const { handler: editFetch } = useFetch<IPost>("PATCH");
	// create post hook
	// const { handler: createFetch } = useFetch<IPost>("POST");

	const editHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number
	) => {
		e.preventDefault();
		const editContent = posts?.filter((post) => post._id === id);
		if (editContent) {
			setEditPost(editContent[0]);
		}
		setOpenPopup(!openPopup);
	};

	const editPostHandler = async (updatedContent: PostInterface) => {
		try {
			editFetch(`${BASE_URL}${updatedContent._id}`, updatedContent);
			setFetch(BASE_URL);
			setOpenPopup(!openPopup);
		} catch (err) {
			setErrorMessage(err as Error);
		}
	};

	const deleteHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number
	) => {
		e.preventDefault();
		try {
			deleteFetch(`${BASE_URL}/${id}`);
			setFetch(BASE_URL);
		} catch (err) {
			setErrorMessage(err as Error);
		}
	};

	const createPostHandler = () => {
		setEditPost(null);
		setOpenPopup(!openPopup);
	};

	const createPost = async (args: PostInterface) => {
		try {
			const formData = new FormData();
			Object.entries(args).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					value.forEach((item) => {
						formData.append(key, item);
					});
				} else {
					formData.append(key, value);
				}
			});
			// createFetch(BASE_URL, formData);

			await axios.post(BASE_URL, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setFetch(BASE_URL);
		} catch (err) {
			setErrorMessage(err as Error);
		}
	};

	const createHandler = async (values: PostInterface) => {
		const id = editPost?._id;
		if (id) {
			editPostHandler(values);
			// clear
			setOpenPopup(!openPopup);
			setEditPost(null);
		} else {
			createPost(values);
			setOpenPopup(!openPopup);
		}
	};

	const editRow = (row: DataRow) => (
		<button type="button" onClick={(e) => editHandler(e, row._id)}>
			edit
		</button>
	);

	const deleteRow = (row: DataRow) => (
		<button type="button" onClick={(e) => deleteHandler(e, row._id)}>
			del
		</button>
	);

	const columns: TableColumn<DataRow>[] = [
		{
			name: "Title",
			selector: (row) => row.title,
		},
		{
			name: "Text",
			selector: (row) => row.body,
		},
		{
			name: "Edit",
			cell: (row: DataRow) => editRow(row),
		},
		{
			name: "Delete",
			cell: (row: DataRow) => deleteRow(row),
		},
	];

	useEffect(() => {
		setFetch(BASE_URL);
	}, []);

	useEffect(() => {
		setPosts(data?.data);
	}, [data]);

	return (
		<>
			<h1>Posts</h1>
			{errorMessage && <p>{errorMessage.message}</p>}
			{error && <p>{error.message}</p>}
			{posts && <DataTable columns={columns} data={posts} />}
			<Button onClick={() => createPostHandler()}>Create new post</Button>
			<Popup trigger={openPopup} setTrigger={setOpenPopup}>
				<Form onSubmit={createHandler} values={editPost} />
			</Popup>
		</>
	);
}

export default Posts;
