import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { ItemCarrinho } from '../../../models/itemcarrinho.model';
// import { Order } from '../../../models/order.models';
// import { CarrinhoService } from '../../../services/carrinho.service';
// import { OrderService } from '../../../services/order.service';
// import { PedidoService } from "../../../services/pedido.service";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from '../../models/cliente.model';
// import { AuthClienteService } from '../../../services/authcliente.service';
import { MatRadioModule } from '@angular/material/radio';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthClienteService } from '../../services/authcliente.service';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
// import { Pedido } from '../../../models/pedido.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  carrinhoItens: ItemCarrinho[] = [];
  paymentForm!: FormGroup;
  clienteLogado: Cliente | null = null;
  totalCarrinho: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private authClienteService: AuthClienteService,
    private pedidoService: PedidoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(items => {
      this.carrinhoItens = items;
      this.calcularTotalCarrinho();
    });



    this.authClienteService.getClienteLogado().subscribe(cliente => {
      this.clienteLogado = cliente;
    });
   
  }



  calcularTotalCarrinho() {
    this.totalCarrinho = this.carrinhoItens.reduce((total, item) => total + (item.preco * item.quantidade), 0);

  }

  continuarComprando(): void {
    this.router.navigate(['/produtos']);
  }

  onCheckout() {
    

    this.pedidoService.save(this.carrinhoItens).subscribe({
      next: (pedido: Pedido) => {
        this.carrinhoService.limparCarrinho();
        this.router.navigate(['/produtos']); // ou outra rota, conforme necessário
      },
      // error: (err) => {
      //   console.error(err);
      // }
    });
  }


}