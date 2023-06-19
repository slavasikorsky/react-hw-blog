import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
import UserForm from "./UserForm";
import { User } from "../../types/types";

type UserInterface = {
	fullName: string;
	email: string;
	id: number;
};

function Profile() {
	const [user, setUser] = useState<UserInterface | null>(null);
	const [error, setError] = useState<unknown>("");
	const [openPopup, setOpenPopup] = useState(false);

	const auth = useSelector((state: RootState) => state.auth);

	const BASE_URL = "http://localhost:5010/user";

	const id = auth.user?.id || auth.user?._id;

	const getUser = async () => {
		try {
			const result = await axios.get(`${BASE_URL}/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setUser(result.data);
		} catch (err) {
			setError(err);
		}
	};

	const updateUser = async (data: User) => {
		try {
			const result = await axios.patch(
				`${BASE_URL}/${id}`,
				{ ...data },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setUser(result.data);
		} catch (err) {
			setError(err);
		}
	};

	const updateUserHandler = () => {
		setOpenPopup(!openPopup);
	};
	const updateHandler = (data: User) => {
		setOpenPopup(!openPopup);
		updateUser(data);
	};

	useEffect(() => {
		if (id) {
			getUser();
		} else {
			setError("User not found, please login");
		}
	}, [id]);

	return (
		<>
			<h1>Users info</h1>
			{error && <p>error</p>}
			<p>User full name {user?.fullName}</p>
			<p>User email {user?.email}</p>

			<Button onClick={() => updateUserHandler()}>Update info</Button>
			<Popup trigger={openPopup} setTrigger={setOpenPopup}>
				<UserForm onSubmit={updateHandler} values={user} />
			</Popup>
			<p>For updating email please logout/login with new email</p>
		</>
	);
}

export default Profile;
