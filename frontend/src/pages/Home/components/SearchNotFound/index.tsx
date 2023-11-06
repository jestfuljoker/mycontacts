import magnifierQuestion from '@assets/images/magnifier-question.svg';

import * as S from './styles';

interface SearchNotFoundProps {
	searchTerm: string;
}

export default function SearchNotFound({ searchTerm }: SearchNotFoundProps) {
	return (
		<S.Container>
			<img src={magnifierQuestion} alt="Magnifier question" />

			<span>
				Nenhum resultado foi entrado para <strong>”{searchTerm}”</strong>.
			</span>
		</S.Container>
	);
}
