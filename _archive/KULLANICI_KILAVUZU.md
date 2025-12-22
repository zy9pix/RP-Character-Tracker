# 📖 Rol Oyunu Karakter Takipçisi - Kullanıcı Kılavuzu

## 🎯 Genel Bakış

Bu uygulama, GTA V ve Red Dead Redemption 2 roleplay karakterlerinizi takip etmenize ve geliştirmenize yardımcı olan yapay zeka destekli bir araçtır.

### Temel Özellikler:
- ✅ Karakter oluşturma ve yönetimi
- ✅ Günlük sistemi (Diary)
- ✅ Zaman çizelgesi (Timeline)
- ✅ RP bilgileri takibi
- ✅ Yapay zeka destekli analiz ve öneriler
- ✅ Özelleştirilebilir temalar
- ✅ Markdown desteği
- ✅ Veri yedekleme (Import/Export)

---

## 🚀 Başlangıç

### İlk Kurulum

1. **Sayfayı Açın**: Uygulamayı tarayıcınızda açın
2. **API Anahtarı Ekleyin** (İsteğe bağlı - AI özellikleri için):
   - Ayarlar (⚙️) → API Ayarları
   - Google Gemini API anahtarınızı girin
   - "Kaydet" butonuna tıklayın
3. **İlk Karakterinizi Oluşturun**:
   - "İlk Karakterinizi Oluşturun" butonuna tıklayın
   - Oyun türünü seçin (🚗 GTA V veya 🤠 RDR2)
   - Karakter adını girin
   - "Oluştur" butonuna tıklayın

### Veri Saklama

- ✅ Tüm verileriniz **tarayıcınızda** (LocalStorage) saklanır
- ✅ Hiçbir veri sunucuya gönderilmez
- ✅ Verileriniz sadece sizin cihazınızda kalır
- ⚠️ Tarayıcı verilerini temizlerseniz karakterleriniz silinir
- 💡 Düzenli olarak yedek alın (Export özelliği)

---


## 📋 Ana Özellikler

### 1. Karakter Yönetimi

#### Yeni Karakter Oluşturma
- Header'daki **+** butonuna tıklayın
- **Oyun Türü Seçin**:
  - 🚗 **GTA V RP**: Modern şehir, Los Santos
  - 🤠 **RDR2 RP**: 19. yüzyıl, vahşi batı
- Karakter adını girin
- "Oluştur" butonuna tıklayın

#### Karakter Değiştirme
- Header'daki açılır menüden karakterinizi seçin
- Tüm veriler otomatik olarak yüklenir

#### Karakter Düzenleme
- Header'daki ✏️ (kalem) ikonuna tıklayın
- Karakter adını değiştirin

#### Karakter Silme
- Header'daki 🗑️ (çöp kutusu) ikonuna tıklayın
- Onay verin (bu işlem geri alınamaz!)

---

### 2. Detaylar Sekmesi

#### Karakter Hikayesi
- "Hikayeyi Görüntüle/Düzenle" butonuna tıklayın
- Karakterinizin geçmişini yazın
- Markdown formatı desteklenir
- "Hikayeyi Kaydet" ile kaydedin

#### Karakter Özellikleri
Üç kategori vardır:
- **Kişilik**: Cesur, sinirli, sadık vb.
- **Fiziksel**: Uzun boylu, siyah saçlı vb.
- **Davranış**: Agresif, sakin, konuşkan vb.

**Özellik Ekleme**:
1. Kategori seçin (Kişilik/Fiziksel/Davranış)
2. Özelliği yazın
3. Enter'a basın veya başka yere tıklayın

**Özellik Silme**:
- Özelliğin üzerine tıklayın

---

### 3. RP Bilgileri Sekmesi

#### Geçmiş & Köken
- **Nereden Geldi**: Karakterin geldiği yer (örn: Liberty City, Valentine)
- **Neden Buraya Geldi**: Motivasyonu, nedenleri

#### Genel Durum
- Karakterin şu anki durumu
- Son yaşananlar, ilişkiler, hedefler
- **AI ile Oluştur** butonu: Günlük girişlerinizi analiz ederek otomatik özet

#### Tanıdık Kişiler
Karakterinizin tanıdığı kişileri takip edin:
- **İsim**: Kişinin adı
- **Nasıl Tanıştınız**: İlişki açıklaması
- **Son İletişim**: En son ne zaman görüştünüz
- **Hatırlatma**: X günde bir iletişim hatırlatması
- **Notlar**: Ek bilgiler

**Kişi Ekleme**: "+ Kişi Ekle" butonuna tıklayın

**İletişim Kurdum**: ✓ butonuna tıklayarak son iletişim tarihini güncelleyin

#### AI Senaryo Planlayıcı
Bir durum yazın, AI karakterinizin ne yapacağını tahmin eder.

**Örnek**: "Polis tarafından durduruldu"

---

### 4. Yetenekler Sekmesi

Karakterinizin özel yeteneklerini ekleyin:
- **Yetenek Adı**: Örn: "Keskin Nişancı"
- **Açıklama**: Yeteneğin detayları
- **Seviye**: 1-10 arası

