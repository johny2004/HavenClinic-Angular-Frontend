import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../entity/clientes';
import { User } from '../entity/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/cliente/all`);

  }
  findByCedula(cedula:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/cliente/find/${cedula}`);
  }

  findByEmail(correo:String): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/cliente/findEmail/${correo.toString()}`);
    }

    //para buscar todos los clientes con dicho nombre
    findByNombre(nombre: string): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(`${this.apiUrl}/cliente/findClienteByNombre/${nombre}`);
    }

  deleteByCedula(cedula:number){
    console.log(cedula);
    this.http.delete(`${this.apiUrl}/cliente/eliminarCliente/${cedula}`).subscribe();
  }

  //para agregar un nuevo cliente
  addCliente(cliente:Cliente): Observable<Cliente>{
    console.log("Agregando cliente: ",cliente);
   return this.http.post<Cliente>(`${this.apiUrl}/cliente/agregarCliente`, cliente)
 
  }



    actualizarCliente(id: number, clienteAct: Cliente):Observable<Cliente>{
      return this.http.put<Cliente>(`${this.apiUrl}/cliente/update/${id}`, clienteAct);
    }

    login(user: User, userType: string): Observable<string> {
      console.log(user);
      console.log(userType);
  
      const body = {
        email: user.correo,
        psw: user.password,
        userType: userType
       
      };
  console.log(body);
      return this.http.post(`${this.apiUrl}/login`, body, { responseType: 'text' });
    }

    logout(): void {
      localStorage.removeItem('token');
    }
  

    ClienteHome(): Observable<Cliente>{
      return this.http.get<Cliente>(`${this.apiUrl}/cliente/details`);
    }

  }


