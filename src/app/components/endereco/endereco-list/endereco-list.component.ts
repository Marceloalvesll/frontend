import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';

import { EnderecoService } from '../../../services/endereco.service';
import { Endereco } from '../../../models/endereco.model';


@Component({
  selector: 'app-endereco-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './endereco-list.component.html',
  styleUrl: './endereco-list.component.css'
})


export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'rua', 'numero', 'cidade', 'cep', 'estado', 'acao'];
  enderecos: Endereco[] = [];

  constructor(private enderecoService: EnderecoService) {

  }

  ngOnInit(): void {
    this.enderecoService.findAll().subscribe(data => {
      this.enderecos = data;
    })
  }
  }