**Yeni Yetenek Ekle**: "Yeni Yetenek Ekle" butonuna tıklayın

---

### 5. Zaman Çizelgesi Sekmesi

Karakterinizin hayatındaki önemli olayları takip edin.

#### Olay Tipleri:
- 🔴 **Suç**: Soygun, çatışma, tutuklama
- 💙 **İlişkiler**: Tanışma, ayrılık, evlilik
- 💚 **İş**: İş değişikliği, terfi, işten çıkma
- ⚪ **Kişisel**: Taşınma, önemli kararlar

#### Olay Ekleme:
1. "+ Olay Ekle" butonuna tıklayın
2. Başlık, tarih, tip ve özet girin
3. "Kaydet" butonuna tıklayın

#### AI Önerisi:
- "✨ AI Önerisi Al" butonu günlük girişlerinizi analiz eder
- Önemli olayları otomatik olarak tespit eder
- Önerileri onaylayarak zaman çizelgesine ekleyin

#### Filtreleme:
- "Tümü", "Suç", "İlişkiler", "İş", "Kişisel" butonları ile filtreleyin

---

### 6. Günlük Sekmesi

Karakterinizin günlük girişlerini yazın.

#### Takvim Görünümü
- Ay bazında görüntüleme
- ◀ ▶ butonları ile aylar arası geçiş
- Girişi olan günler **tema vurgu rengi** ile vurgulanır
- Bugün çerçeve ile gösterilir
- Gün üzerine tıklayarak o günün girişlerini görüntüleyin

#### Gün Girişleri Görünümü
- Bir güne tıkladığınızda, o günün tüm girişleri takvimin üstünde gösterilir
- Takvim görünür kalır, alt tarafta
- "✕ Kapat" butonu ile giriş listesini kapatabilirsiniz
- Birden fazla giriş varsa hepsi listelenir

#### Günlük Girişi Ekleme:
1. "+ Girdi Ekle" butonuna tıklayın
2. **Başlık**: Girişin başlığı (isteğe bağlı)
3. **İçerik**: Günlük metni (Markdown destekli)
4. **Tarih**: Giriş tarihi (takvimden seçin)
5. **Sıklık**: Günlük/Haftalık/Aylık (AI iyileştirme için)
6. "Kaydet" butonuna tıklayın

**Önemli**: Tarih seçerken doğru günü seçtiğinizden emin olun. Sistem UTC saat dilimini kullanır.

#### Günlük Düzenleme:
- Bir girişi düzenlerken tarihini değiştirebilirsiniz
- Tarih değiştirildiğinde, giriş yeni tarihe taşınır
- Kaydettiğinizde otomatik olarak yeni tarihin girişleri gösterilir

#### Günlük Özellikleri:
- **Özet/Tam Hikaye**: Özet varsa, özet ve tam hikaye arasında geçiş yapın
- ✏️ **Düzenle**: Girişi düzenle
- ✨ **AI İyileştir**: Karakterin sesiyle yeniden yaz
- 📝 **Özet Oluştur**: Kısa özet oluştur (özet yoksa)
- 🗑️ **Sil**: Girişi sil

#### Markdown Desteği:
Günlük girişlerinizde markdown kullanabilirsiniz:
- `**kalın**` → **kalın**
- `*italik*` → *italik*
- `# Başlık` → Başlık
- `- Liste` → Madde işaretli liste
- `> Alıntı` → Alıntı bloğu

---


## 🤖 Yapay Zeka Özellikleri

Uygulama, karakterinizi geliştirmenize yardımcı olmak için Google Gemini AI kullanır. AI özellikleri tamamen isteğe bağlıdır.

### Gereksinimler
- **Google Gemini API Anahtarı** gereklidir
- **Ücretsiz** API anahtarı alın: https://makersuite.google.com/app/apikey
- Ayarlar (⚙️) → API Ayarları → Gemini API Anahtarı alanına yapıştırın
- "Kaydet" butonuna tıklayın

### Veri Gizliliği ve Güvenlik
- ✅ Verileriniz **sadece** Google Gemini API'ye gönderilir
- ✅ Başka hiçbir sunucuya, veritabanına veri gönderilmez
- ✅ API anahtarınız **sadece tarayıcınızda** saklanır
- ✅ Google Gemini, gönderilen verileri geçici işler ve saklamaz
- ✅ Tüm AI istekleri HTTPS ile şifrelenir
- ⚠️ API anahtarınızı kimseyle paylaşmayın

### AI Özellikleri Listesi
1. **Karakter Kişiliği Analizi** - Eleştirel değerlendirme
2. **Gerçekçilik Kontrolü** - 0-100 puan sistemi
3. **Karakter Sohbeti (Q&A)** - İki modlu sohbet
4. **Karakter Teması Önerisi** - Renk paleti önerileri
5. **Senaryo Planlayıcı** - Durum analizi
6. **Genel Durum Oluşturma** - Otomatik özet
7. **Günlük İyileştirme** - Karakterin sesiyle yeniden yazma
8. **Günlük Özeti** - Kısa özet oluşturma
9. **Zaman Çizelgesi Önerileri** - Önemli olay tespiti

