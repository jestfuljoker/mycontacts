import arrow from '@assets/images/icons/arrow.svg';
import { Link } from 'react-router-dom';

import * as S from './styles';

interface PageHeaderProps {
	title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
	return (
		<S.Container>
			<Link to="/">
				<img src={arrow} alt="Back to home" />
				<span>Voltar</span>
			</Link>

			<h1>{title}</h1>
		</S.Container>
	);
}
