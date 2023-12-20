import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css'],
})
export class DialogAddUserComponent implements OnInit {
  userForm: FormGroup;

  education: string[] = ['TUEBA', 'TNUT', 'ICTU'];

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<DialogAddUserComponent>,
    private _snackBar: MatSnackBar,
    // Tiêm dữ liệu có sẵn
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // Cập nhật giá trị cho form với 1 hoặc nhiều trường 
    this.userForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this._userService.editUser(this.data.id, this.userForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open('User updated!', 'Close', {
              duration: 2000,
              verticalPosition: 'top',
            });
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
      else {
        this._userService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            // alert('User added successfully');
            this._snackBar.open('User added successfully!', 'Close', {
              duration: 2000,
              verticalPosition: 'top',
            });;
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
