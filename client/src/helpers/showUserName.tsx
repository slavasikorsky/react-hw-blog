import axios from "axios";
import { useEffect, useState } from "react";

type ShowUserNameType = {
	id: number;
};

function ShowUserName({ id }: ShowUserNameType) {
	const [userName, setUserName] = useState<string | null>(null);
	const [error, setError] = useState<Error | null>(null);

	async function getUserName() {
		try {
			const res = await axios.get(`http://localhost:5010/user/${id}`);
			setUserName(res.data.fullName);
		} catch (err) {
			setError(err as Error);
		}
	}

	useEffect(() => {
		getUserName();
	}, []);

	return (
		<>
			{!error && userName && <strong>{userName}: </strong>}
			<br />
		</>
	);
}

export default ShowUserName;