---

### 1. Karakter Kişiliği Analizi

**Nerede**: Detaylar sekmesi → "✨ Karakter Kişiliğini Analiz Et"

**Ne Yapar**: Karakterinizi eleştirel bir şekilde analiz eder, zayıf yönleri ve geliştirme önerilerini gösterir.

#### AI'ya Gönderilen Veriler:
```
✓ Karakter adı
✓ Oyun türü (GTA V / RDR2)
✓ Karakter hikayesi (hikaye özeti veya tamamı)
✓ Tüm özellikler (kişilik, fiziksel, davranış - kategorize edilmiş)
```

#### AI'dan Gelen Yanıt:
- Kişilik tipi değerlendirmesi (klişe mi, özgün mü?)
- Motivasyon analizi
- Karakter kusurları ve çelişkiler
- Oyun ortamına uygunluk
- Geliştirme önerileri

**Not**: AI **eleştirel** olacak şekilde programlanmıştır. Övgü değil, yapıcı eleştiri verir.

---

### 2. Gerçekçilik Kontrolü (0-100 Puan)

**Nerede**: Detaylar sekmesi → "🎯 Gerçekçilik Kontrolü (0-100)"

**Ne Yapar**: Karakterinizi 10 farklı kritere göre puanlar ve detaylı geri bildirim verir.

#### AI'ya Gönderilen Veriler:
```
✓ Karakter adı
✓ Oyun türü (GTA V / RDR2)
✓ Karakter hikayesi (hikaye özeti veya tamamı)
✓ Tüm özellikler (kişilik, fiziksel, davranış)
✓ RP bilgileri:
  - Nereden geldi
  - Neden buraya geldi
  - Aile bilgisi
  - Meslek
✓ Son 5 günlük girişi (özet veya ilk 100 karakter)
```

#### Değerlendirme Kriterleri (Her biri 0-10 puan):
1. Hikaye Tutarlılığı
2. Motivasyon Mantıklılığı
3. Kişilik Uyumu
4. Geçmiş-Şimdi Bağlantısı
5. Oyun Dünyasına Uygunluk (GTA V / RDR2)
6. Karakter Derinliği
7. Sosyal/Ekonomik Gerçekçilik
8. Gelişim Potansiyeli
9. Roleplay Edilebilirlik
10. Orijinallik

#### AI'dan Gelen Yanıt:
- Toplam puan (0-100)
- Her kriter için ayrı puan
- Her kriter için açıklama
- Her kriter için iyileştirme önerisi
- Genel değerlendirme

**Not**: AI **dürüst** olacak şekilde programlanmıştır. 70+ puan almak zordur.

---

### 3. Karakter Sohbeti (Q&A)

**Nerede**: Detaylar sekmesi → Karakter Sohbeti bölümü (en altta)

**Ne Yapar**: Karakteriniz hakkında sorular sorun, AI iki farklı modda yanıt verir.

#### İki Mod:
- **🎭 Karakter Olarak**: AI, karakterinizin yerine geçer ve birinci şahıs konuşur
  - Örnek: "En büyük pişmanlığım..." 
- **📖 Karakter Hakkında**: AI, karakterinizi objektif olarak analiz eder
  - Örnek: "Bu karakter muhtemelen..."

**Mod Değiştirme**: Soru kutusunun üstündeki butona tıklayarak mod değiştirebilirsiniz.

#### AI'ya Gönderilen Veriler:
```
✓ Karakter adı
✓ Oyun türü (GTA V / RDR2)
✓ Tüm özellikler (kişilik, fiziksel, davranış - kategorize edilmiş)
✓ Karakter hikayesi (hikaye özeti veya tamamı)
✓ Son 2 günlük girişi (özet veya ilk 100 karakter)
✓ Sizin sorunuz
✓ Oyun bağlamı (dönem, ortam bilgisi)
```

**Not**: Sohbet geçmişi şu anda AI'ya gönderilmiyor, her soru bağımsız işlenir.

#### Örnek Sorular:
**Karakter Olarak Modu için**:
- "Geçmişindeki en büyük pişmanlığın nedir?"
- "Gelecekte ne olmak istiyorsun?"
- "En çok kime güveniyorsun?"
- "Şu anki en büyük sorunun ne?"
- "Neden buraya geldin?"

**Karakter Hakkında Modu için**:
- "Bu karakterin en büyük zayıflığı ne?"
- "Hangi durumlarda kontrolünü kaybeder?"
- "İlişkilerinde nasıl davranır?"
- "Gelecekte ne gibi sorunlarla karşılaşabilir?"

#### AI'dan Gelen Yanıt:
- **Karakter Modu**: 2-4 cümle, karakterin sesiyle, birinci şahıs
- **Analiz Modu**: 3-5 cümle, objektif değerlendirme, üçüncü şahıs

#### Sohbet Geçmişi:
- Tüm soru-cevaplar ekranda görünür
- **Önceki sorular AI'ya gönderilmez** (her soru bağımsız)
- "Sohbeti Temizle" butonu ile ekrandaki geçmişi silebilirsiniz
- Karakter değiştirdiğinizde geçmiş otomatik temizlenir

