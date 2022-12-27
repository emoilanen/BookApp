import styled from "@emotion/styled";

const FooterContainer = styled.div`
	background-color: black;
	height: 12em;
  position: relative;
  bottom: 0;
  width: 100%;
	margin-top: 10em;
	display: flex;
	justify-content: center;
`;

const StyledText = styled.p`
	color: #fff;
	display: flex;
	align-self: flex-end;
	font-style: italic;
`;


const Footer = () => {
	return <FooterContainer>
		<StyledText>BookApp © Elisa Moilanen 2022</StyledText>
	</FooterContainer>;
};

export default Footer;