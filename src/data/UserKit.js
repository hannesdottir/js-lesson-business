const ROOT_URL = "https://frebi.willandskill.eu/";
const API_URL = `${ROOT_URL}api/v1/`;
const AUTH_URL = `${ROOT_URL}auth/`;
const LOGIN_URL = `${ROOT_URL}api-token-auth/`;

/* POST COSTUMER
{
  "parent": {
    "name": "string",
    "organisationNr": "string",
    "vatNr": "string",
    "reference": "string",
    "paymentTerm": 0,
    "kind": 0,
    "website": "string",
    "email": "user@example.com",
    "phoneNumber": "string",
    "clientInvoiceSettings": {
      "defaultInterest": "string",
      "iban": "string",
      "artisan": true,
      "artisanTown": "string",
      "merchant": true,
      "merchantTown": "string"
    }
  },
  "name": "string",
  "organisationNr": "string",
  "vatNr": "string",
  "reference": "string",
  "paymentTerm": 0,
  "website": "string",
  "email": "user@example.com",
  "phoneNumber": "string"
}
*/
export default class {
  async register(
    firstName,
    lastName,
    email,
    password,
    organisationName,
    organisationKind
  ) {
    const url = `${ROOT_URL}auth/users/`;
    const payload = {
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind,
    };
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  async activateUser(uid, token) {
    const url = `${ROOT_URL}auth/users/activate/`;
    const payload = { uid, token };
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  async login(email, password) {
    const url = `${ROOT_URL}api-token-auth/`;
    const payload = { email, password };
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    });
  }

  async getCustomerList() {
    const url = `${API_URL}customers`;
    let fetchedHeaders = this.getPrivateHeaders();

    /*console.log(
      `getCustomerList ${url} . headers: ${JSON.stringify(fetchedHeaders)}`
    );*/

    return fetch(url, {
      headers: fetchedHeaders,
    });
  }

  async createCustomer(payload) {
    const url = `${API_URL}customers`;
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    });
  }

  setToken(token) {
    localStorage.setItem("BUSINESS_TOKEN", token);
  }

  getToken() {
    return localStorage.getItem("BUSINESS_TOKEN");
  }

  getPublicHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  getPrivateHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
}
