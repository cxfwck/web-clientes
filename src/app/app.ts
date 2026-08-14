import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
      CurrencyPipe
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

private http = inject(HttpClient);

planos = signal<any[]>([]);


ngOnInit(){
  this.http.get('http://localhost:8081/api/v1/planos')
  .subscribe((consulta) =>{
    this.planos.set(consulta as any[]);

  })
}

}
