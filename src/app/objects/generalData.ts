export class Contacts {
    contacts: Contact[];

    constructor() {
        const contact = new Contact();
        this.contacts = new Array<Contact>();
        this.contacts.push(contact);
    }
}

export class Contact {
    name: string;
    prename: string;
    email: string;
    position: string;

    constructor() {
        this.name = 'Mustermann';
        this.prename = 'Max';
        this.position = 'Test User';
        this.email = 'max.mustermann@willsbach-handball.de';
    }
}
