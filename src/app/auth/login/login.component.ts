import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Message } from '../../shared/models/message.model'
import { User } from '../../shared/models/user.model'
import { AuthService } from '../../shared/services/auth.service'
import { UsersService } from '../../shared/services/users.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  message: Message

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup( {
      email:    new FormControl( null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, [
        Validators.required,
        Validators.minLength( 6 )
      ] )
    } );
    this.message = new Message( '', 'danger')
  }

  private showMessage (text: string = '', type: string = 'danger'){
    this.message.text = text
    this.message.type = type

    window.setTimeout(() => {
      this.message.text = ''
    }, 5000)

  }

  onSubmit() {
    console.log('submit work')
    const formData = this.form.value
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user:User) => {
        if(user[0]){
          if(user[0].password === formData.password) {
            this.message.text = ''
            window.localStorage.setItem('user', JSON.stringify(user))
              this.authService.login()
            this.router.navigate([''])
          } else{
            this.showMessage('пароль не верный')
          }
        } else{
          this.showMessage('Такого пользователя не существует')
        }
      })
    }

}
