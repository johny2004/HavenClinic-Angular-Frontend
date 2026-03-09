import { Injectable } from '@angular/core';
import { Mascota } from '../entity/mascotas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../entity/tratamientos';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient

  ) { }


  findAll(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotas/vetmascota`);
  }

  findById(id:number):Observable<Mascota>{
    return this.http.get<Mascota>(`${this.apiUrl}/mascotas/petInfo/${id}`);
  }
  deleteById(id:number){
    console.log(id);
   this.http.delete(`${this.apiUrl}/mascotas/deletePet/${id}`).subscribe();
  }
  addMascota(id: number, mascota: Mascota): Observable<any> {
    return this.http.post(`${this.apiUrl}/mascotas/addPet/${id}`, mascota);
  }

  findByDueñoId(id: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotas/mascotascliente/${id}`);
  }

  actualizar(MascotaAct: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.apiUrl}/mascotas/actualizar_mascota/${MascotaAct.id}`, MascotaAct);
  }

  switchTratamiento(id: number): Observable<Mascota>{
    return this.http.put<Mascota>(`${this.apiUrl}/tratamientos/alter/${id}`, {});
  }

  findByNombre(nombre: string): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotas/findByNombre/${nombre}`);
  }

  getPacientes(id: number): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.apiUrl}/mascotas/pacientes/${id}`);
  }
}
