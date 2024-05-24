export enum GebruikerStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum GebruikerRol {
  STUDYHELPER = 'STUDYHELPER',
  STUDYLOOKER = 'STUDYLOOKER',
  ADMIN = 'ADMIN',
}

export interface GebruikerInterface {
  id: string;
  voornaam: string;
  achternaam: string;
  gebruikersnaam: string;
  email: string;
  wachtwoord: string;
  geslacht: string;
  leeftijd: number;
  woonplaates: string;
  status: GebruikerStatus;
  rollen: GebruikerRol[];
  newMessageCount?: number;
  geschenken?: Geschenk[];
}

export interface StudierichtingInterface {
  id: String;
  naam: String;
  soort: String;
}

export interface AuthenticationResponse {
  token: string;
}

export interface Message {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
}

export interface Geschenk {
  id: string;
  titel: string;
  isBeschikbaar: boolean;
  gebruiker: GebruikerInterface;
  geschenkCategorie: GeschenkCategorie;
}

export interface GeschenkCategorie {
  id: string;
  naam: string;
  prijs: number;
  beschrijving: string;
  fotoUrl: string;
  geschenken: Geschenk[];
  color?: string;
}
