const CTAForm = [
	{
		id: 1,
		name: "email",
		type: "email",
		placeholder: "Email",
		errorMessage: "It should be a valid email address!",
		label: "Email",
		required: true,
	},
	{
		id: 2,
		name: "phone",
		type: "tel",
		placeholder: "Phone",
		errorMessage: "It should be a valid phone number!",
		pattern: "[0-9]{7}",
		label: "Phone",
		required: true,
	},
];

export default CTAForm;
