import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from "/Angular/hehe/src/app/services/user.service";

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css'],
})
export class DialogAddUserComponent {
  userForm: FormGroup;

  education: string[] = ['TUEBA', 'TNUT', 'ICTU'];

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<DialogAddUserComponent>
  ) {
    this.userForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
    });
  }
  onFormSubmit() {
    if (this.userForm.valid) {
      this._userService.addUser(this.userForm.value).subscribe({
        next: (val: any) => {
          alert('User added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
      // console.log(this.userForm.value);
    }
  }
}
