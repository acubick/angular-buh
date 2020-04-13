import { HttpClient } from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BaseApi } from '../core/base-api'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
  //? TODOFIX: Переделать регистрацию на FIREBASE
export class UsersService extends BaseApi{

  constructor(
    public http: HttpClient
  ) {
    super(http)
  }
  //  getUserByEmail(email: string): Observable<User>{
  //
  //    return this.http.get<User>(`http://localhost:3000/users?email=${email}`)
  //    //TODO: попробовать тут вернуть user[0] через метод map
  //     .pipe( map((user: User) => user[0] ? user[0] : undefined))
  //
  // }

  getUserByEmail(email: string): Observable<User>{
    return this.get(`users?email=${email}`)
      //TODO: попробовать тут вернуть user[0] через метод map
               .pipe( map((user: User) => user[0] ? user[0] : undefined) )
  }


  // createNewUser(user: User): Observable<User>{
  //    return this.http.post<User>(`http://localhost:3000/users`, user)
  // }

  createNewUser(user: User): Observable<User>{
    return this.post(`users`, user)
  }

}
