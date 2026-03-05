# Larqe Selfbot Voice Joiner

Bu proje, birden fazla Discord hesabının (self-bot) belirli bir sunucudaki ses kanalına otomatik olarak katılarak aktif kalmasını sağlar.

## 🚀 Özellikler

- **Çoklu Token Desteği:** İstediğiniz kadar hesabı aynı anda sokabilirsiniz.
- **Otomatik Ses Girişi:** Belirlenen ses kanalına otomatik bağlanır.
- **Durum Yönetimi:** Hesapların durumunu (Online, DND vb.) ve aktivitesini (Oynuyor...) ayarlayabilirsiniz.
- **Kolay Kurulum:** `config.json` üzerinden tüm ayarlar yönetilebilir.

## 🛠️ Kurulum

1. Projeyi bilgisayarınıza indirin.
2. Terminale `npm install` yazarak gerekli modülleri kurun.
3. `config.json` dosyasını kendinize göre düzenleyin:
   - `tokens`: Hesaplarınızın tokenlerini buraya dizi şeklinde ekleyin.
   - `guildId`: Hesapların gireceği sunucunun ID'si.
   - `channelId`: Hesapların gireceği ses kanalının ID'si.
4. `node index.js` komutu ile projeyi başlatın.

## ⚠️ Uyarı

Bu yazılım Discord Hizmet Şartları'na (ToS) aykırı olabilir. Kullanırken sorumluluk tamamen size aittir.

---
**Developed by [Larqe](https://github.com/larqe)**
