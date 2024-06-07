import { NgIf } from '@angular/common';
import { EnderecoService } from '../../../services/endereco.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { Estado } from '../../../models/estado.model';
import { Endereco } from '../../../models/endereco.model';

@Component({
    selector: 'app-endereco-form',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        RouterModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatListModule,
        MatIcon
    ],
    templateUrl: './endereco-form.component.html',
    styleUrls: ['./endereco-form.component.css'],
})
export class EnderecoFormComponent implements OnInit {
    formGroup: FormGroup;
    isMenuOpen = false;
    idCliente: string | null = null;
   
    estados: Estado[] = [];
    
    constructor(
        private formBuilder: FormBuilder,
        private enderecoService: EnderecoService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {

        const endereco: Endereco = this.activatedRoute.snapshot.data['endereco']
        const estado = this.estados.find(estado => estado.idEstado === (endereco?.estado.idEstado || null))

        this.formGroup = this.formBuilder.group({
            rua: ['', Validators.required],
            numero: ['', Validators.required],
            cidade: ['', Validators.required],
            cep: ['', Validators.required],
            estado: [estado],
        });
    }

    ngOnInit(): void {
        this.idCliente = this.activatedRoute.snapshot.paramMap.get('idUsuario');
    }



    salvarEndereco() {
        if (this.formGroup.valid && this.idCliente !== null) {
            const endereco = { ...this.formGroup.value, idUsuario: +this.idCliente };
            this.enderecoService.insert(endereco, this.idCliente).subscribe({
                next: (enderecoCadastrado) => {
                    console.log('gayyyyy')
                    this.router.navigateByUrl('/produtos');
                    this.snackBar.open('Endereço adicionado com sucesso!', 'Fechar', { duration: 3000 });
                },
                error: (err) => {
                    console.log('Erro ao Incluir' + JSON.stringify(err));
                },
            });
        }
    }

    excluirEndereco() {
        if (this.formGroup.valid) {
            const endereco = this.formGroup.value;
            if (endereco.id != null) {
                this.enderecoService.delete(endereco.id).subscribe({
                    next: () => {
                        this.router.navigateByUrl('/perfil');
                        this.snackBar.open('Endereço excluido com sucesso!', 'Fechar', { duration: 3000 });
                    },
                    error: (err) => {
                        console.log('Erro ao Excluir' + JSON.stringify(err));
                    },
                });
            }
        }
    }

    toggleSidebar(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }
}