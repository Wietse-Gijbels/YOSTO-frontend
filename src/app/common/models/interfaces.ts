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
  xpAantal: number;
}

export interface StudierichtingInterface {
  id: String;
  naam: String;
  studiepunten: String;
  niveauNaam: String;
  afstudeerrichting: String;
  instellingen: InstellingInterface[];
}

export interface InstellingInterface {
  id: String;
  naam: String;
  campus: String;
  postcode: String;
  gemeente: String;
  adres: String;
  studierichting: StudierichtingInterface[];
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
  titel: string;
  code: string;
  isBeschikbaar: boolean;
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