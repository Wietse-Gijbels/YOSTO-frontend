export interface GebruikerInterface {
  email: string;
  wachtwoord: string;
}

export interface RegistreerResponse {
  token: string;
}
