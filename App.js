import React, { useRef, useState } from 'react';
import { StyleSheet, StatusBar, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// Adalet Peşinde — oyunu WebView içinde çalıştıran uygulama kabuğu.
// İçerik canlı adresten yükleniyor; oyun kendi service worker'ıyla
// ilk açılıştan sonra çevrimdışı da çalışır.
const GAME_URL = 'https://elethroth.github.io/adalet-pesinde/';

// Ödüllü reklam köprüsü: oyun (WebView) bir reklam istediğinde buraya
// REQUEST_REWARDED_AD mesajı gelir. Şimdilik gerçek bir reklam SDK'sı
// bağlı değil — kısa bir gecikmeyle "izlendi" kabul edip ödülü onaylıyoruz.
// Gerçek AdMob eklenince yalnızca showRewardedAd() içindeki gövde
// değişecek (react-native-google-mobile-ads ile gerçek reklam gösterip
// onEarnedReward callback'inde granted:true döndürülecek); mesaj
// protokolü ve WebView tarafı hiç değişmeyecek.
async function showRewardedAd(purpose) {
  // TODO: react-native-google-mobile-ads entegrasyonu burada olacak.
  await new Promise(res => setTimeout(res, 1200));
  return true;
}

function Game() {
  const webRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleMessage = async (event) => {
    let msg;
    try { msg = JSON.parse(event.nativeEvent.data); } catch (e) { return; }
    if (msg.type !== 'REQUEST_REWARDED_AD') return;
    const granted = await showRewardedAd(msg.purpose);
    const payload = JSON.stringify({ requestId: msg.requestId, granted });
    webRef.current?.injectJavaScript(
      `window.onAdReward && window.onAdReward(${payload}); true;`
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#171110" />
      <WebView
        ref={webRef}
        source={{ uri: GAME_URL }}
        style={styles.web}
        originWhitelist={['*']}
        allowsBackForwardNavigationGestures
        onLoadEnd={() => setLoading(false)}
        onMessage={handleMessage}
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

export default function App() {
  return (
    <SafeAreaProvider>
      <Game />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#171110' },
  web: { flex: 1, backgroundColor: '#171110' },
  loader: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#171110',
  },
});