**İpucu**: Karakter Olarak modunda, karakterinizin kişiliğine uygun yanıtlar alırsınız. Analiz modunda ise karakterinizi geliştirmek için objektif geri bildirim alırsınız.

---

### 4. Karakter Teması Önerisi

**Nerede**: Ayarlar (⚙️) → Karakter Teması Yönetimi → "✨ AI ile Karakter Teması Öner"

**Ne Yapar**: Karakterinizin kişiliğine, hikayesine ve oyun türüne uygun 3 farklı renk paleti önerir.

#### AI'ya Gönderilen Veriler:
```
✓ Karakter adı
✓ Oyun türü (GTA V / RDR2)
✓ Karakter hikayesi (hikaye özeti veya tamamı)
✓ Tüm özellikler (kişilik, fiziksel, davranış)
```

#### AI'dan Gelen Yanıt:
Her tema için:
- **Tema Adı**: Karaktere uygun isim (örn: "Karanlık Sokaklar")
- **Ana Renk**: Butonlar ve vurgular için (hex kodu)
- **Vurgu Rengi**: Günlük takviminde kullanılır (hex kodu)
- **Arka Plan Rengi**: Koyu mod için (hex kodu)
- **Açık Arka Plan**: Açık mod için (hex kodu)
- **Metin Rengi**: Okunabilirlik için (hex kodu)
- **Açıklama**: Neden bu renkler seçildi

#### Tema Stilleri:
**GTA V Karakterleri için**:
- Modern, kentsel, neon renkler
- Şehir hayatına uygun paletler
- Canlı ve dinamik tonlar

**RDR2 Karakterleri için**:
- Toprak tonları, sepia, western renkler
- 19. yüzyıl atmosferine uygun
- Doğal ve vintage tonlar

#### Kullanım:
1. 3 tema önerisi gelir
2. Beğendiğiniz temayı seçin
3. "Uygula" butonuna tıklayın
4. Tema karakterinize kaydedilir ve otomatik uygulanır
5. İstediğiniz zaman "Temayı Kaldır" ile silebilirsiniz

**İpucu**: Farklı öneriler görmek için butona tekrar tıklayabilirsiniz. Her seferinde yeni temalar önerilir.

---

### 5. Senaryo Planlayıcı

**Nerede**: RP Bilgileri sekmesi → AI Senaryo Planlayıcı

**Ne Yapar**: Bir durum yazarsınız, AI karakterinizin o durumda ne yapacağını tahmin eder.

#### AI'ya Gönderilen Veriler:
```
✓ Karakter adı
✓ Oyun türü (GTA V / RDR2)
✓ Kişilik özellikleri
✓ Karakter hikayesi (ilk 200 karakter)
✓ Yazdığınız senaryo/durum
```

#### AI'dan Gelen Yanıt:
1. İlk tepkisi ne olurdu?
2. Hangi seçenekleri düşünürdü?
3. Muhtemelen ne yapardı?
4. Neden bu kararı alırdı?

**Örnek Senaryolar**:
- "Polis tarafından durduruldu"
- "Eski bir düşmanla karşılaştı"
- "Büyük bir para teklifi aldı"
- "En yakın arkadaşı ihanet etti"

---

### 6. Genel Durum Oluşturma

**Nerede**: RP Bilgileri sekmesi → "✨ AI ile Oluştur" (Genel Durum alanında)

**Ne Yapar**: Günlük girişlerinizi ve olaylarınızı analiz ederek karakterinizin şu anki durumunu özetler.

#### AI'ya Gönderilen Veriler:
```
✓ Karakter adı
✓ Oyun türü (GTA V / RDR2)
✓ Karakter hikayesi (ilk 300 karakter)
✓ Kişilik özellikleri
✓ RP bilgileri (nereden geldi, meslek)
✓ Son 5 günlük girişi (her birinden ilk 150 karakter)
✓ Son 3 zaman çizelgesi olayı (başlık ve özet)
```

#### AI'dan Gelen Yanıt (150-200 kelime):
- Ne yapıyor, nerede?
- Kiminle ilişkileri var?
- Hangi sorunlarla uğraşıyor?
- Hedefleri neler?
- Duygusal durumu nasıl?

---

### 7. Günlük İyileştirme

**Nerede**: Günlük sekmesi → Bir günlük girişi → ✨ (yıldız) butonu

**Ne Yapar**: Günlük girişinizi karakterinizin sesiyle, daha akıcı ve karaktere uygun şekilde yeniden yazar.

#### Ne Zaman Kullanılır:
- Hızlıca not aldığınız girişleri düzeltmek için
- Karakterin sesini daha iyi yakalamak için
- Daha akıcı ve okunabilir hale getirmek için
- Dil ve üslup tutarlılığı sağlamak için

#### AI'ya Gönderilen Veriler:
```
✓ Karakter adı
✓ Oyun türü (GTA V / RDR2)
✓ Temel kişilik özellikleri (ilk 5 özellik - kişilik 3, davranış 2)
✓ Karakter hikayesi (hikaye özeti veya tamamı)
✓ Önceki günlük girişi (özet veya ilk 80 karakter)
✓ İyileştirilecek günlük girişi (tamamı)
✓ Giriş sıklığı (günlük/haftalık/aylık)
```

