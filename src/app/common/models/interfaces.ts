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
  woonplaats: string;
  status: GebruikerStatus;
  rollen: GebruikerRol[];
  newMessageCount?: number;
  lastMessage?: string;
  geschenken?: Geschenk[];
  xpAantal: number;
  actieveRol: GebruikerRol;
}

export interface StudierichtingInterface {
  id: string;
  naam: string;
  studiepunten: string;
  niveauNaam: string;
  afstudeerrichting: string;
  beschrijving: string;
  instellingen: InstellingInterface[];
}

export interface InstellingInterface {
  id: string;
  naam: string;
  campus: string;
  postcode: string;
  gemeente: string;
  adres: string;
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
  beschikbaar: boolean;
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
