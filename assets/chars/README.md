# Karakter Görselleri

Oyun bu klasördeki PNG'leri kullanır. Bir dosya yoksa oyun otomatik olarak
çizilen SVG karaktere düşer (`charFallback`), yani eksik dosya oyunu bozmaz.

## Genel
- avukat.png              → Oyuncunun avukatı (sen)
- hakim.png               → Hâkim

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

`-tanik` yalnızca çapraz sorgusu olan davalarda kullanılır; yoksa tanık
olarak `-karsi` görseli gösterilir.

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
