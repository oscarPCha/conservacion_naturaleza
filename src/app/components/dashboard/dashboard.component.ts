// import { EcosystemInfo } from './../../models/especies.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { Observable } from 'rxjs';
import {
  Species,
  ConservationStats,
  EcosystemInfo,
} from '../../models/especies.model';
import { DataService } from '../../services/data.service';
import { EspeciesComponent } from '../especies/especies.component';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { EcosistemaComponent } from '../ecosistema/ecosistema.component';
import { EspeciesService } from '../../services/especies.service';
import { HttpClientModule } from '@angular/common/http';
import { EstadisticasService } from '../../services/estadisticas.service';
import { EcosistemaService } from '../../services/ecosistema.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatBadgeModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // species$: Observable<Species[]>;
  // species$: Species[] = [];
  speciesList: Species[] = [];
  statsList: ConservationStats[] = [];
  // stats$: Observable<ConservationStats[]>;
  // ecosystems$: Observable<EcosystemInfo[]>;
  ecosystemList: EcosystemInfo[] = [];

  loading = false;
  constructor(
    private dataService: DataService,
    private speciesService: EspeciesService,
    private statsService: EstadisticasService,
    private ecoystemService: EcosistemaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // this.species$ = this.dataService.getSpecies();
    // this.stats$ = this.dataService.getStats();
    // this.ecosystems$ = this.dataService.getEcosystems();
    // this.species$ = this.speciesService.getAll();
    // this.stats$ = this.dataService.getStats();
    // this.ecosystems$ = this.dataService.getEcosystems();
    // console.log(this.ecosystems$)
  }

  ngOnInit(): void {
    this.fetchSpecies();
    this.fetchStats();
    this.fetchEcosystems();
  }

  fetchSpecies() {
    this.loading = true;
    this.speciesService.getAll().subscribe((data) => {
      this.speciesList = data;
      this.loading = false;
      console.log(this.speciesList);
    });
  }
  fetchStats() {
    this.loading = true;
    this.statsService.getAll().subscribe((data) => {
      this.statsList = data;
      this.loading = false;
    });
  }
  fetchEcosystems() {
    this.loading = true;
    this.ecoystemService.getAll().subscribe((data) => {
      this.ecosystemList = data;
      this.loading = false;
    });
  }

  // Species methods
  openSpeciesDialog(species?: Species): void {
    const dialogRef = this.dialog.open(EspeciesComponent, {
      width: '800px',
      maxWidth: '90vw',
      data: species || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (species) {
          // this.dataService.updateSpecies(species.id, result);
          this.speciesService.update(species.id, result).subscribe((resp) => {
            console.log(resp);
            this.fetchSpecies();
          });
          this.showSnackBar('Especie actualizada correctamente');
        } else {
          // this.dataService.addSpecies(result);
          this.speciesService.create(result).subscribe((resp) => {
            console.log(resp);
            this.fetchSpecies();
          });
          this.showSnackBar('Especie agregada correctamente');
        }
      }
    });
  }

  editSpecies(species: Species): void {
    this.openSpeciesDialog(species);
  }

  deleteSpecies(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta especie?')) {
      // this.dataService.deleteSpecies(id);
      this.speciesService.delete(id).subscribe((resp) => console.log(resp));
      this.fetchSpecies();
      this.showSnackBar('Especie eliminada correctamente');
    }
  }

  toggleSpeciesStatus(species: Species): void {
    // this.dataService.updateSpecies(species.id, { isActive: !species.isActive });
    this.speciesService
      .update(species.id, { isActive: !species.isActive })
      .subscribe((resp) => console.log(resp));

    this.showSnackBar(
      `Especie ${species.isActive ? 'ocultada' : 'mostrada'} correctamente`
    );
  }

  // Stats methods
  openStatsDialog(stat?: ConservationStats): void {
    const dialogRef = this.dialog.open(EstadisticasComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: stat || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (stat) {
          // this.dataService.updateStat(stat.id, result);
          this.statsService.update(stat.id, result).subscribe((resp) => {
            console.log(resp);
            this.fetchStats();
          });
          this.showSnackBar('Estadística actualizada correctamente');
        } else {
          // this.dataService.addStat(result);
          this.statsService.create(result).subscribe((resp) => {
            console.log(resp);
            this.fetchStats();
          });
          this.showSnackBar('Estadística agregada correctamente');
        }
      }
    });
  }

  editStat(stat: ConservationStats): void {
    this.openStatsDialog(stat);
  }

  deleteStat(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta estadística?')) {
      // this.dataService.deleteStat(id);
      this.statsService.delete(id).subscribe((resp) => {
        console.log(resp);
        this.fetchStats();
      });
      this.showSnackBar('Estadística eliminada correctamente');
    }
  }

  toggleStatStatus(stat: ConservationStats): void {
    this.dataService.updateStat(stat.id, { isActive: !stat.isActive });
    this.showSnackBar(
      `Estadística ${stat.isActive ? 'ocultada' : 'mostrada'} correctamente`
    );
  }

  // Ecosystem methods
  openEcosystemDialog(ecosystem?: EcosystemInfo): void {
    const dialogRef = this.dialog.open(EcosistemaComponent, {
      width: '800px',
      maxWidth: '90vw',
      data: ecosystem || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (ecosystem) {
          // this.dataService.updateEcosystem(ecosystem.id, result);
          this.ecoystemService
            .update(ecosystem.id, result)
            .subscribe((resp) => {
              console.log(resp);
              this.fetchEcosystems();
            });
          this.showSnackBar('Ecosistema actualizado correctamente');
        } else {
          // this.dataService.addEcosystem(result);
          this.ecoystemService.create(result).subscribe((resp) => {
            console.log(resp);
            this.fetchEcosystems();
          });
          this.showSnackBar('Ecosistema agregado correctamente');
        }
      }
    });
  }

  editEcosystem(ecosystem: EcosystemInfo): void {
    this.openEcosystemDialog(ecosystem);
  }

  deleteEcosystem(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este ecosistema?')) {
      // this.dataService.deleteEcosystem(id);
      this.ecoystemService.delete(id).subscribe((resp)=>console.log(resp));
      this.fetchEcosystems();
      this.showSnackBar('Ecosistema eliminado correctamente');
    }
  }

  toggleEcosystemStatus(ecosystem: EcosystemInfo): void {
    this.dataService.updateEcosystem(ecosystem.id, {
      isActive: !ecosystem.isActive,
    });
    this.showSnackBar(
      `Ecosistema ${ecosystem.isActive ? 'ocultado' : 'mostrado'} correctamente`
    );
  }

  // Utility methods
  getStatusClass(status: string): string {
    switch (status) {
      case 'En Peligro Crítico':
        return 'critico';
      case 'En Peligro':
        return 'peligro';
      case 'Vulnerable':
        return 'vulnerable';
      case 'Casi Amenazado':
        return 'amenazado';
      case 'Preocupación Menor':
        return 'menor';
      default:
        return '';
    }
  }

  goToPublicSite(): void {
    this.router.navigate(['/']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
