export interface PersistenceCategoryData {
	id: string;
	name: string;
}

export interface DomainCategoryData {
	id: string;
	name: string;
}

class CategoryMapper {
	toDomain(persistenceCategory: PersistenceCategoryData): DomainCategoryData {
		return {
			id: persistenceCategory.id,
			name: persistenceCategory.name,
		};
	}
}

export default new CategoryMapper();
