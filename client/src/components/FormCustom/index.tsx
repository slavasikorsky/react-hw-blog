import { useEffect, useState } from "react";
import styled from "styled-components";
import FormCustomInput from "./FormCustomInput";
import { IInputItem } from "../../types/types";

type InputProps = {
	onSubmitHandler: any;
	inputs: IInputItem[];
};

const Submit = styled.button`
	font-weight: 700;
	margin-top: 20px;
	width: 200px;
`;

function FormCustom({ inputs, onSubmitHandler }: InputProps) {
	// create starting object with all input names
	const allInputs = {} as IInputItem;

	const [values, setValues] = useState([]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// send data
		onSubmitHandler(values);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		inputs.map((input: IInputItem) =>
			input.value
				? Object.assign(allInputs, { [input.name]: input.value })
				: Object.assign(allInputs, { [input.name]: "" })
		);
		setValues(allInputs);
	}, []);

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			{inputs.map((input) => (
				<FormCustomInput
					id={input.id}
					key={input.id}
					name={input.name}
					type={input.type}
					label={input.label}
					value={input.value}
					onChange={onChange}
					placeholder={input.placeholder}
					pattern={input.pattern}
					errorMessage={input.errorMessage}
					required={input.required}
				/>
			))}
			<Submit type="submit">Submit</Submit>
		</form>
	);
}

export default FormCustom;
