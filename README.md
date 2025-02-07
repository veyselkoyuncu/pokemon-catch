# Pokemon Catch 🎮

Pokémon dünyasına adım atın ve favori Pokémonlarınızı yakalayarak koleksiyonunuzu genişletin! Bu proje, **Next.js 14**, **TypeScript**, **GraphQL**, **Ant Design**, ve **Next-Auth** kullanılarak geliştirilmiştir.

---

## 🛠 Proje Kurulumu

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/kullaniciadi/pokemon-catch.git
cd pokemon-catch
```

### 2. Gerekli Paketleri Yükleyin

```bash
npm install
# veya
yarn install
```

### 3. Ortam Değişkenlerini Ayarlayın

Proje kök dizininde bir `.env.local` dosyası oluşturun ve gerekli API anahtarlarını ve ayarları ekleyin:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=SECRET_KEY
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
```

### 4. Geliştirme Sunucusunu Çalıştırın

```bash
npm run dev
# veya
yarn dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

---

## 🚀 Proje Özellikleri

- **Pokémon Yakalama:** Pokémon listesinde gezinip yakalama butonuyla koleksiyonunuza Pokémon ekleyin.
- **Giriş Sistemi:** **GitHub OAuth** ile giriş yaparak yakaladığınız Pokémonları profil sayfanızda görüntüleyin.
- **Dil Desteği:** **Türkçe ve İngilizce** dil seçenekleri arasında geçiş yapabilirsiniz.
- **Responsive Tasarım:** Farklı cihazlar için optimize edilmiş bir tasarım.

---

## 📚 Kullanılan Teknolojiler

- **[Next.js](https://nextjs.org/)** - React tabanlı framework
- **[React](https://reactjs.org/)** - Kullanıcı arayüzü kütüphanesi
- **[TypeScript](https://www.typescriptlang.org/)** - Tip güvenliği ve daha güçlü kod yazımı
- **[GraphQL](https://graphql.org/)** - API veri sorgulama dili
- **[Ant Design](https://ant.design/)** - UI bileşen kütüphanesi
- **[Next-Auth](https://next-auth.js.org/)** - Kimlik doğrulama kütüphanesi
- **[Framer Motion](https://www.framer.com/motion/)** - Animasyonlar

---

## 🐂 Proje Yapısı

```
/app
  └── /[locale]         - Dil bazlı yönlendirmeler ve sayfalar
/components             - Reusable React bileşenleri
/context                - Global state ve context yönetimi
/messages               - Çeviri dosyaları
/public                 - Genel erişilebilir dosyalar (görseller vb.)
```

---

## 📑 Temel Komutlar

| Komut           | Açıklama                             |
| --------------- | ------------------------------------ |
| `npm run dev`   | Geliştirme sunucusunu başlatır       |
| `npm run build` | Üretim için projeyi derler           |
| `npm start`     | Üretim modunda uygulamayı çalıştırır |
| `npm run lint`  | Kod kalitesini kontrol eder          |

---

## 📖 Çeviri Yapısı

Proje, farklı dillerde destek sağlamak için **next-intl** kullanmaktadır. Dil dosyaları `messages/` dizininde saklanır. Örneğin:

- `messages/en.json`
- `messages/tr.json`

Çeviriler, bileşenlerde `useTranslations` kullanılarak dinamik olarak çekilir:

```tsx
const t = useTranslations("common");
<p>{t("title")}</p>
```

---

## ✨ Gelecekteki Geliştirmeler

- &#x20;Yakalanan Pokémonlar için filtreleme ve sıralama

  &#x20;Detaylı Pokémon istatistikleri

  &#x20;Daha fazla sosyal medya giriş seçeneği

---

## 🤝 Katkıda Bulunma

Katkıda bulunmak için bir **pull request** açabilir veya önerilerinizi **issue** olarak paylaşabilirsiniz.

---

## 📙 Lisans

Bu proje MIT lisansı ile lisanslanmıştır.

---

**Pokémon dünyasında iyi eğlenceler!**

