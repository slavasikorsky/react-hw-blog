import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type CommentsType = {
	id: number;
};

function Comments({ id }: CommentsType) {
	const BASE_URL = `http://localhost:5010/posts/`;

	const auth = useSelector((state: RootState) => state.auth);
	const { user } = auth;
	const [comments, setComments] = useState([]);

	async function getComments() {
		try {
			const res = await axios.get(`${BASE_URL}${id}/comments`);
			setComments(res.data);
		} catch (err) {
			console.log(err);
		}
	}
	/* 
	async function getUserName(userId: number) {
		try {
			const res = await axios.get(`http://localhost:5010/user/${userId}`);
			console.log(res.data);
			return res.data.fullName;
		} catch (err) {
			console.log(err);
		}
		return false;
	}
*/

	useEffect(() => {
		if (id !== undefined) {
			getComments();
		}
	}, [id]);

	const handlerSubmit = async (e) => {
		e.preventDefault();
		const commentBody = {
			text: newComment,
			userId: user?.id || false,
		};

		try {
			const res = await axios.post(
				`${BASE_URL}${id}/comments`,
				commentBody,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setComments(res.data.comments);
			setNewComment("");
		} catch (err) {
			console.log(err);
		}
	};

	const handlerLike = async (e, commentId) => {
		e.preventDefault();
		await axios
			.patch(`${BASE_URL}${id}/comments/${commentId}/like`)
			.then((res) => {
				setComments(res.data.comments);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const showCommentReplyForm = (e) => {
		e.preventDefault();
		const formReply = e.target.parentNode.nextSibling;
		formReply.classList.toggle("active");
	};

	const handlerCommentReply = async (e, commentId, text) => {
		try {
			const { data } = await axios.patch(
				`${BASE_URL}${id}/comments/${commentId}/reply`,
				{ text }
			);
			setComments(data.comments);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<ul>
				{comments &&
					comments.map((comment) => (
						<li key={comment._id}>
							<span>{comment.text}</span>
							<span>
								<span>| Likes: {comment.likes}</span>
								<button
									type="button"
									onClick={(e) => handlerLike(e, comment._id)}
								>
									Like
								</button>
								<button
									type="button"
									onClick={(e) => showCommentReplyForm(e)}
								>
									Reply
								</button>
							</span>

							<form
								onSubmit={(e) => {
									e.preventDefault();
									handlerCommentReply(
										e,
										comment._id,
										e.target.reply.value
									);
									e.target.reply.value = "";
								}}
							>
								<textarea name="reply" placeholder="Reply..." />
								<button type="submit">Submit</button>
							</form>
							{comment.replies.length > 0 && (
								<div>
									<b>Replyes:</b>
									{comment.replies &&
										comment.replies.map((reply) => (
											<p>{reply}</p>
										))}
								</div>
							)}
						</li>
					))}
			</ul>
			{user ? (
				<form onSubmit={(e) => handlerSubmit(e)}>
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					/>
					<button type="submit">Add comment</button>
				</form>
			) : (
				<h3>Please login to post your shitty comments</h3>
			)}
		</div>
	);
}

export default Comments;
