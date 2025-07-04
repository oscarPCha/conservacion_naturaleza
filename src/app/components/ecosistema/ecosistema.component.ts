import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { EcosystemInfo } from '../../models/especies.model';

@Component({
  selector: 'app-ecosistema',
  standalone: true,
  imports: [
     CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './ecosistema.component.html',
  styleUrl: './ecosistema.component.css'
})
export class EcosistemaComponent implements OnInit {
  ecosystemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EcosistemaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EcosystemInfo | null
  ) {
    this.ecosystemForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.populateForm(this.data);
    }
  }

  get characteristicsArray(): FormArray {
    return this.ecosystemForm.get('characteristics') as FormArray;
  }

  get threatsArray(): FormArray {
    return this.ecosystemForm.get('threats') as FormArray;
  }

  get conservationEffortsArray(): FormArray {
    return this.ecosystemForm.get('conservationEfforts') as FormArray;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      characteristics: this.fb.array([this.fb.control('')]),
      threats: this.fb.array([this.fb.control('')]),
      conservationEfforts: this.fb.array([this.fb.control('')]),
      isActive: [true]
    });
  }

  private populateForm(ecosystem: EcosystemInfo): void {
    // Clear existing arrays
    this.clearFormArray(this.characteristicsArray);
    this.clearFormArray(this.threatsArray);
    this.clearFormArray(this.conservationEffortsArray);

    // Populate arrays
    ecosystem.characteristics.forEach(char => {
      this.characteristicsArray.push(this.fb.control(char));
    });

    ecosystem.threats.forEach(threat => {
      this.threatsArray.push(this.fb.control(threat));
    });

    ecosystem.conservationEfforts.forEach(effort => {
      this.conservationEffortsArray.push(this.fb.control(effort));
    });

    this.ecosystemForm.patchValue({
      name: ecosystem.name,
      description: ecosystem.description,
      isActive: ecosystem.isActive
    });
  }

  private clearFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  addCharacteristic(): void {
    this.characteristicsArray.push(this.fb.control(''));
  }

  removeCharacteristic(index: number): void {
    if (this.characteristicsArray.length > 1) {
      this.characteristicsArray.removeAt(index);
    }
  }

  addThreat(): void {
    this.threatsArray.push(this.fb.control(''));
  }

  removeThreat(index: number): void {
    if (this.threatsArray.length > 1) {
      this.threatsArray.removeAt(index);
    }
  }

  addConservationEffort(): void {
    this.conservationEffortsArray.push(this.fb.control(''));
  }

  removeConservationEffort(index: number): void {
    if (this.conservationEffortsArray.length > 1) {
      this.conservationEffortsArray.removeAt(index);
    }
  }

  onSave(): void {
    if (this.ecosystemForm.valid) {
      const formValue = this.ecosystemForm.value;

      const ecosystemData = {
        ...formValue,
        characteristics: formValue.characteristics.filter((char: string) => char.trim() !== ''),
        threats: formValue.threats.filter((threat: string) => threat.trim() !== ''),
        conservationEfforts: formValue.conservationEfforts.filter((effort: string) => effort.trim() !== '')
      };

      this.dialogRef.close(ecosystemData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