#### AI'dan Gelen Yanıt:
**İçerik**:
- Aynı olaylar, aynı detaylar
- Karakterin kişiliğine uygun üslup
- Birinci şahıs anlatım
- Duygusal derinlik eklenir

**Kelime Sayısı** (sıklığa göre):
- **Günlük**: 150-200 kelime (kısa ve öz)
- **Haftalık**: 300-400 kelime (orta detay)
- **Aylık**: 500-600 kelime (detaylı özet)

**Dil Stili**:
- **RDR2**: 19. yüzyıl dili, western üslup
  - Örnek: "Bugün kasabaya indim, şerif ile konuştum..."
- **GTA V**: Modern dil, güncel ifadeler
  - Örnek: "Bugün şehre gittim, polisle muhatap oldum..."

#### ⚠️ Önemli Uyarılar:
- **Orijinal giriş silinir** ve AI versiyonu ile değiştirilir
- Geri alma özelliği yoktur
- Yedek almak isterseniz önce metni kopyalayın
- İşlem birkaç saniye sürebilir

#### İpuçları:
- Kısa notlar bile iyileştirilebilir
- "Bugün X oldu, Y ile konuştum" gibi basit notlar bile yeterli
- AI, eksik detayları eklemez, sadece var olanları iyileştirir
- Sıklık ayarını doğru seçin (günlük/haftalık/aylık)

---

### 8. Günlük Özeti Oluşturma

**Nerede**: Günlük sekmesi → Bir günlük girişi → 📝 (not defteri) butonu

**Ne Yapar**: Uzun günlük girişlerinin kısa, öz bir özetini oluşturur.

#### Ne Zaman Kullanılır:
- Uzun günlük girişleri için
- Hızlı göz atmak istediğinizde
- Takvim görünümünde kısa bilgi göstermek için
- Zaman çizelgesi önerileri için

#### AI'ya Gönderilen Veriler:
```
✓ Günlük girişi içeriği (tamamı)
```

#### AI'dan Gelen Yanıt:
- **2-3 cümle** kısa özet
- En önemli olaylar ve detaylar
- Sadece özet, başka açıklama yok
- Karakterin bakış açısından

#### Kullanım:
1. Uzun bir günlük girişi yazın veya AI ile iyileştirin
2. 📝 butonuna tıklayın
3. Özet otomatik oluşturulur ve kaydedilir
4. "Özet" / "Tam Hikaye" butonu ile geçiş yapabilirsiniz

#### Özet Görüntüleme:
- Özet oluşturulduktan sonra, varsayılan olarak özet gösterilir
- "Tam Hikaye" butonuna tıklayarak tam metni görebilirsiniz
- "Özet" butonuna tıklayarak tekrar özete dönebilirsiniz
- Geçiş anında güncellenir, sayfa yenilenmez

**İpucu**: Özet, günlük girişinin orijinal içeriğini değiştirmez. Her zaman tam metne dönebilirsiniz.

---

### 9. Zaman Çizelgesi Önerileri

**Nerede**: Zaman Çizelgesi sekmesi → "✨ AI Önerisi Al" butonu

**Ne Yapar**: Günlük girişlerinizi analiz eder ve zaman çizelgesine eklenmesi gereken önemli olayları otomatik tespit eder.

#### Ne Zaman Kullanılır:
- Çok fazla günlük girişiniz varsa
- Hangi olayların önemli olduğunu belirlemekte zorlanıyorsanız
- Zaman çizelgesini hızlıca doldurmak istiyorsanız
- Gözden kaçırdığınız önemli olayları bulmak için

#### AI'ya Gönderilen Veriler:
```
✓ Karakter adı
✓ Oyun türü (GTA V / RDR2)
✓ İşlenmemiş günlük girişleri:
  - Giriş ID'si
  - Tarih
  - Başlık
  - İçerik (tamamı)
```

**Not**: Sadece daha önce zaman çizelgesine eklenmemiş günlük girişleri analiz edilir.

#### Önemli Olay Kriterleri:

**GTA V için**:
- 🔴 **Suç**: Soygun, çatışma, tutuklama, mahkeme
- 💙 **İlişkiler**: Önemli tanışmalar, ayrılıklar, evlilik, ihanet
- 💚 **İş**: İş değişiklikleri, terfi, işten çıkma, büyük anlaşmalar
- ⚪ **Kişisel**: Taşınma, travma, hayatı değiştiren kararlar
- Çete çatışmaları, büyük işler
- Duygusal dönüm noktaları

**RDR2 için**:
- 🔴 **Suç**: Soygunlar, düellolar, kanunla sorunlar, çatışmalar
- 💙 **İlişkiler**: Önemli tanışmalar, ayrılıklar, düşmanlıklar
- 💚 **İş**: Çete işleri, büyük avlar, ticaret
- ⚪ **Kişisel**: At kayıpları, kasaba olayları, taşınma
- Önemli keşifler, travmatik olaylar

