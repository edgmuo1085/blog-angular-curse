import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  page_title: string = '';
  user: User;
  status: string = '';

  constructor(private _userService: UserService) {
    this.page_title = 'Registrate';
    this.user = new User(1, '', '', '', '', 'USER_ROLE');
  }

  ngOnInit(): void {
    console.log('Componente de registro lanzado');
  }

  onSubmit(form: any) {
    this._userService.register(this.user).subscribe(
      (response) => {
        if (response.status == 'success') {
          console.log(response);
          this.status = response.status;
          form.reset();
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
