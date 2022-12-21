import styled from "@emotion/styled";
import React from 'react';
import { BREAKPOINT } from "../../theme";

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 50%;
	gap: 10px;
	margin-right: 10px;
	@media (max-width: ${BREAKPOINT}) {
        margin-right: 0px;
				margin-bottom: 10px;
      }
`;