**Önerilmeyen Olaylar**:
- Günlük rutinler (iş, yemek, uyku)
- Küçük sohbetler
- Önemsiz alışverişler
- Sıradan günler

#### AI'dan Gelen Yanıt:
Her önemli olay için:
- **Kaynak**: Hangi günlük girişinden geldiği
- **Başlık**: Olay başlığı (kısa ve öz)
- **Tarih**: Olayın tarihi
- **Tip**: Suç / İlişki / İş / Kişisel
- **Özet**: 1-2 cümle açıklama

#### Kullanım:
1. "✨ AI Önerisi Al" butonuna tıklayın
2. AI, işlenmemiş günlük girişlerini analiz eder
3. Önerilen olaylar listesi gösterilir
4. Her öneri için:
   - ✅ **Ekle**: Zaman çizelgesine ekle
   - ❌ **Reddet**: Ekleme
5. Eklenen olaylar otomatik olarak işaretlenir
6. Bir daha aynı günlük girişi için öneri gelmez

**İpucu**: Tüm önerileri kabul etmek zorunda değilsiniz. Sadece gerçekten önemli bulduklarınızı ekleyin.

---


## ⚙️ Ayarlar

Ayarlar menüsüne header'daki ⚙️ ikonundan ulaşabilirsiniz.

### Görünüm Modu
- **Açık Tema**: Beyaz arka plan, koyu metin
- **Koyu Tema**: Koyu arka plan, açık metin

### Renk Teması
İki seçenek:
- **🎭 Karakter Teması**: AI tarafından önerilen veya manuel oluşturduğunuz tema
- **🎨 Özel Renk**: Manuel renk seçimi

### Karakter Teması Yönetimi

Karakter teması, uygulamanın renklerini karakterinizin kişiliğine göre özelleştirir.

#### Tema Özellikleri:
- **Ana Renk**: Butonlar ve vurgular için
- **Vurgu Rengi**: Günlük takviminde girişi olan günler için kullanılır
- **Arka Plan Renkleri**: Açık ve koyu mod için
- **Metin Rengi**: Okunabilirlik için

#### AI ile Tema Önerisi:
1. "✨ AI ile Karakter Teması Öner" butonuna tıklayın
2. AI karakterinizin kişiliğine uygun 3 farklı tema önerir
3. Beğendiğiniz temayı seçin
4. "Uygula" butonuna tıklayın
5. Tema otomatik olarak karakterinize kaydedilir

#### Manuel Renk Seçimi:
1. "🎨 Manuel Renk Seç" butonuna tıklayın
2. Tema adı girin
3. Ana renk ve vurgu rengi seçin
4. Açıklama yazın (isteğe bağlı)
5. "Kaydet ve Uygula" butonuna tıklayın

#### Tema Değiştirme:
- Karakter değiştirdiğinizde, o karakterin teması otomatik olarak uygulanır
- Her karakter kendi temasına sahip olabilir
- Ayarlar → Renk Teması → "Karakter Teması" seçili olmalıdır

### API Ayarları

**Gemini API Anahtarı**:
1. https://makersuite.google.com/app/apikey adresinden ücretsiz API anahtarı alın
2. Anahtarı "Gemini API Anahtarı" alanına yapıştırın
3. "Kaydet" butonuna tıklayın

**Not**: API anahtarınız sadece tarayıcınızda saklanır, başka yere gönderilmez.

### Karakter Yedekleme

#### Dışa Aktarma (Export):
1. "⬇ Karakter Dışa Aktar (.json)" butonuna tıklayın
2. Kayıt yerini seçin
3. Dosya `karakter-adi.json` olarak kaydedilir

**İçerik**: Tüm karakter verileri (hikaye, özellikler, günlükler, olaylar, RP bilgileri, tema)

#### İçe Aktarma (Import):
1. "⬆ Karakter İçe Aktar (.json)" butonuna tıklayın
2. .json dosyasını seçin
3. Karakter otomatik olarak yüklenir

**Not**: Aynı isimde karakter varsa üzerine yazılır!

---

## 🎨 Özel Özellikler

### Markdown Desteği

Aşağıdaki alanlarda markdown kullanabilirsiniz:
- Günlük girişleri
- Karakter hikayesi
- AI yanıtları

#### Temel Markdown Sözdizimi:

**Başlıklar**:
```
# Büyük Başlık
## Orta Başlık
### Küçük Başlık
```

**Metin Biçimlendirme**:
```
**Kalın metin**
*İtalik metin*
***Kalın ve italik***
```

**Listeler**:
```
- Madde 1
- Madde 2
  - Alt madde

1. Numaralı madde
2. İkinci madde
```

**Alıntı**:
```
> Bu bir alıntıdır
```

**Yatay Çizgi**:
```
---
```

**Bağlantı**:
```
[Metin](https://adres.com)
```

**Kod**:
```
`satır içi kod`
```

### Tarih Formatları

#### GTA V Karakterleri:
- Tam tarih: "15 Mayıs 2024"
- Gün ile: "Pazartesi, 15 Mayıs 2024"
- Kısa: "15.05.2024"

