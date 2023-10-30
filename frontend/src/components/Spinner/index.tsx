import * as S from './styles';

export interface SpinnerProps {
	size?: number;
}

export function Spinner({ size = 32 }: SpinnerProps) {
	return <S.StyledSpinner size={size} />;
}
