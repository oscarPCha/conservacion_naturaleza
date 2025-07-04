import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ConservationStats } from '../../models/especies.model';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [
       CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  statsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EstadisticasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConservationStats | null
  ) {
    this.statsForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.populateForm(this.data);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      icon: ['', Validators.required],
      isActive: [true]
    });
  }

  private populateForm(stats: ConservationStats): void {
    this.statsForm.patchValue({
      title: stats.title,
      value: stats.value,
      description: stats.description,
      icon: stats.icon,
      isActive: stats.isActive
    });
  }

  onSave(): void {
    if (this.statsForm.valid) {
      this.dialogRef.close(this.statsForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