#### RDR2 Karakterleri:
- Açıklayıcı: "Mayıs Ortası"
- Tam: "Pazartesi, Mayıs Ortası (İlkbahar Mevsimi)"
- Dönem: Başı (1-10), Ortası (11-20), Sonu (21-31)
- Mevsim: İlkbahar, Yaz, Sonbahar, Kış

**Neden?**: RDR2 sunucularında tarihler değişebilir, bu yüzden kesin yıl gösterilmez.

---

## 💾 Veri Yönetimi

### Otomatik Kaydetme
- ✅ Her 30 saniyede bir otomatik kayıt
- ✅ Sayfa kapatılırken otomatik kayıt
- ✅ Önemli işlemlerde anında kayıt

### Manuel Kaydetme
Aşağıdaki durumlarda "Kaydet" butonuna tıklamanız gerekir:
- RP bilgileri değişikliği
- Yetenek ekleme/düzenleme
- Zaman çizelgesi olayı ekleme

### Veri Boyutu
- Tarayıcı LocalStorage limiti: ~5-10 MB
- Ortalama karakter boyutu: 50-200 KB
- Çok fazla günlük girişi varsa boyut artabilir

### Veri Temizleme
⚠️ **Dikkat**: Aşağıdaki işlemler tüm verilerinizi siler:
- Tarayıcı geçmişini temizleme
- Tarayıcı önbelleğini temizleme
- Gizli mod kullanma (kapanınca silinir)

💡 **Öneri**: Düzenli olarak dışa aktarma yapın!

---

## 🔒 Gizlilik ve Güvenlik

### Veri Saklama
- ✅ Tüm veriler **tarayıcınızda** (LocalStorage) saklanır
- ✅ Hiçbir sunucuya veri gönderilmez
- ✅ Verileriniz sadece sizin cihazınızda

### AI Kullanımı
- ✅ Veriler sadece **Google Gemini API**'ye gönderilir
- ✅ Geçici işleme için kullanılır
- ✅ Google tarafından saklanmaz (API politikası)
- ✅ Başka hiçbir yere gönderilmez

### API Anahtarı
- ✅ Tarayıcınızda saklanır
- ✅ Sadece API isteklerinde kullanılır
- ✅ Başka yere gönderilmez
- ⚠️ Anahtarınızı kimseyle paylaşmayın

### Güvenlik Önerileri
- 🔐 Güvenilir cihazlarda kullanın
- 💾 Düzenli yedek alın
- 🔑 API anahtarınızı gizli tutun
- 🚫 Ortak bilgisayarlarda dikkatli olun

---

## ❓ Sık Sorulan Sorular

### Genel Sorular

**S: Uygulama ücretsiz mi?**
C: Evet, uygulama tamamen ücretsizdir. Sadece AI özellikleri için Google Gemini API anahtarı gerekir (ücretsiz alınabilir).

**S: İnternet bağlantısı gerekli mi?**
C: Hayır, sadece AI özellikleri için internet gerekir. Diğer tüm özellikler çevrimdışı çalışır.

**S: Kaç karakter oluşturabilirim?**
C: Sınırsız. Ancak tarayıcı LocalStorage limiti (~5-10 MB) vardır.

**S: Verilerim güvende mi?**
C: Evet, tüm veriler sadece tarayıcınızda saklanır. Hiçbir sunucuya gönderilmez.

### Karakter Yönetimi

**S: Karakterimi başka cihaza nasıl taşırım?**
C: Ayarlar → Karakter Yedekleme → Dışa Aktar. Dosyayı diğer cihazda İçe Aktar.

**S: Silinen karakteri geri getirebilir miyim?**
C: Hayır, silme işlemi geri alınamaz. Düzenli yedek alın.

**S: GTA V karakterini RDR2'ye çevirebilir miyim?**
C: Hayır, oyun türü değiştirilemez. Yeni karakter oluşturmanız gerekir.

### AI Özellikleri

**S: AI özellikleri çalışmıyor?**
C: API anahtarınızı kontrol edin. Ayarlar → API Ayarları → Gemini API Anahtarı

**S: API anahtarı nereden alınır?**
C: https://makersuite.google.com/app/apikey adresinden ücretsiz alabilirsiniz.

**S: AI yanıtları neden eleştirel?**
C: AI, karakterinizi geliştirmenize yardımcı olmak için eleştirel olacak şekilde programlanmıştır.

**S: AI verilerimi saklıyor mu?**
C: Hayır, Google Gemini API geçici işleme yapar, saklamaz.

### Teknik Sorular

**S: Hangi tarayıcılar destekleniyor?**
C: Chrome, Firefox, Safari, Edge (güncel sürümler)

**S: Mobil cihazlarda çalışır mı?**
C: Evet, responsive tasarım sayesinde mobil uyumludur.

**S: Verilerim kayboldu, ne yapmalıyım?**
C: Tarayıcı verilerini temizlediyseniz geri getirilemez. Yedek dosyanız varsa içe aktarın.

**S: LocalStorage dolu hatası alıyorum?**
C: Eski karakterleri silin veya dışa aktarıp tarayıcı verilerini temizleyin.

