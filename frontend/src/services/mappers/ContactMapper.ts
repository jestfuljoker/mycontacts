export interface DomainContactData {
	id?: string;
	name: string;
	email: string;
	phone: string;
	category: {
		id: string;
		name?: string;
	};
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
	): Omit<PersistenceContactData, 'id' | 'category_name'> {
		return {
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
