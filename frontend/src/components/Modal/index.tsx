import ReactDOM from 'react-dom';
import Button from '../Button/styles';
import * as S from './styles';

interface ModalProps {
	danger?: boolean;
}

export default function Modal({ danger = false }: ModalProps) {
	return ReactDOM.createPortal(
		<S.Overlay>
			<S.Container danger={danger}>
				<h1>Titulo</h1>
				<p>Conteúdo</p>

				<S.Footer>
					<button className="cancel-button" type="button">
						Cancelar
					</button>
					<Button danger={danger} type="button">
						Deletar
					</Button>
				</S.Footer>
			</S.Container>
		</S.Overlay>,
		document.getElementById('modal-root')!,
	);
}
