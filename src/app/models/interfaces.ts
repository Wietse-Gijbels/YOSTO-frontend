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
}

export interface RegistreerResponse {
  token: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  responderId: string;
  content: string;
  timestamp: Date;
}
