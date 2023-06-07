import { useState } from "react";
import styled from "styled-components";
import { IInputItem } from "../../../types/types";

const InputField = styled.div`
	display: flex;
	flex-direction: column;
	width: 320px;
`;

const ErrorBlock = styled.span`
	font-size: 12px;
	padding: 3px;
	color: red;
	display: none;
`;

interface FormInput extends IInputItem {
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

function FormCustomInput({
	label,
	errorMessage,
	onChange,
	id,
	placeholder,
	value,
	pattern,
	required,
	type,
	name,
}: FormInput) {
	const [focused, setFocused] = useState(false);

	const handleFocus = () => {
		setFocused(true);
	};

	return (
		<InputField key={id}>
			<label htmlFor={label}>
				{label}
				<input
					type={type}
					id={label}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={handleFocus}
					pattern={pattern}
					required={required}
					onFocus={() => setFocused(true)}
					// eslint-disable-next-line
					focused={focused.toString()}
					placeholder={placeholder}
				/>
				<ErrorBlock>{errorMessage}</ErrorBlock>
			</label>
		</InputField>
	);
}

export default FormCustomInput;
