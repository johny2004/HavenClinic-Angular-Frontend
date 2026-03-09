// src/app/servicio/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dashboardDTO } from '../entity/dashboardDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/dashboard/kpis`;

  constructor(private http: HttpClient) { }

  getKPIs(): Observable<dashboardDTO> {
    return this.http.get<dashboardDTO>(this.apiUrl);
  }
}
