# 📱 Adalet Peşinde — Uygulama (Expo)

Bu klasör artık hem **web oyunu** (GitHub Pages) hem de **Expo mobil uygulaması**.
Uygulama, oyunu bir WebView içinde çalıştırır (canlı adresten yükler).

## Telefonda önizlemek (en kolay yol)

1. Telefonuna **Expo Go** uygulamasını kur (App Store / Google Play, ücretsiz).
2. Bilgisayarında Terminal'i aç ve şunu yaz:
   ```
   cd ~/Desktop/adalet
   npx expo start
   ```
3. Ekranda bir **QR kod** çıkar.
   - **iPhone:** Kamera uygulamasıyla QR'ı okut → "Expo Go'da aç".
   - **Android:** Expo Go uygulamasını aç → "Scan QR code".
4. Oyun telefonunda açılır. Kodu her değiştirdiğinde otomatik yenilenir.

> Not: Bilgisayar ve telefon **aynı Wi-Fi ağında** olmalı.
> Sesler telefonda ilk dokunuşta başlar.

## Terminal komut çıkmıyorsa (Node yolu)

Node.js `~/.local/node` içine kurulu. Yeni bir Terminal her açtığında hazır olması
için `~/.zshrc` dosyasına eklendi. Yine de "command not found" alırsan:
```
export PATH="$HOME/.local/node/bin:$PATH"
```

## App Store / Google Play'e çıkmak (Xcode gerekmez)

Expo'nun bulut derleme servisi **EAS** ile mağaza dosyaları bilgisayarında
Xcode olmadan üretilir:
```
npx eas login          # ücretsiz Expo hesabı
npx eas build:configure
npx eas build -p ios       # App Store için (Apple Developer hesabı: yıllık 99$)
npx eas build -p android   # Google Play için (tek seferlik 25$)
```
> Apple, "sadece web sitesi" olan uygulamaları reddedebilir. Yayına
> yaklaşınca oyunu uygulamanın içine gömüp (çevrimdışı) birkaç yerel özellik
> ekleyerek bu riski azaltırız — hazır olduğunda birlikte yaparız.

## Dosya rehberi (uygulama tarafı)

| Dosya | Ne işe yarar |
|---|---|
| `App.js` | Uygulama ekranı — oyunu WebView'de açar |
| `app.json` | Uygulama adı, ikon, paket kimliği |
| `package.json` | Bağımlılıklar (Expo, React Native, WebView) |
| `assets/icon.png` | Uygulama ikonu (altın terazi) |
| `index.html` + diğerleri | Web oyununun kendisi (GitHub Pages'e giden kısım) |

## Değişiklik yapmak

- **Oyunun içeriğini** değiştirmek için `index.html`'i düzenle → GitHub'a gönder.
  Uygulama canlı adresi yüklediği için otomatik güncellenir.
- **Uygulama kabuğunu** (ikon, açılış, WebView ayarları) değiştirmek için
  `App.js` / `app.json`.
