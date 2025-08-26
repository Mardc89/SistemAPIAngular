

import { inject, Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../Settings/appSettings';
import { ResponseApi } from '../Models/ResponseApi';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi:string=appsettings.apiUrl +"Categoria/";
 
  constructor(private http:HttpClient) { }

  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }
}