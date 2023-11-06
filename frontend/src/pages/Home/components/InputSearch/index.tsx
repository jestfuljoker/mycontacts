import type { ChangeEvent } from 'react';
import * as S from './styles';

interface InputSearchProps {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

export default function InputSearch({ onChange, value }: InputSearchProps) {
	return (
		<S.Container>
			<input
				value={value}
				onChange={onChange}
				type="text"
				placeholder="Pesquisar pelo nome"
			/>
		</S.Container>
	);
}
