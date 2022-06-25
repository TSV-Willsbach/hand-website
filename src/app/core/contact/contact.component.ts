import { GeneralDataService } from "../../shared/services/general-data.service";
import { Contacts } from "../../shared/objects/generalData";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  contacts: Contacts;

  constructor(generalData: GeneralDataService) {
    this.contacts = new Contacts();

    generalData
      .getContacts()
      .subscribe((contacts) => (this.contacts = contacts));
  }

  ngOnInit() {}

  sendMail(email: string) {}
}
