const registrationForm = [
	{
		id: 0,
		name: "firstName",
		type: "text",
		placeholder: "First name",
		errorMessage: "Please write something!",
		label: "First name",
		required: true,
	},
	{
		id: 1,
		name: "lastName",
		type: "text",
		placeholder: "Last name",
		errorMessage: "Please write something!",
		label: "Last name",
		required: true,
	},
	{
		id: 2,
		name: "email",
		type: "email",
		placeholder: "Email",
		errorMessage: "It should be a valid email address!",
		label: "Email",
		required: true,
	},
	{
		id: 3,
		name: "password",
		type: "password",
		placeholder: "Password",
		errorMessage: "It should be a valid text!",
		label: "Password",
		required: true,
	},
	{
		id: 4,
		name: "confirmPassword",
		type: "password",
		placeholder: "Confirm Password",
		errorMessage: "Passwords don't match!",
		label: "Confirm Password",
		required: true,
	},
];

export default registrationForm;
