import { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { TableColumn } from "react-data-table-component";
import Form from "../../components/Form";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
import { PostInterface } from "../../types/types";

interface DataRow {
	_id: number;
	title: string;
	body: string;
	editRow: (row: DataRow) => JSX.Element;
	deleteRow: (row: DataRow) => JSX.Element;
}

function Posts() {
	const [openPopup, setOpenPopup] = useState(false);
	const [posts, setPosts] = useState<DataRow[]>([]);
	const [editPost, setEditPost] = useState<PostInterface | null>(null);

	const BASE_URL = "http://localhost:5010/posts/";

	const getAllPosts = async () => {
		try {
			const result = await axios.get(BASE_URL, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setPosts(result.data.data);
		} catch (err) {
			console.log("Error:", err);
		}
	};

	const editHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number
	) => {
		e.preventDefault();
		const editContent = posts.filter((post) => post._id === id);
		setEditPost(editContent[0]);
		setOpenPopup(!openPopup);
	};

	const editPostHandler = async (updatedContent: PostInterface) => {
		try {
			await axios.patch(
				`${BASE_URL}${updatedContent._id}`,
				updatedContent,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			getAllPosts();
			setOpenPopup(!openPopup);
		} catch (err) {
			console.log("Error:", err);
		}
	};

	const deleteHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number
	) => {
		e.preventDefault();
		try {
			await axios.delete(`${BASE_URL}${id}`, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			getAllPosts();
		} catch (err) {
			console.log("Error:", err);
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
			await axios.post(BASE_URL, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			getAllPosts();
		} catch (err) {
			console.log("Error:", err);
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
			selector: (row) => editRow(row),
		},
		{
			name: "Delete",
			selector: (row) => deleteRow(row),
		},
	];

	useEffect(() => {
		getAllPosts();
	}, []);

	return (
		<>
			<h1>Posts</h1>
			{posts && <DataTable columns={columns} data={posts} />}
			<Button onClick={() => createPostHandler()}>Create new post</Button>
			<Popup trigger={openPopup} setTrigger={setOpenPopup}>
				<Form onSubmit={createHandler} values={editPost} />
			</Popup>
		</>
	);
}

export default Posts;
