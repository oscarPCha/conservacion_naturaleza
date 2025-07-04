import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { EspeciesService } from '../../services/especies.service';
import { ConservationStats, EcosystemInfo, Species } from '../../models/especies.model';
import { EstadisticasService } from '../../services/estadisticas.service';
import { EcosistemaService } from '../../services/ecosistema.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  speciesList: Species[] = [];
  statsList: ConservationStats[] = [];
  ecosystemsList: EcosystemInfo[] = [];

  constructor(
    private speciesService: EspeciesService,
    private statsService: EstadisticasService,
    private ecosystemService:EcosistemaService
  ) {}
  ngOnInit(): void {
    this.fetchSpecies();
    this.fetchStats();
    this.fetchEcosystems();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -64; // Height of fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
  fetchSpecies() {
    this.speciesService.getAll().subscribe((resp) => {
      this.speciesList = resp;
    });
  }
  fetchStats() {
    this.statsService.getAll().subscribe((resp) => {
      this.statsList = resp;
    });
  }
  fetchEcosystems(){
    this.ecosystemService.getAll().subscribe((resp)=>{
      console.log(resp)
      this.ecosystemsList=resp;
    })
  }
}
