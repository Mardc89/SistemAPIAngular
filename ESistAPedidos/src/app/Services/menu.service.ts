import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../Settings/appSettings';
import { ResponseApi } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

 private urlApi:string=appsettings.apiUrl +"Menu/";
 
  constructor(private http:HttpClient) { }

  lista(idUsuario:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista?idUsuario=${idUsuario}`)
  }
}