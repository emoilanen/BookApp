import styled from "@emotion/styled";

const FormButton = styled.button(({color}) =>
`
	padding: 10px;
	color: pink;
	background-color: ${color || 'green'};
	cursor: pointer;
	border: none;
	border-radius: 5px;
	font-size: 0.9em;
	font-weight: bold;
`);


export interface ButtonProps {
	text: string;
	color?: string;
	onClick: () => void;
}

const Button = ({text, color, onClick, ...props}:ButtonProps) => {
	return <FormButton
		color={color}
		onClick={onClick}>
		{ text }
	</FormButton>;
};

export default Button;