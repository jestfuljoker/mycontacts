import { Link } from 'react-router-dom';

import arrow from '@assets/images/icons/arrow.svg';
import edit from '@assets/images/icons/edit.svg';
import trash from '@assets/images/icons/trash.svg';
import type { OrderBy } from '@services/ContactsService';
import type { DomainContactData } from '@services/mappers/ContactMapper';

import * as S from './styles';

interface ContactsListProps {
	orderBy: OrderBy;
	filteredContacts: DomainContactData[];
	onToggleOrderBy: () => void;
	onDeleteContact: (contact: DomainContactData) => void;
}

export default function ContactsList({
	orderBy,
	filteredContacts,
	onToggleOrderBy,
	onDeleteContact,
}: ContactsListProps) {
	return (
		<>
			{filteredContacts.length > 0 && (
				<S.ListHeader $orderBy={orderBy}>
					<button type="button" onClick={onToggleOrderBy}>
						<span>Nome</span>
						<img src={arrow} alt="Table sort by name" />
					</button>
				</S.ListHeader>
			)}

			{filteredContacts.map((contact) => (
				<S.Card key={contact.id}>
					<div className="info">
						<div className="contact-name">
							<strong>{contact.name}</strong>
							{contact.category.name && <small>{contact.category.name}</small>}
						</div>
						<span>{contact.email}</span>
						<span>{contact.phone}</span>
					</div>
					<div className="actions">
						<Link to={`edit/${contact.id}`}>
							<img src={edit} alt="Edit icon" />
						</Link>

						<button type="button" onClick={() => onDeleteContact(contact)}>
							<img src={trash} alt="Delete icon" />
						</button>
					</div>
				</S.Card>
			))}
		</>
	);
}
