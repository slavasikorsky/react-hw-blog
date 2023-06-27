import { useEffect, useState } from "react";

import DataTable, { TableColumn } from "react-data-table-component";
import useFetch from "../../hooks/useFetch";

interface DataRow {
	_id: number;
	fullName: string;
	email: string;
}

function Users() {
	const [users, setUsers] = useState<DataRow[] | null>(null);

	const BASE_URL = "http://localhost:5010/user/list/";
	// get all users
	const { data, error, handler: setFetch } = useFetch<DataRow[]>("GET");

	const editHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		id: number
	) => {
		e.preventDefault();
		console.log(id);
	};

	const editRow = (row: DataRow) => (
		<button type="button" onClick={(e) => editHandler(e, row._id)}>
			edit
		</button>
	);

	const columns: TableColumn<DataRow>[] = [
		{
			name: "Email",
			selector: (row) => row.email,
		},
		{
			name: "fullName",
			selector: (row) => row.fullName,
		},
		{
			name: "Edit",
			cell: (row: DataRow) => editRow(row),
		},
	];

	useEffect(() => {
		setFetch(BASE_URL);
	}, []);

	useEffect(() => {
		setUsers(data);
	}, [data]);

	return (
		<>
			<h1>Users</h1>
			{error && <p>{error.message}</p>}
			{users && <DataTable columns={columns} data={users} />}
		</>
	);
}

export default Users;
