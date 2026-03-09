import { Injectable } from '@angular/core';
import { Tratamiento } from '../entity/tratamientos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Droga} from "../entity/drogas";
import {Mascota} from "../entity/mascotas";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  private apiUrl = environment.apiUrl;
  listaTratamientos: Tratamiento[] = [];

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Tratamiento[]>{
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/tratamientos/all`);
  }

  findById(id:number):Observable<Tratamiento>{
    return this.http.get<Tratamiento>(`${this.apiUrl}/tratamientos/info/${id}`);
  }

  findByPetId(id: number):Observable<Tratamiento>{
    return this.http.get<Tratamiento>(`${this.apiUrl}/tratamientos/historial/${id}`);
  }

  addTratamiento(mascotaId: number, vetId: number, drogaId: number, tratamiento: Tratamiento): Observable<any> {
    return this.http.post(`${this.apiUrl}/tratamientos/add/${vetId}/${mascotaId}/${drogaId}`, tratamiento);
  }

  actualizarTratamiento(mascotaId: number, drogaId: number, tratamiento: Tratamiento): Observable<any> {
    return this.http.put(`${this.apiUrl}/tratamientos/update/${mascotaId}/${drogaId}`, tratamiento);
  }

  getHistorial(id: number): Observable<Tratamiento[]>{
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/tratamientos/historial/${id}`);
  }

  getDroga(id: number): Observable<Droga>{
    return this.http.get<Droga>(`${this.apiUrl}/tratamientos/droga/${id}`);
  }
}
