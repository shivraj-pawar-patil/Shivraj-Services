import * as React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

// ERROR: REPLACE THIS STRING WITH YOUR LOCAL COMPUTER'S IP ADDRESS
// Open a terminal and run `ipconfig` (Windows) or `ifconfig` (Mac/Linux) to find it.
// It will look like 192.168.1.X or 10.0.0.X
// Do NOT use 'localhost' or '127.0.0.1' if testing on a physical phone.
// Use 'http://10.0.2.2:3000' only if using Android Emulator on the same PC.
const WEBSITE_URL = 'https://www.eye-optical.in';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView
        source={{ uri: WEBSITE_URL }}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        // Spoof User Agent to look like a real browser (fixes Google "Disallowed User Agent" error)
        userAgent={Platform.OS === 'android'
          ? 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
          : 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});
