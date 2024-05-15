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


For development run to develop in the browser
```bash
npm start
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

After adding android to the project you can run the following command to open the project in android studio
```bash
ionic cap open android
```

For IOS u can run
```bash
ionic cap open ios
```

If you already add android to the project, and you changed the cod you will need to update the android folder to be able to see the changes in the emulator
```bash
ionic cap update android
```

for IOS it is the same
```bash
ionic cap update ios
```
