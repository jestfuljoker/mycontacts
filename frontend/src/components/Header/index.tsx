import logo from '@assets/images/logo.svg';

import * as S from './styles';

export default function Header() {
	return (
		<S.Container>
			<img src={logo} alt="MyContacts logo" width="201" />
		</S.Container>
	);
}
