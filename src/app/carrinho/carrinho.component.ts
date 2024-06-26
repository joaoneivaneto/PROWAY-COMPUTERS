import { Component, OnInit } from '@angular/core';
import { IProdutoCarrinho } from '../produtos';
import { CarrinhoService } from '../carrinho.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IProdutoCarrinho[]=[];
  total=0
  constructor(
    public carrinhoService:CarrinhoService,
    private route : Router
    
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.CalcularTotal()
  }
  
  CalcularTotal(){
    this.total = this.itensCarrinho.reduce((prev,curr) => prev +(curr.preco * curr.quantidade),0)
  }
  removeProdutoCarrinho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(
      item => item.id !== produtoId
    )
    this.carrinhoService.removerProdutoCarrinho(produtoId)
    this.CalcularTotal()
  }
  comprar(){
    alert("Parabéns, voce finalizoua sua compra!")
    this.carrinhoService.limparCarrinho()
    this.route.navigate(["produtos"])

  }
}
