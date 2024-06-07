import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];

  constructor(private carrinhoService: CarrinhoService, private router: Router ) { }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.carrinhoItens = itens;
    })
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }


  aumentarQuantidade(item: ItemCarrinho): void {
    item.quantidade += 1;
    this.carrinhoService.atualizarItem(item);
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    if (item.quantidade > 1) {
      item.quantidade -= 1;
      this.carrinhoService.atualizarItem(item);
    }
  }



  finalizarCompra(): void {
    this.router.navigate(['/checkout']);

  }

  continuarComprando(): void {
    this.router.navigate(['/produtos']);
  }

 

  calcularTotal(): number {
    return this.carrinhoItens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
}



}