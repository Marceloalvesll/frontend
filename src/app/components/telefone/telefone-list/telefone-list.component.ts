import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { Telefone } from '../../../models/telefone.model';
import { TelefoneService } from '../../../services/telefone.service';


@Component({
  selector: 'app-telefone-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './telefone-list.component.html',
  styleUrl: './telefone-list.component.css'
})



export class TelefoneListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'numero', 'codigoArea','operadora', 'acao'];
    telefones: Telefone[] = [];

  constructor(private telefoneService: TelefoneService) {

  }

  ngOnInit(): void {
    this.telefoneService.findAll().subscribe(data => {
      this.telefones = data;
    })
  }
  }