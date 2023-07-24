import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetslotsService {
  private backendUrl1 =`http://localhost:8080/host/prop/slots`

  constructor(private http: HttpClient) { }
  Slots(id: any): Observable<any> {
   

      return this.http.get<any>(`${this.backendUrl1}/${id}`);
    
  }
}