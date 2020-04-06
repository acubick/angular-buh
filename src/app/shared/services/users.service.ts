import { HttpClient } from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
  //? TODOFIX: Переделать регистрацию на FIREBASE
export class UsersService implements OnInit{

  constructor(
    private http: HttpClient
  ) {}
   getUserByEmail(email: string): Observable<User>{

     return this.http.get<User>(`http://localhost:3000/users?email=${email}`)
     //TODO: попробовать тут вернуть user[0] через метод map
      .pipe( map((user: User) => user[0] ? user[0] : undefined))

  }

  ngOnInit(): void {
    // this.getUserByEmail('wfm@mail.ru')
    console.log('this is user service')
  }
  createNewUser(user: User): Observable<User>{
     return this.http.post<User>(`http://localhost:3000/users`, user)

  }

}
