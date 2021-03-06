import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Meta, Title } from '@angular/platform-browser'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { fadeStateTrigger } from '../../shared/animations/fade.animation'
import { Message } from '../../shared/models/message.model'
import { User } from '../../shared/models/user.model'
import { AuthService } from '../../shared/services/auth.service'
import { UsersService } from '../../shared/services/users.service'

@Component( {
  selector:    'app-login',
  templateUrl: './login.component.html',
  styleUrls:   [ './login.component.scss' ],
  animations:  [ fadeStateTrigger ]
} )
export class LoginComponent implements OnInit {

  form: FormGroup
  message: Message

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle( 'Вход в систему' )
    meta.addTags( [
      { name: 'keywords', content: 'логин,вход,система' },
      { name: 'description', content: 'Страница для входа в систему' }
    ] )
  }

  ngOnInit(): void {

    this.form    = new FormGroup( {
      email:    new FormControl(
        null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, [
        Validators.required,
        Validators.minLength( 6 )
      ] )
    } )
    this.message = new Message( 'danger', '' )

    this.route.queryParams
        .subscribe( (params: Params) => {
          if( params[ 'nowCanLogin' ] ) {
            this.showMessage( 'Теперь вы можете зайти в систему', 'success' )
          } else if( params[ 'accessDenied' ] ) {
            this.showMessage(
              'Для работы с ситсемой вам необходимо войти', 'warning' )
          }
        } )
  }

  private showMessage(text: string = '', type: string = 'danger') {
    this.message.text = text
    this.message.type = type

    window.setTimeout( () => {
      this.message.text = ''
    }, 5000 )

  }

  onSubmit() {
    console.log( 'submit work' )
    const formData = this.form.value
    this.usersService.getUserByEmail( formData.email )
        .subscribe( (user: User) => {
          console.log( user )
          if( user ) {
            if( user.password === formData.password ) {
              this.message.text = ''
              window.localStorage.setItem( 'user', JSON.stringify( user ) )
              this.authService.login()
              this.router.navigate( [ '/system', 'bill' ] )
            } else {
              this.showMessage( 'пароль не верный' )
            }
          } else {
            this.showMessage( 'Такого пользователя не существует' )
          }
        } )
  }

}
