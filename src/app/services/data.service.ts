import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Species, ConservationStats, EcosystemInfo } from '../models/especies.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private speciesSubject = new BehaviorSubject<Species[]>([
    {
      id: '1',
      name: 'Oso de Anteojos',
      scientificName: 'Tremarctos ornatus',
      status: 'En Peligro',
      description: 'El único oso nativo de Sudamérica, habita en los bosques andinos del Perú. Quedan menos de 20,000 ejemplares.',
      habitat: 'Bosques andinos, páramos',
      population: 18000,
      threats: ['Deforestación', 'Caza furtiva', 'Fragmentación del hábitat'],
      imageUrl: 'https://images.pexels.com/photos/86594/spectacled-bear-andean-bear-tremarctos-ornatus-86594.jpeg',
      region: 'Andes',
      lastUpdated: new Date(),
      isActive: true
    },
    {
      id: '2',
      name: 'Jaguar',
      scientificName: 'Panthera onca',
      status: 'Casi Amenazado',
      description: 'El felino más grande de América, habita en la Amazonía peruana. Su población ha disminuido por la deforestación.',
      habitat: 'Selva amazónica, bosques húmedos',
      population: 15000,
      threats: ['Deforestación', 'Caza por conflictos con ganaderos', 'Tráfico ilegal'],
      imageUrl: 'https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg',
      region: 'Amazonía',
      lastUpdated: new Date(),
      isActive: true
    }
  ]);

  private statsSubject = new BehaviorSubject<ConservationStats[]>([
    {
      id: '1',
      title: 'Zonas de Vida',
      value: 84,
      description: 'De las 117 zonas de vida del mundo',
      icon: 'terrain',
      isActive: true
    },
    {
      id: '2',
      title: 'Especies de Orquídeas',
      value: 3000,
      description: 'La mayor diversidad del planeta',
      icon: 'local_florist',
      isActive: true
    }
  ]);

  private ecosystemsSubject = new BehaviorSubject<EcosystemInfo[]>([
    {
      id: '1',
      name: 'Amazonía',
      description: 'La Amazonía peruana representa el 60% del territorio nacional y alberga la mayor diversidad biológica del país.',
      characteristics: ['Bosque tropical húmedo', 'Alta biodiversidad', 'Ríos caudalosos'],
      threats: ['Deforestación', 'Minería ilegal', 'Tala indiscriminada'],
      conservationEfforts: ['Áreas naturales protegidas', 'Programas de reforestación', 'Educación ambiental'],
      isActive: true
    }
  ]);

  // Species methods
  getSpecies(): Observable<Species[]> {
    return this.speciesSubject.asObservable();
  }

  addSpecies(species: Omit<Species, 'id' | 'lastUpdated'>): void {
    const newSpecies: Species = {
      ...species,
      id: Date.now().toString(),
      lastUpdated: new Date()
    };
    const currentSpecies = this.speciesSubject.value;
    this.speciesSubject.next([...currentSpecies, newSpecies]);
  }

  updateSpecies(id: string, updates: Partial<Species>): void {
    const currentSpecies = this.speciesSubject.value;
    const updatedSpecies = currentSpecies.map(species =>
      species.id === id ? { ...species, ...updates, lastUpdated: new Date() } : species
    );
    this.speciesSubject.next(updatedSpecies);
  }

  deleteSpecies(id: string): void {
    const currentSpecies = this.speciesSubject.value;
    const filteredSpecies = currentSpecies.filter(species => species.id !== id);
    this.speciesSubject.next(filteredSpecies);
  }

  // Stats methods
  getStats(): Observable<ConservationStats[]> {
    return this.statsSubject.asObservable();
  }

  addStat(stat: Omit<ConservationStats, 'id'>): void {
    const newStat: ConservationStats = {
      ...stat,
      id: Date.now().toString()
    };
    const currentStats = this.statsSubject.value;
    this.statsSubject.next([...currentStats, newStat]);
  }

  updateStat(id: string, updates: Partial<ConservationStats>): void {
    const currentStats = this.statsSubject.value;
    const updatedStats = currentStats.map(stat =>
      stat.id === id ? { ...stat, ...updates } : stat
    );
    this.statsSubject.next(updatedStats);
  }

  deleteStat(id: string): void {
    const currentStats = this.statsSubject.value;
    const filteredStats = currentStats.filter(stat => stat.id !== id);
    this.statsSubject.next(filteredStats);
  }

  // Ecosystems methods
  getEcosystems(): Observable<EcosystemInfo[]> {
    return this.ecosystemsSubject.asObservable();
  }

  addEcosystem(ecosystem: Omit<EcosystemInfo, 'id'>): void {
    const newEcosystem: EcosystemInfo = {
      ...ecosystem,
      id: Date.now().toString()
    };
    const currentEcosystems = this.ecosystemsSubject.value;
    this.ecosystemsSubject.next([...currentEcosystems, newEcosystem]);
  }

  updateEcosystem(id: string, updates: Partial<EcosystemInfo>): void {
    const currentEcosystems = this.ecosystemsSubject.value;
    const updatedEcosystems = currentEcosystems.map(ecosystem =>
      ecosystem.id === id ? { ...ecosystem, ...updates } : ecosystem
    );
    this.ecosystemsSubject.next(updatedEcosystems);
  }

  deleteEcosystem(id: string): void {
    const currentEcosystems = this.ecosystemsSubject.value;
    const filteredEcosystems = currentEcosystems.filter(ecosystem => ecosystem.id !== id);
    this.ecosystemsSubject.next(filteredEcosystems);
  }
}
