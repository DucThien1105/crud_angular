import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  
  addUser(data: any): Observable<any> {
    return this._http.post(`http://localhost:3000/user`, data);
  }
  editUser(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/user/${id}`, data);
  }
  getUserList(): Observable<any> {
    return this._http.get(`http://localhost:3000/user`);
  }
  deletetUser(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/user/${id}`);
  }
}
