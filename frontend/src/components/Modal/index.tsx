import ReactPortal from '@components/ReactPortal';
import { useState, type ReactNode, useEffect, useRef } from 'react';
import Button from '../Button';
import * as S from './styles';

interface ModalProps {
	danger?: boolean;
	title: string;
	children: ReactNode;
	cancelLabel?: string;
	confirmLabel?: string;
	onCancel: () => void;
	onConfirm: () => void;
	open: boolean;
	isLoading?: boolean;
}

export default function Modal({
	danger = false,
	isLoading = false,
	open,
	title,
	children,
	cancelLabel = 'Cancelar',
	confirmLabel = 'Confirmar',
	onCancel,
	onConfirm,
}: ModalProps) {
	const [shouldRender, setShouldRender] = useState(open);
	const overlayRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const overlayRefCurrent = overlayRef.current;

		function handleAnimationEnd() {
			setShouldRender(false);
		}

		if (open) {
			setShouldRender(true);
		}

		if (!open) {
			overlayRefCurrent?.addEventListener('animationend', handleAnimationEnd);
		}

		return () =>
			overlayRefCurrent?.removeEventListener(
				'animationend',
				handleAnimationEnd,
			);
	}, [open]);

	return shouldRender ? (
		<ReactPortal containerId="modal-root">
			<S.Overlay isLeaving={!open} ref={overlayRef}>
				<S.Container danger={danger} isLeaving={!open}>
					<h1>{title}</h1>

					<div className="modal-body">{children}</div>

					<S.Footer>
						<button
							onClick={onCancel}
							className="cancel-button"
							type="button"
							disabled={isLoading}
						>
							{cancelLabel}
						</button>
						<Button
							isLoading={isLoading}
							onClick={onConfirm}
							danger={danger}
							type="button"
						>
							{confirmLabel}
						</Button>
					</S.Footer>
				</S.Container>
			</S.Overlay>
		</ReactPortal>
	) : null;
}
