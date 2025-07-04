import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Species } from '../../models/especies.model';
@Component({
  selector: 'app-especies',
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
    MatChipsModule,
    MatCheckboxModule,
  ],
  templateUrl: './especies.component.html',
  styleUrl: './especies.component.css',
})
export class EspeciesComponent implements OnInit {
  speciesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EspeciesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Species | null
  ) {
    this.speciesForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.populateForm(this.data);
    }
  }

  get threatsArray(): FormArray {
    return this.speciesForm.get('threats') as FormArray;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      scientificName: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      habitat: ['', Validators.required],
      population: [0, [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required],
      region: ['', Validators.required],
      threats: this.fb.array([this.fb.control('')]),
      isActive: [true],
    });
  }

  private populateForm(species: Species): void {
    // Clear existing threats
    while (this.threatsArray.length !== 0) {
      this.threatsArray.removeAt(0);
    }

    // Add threats from species
    species.threats.forEach((threat) => {
      this.threatsArray.push(this.fb.control(threat));
    });

    this.speciesForm.patchValue({
      name: species.name,
      scientificName: species.scientificName,
      status: species.status,
      description: species.description,
      habitat: species.habitat,
      population: species.population,
      imageUrl: species.imageUrl,
      region: species.region,
      isActive: species.isActive,
    });
  }

  addThreat(): void {
    this.threatsArray.push(this.fb.control(''));
  }

  removeThreat(index: number): void {
    if (this.threatsArray.length > 1) {
      this.threatsArray.removeAt(index);
    }
  }

  onSave(): void {
    if (this.speciesForm.valid) {
      const formValue = this.speciesForm.value;
      const threats = formValue.threats.filter(
        (threat: string) => threat.trim() !== ''
      );

      const speciesData = {
        ...formValue,
        threats,
      };

      this.dialogRef.close(speciesData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
