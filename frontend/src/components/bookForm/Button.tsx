import styled from "@emotion/styled";

const FormButton = styled.button(({color}) =>
`
	padding: 10px;
	color: white;
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
	onClick?: () => void;
	disabled?: boolean;
}

const Button = ({text, color, onClick, disabled}:ButtonProps) => {

	return <> 
	{ !disabled ?
		<FormButton
		color={color}
		onClick={onClick}
		>
		{ text } 
	</FormButton>
	:
	<FormButton
		color={'gray'}
		>
		{ text } 
	</FormButton>
	}
	</>
};

export default Button;