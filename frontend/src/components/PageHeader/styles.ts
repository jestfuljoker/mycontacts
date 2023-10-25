import styled from 'styled-components';

export const Container = styled.div`
	margin-bottom: 24px;

	a {
		text-decoration: none;
		display: flex;
		align-items: center;

		span {
			font-size: 16px;
			font-weight: bold;
			color: ${({ theme }) => theme.colors.primary.main};
		}

		img {
			margin-right: 8px;
			transform: rotate(-90deg);
		}
	}

	h1 {
		font-size: 24px;
	}
`;
