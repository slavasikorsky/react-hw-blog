import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ShowUserName from "../../helpers/showUserName";

type CommentsType = {
	id: number | undefined;
};

interface CommentInterface {
	_id: number;
	text: string;
	userId: number;
	likes: number;
	replies: string[];
}

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
	const [comments, setComments] = useState<CommentInterface[] | null>(null);
	const [newComment, setNewComment] = useState<string | undefined>(undefined);
	const [reply, setReply] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<Error | null>(null);

	async function getComments() {
		try {
			const res = await axios.get(`${BASE_URL}${id}/comments`);
			setComments(res.data);
		} catch (err) {
			setErrorMessage(err as Error);
		}
	}

	useEffect(() => {
		if (id !== undefined) {
			getComments();
		}
	}, [id]);

	const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
			setErrorMessage(err as Error);
		}
	};

	const handlerLike = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		commentId: number
	) => {
		e.preventDefault();
		await axios
			.patch(`${BASE_URL}${id}/comments/${commentId}/like`)
			.then((res) => {
				setComments(res.data.comments);
			})
			.catch((err) => {
				setErrorMessage(err as Error);
			});
	};

	const showCommentReplyForm = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		const target = e.target as Element;
		const formReply = target.parentNode?.nextSibling as Element;
		formReply?.classList.toggle("active");
	};

	const handlerCommentReply = async (
		e: React.FormEvent<HTMLFormElement>,
		commentId: number,
		text: string
	) => {
		e.preventDefault();
		try {
			const { data } = await axios.patch(
				`${BASE_URL}${id}/comments/${commentId}/reply`,
				{ text }
			);
			setComments(data.comments);
			setReply("");
		} catch (err) {
			setErrorMessage(err as Error);
		}
	};

	return (
		<>
			{errorMessage && <p>{errorMessage.message}</p>}
			<CommentsList>
				{comments &&
					comments.map((comment) => (
						<li key={comment._id}>
							<ShowUserName id={comment?.userId} />
							<span>{comment.text}</span>
							<span>
								<span> | Likes: {comment.likes}</span>
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
									handlerCommentReply(e, comment._id, reply);
								}}
							>
								<textarea
									name="reply"
									placeholder="Reply..."
									value={reply}
									onChange={(e) => setReply(e.target.value)}
								/>
								<button type="submit">Submit</button>
							</FormReply>
							{comment?.replies.length > 0 && (
								<ReplyList>
									<b>Replies:</b>
									{comment.replies &&
										comment.replies.map((item) => (
											<p key={item}>{item}</p>
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
