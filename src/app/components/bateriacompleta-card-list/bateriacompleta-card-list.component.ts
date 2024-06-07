import { Component, OnInit, signal } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
// import { Consulta } from '../../models/consulta.model';
// import { CarrinhoService } from '../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ConsultaService } from '../../services/consulta.service';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { BateriaCompleta } from '../../models/bateriacompleta.model';
import { BateriaCompletaService } from '../../services/bateriacompleta.service';
import { CarrinhoService } from '../../services/carrinho.service';

// tipo personalizado de dados, como classes e interfaces, porém mais simples.
type Card = {
  idBateriaCompleta: number;
  nomeBateria: string;
  preco: number;
  marca: string;
  urlImagem: string;
}

@Component({
  selector: 'app-bateriacompleta-card-list',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, MatButton],
  templateUrl: './bateriacompleta-card-list.component.html',
  styleUrl: './bateriacompleta-card-list.component.css'
})
export class BateriaCompletaCardListComponent implements OnInit {

  cards = signal<Card[]> ([]);
  bateriascompletas: BateriaCompleta[] = [];

  constructor(private bateriaCompletaService: BateriaCompletaService, 
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.carregarBateriasCompletas();
  }

  carregarBateriasCompletas() {
    // buscando todos as consultas
    this.bateriaCompletaService.findAlll(0, 10).subscribe(data => {
      this.bateriascompletas = data;
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Card[] = [];
    this.bateriascompletas.forEach(bateriaCompleta => {
      cards.push({
        idBateriaCompleta: bateriaCompleta.id,
        nomeBateria: bateriaCompleta.nomeBateria,
        preco: bateriaCompleta.preco,
        marca: bateriaCompleta.marca.nomeMarca,
        urlImagem: this.bateriaCompletaService.getUrlImagem(bateriaCompleta.nomeImagem)
      });
    });
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.idBateriaCompleta,
      nome: card.nomeBateria,
      preco: card.preco,
      imagemUrl: card.urlImagem,
      quantidade: 1
    })

  }

  showSnackbarTopPosition(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}