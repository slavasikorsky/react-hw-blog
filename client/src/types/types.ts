export default interface IPost {
	id: number;
	userId?: number;
	title: string;
	body?: string;
}

export interface IMenuItem {
	url: string;
	text: string;
}

export interface ISocialItem {
	url: string;
	name: string;
}

export interface ValidationProps {
	isEmpty?: boolean;
	minLength?: number;
	isEmail?: boolean;
	isPhone?: boolean;
}

export interface IInputItem {
	id: number;
	name: string;
	type: string;
	placeholder: string;
	errorMessage?: string;
	label: string;
	pattern?: string;
	required: boolean;
	value?: string;
}
