export interface DomainContactData {
	name: string;
	email: string;
	phone: string;
	categoryId: string;
}

export interface PersistenceContactData {
	name: string;
	email: string;
	phone: string;
	category_id: string;
}

class ContactMapper {
	toPersistence(domainContact: DomainContactData): PersistenceContactData {
		return {
			name: domainContact.name,
			email: domainContact.email,
			phone: domainContact.phone,
			category_id: domainContact.categoryId,
		};
	}
}

export default new ContactMapper();
