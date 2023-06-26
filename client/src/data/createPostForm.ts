const createPostForm = [
	{
		id: 1,
		name: "title",
		type: "text",
		placeholder: "Title",
		errorMessage: "Please write title",
		label: "Title",
		required: true,
		value: "123",
	},
	{
		id: 2,
		name: "body",
		type: "text",
		placeholder: "Body",
		errorMessage: "Please write text",
		label: "body",
		required: true,
	},
	{
		id: 3,
		name: "file",
		type: "file",
		placeholder: "Image",
		errorMessage: "Please add image",
		label: "file",
		required: true,
	},
];

export default createPostForm;
