import mappingData from './category-map.json';

export type CategoryMappingStatus = 'MAPPED' | 'UNMAPPED' | 'REVIEW REQUIRED';
export type CategoryMapping = {
  siteCategorySlug: string | null;
  status: CategoryMappingStatus;
  slugPrefix: string;
  notes: string;
};

export const categoryMap = mappingData as Readonly<Record<string, CategoryMapping>>;
