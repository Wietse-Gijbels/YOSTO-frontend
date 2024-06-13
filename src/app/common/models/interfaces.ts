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
  favorieteStudierichtingen: StudierichtingInterface[];
}

export interface ChatRoomInterface {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  studierichtingId: string;
  studierichtingNaam: string;
  studiepunten: string;
  isAfgesloten: boolean;
}

export interface LookerQueueInterface {
  timestamp: Date;
  id: string;
  lookerId: string;
  studierichtingId: string;
}

export interface StudierichtingInterface {
  id: string;
  naam: string;
  studiepunten: string;
  niveauNaam: string;
  afstudeerrichtingen: AfstudreerrichtingInterface[];
}

export interface AfstudreerrichtingInterface {
  id: string;
  naam: string;
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
}

export interface AuthenticationResponse {
  token: string;
  rol: GebruikerRol;
}

export interface Message {
  senderId: string;
  recipientId: string;
  studierichtingId: string;
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

export interface Vraag {
  id: string;
  vraagTekst: string;
  parameter: string;
  fotoUrl: string;
}

export interface AntwoordDTO {
  vraagId: string;
  antwoord: string;
}

export interface GebruikerWaardes {
  conventioneel: number;
  praktisch: number;
  analytisch: number;
  kunstzinnig: number;
  sociaal: number;
  ondernemend: number;
}

export interface Topic {
  name: string;
  value: number;
}
