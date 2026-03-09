import { Injectable } from '@angular/core';
import { Droga } from '../entity/drogas';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mascota} from "../entity/mascotas";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrogaService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Droga[]>{
    return this.http.get<Droga[]>(`${this.apiUrl}/drogas/all`);
  }

  findById(id: number):Observable<Droga>{
    return this.http.get<Droga>(`${this.apiUrl}/drogas/info/${id}`);
  }

  findByName(name: string):Observable<Droga>{
    return this.http.get<Droga>(`${this.apiUrl}/drogas/nombre/${name}`);
  }
}
