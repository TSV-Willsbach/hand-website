export class Contact {
    name: string;
    prename: string;
    email: string;
    position: string;
    picture: string;

    constructor() {
        this.name = 'Mustermann';
        this.prename = 'Max';
        this.position = 'Test User';
        this.email = 'max.mustermann@willsbach-handball.de';
        this.picture = './assets/images/handball_logo.png';
    }
}

export class Contacts {
    contacts: Contact[];

    constructor() {
        const contact = new Contact();
        this.contacts = new Array<Contact>();
        this.contacts.push(contact);
    }
}
