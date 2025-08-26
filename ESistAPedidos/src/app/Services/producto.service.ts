
import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { appsettings } from '../Settings/appSettings';
import { ResponseApi } from '../Models/ResponseApi';
import { Producto } from '../Models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private urlApi:string=appsettings.apiUrl +"Producto/";
 
  constructor(private http:HttpClient) { }

  lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
  }

  guardar(request:Producto):Observable<ResponseApi>{
      return this.http.post<ResponseApi>(`${this.urlApi}Guardar`,request)
  }
  editar(request:Producto):Observable<ResponseApi>{
      return this.http.put<ResponseApi>(`${this.urlApi}Editar`,request)
  }
  eliminar(id:number):Observable<ResponseApi>{
      return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`)
  }
}
