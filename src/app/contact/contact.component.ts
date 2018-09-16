import { GeneralDataService } from './../shared/general-data.service';
import { Contacts } from './../objects/generalData';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts: Contacts;

  constructor(generalData: GeneralDataService) {
    this.contacts = new Contacts();

    generalData.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  ngOnInit() {
  }

  sendMail(email: string) {

  }

}
