import { ConfigContext, ExpoConfig } from 'expo/config';
import {
  AndroidConfig,
  AndroidManifest,
  ConfigPlugin,
  withAndroidManifest,
  withPlugins,
} from 'expo/config-plugins';

const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

const configPlugin: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (passedConfig) => {
    passedConfig.modResults = addReceiversToApplication(
      passedConfig.modResults
    );

    passedConfig.modResults = addServicesToApplication(passedConfig.modResults);

    return passedConfig;
  });
};

const addReceiversToApplication = (
  manifest: AndroidManifest
): AndroidManifest => {
  const mainApplication = getMainApplicationOrThrow(manifest);

  if (!mainApplication.receiver) {
    mainApplication.receiver = [];
  }

  mainApplication.receiver.push({
    $: {
      'android:name': 'com.alarm.receivers.AlarmReceiver',
      'android:enabled': 'true',
      'android:exported': 'true',
    },
  });

  mainApplication.receiver.push({
    $: {
      'android:name': 'com.alarm.receivers.BootReceiver',
      'android:exported': 'true',
    },
    'intent-filter': [
      {
        action: [
          {
            $: {
              'android:name': 'android.intent.action.BOOT_COMPLETED',
            },
          },
        ],
      },
    ],
  });

  return manifest;
};

const addServicesToApplication = (
  manifest: AndroidManifest
): AndroidManifest => {
  const mainApplication = getMainApplicationOrThrow(manifest);

  if (!mainApplication.service) {
    mainApplication.service = [];
  }

  mainApplication.service.push({
    $: {
      'android:name': 'com.alarm.AlarmService',
    },
  });

  return manifest;
};

const baseConfig: ExpoConfig = {
  name: 'alarm-react-native',
  slug: 'alarm-react-native',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './shared/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './shared/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: 'com.anonymous.alarmreactnative',
    adaptiveIcon: {
      foregroundImage: './shared/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: [
      'INTERNET',
      'READ_EXTERNAL_STORAGE',
      'SYSTEM_ALERT_WINDOW',
      'VIBRATE',
      'WRITE_EXTERNAL_STORAGE',
      'SCHEDULE_EXACT_ALARM',
      'RECEIVE_BOOT_COMPLETED',
      'FOREGROUND_SERVICE',
      'WAKE_LOCK',
    ],
  },
  web: {
    bundler: 'metro',
    favicon: './shared/images/favicon.png',
  },
};

export default ({ config }: ConfigContext) => {
  return withPlugins({ ...config, ...baseConfig }, [configPlugin]);
};
