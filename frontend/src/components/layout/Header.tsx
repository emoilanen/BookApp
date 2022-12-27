import styled from "@emotion/styled";
import { BREAKPOINT } from "../../theme";

const HeaderContainer = styled.div`
	background-color: black;
	height: 5em;
	margin-top: 0em;
	padding: 0em;
	margin-bottom: 5em;
	display: flex;
	align-items: center;
`;

const StyledText = styled.p`
	color: #fff;
	font-style: italic;
	font-size: 1.5em;
	margin-left: 20%;
	@media (max-width: ${BREAKPOINT}) {
        margin-left: 3%;
      }
`;


const Header = () => {
	return <HeaderContainer>
		<StyledText>BookApp</StyledText>
	</HeaderContainer>;
};

export default Header;