# frontend startup

## Requirements

- Android studio jellyfish
- Node

## First time

Voor dat je het project kan opstarten moet je de dependencies installeren met

```bash
npm i
```

Na dat de dependencies geïnstalleerd zijn moet je het project builden met

```bash
npm run build
```

## Web

Voor ontwikkeling kan je de applicatie in de browser starten

```bash
npm run start
```

Android studio is redelijk traag, dus we ontwikkelen de app eerst in de browser en testen deze hierna in de emulator in android studio

## Android Studio

Om de app in de emulator te starten moet je de nieuwste versie hebben

Deze kan je [hier](https://developer.android.com/studio) installeren

Na dat android studio geïnstalleerd is zal je ionic moeten installeren om de app te kunnen starten in de emulator

```bash
npm install -g ionic@latest
```

Wanneer je de app voor de eerste keer wilt starten moet je eerst een android mapje genereren met

```bash
ionic cap add android
```

Na dat je de android map heb toegevoegd moet je dit commando uitvoer. Dit zorgt ervoor dat je android map geupdate wordt en dat android studio start.

```bash
npm rebuild:cap
```

Dus na elke verandering moet je dit commando runnen als je het op de emulator wilt testen.
Vergeet wel niet eerst android studio af te sluiten voor dat je dit commando uitvoert anders werkt het niet.

Volg de volgende stappen om te zien hoe je in android studio ja app kan opstarten in de emulator

1. selecteer een device. als je er nog geen hebt moet je er eerst nog eentje aanmaken.
   ![Alt text](/img-documentatie/stap1.png "Title")
2. klik op het groene pijltje en wacht.
   ![Alt text](/img-documentatie/stap2.png "Title")
3. de applicatie zou na een paar seconden in de emulator tevoorschijn komen.
