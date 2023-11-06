import sad from '@assets/images/sad.svg';
import Button from '@components/Button';

import * as S from './styles';

interface ErrorStatusProps {
	onTryAgain: () => void;
}

export default function ErrorStatus({ onTryAgain }: ErrorStatusProps) {
	return (
		<S.Container>
			<img src={sad} alt="Sad" />

			<div className="details">
				<strong>Ocorreu um error ao obter os seus contatos!</strong>
				<Button type="button" onClick={onTryAgain}>
					Tentar novamente
				</Button>
			</div>
		</S.Container>
	);
}
