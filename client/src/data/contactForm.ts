const contactForm = [
	{
		id: 1,
		name: "username",
		type: "text",
		placeholder: "Username",
		errorMessage:
			"Username should be 3-16 characters and shouldn't include any special character!",
		label: "Username",
		pattern: "^[A-Za-z0-9]{3,16}$",
		required: false,
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
		name: "phone",
		type: "tel",
		placeholder: "Phone",
		errorMessage: "It should be a valid phone number!",
		pattern: "[0-9]{7}",
		label: "Phone",
		required: true,
	},
];

export default contactForm;
