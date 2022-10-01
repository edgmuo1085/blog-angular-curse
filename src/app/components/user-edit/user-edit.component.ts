import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService],
})
export class UserEditComponent implements OnInit {
  page_title: string = '';
  user: User;
  status: string = '';
  identity: any;
  token: any;

  constructor(private _userService: UserService) {
    this.page_title = 'Ajuste de usuario';
    this.user = new User(1, '', '', '', '', 'USER_ROLE');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    // Rellenar objeto usuario

    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.email,
      '',
      this.identity.role
    );
  }

  ngOnInit(): void {
    console.log('Componente de registro lanzado');
  }

  onSubmit(form: any) {
    this._userService.update(this.token, this.user).subscribe(
      (response) => {
        if (response && response.status) {
          console.log(response);
          this.status = 'success';

          // Actualizar usuario en sesion
          if (response.user.name) {
            this.user.name = response.user.name;
          }
          if (response.user.surname) {
            this.user.surname = response.user.surname;
          }
          if (response.user.email) {
            this.user.email = response.user.email;
          }

          this.identity = this.user;
          localStorage.setItem('token', this.token);
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //form.reset();
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }
}
