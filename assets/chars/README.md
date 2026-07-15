# Karakter Görselleri

Oyun bu klasördeki PNG'leri kullanır. Bir dosya yoksa oyun otomatik olarak
çizilen SVG karaktere düşer (`charFallback`), yani eksik dosya oyunu bozmaz.

## Genel
- avukat.png              → Oyuncunun avukatı (sen)
- hakim.png               → Hâkim
- keskin.png              → Rakip avukat Av. Feridun Keskin (bkz. aşağıda)

## Her dava için  (muvekkil = savunduğun kişi, karsi = karşı taraf)
- bisiklet-muvekkil.png   / bisiklet-karsi.png
- kedi-muvekkil.png       / kedi-karsi.png
- mesai-muvekkil.png      / mesai-karsi.png     / mesai-tanik.png   (çapraz sorgu)
- kasa-muvekkil.png       / kasa-karsi.png
- gurultu-muvekkil.png    / gurultu-karsi.png
- zemin-muvekkil.png      / zemin-karsi.png
- kolye-muvekkil.png      / kolye-karsi.png
- tarif-muvekkil.png      / tarif-karsi.png
- fatura-muvekkil.png     / fatura-karsi.png
- ceviz-muvekkil.png      / ceviz-karsi.png
- album-muvekkil.png      / album-karsi.png
- miras-muvekkil.png      / miras-karsi.png      / miras-tanik.png  (çapraz sorgu)
- kayip-muvekkil.png      / kayip-karsi.png      / kayip-tanik.png  (çapraz sorgu — gizli dava)

`-tanik` yalnızca çapraz sorgusu olan davalarda kullanılır; yoksa tanık
olarak `-karsi` görseli gösterilir.

## Rakip avukat + Kayıp Dosya (gizli dava) karakterleri

**Av. Feridun Keskin** — `keskin.png` (genel, kolye/fatura/miras
davalarının özet ekranındaki "Karşı Taraf Vekili" şeridinde kullanılır)
ve `kayip-karsi.png` (gizli davada bizzat karşı taraf vekili olarak
kürsüde — istersen aynı görseli iki dosyaya da koy). Şehrin "hiç
kaybetmeyen" ünlü avukatı: 45-55 yaş, kibirli/soğuk bakışlı, itinalı
taranmış koyu (gri kırışıklı olabilir) saç, ince çerçeveli gözlük, kısa
sakal, koyu lacivert takım elbise, bordo kravat. İfadesi müstehzi
olmalı, sıcak bir gülümseme değil.

**Sabri Bey** — `kayip-muvekkil.png`. Gizli davanın müvekkili: 70'li
yaşlarda emekli kütüphaneci, 25 yıl önce haksız yere mahkûm olmuş. Kel
veya seyrek beyaz saçlı, gözlüklü, gri bıyıklı, yorgun ama onurlu bir
duruşu olan, sade koyu yelek/hırka giyen bir centilmen. Bakışları
hüzünlü ama umutlu.

**Eski stajyer (tanık)** — `kayip-tanik.png`. Keskin'in 1998'deki
stajyeri, şimdi orta yaşlı. Tanık sorgusu turunda kürsüye çıkıp
ezberletilmiş bir yalanı tekrarlıyor; gergin, kaçamak bakışlı, sade
gömlekli biri olarak tasvir edilebilir.

## Biçim
- Uzun kenar **512 px**, **saydam arka planlı PNG**.
- Uzantı `.png` olmalı — kod yolu `assets/chars/{dava}-{rol}.png` olarak
  kurar (`imgCfg`). `.jpg` çalışmaz.
- Görsel iki yerde kullanılır: üstteki dairelerde ortası kırpılır
  (`object-fit: cover`), sahnede sol altta büyük portre olur. Bu yüzden
  **yüzü yatayda ortalı** tut.

## Yeni görsel eklerken
Ham (küçültülmemiş) görseller `_orig/` içinde durur; git'e girmez.

Dikkat: görsel üreten araçların koyduğu **"şeffaflık damalı" desen gerçek
saydamlık değildir** — piksellere gömülüdür. Temizlenmezse sahnede dama
tahtası olarak görünür. Yeni görselde uzun kenarı 512'ye küçült ve arka planı
gerçekten saydam yap.
