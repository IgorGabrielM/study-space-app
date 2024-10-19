import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.studyspaceapp',
  appName: 'study-space-app',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      permissions: {
        camera: "CAMERA"
      }
    }
  }
};

export default config;
