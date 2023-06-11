import { useEffect, useState } from "react";

import DataTable, { TableColumn } from "react-data-table-component";
import Form from "../../components/Form";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
import useFetch from "../../hooks/useFetch";
import { Inputs } from "../../types/types";

interface DataRow {
	_id: number;
	title: string;
	body: string;
	editRow: (row: DataRow) => JSX.Element;
}

function Posts() {
	const [openPopup, setOpenPopup] = useState(false);
	const [posts, setPosts] = useState<DataRow[]>([]);
	const [editPost, setEditPost] = useState(false);

	const BASE_URL = "http://localhost:5010/posts/";
	// get all posts
	const [data, error, { handler: setFetch }] = useFetch("GET");
	const [newPostResponse, postError, { handler: setNewPost }] =
		useFetch("POST");
	const [postDelete, poseDeleteError, { handler: deletePost }] =
		useFetch("DELETE");
	const [dataPostUpdate, postUpdateError, { handler: updatePost }] =
		useFetch("PATCH");

	const editHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number
	) => {
		e.preventDefault();
		const editContent = posts.filter((post) => post._id === id);
		setEditPost(editContent[0]);
		setOpenPopup(!openPopup);
	};

	const deleteHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number
	) => {
		e.preventDefault();
		deletePost(`${BASE_URL}${id}`);
	};

	const createPostHandler = () => {
		setEditPost(false);
		setOpenPopup(!openPopup);
	};

	const createHandler = (values: Inputs) => {
		const id = editPost._id;
		if (id) {
			updatePost(`${BASE_URL}${id}`, values);
			console.log(postUpdateError);
			console.log(dataPostUpdate);

			// clear
			setOpenPopup(!openPopup);
			setEditPost(false);
		} else {
			setNewPost(BASE_URL, values);
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
		setFetch(BASE_URL);
	}, [newPostResponse, postDelete, dataPostUpdate]);

	useEffect(() => {
		setPosts(data.data);
	}, [data]);

	return (
		<>
			<h1>Posts</h1>
			{poseDeleteError && <p>{poseDeleteError}</p>}
			{error && <p>{error.message}</p>}
			{data && <DataTable columns={columns} data={posts} />}
			<Button onClick={() => createPostHandler()}>Create new post</Button>
			<Popup trigger={openPopup} setTrigger={setOpenPopup}>
				{postError && { postError }}
				<Form onSubmit={createHandler} values={editPost} />
			</Popup>
		</>
	);
}

export default Posts;
