import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private apiUrl = 'http://localhost:8081/api/v1'

  private http = inject(HttpClient);

  planos = signal<any[]>([]);

  mensagemSucesso = signal (''); 
  mensagemErro = signal ('');

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]),
    planoId: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.http.get(this.apiUrl + '/planos')
      .subscribe((consulta) => {
        this.planos.set(consulta as any[]);

      });
  }

  cadastrarCliente() {

    this.mensagemSucesso.set('');
    this.mensagemErro.set('');


    this.http.post(this.apiUrl + '/clientes', this.formCadastro.value, { responseType: 'text'})
      .subscribe({
       next: (resposta) => {
        this.mensagemSucesso.set(resposta);
        this.formCadastro.reset();
       },
       error:(e) =>{
        this.mensagemErro.set(e.error);
       }
      })
  }
}
