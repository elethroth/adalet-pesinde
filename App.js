import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';

// Adalet Peşinde — oyunu WebView içinde çalıştıran uygulama kabuğu.
// İçerik canlı adresten yükleniyor; oyun kendi service worker'ıyla
// ilk açılıştan sonra çevrimdışı da çalışır.
const GAME_URL = 'https://elethroth.github.io/adalet-pesinde/';

export default function App() {
  const webRef = useRef(null);
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171110" />
      <WebView
        ref={webRef}
        source={{ uri: GAME_URL }}
        style={styles.web}
        originWhitelist={['*']}
        allowsBackForwardNavigationGestures
        onLoadEnd={() => setLoading(false)}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        bounces={false}
        overScrollMode="never"
      />
      {loading && (
        <View style={styles.loader} pointerEvents="none">
          <ActivityIndicator size="large" color="#e0b04f" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171110',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  web: { flex: 1, backgroundColor: '#171110' },
  loader: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#171110',
  },
});
