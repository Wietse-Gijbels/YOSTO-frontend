const fs = require("fs");

const manifestPath = "android/app/src/main/AndroidManifest.xml";
const variablesGradlePath = "android/variables.gradle";

// Function to update AndroidManifest.xml
fs.readFile(manifestPath, "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }

  let result = data;

  // Add android:usesCleartextTraffic if not present
  if (!data.includes("android:usesCleartextTraffic")) {
    result = result.replace(
      /(<application)([^>]+)>/g,
      '$1$2 android:usesCleartextTraffic="true">',
    );
    console.log("android:usesCleartextTraffic added to AndroidManifest.xml.");
  } else {
    console.log(
      "android:usesCleartextTraffic is already present in AndroidManifest.xml.",
    );
  }

  // Add android:windowSoftInputMode to <activity> if not present
  if (!data.includes("android:windowSoftInputMode")) {
    result = result.replace(
      /(<activity)([^>]+)>/g,
      '$1$2 android:windowSoftInputMode="adjustPan|adjustResize">',
    );
    console.log(
      "android:windowSoftInputMode added to <activity> in AndroidManifest.xml.",
    );
  } else {
    console.log(
      "android:windowSoftInputMode is already present in <activity> in AndroidManifest.xml.",
    );
  }

  // Write the modified content back to the file
  fs.writeFile(manifestPath, result, "utf8", (err) => {
    if (err) return console.error(err);
    console.log("AndroidManifest.xml updated successfully.");
  });
});

// Function to update variables.gradle
fs.readFile(variablesGradlePath, "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  const result = data.replace("minSdkVersion = 22", "minSdkVersion = 24");

  fs.writeFile(variablesGradlePath, result, "utf8", (err) => {
    if (err) return console.error(err);
    console.log("minSdkVersion updated to 23 in variables.gradle.");
  });
});
