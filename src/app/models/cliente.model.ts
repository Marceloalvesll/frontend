 import { Endereco } from "./endereco.model";
 import { Telefone } from "./telefone.model";
 export class Cliente {
    id!: number;
    nome!: String;
     sobrenome!: String;
     dataNascimento!: Date;
    senha!: String;
    cpf!: String;
     email!: String;
    login!: String;
    enderecos!: Endereco[];
    telefones!: Telefone[]
}