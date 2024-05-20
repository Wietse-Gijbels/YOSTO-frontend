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

export interface AuthenticationResponse {
  token: string;
}

export interface Message {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
}
