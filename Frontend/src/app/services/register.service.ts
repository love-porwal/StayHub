import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private backendUrl1 =`https://stayhub-3ojm.onrender.com/user/register`
  private bacendUrl2=`https://stayhub-3ojm.onrender.com/host/register`
  constructor(private http: HttpClient) {}

  signup(formData: any): Observable<any> {
    if(formData.host){
      return this.http.post<any>(this.bacendUrl2, formData);

    }else{

      return this.http.post<any>(this.backendUrl1, formData);
    }
  }
}