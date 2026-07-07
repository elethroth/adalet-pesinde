# Adalet Peşinde — Mobil Uygulama Rehberi

Oyun artık **kurulabilir bir web uygulaması (PWA)**. Bu klasördeki dosyalar:

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Oyunun tamamı (tek dosya) |
| `manifest.json` | Uygulama kimliği: ad, simge, tam ekran ayarı |
| `sw.js` | Çevrimdışı çalışmayı sağlar (internet olmadan da açılır) |
| `icon-*.png`, `apple-touch-icon.png` | Uygulama simgeleri (altın terazi) |
| `icon.svg` | Simgenin kaynak çizimi |

## 1. Telefona kurmak (bugün, ücretsiz)

Oyun bir web adresinde yayınlandığında telefona uygulama gibi kurulur:

- **iPhone:** Safari'de oyunu aç → Paylaş düğmesi → **"Ana Ekrana Ekle"**.
  Kendi simgesiyle, tam ekran, Safari çubukları olmadan açılır.
- **Android:** Chrome'da aç → menü → **"Uygulamayı yükle"**.

Bunun tam çalışması için oyunun bir adreste (https) yayınlanması gerekir.
En kolay ücretsiz seçenekler (10 dakika, kredi kartı istemez):

- **GitHub Pages** — github.com'da hesap aç, yeni depo oluştur, bu klasördeki
  dosyaları yükle, Settings → Pages → yayınla. Adres: `kullaniciadi.github.io/depoadi`
- **Netlify Drop** — app.netlify.com/drop sayfasına bu klasörü sürükle-bırak.

## 2. App Store / Google Play'e koymak (gerçek mağaza uygulaması)

Oyun tek HTML dosyası olduğu için **Capacitor** aracıyla mağaza uygulamasına
sarılabilir. Gerekenler:

### iPhone (App Store)
1. Mac App Store'dan **Xcode** kur (ücretsiz, ~10 GB).
2. **Node.js** kur: nodejs.org → macOS installer.
3. **Apple Developer** hesabı aç: developer.apple.com (yıllık 99 $).
4. Terminalde bu klasörde:
   ```
   npm init -y
   npm install @capacitor/core @capacitor/cli @capacitor/ios
   npx cap init "Adalet Pesinde" com.melis.adaletpesinde --web-dir .
   npx cap add ios
   npx cap open ios
   ```
5. Xcode'da imzala → App Store Connect'e yükle.

### Android (Google Play)
1. **Android Studio** kur (ücretsiz).
2. **Node.js** kur.
3. Yukarıdaki komutlarda `ios` yerine `android`.
4. Google Play Developer hesabı: tek seferlik 25 $.

> Not: 1. adım (Xcode/Node kurulumu) tamamlandığında bu projeyi Capacitor'a
> çevirme işini Claude Code'a tekrar yaptırabilirsin — komutları senin yerine
> çalıştırır.

## Oyun adresleri

- **Asıl adres (telefona kurmak için):** https://elethroth.github.io/adalet-pesinde/
- Yedek test linki: https://claude.ai/code/artifact/f9bde9f8-513f-4ac3-b622-13280ae77c26

Güncelleme yapmak için: bu klasörde değişiklik yap → Claude Code'a
"değişiklikleri GitHub'a gönder" de. Birkaç dakika içinde adres güncellenir.
