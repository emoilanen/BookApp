import styled from "@emotion/styled";
import React from 'react';
import { BREAKPOINT } from "../../theme";

const StyledContainer = styled.div`
	margin: auto;
	margin-top: 1em;
	display: flex;
	flex-direction: row;
	max-width: 60%;
	@media (max-width: ${BREAKPOINT}) {
        max-width: 95%;
				flex-direction: column;
      }
`;

export interface ContentProps {
	children: any;
}

const Container = ({children}: ContentProps) => {
		return <StyledContainer>{children}</StyledContainer>
};

export default Container;