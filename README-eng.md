# frontend startup

## Requirements

- Android studio jellyfish
- Node

## First time

Before running the project for the first time you will need to install all dependencies

```bash
npm i
```

After installing all dependencies you will need to build the project

```bash
npm run build
```

## Web

For development run the application in the browser

```bash
npm run start
```

Android studio is kinda slow, so we develop in the browser and test afterward in the emulator.

## Android Studio

To be able to run the app in the emulator you need to have the latest version of android studio installed.

You can download it [here](https://developer.android.com/studio)

After installing android studio you will need to install ionic to be able to run the app in the emulator.

```bash
npm install -g ionic@latest
```

When running for first time run you will need to add android to the project

```bash
ionic cap add android
```

If you want to run the application on IOS u will need to run

```bash
ionic cap add ios
```

After adding the android map to the project you can run the following command to update and open the project in android studio

```bash
npm rebuild:cap
```

After each change to the code you have to run this command to test it on the emulator. But don't forget to first close android studio before running the command, or it won't work

Volg de volgende stappen om te zien hoe je in android studio ja app kan opstarten in de emulator

Follow the next step to see how to start the app inside the emulator.

1. Select a device at the top right. if you dont have one yet then first create one.
   ![Alt text](/img-documentatie/stap1.png "Title")
2. Press the green arrow to deploy the app on the emulator
   ![Alt text](/img-documentatie/stap2.png "Title")
3. The app should run in a couple of seconds in the emulator

