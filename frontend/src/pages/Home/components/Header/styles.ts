import styled, { css } from 'styled-components';

export const Container = styled.header<{ justifyContent: string }>`
	${({ theme, justifyContent }) => css`
		display: flex;
		align-items: center;
		justify-content: ${justifyContent};

		border-bottom: 2px solid ${theme.colors.gray[100]};
		padding-bottom: 16px;

		strong {
			font-size: 24px;
		}

		a {
			text-decoration: none;
			font-weight: bold;
			font-size: 16px;
			color: ${theme.colors.primary.main};
			padding: 8px 16px;
			border: 2px solid ${theme.colors.primary.main};
			border-radius: 4px;
			transition: all 0.2s ease-in;

			&:hover {
				background: ${theme.colors.primary.main};
				color: #fff;
			}
		}
	`};
`;
