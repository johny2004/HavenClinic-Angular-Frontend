//veterinario.service
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {Cliente} from "../entity/clientes"; // Asegúrate de que la ruta es correcta
import { Veterinario } from '../entity/veterinarios';
import { User } from '../entity/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  private apiUrl = environment.apiUrl;
  private baseUrl = `${this.apiUrl}/veterinarios`;

  constructor(
    private http: HttpClient
  ) { }

  //para mostrar todos los veterinarios
  findAll(): Observable<Veterinario[]> {
    console.log("Listando todos los veterinarios");
    return this.http.get<Veterinario[]>(`${this.apiUrl}/veterinarios/all`);
  }

  //para buscar por el id
  findById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.baseUrl}/find/${id}`);
  }
   //buscar a partir del email
   findByEmail(correo:String): Observable<Veterinario>{
    return this.http.get<Veterinario>(`${this.apiUrl}/veterinarios/findEmail/${encodeURIComponent(correo.toString())}`);
  }
  //busca los veterinarios que tengna dicho nombre
  findByNombre(nombre: string): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/veterinarios/findByNombre/${nombre}`);
  }

  //para buscar por la cedula, se usa este
  findByCedula(cedula: number): Observable<Veterinario> {
    console.log("cedula:" + cedula)
    return this.http.get<Veterinario>(`${this.apiUrl}/veterinarios/findByCedula/${cedula}`);
  }

  //para borrar por la cedula
  deleteByCedula(cedula: number){
    console.log(cedula);
    this.http.delete(`${this.apiUrl}/eliminarVeterinario/${cedula}`).subscribe();
    }

    //En lugar de borrar directamente al veterinario solo cambia su estado a desactivado:
    cambiarEstado(veterinario: Veterinario): Observable<void> {
      console.log(veterinario);
      console.log("Activo: " + veterinario.activo+" Cedula: "+veterinario.cedula);
      return this.http.put<void>(`${this.apiUrl}/veterinarios/cambiarEstado/${veterinario.cedula}`, veterinario);
    }

    //para agregar un nuevo veterinario
  addVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    console.log("Agregando veterinario:", veterinario);
    return this.http.post<Veterinario>(`${this.apiUrl}/veterinarios/agregarVeterinario`, veterinario);
  }

  //actualiza al veterinario
  updateVeterinario(veterinario: Veterinario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/veterinarios/update/${veterinario.cedula}`, veterinario);
  }



 
}