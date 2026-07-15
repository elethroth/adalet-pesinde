import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, StatusBar, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import mobileAds, {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

// Adalet Peşinde — oyunu WebView içinde çalıştıran uygulama kabuğu.
// İçerik canlı adresten yükleniyor; oyun kendi service worker'ıyla
// ilk açılıştan sonra çevrimdışı da çalışır.
const GAME_URL = 'https://elethroth.github.io/adalet-pesinde/';

// Geliştirme sırasında Google'ın kendi test reklam birimini kullanıyoruz
// (gerçek reklam birimine geliştirme sırasında istek atmak politika
// ihlali sayılır). Yayına alırken __DEV__ false olacağı için otomatik
// olarak gerçek AdMob reklam birimine geçer.
const REWARDED_AD_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-8476994167728980/2412901728';

// Ödüllü reklam köprüsü: oyun (WebView) bir reklam istediğinde buraya
// REQUEST_REWARDED_AD mesajı gelir. Bir sonraki gösterim için reklam
// önceden (preloadRewardedAd ile) arka planda yüklenmiş olur; burada
// sadece gösterip ödül kazanılıp kazanılmadığını bekleriz.
let rewardedAd = null;
let rewardedAdLoaded = false;

function preloadRewardedAd() {
  rewardedAdLoaded = false;
  rewardedAd = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID);
  const unsubLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
    rewardedAdLoaded = true;
  });
  const unsubError = rewardedAd.addAdEventListener(AdEventType.ERROR, () => {
    rewardedAdLoaded = false;
    // Yüklenemedi (ör. internet yok) — birkaç saniye sonra tekrar dene.
    setTimeout(preloadRewardedAd, 15000);
  });
  rewardedAd.load();
}

async function showRewardedAd(purpose) {
  if (!rewardedAdLoaded || !rewardedAd) {
    // Reklam henüz hazır değil; kullanıcıyı bekletmeden ödülsüz dön.
    return false;
  }
  return new Promise((resolve) => {
    let earned = false;
    const unsubEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => { earned = true; }
    );
    const unsubClosed = rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      unsubEarned();
      unsubClosed();
      resolve(earned);
      preloadRewardedAd(); // sıradaki gösterim için hemen yeniden yükle
    });
    rewardedAd.show();
  });
}

function Game() {
  const webRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mobileAds()
      .initialize()
      .then(() => preloadRewardedAd());
  }, []);

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
