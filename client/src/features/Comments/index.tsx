import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ShowUserName from "../../helpers/showUserName";

type CommentsType = {
	id: number;
};

const CommentsList = styled.ul`
	list-style: none;
	padding: 0 0 0 20px;
	li {
		margin: 0 0 20px;
		padding: 0 0 10px;
		border-bottom: 1px solid #ccc;
	}
	button {
		margin: 0 10px;
		height: 26px;
	}
`;

const FormReply = styled.form`
	display: none;
	&.active {
		display: flex;
		flex-flow: nowrap;
		margin: 10px 0 20px;
	}
`;

const FormComment = styled.form`
	display: flex;
	flex-flow: nowrap;
	margin: 10px 0 20px;
`;

const ReplyList = styled.div`
	font-size: 12px;
	padding-left: 10px;
`;

function Comments({ id }: CommentsType) {
	const BASE_URL = `http://localhost:5010/posts/`;

	const auth = useSelector((state: RootState) => state.auth);
	const { user } = auth;
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState([]);

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
		console.log(formReply);
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
		<>
			<CommentsList>
				{comments &&
					comments.map((comment) => (
						<li key={comment._id}>
							<ShowUserName id={comment?.userId} />
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
							<FormReply
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
							</FormReply>
							{comment?.replies.length > 0 && (
								<ReplyList>
									<b>Replyes:</b>
									{comment.replies &&
										comment.replies.map((reply) => (
											<p key={reply}>{reply}</p>
										))}
								</ReplyList>
							)}
						</li>
					))}
			</CommentsList>
			{user ? (
				<FormComment onSubmit={(e) => handlerSubmit(e)}>
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					/>
					<button type="submit">Add comment</button>
				</FormComment>
			) : (
				<h3>Please login to post your shitty comments</h3>
			)}
		</>
	);
}

export default Comments;
