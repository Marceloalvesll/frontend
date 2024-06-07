import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/itemcarrinho.model';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { AuthClienteService } from './authcliente.service';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseURL: string =  'http://localhost:8080/pedido';

  constructor(private http: HttpClient, private authClienteService: AuthClienteService) { }

  // save(carrinho: ItemCarrinho[] ): Observable<Order> {
  //   const itens = carrinho.map(item => ({
  //     quantidade: item.quantidade,
  //     preco: item.preco,
  //     idProduct: item.id
  //   }));

  //   const produtos = {
  //     itens: itens
  //   };

  //   return this.http.post<any>(`${this.baseURL}/orders`, produtos);
  // }

  save(carrinho: ItemCarrinho[]): Observable<Pedido> {
    const itens = carrinho.map(item => ({
      quantidade: item.quantidade,
      preco: item.preco,
      idProduct: item.id
    }));

    const produtos = {
      itens: itens
    }; 
    return this.http.post<Pedido>(`${this.baseURL}`, produtos);
 }

//     return this.http.post<Order>(`${this.baseURL}`, produtos);
//   }

//   getPedidosPorUsuario(login: string): Observable<Order[]> {
//     return this.http.get<Order[]>(`${this.baseURL}/user/${login}`);
//   }

  // getPedidosPorUsuario(login: string): Observable<Order[]> {
  //   return this.http.get<Order[]>(`${this.baseURL}?login=${login}`);
  // }

  // getPedidosPorUsuario(): Observable<Order[]> {
  //   return this.http.get<Order[]>(`${this.baseURL}`);
  // }

//   getPedidoById(id: number): Observable<Order> {
//     return this.http.get<Order>(`${this.baseURL}/${id}`);
//   }
}
     