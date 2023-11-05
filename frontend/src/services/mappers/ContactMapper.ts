import type { PartialBy } from 'types/global';
import type { DomainCategoryData } from './CategoryMapper';

export interface DomainContactData {
	id?: string;
	name: string;
	email: string;
	phone: string;
	category: PartialBy<DomainCategoryData, 'name'>;
}

export interface PersistenceContactData {
	id?: string;
	name: string;
	email: string;
	phone: string;
	category_id: string;
	category_name: string;
}

class ContactMapper {
	toPersistence(
		domainContact: DomainContactData,
	): Omit<PersistenceContactData, 'category_name'> {
		return {
			id: domainContact.id,
			name: domainContact.name,
			email: domainContact.email,
			phone: domainContact.phone,
			category_id: domainContact.category.id,
		};
	}

	toDomain(persistenceContact: PersistenceContactData): DomainContactData {
		return {
			id: persistenceContact.id,
			name: persistenceContact.name,
			email: persistenceContact.email,
			phone: persistenceContact.phone,
			category: {
				id: persistenceContact.category_id,
				name: persistenceContact.category_name,
			},
		};
	}
}

export default new ContactMapper();
