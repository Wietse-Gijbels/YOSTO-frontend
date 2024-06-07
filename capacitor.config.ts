import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yosto.app',
  appName: 'frontend-yosto',
  webDir: 'dist/frontend-yosto/browser',
  android: {
    allowMixedContent: true,
  },
};

export default config;
