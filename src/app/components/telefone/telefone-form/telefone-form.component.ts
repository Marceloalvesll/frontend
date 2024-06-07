import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/estado.model';
import { TelefoneService } from '../../../services/telefone.service';
import { Telefone } from '../../../models/telefone.model';

@Component({
  selector: 'app-telefone-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './telefone-form.component.html',
  styleUrl: './telefone-form.component.css'
})
export class TelefoneFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              
                private telefoneService: TelefoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const telefone: Telefone = activatedRoute.snapshot.data['telefone'];

    this.formGroup = formBuilder.group({
      id: [(telefone && telefone.id) ? telefone.id : null],
      numero: [(telefone && telefone.numero) ? telefone.numero : '', Validators.required],
      codigoArea: [(telefone && telefone.codigoArea) ? telefone.codigoArea : '', Validators.required],
      operadora: [(telefone && telefone.operadora) ? telefone.operadora : '', Validators.required]
    });

  }

  salvar() {
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;
      if (telefone.id ==null) {
        this.telefoneService.insertTelefone(telefone).subscribe({
          next: (telefoneCadastrado) => {
            this.router.navigateByUrl('/telefones');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.telefoneService.updateTelefone(telefone).subscribe({
          next: (telefoneAlterado) => {
            this.router.navigateByUrl('/telefones');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }
  excluir() {
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;
      if (telefone.id != null) {
        this.telefoneService.delete(telefone).subscribe({
          next: () => {
            this.router.navigateByUrl('/telefones');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
