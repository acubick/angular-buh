import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from '../../shared/models/user.model'
import { UsersService } from '../../shared/services/users.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        agree: new FormControl(null, [Validators.requiredTrue])

    })
  }

  onSubmit() {
    const email = this.form.value.email
    const password = this.form.value.password
    const name= this.form.value.name

    console.log('this.form.value', this.form.value.email)
    console.log('this.form.value', email, password, name)
    const user = new User(email, password, name)
    console.log(user)
    this.usersService.createNewUser(user)
      .subscribe((user: User) => {
        console.log('user: ', user)
      })
  }
}
