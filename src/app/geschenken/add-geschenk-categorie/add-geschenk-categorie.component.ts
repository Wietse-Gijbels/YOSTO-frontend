import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeschenkService } from '../../common/service/geschenk.service';
import { NgIf } from '@angular/common';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';

@Component({
  selector: 'app-add-geschenk-categorie',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavBarComponent,
    GebruikerHeaderComponent,
    NgIf,
  ],
  templateUrl: './add-geschenk-categorie.component.html',
  styleUrls: ['./add-geschenk-categorie.component.scss'],
})
export class AddGeschenkCategorieComponent {
  form: FormGroup;
  selectedFile: File | null = null;
  errorMessages: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder,
    private geschenkService: GeschenkService,
  ) {
    this.form = this.formBuilder.group({
      naam: [''],
      prijs: [''],
      beschrijving: [''],
      file: [null],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.form.patchValue({ file: this.selectedFile });
    }
  }

  onSubmit(): void {
    this.clearErrorMessages();

    const naam = this.form.get('naam')?.value;
    const prijs = this.form.get('prijs')?.value;
    const beschrijving = this.form.get('beschrijving')?.value;

    if (this.selectedFile && naam && prijs && beschrijving) {
      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);
      uploadData.append('naam', this.form.get('naam')?.value);
      uploadData.append('prijs', this.form.get('prijs')?.value);
      uploadData.append('beschrijving', this.form.get('beschrijving')?.value);

      this.geschenkService.createGeschenkCategorie(uploadData).subscribe(
        (response) => {
          this.form.reset();
          this.selectedFile = null;
        },
        (error) => {
          this.errorMessages = error.error;
        },
      );
    } else {
      this.errorMessages['createGeschenkCategorie'] =
        'Vul alle velden correct in!';
    }
  }

  private clearErrorMessages() {
    this.errorMessages = {};
  }
}
