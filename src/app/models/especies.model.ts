export interface Species {
  id: string;
  name: string;
  scientificName: string;
  status: 'Extinto' | 'En Peligro Crítico' | 'En Peligro' | 'Vulnerable' | 'Casi Amenazado' | 'Preocupación Menor';
  description: string;
  habitat: string;
  population: number;
  threats: string[];
  imageUrl: string;
  region: 'Amazonía' | 'Andes' | 'Costa' | 'Todas';
  lastUpdated: Date;
  isActive: boolean;
}

export interface ConservationStats {
  id: string;
  title: string;
  value: number;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface EcosystemInfo {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  threats: string[];
  conservationEfforts: string[];
  isActive: boolean;
}
