import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  playerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.playerForm = this.fb.group({
      Name: new FormControl(),
      Prename: new FormControl(),
      Birthday: new FormControl(),
      Nickname: new FormControl(),
      Position: new FormControl(),
      Number: new FormControl(),
      Picture: new FormControl(),
      JoinedClub: new FormControl(),
      LastClubs: new FormControl()

    });
  }

}