---

## 🆘 Sorun Giderme

### Uygulama Açılmıyor
1. Tarayıcınızı güncelleyin
2. Önbelleği temizleyin (Ctrl+Shift+Delete)
3. Farklı tarayıcı deneyin
4. JavaScript'in etkin olduğundan emin olun

### Veriler Kayboldu
1. Tarayıcı verilerini temizlediyseniz geri getirilemez
2. Yedek dosyanız varsa içe aktarın
3. Gizli mod kullandıysanız veriler kapanınca silinir

### AI Çalışmıyor
1. API anahtarını kontrol edin
2. İnternet bağlantınızı kontrol edin
3. API kotanızı kontrol edin (Google Console)
4. Tarayıcı konsolunu açın (F12) ve hata mesajlarını kontrol edin

### Kaydetme Çalışmıyor
1. Tarayıcı konsolunu açın (F12)
2. "💾 Saving state" mesajını arayın
3. "❌ Error" varsa hatayı okuyun
4. LocalStorage dolu olabilir, eski verileri silin

### Tema Uygulanmıyor
1. Ayarlar → Renk Teması → Karakter Teması seçili mi?
2. Karakter teması oluşturulmuş mu?
3. Sayfayı yenileyin (F5)
4. Tarayıcı önbelleğini temizleyin

---

## 📞 Destek ve Geri Bildirim

### Hata Bildirimi
Hata bulursanız:
1. Tarayıcı konsolunu açın (F12)
2. Hata mesajlarını kopyalayın
3. Hangi işlemi yaptığınızı not edin
4. Ekran görüntüsü alın

### Özellik İstekleri
Yeni özellik önerileri için:
- Özelliğin ne işe yarayacağını açıklayın
- Nasıl kullanılacağını tarif edin
- Benzer uygulamalarda örnek varsa belirtin

---

## 📚 Ek Kaynaklar

### Markdown Öğrenme
- https://www.markdownguide.org/basic-syntax/
- https://markdown.org.tr/

### Google Gemini API
- https://ai.google.dev/docs
- https://makersuite.google.com/

### Roleplay Kaynakları
- GTA V RP sunucuları
- RDR2 RP sunucuları
- Karakter geliştirme rehberleri

---

## 📝 Sürüm Notları

### v1.3 (Güncel)
- ✅ Günlük takvimi yeniden tasarlandı
- ✅ Gün girişleri artık takvimin üstünde gösteriliyor
- ✅ Tema vurgu rengi günlük takviminde kullanılıyor
- ✅ Tarih kaydetme sorunu düzeltildi (UTC saat dilimi)
- ✅ Özet/Tam Hikaye geçişi anında güncelleniyor
- ✅ Yardım butonu eklendi (❓ ikonu)
- ✅ Karakter değiştirirken tema otomatik uygulanıyor

### v1.2
- ✅ Markdown desteği eklendi
- ✅ Import/Export ayarlara taşındı
- ✅ RDR2 tarih formatı iyileştirildi
- ✅ Kaydetme sistemi optimize edildi
- ✅ Otomatik kayıt iyileştirildi

### v1.1
- ✅ Karakter teması sistemi
- ✅ AI senaryo planlayıcı
- ✅ Zaman çizelgesi filtreleme
- ✅ Günlük özet özelliği

### v1.0
- ✅ İlk sürüm
- ✅ Temel karakter yönetimi
- ✅ Günlük sistemi
- ✅ AI analiz özellikleri

---

## 🎯 İpuçları ve En İyi Uygulamalar

### Karakter Oluşturma
- ✅ Detaylı hikaye yazın (AI daha iyi analiz eder)
- ✅ Çeşitli özellikler ekleyin (kişilik, fiziksel, davranış)
- ✅ Gerçekçi motivasyonlar belirleyin
- ✅ Oyun dünyasına uygun karakter yapın

### Günlük Yazma
- ✅ Düzenli yazın (karakterinizi canlı tutar)
- ✅ Detaylı olayları anlatın
- ✅ Duyguları ve düşünceleri ekleyin
- ✅ Markdown ile biçimlendirin
- ✅ AI iyileştirme özelliğini kullanın

### AI Kullanımı
- ✅ Eleştirilere açık olun
- ✅ Önerileri dikkate alın
- ✅ Farklı senaryolar deneyin
- ✅ Düzenli analiz yapın

### Veri Yönetimi
- ✅ Haftada bir yedek alın
- ✅ Önemli değişikliklerden önce yedek alın
- ✅ Yedekleri farklı yerlerde saklayın
- ✅ Eski günlükleri arşivleyin

---

## 🌟 Sonuç

Bu uygulama, roleplay karakterlerinizi daha derinlemesine geliştirmenize ve takip etmenize yardımcı olmak için tasarlanmıştır. AI özellikleri sayesinde karakterinizi objektif bir şekilde değerlendirebilir ve iyileştirebilirsiniz.

**Keyifli roleplay'ler dileriz! 🎭**

---

*Son güncelleme: Kasım 2025*
*Versiyon: 1.3*
