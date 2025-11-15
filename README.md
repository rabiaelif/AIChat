# ChatMood: Duygu Analizli Gerçek Zamanlı Sohbet Uygulaması

Bu proje, React (Frontend) ve .NET Core (Backend) teknolojileriyle geliştirilmiş, mesajların gönderilmeden önce Hugging Face API aracılığıyla duygu analizinden geçirildiği basit bir gerçek zamanlı sohbet arayüzüdür.

##  Canlı Bağlantılar

-  **Frontend (Vercel):** [https://ai-chat-dusky-eight.vercel.app](https://ai-chat-dusky-eight.vercel.app)  
-  **Backend (Render):** [[https://aichat-backend-gvor.onrender.com/messages](https://aichat-backend-gvor.onrender.com/messages)

## Özellikler

Gerçek Zamanlı Sohbet: İki kullanıcı (Ceren ve Selim) arasında mesajlaşma.

Kullanıcı Değiştirme: Arayüz üzerinden aktif konuşmacıyı anında değiştirme.

Duygu Analizi: Her mesaj için Hugging Face API aracılığıyla AI tabanlı duygu (Positive, Negative, Neutral) tespiti.

Duygu İstatistikleri: Yan panelde anlık sohbetin duygusal dağılımını gösteren yüzdelik grafikler.

Modern Teknolojiler: React Hooks, TailwindCSS ile duyarlı (responsive) tasarım, ASP.NET Core Web API ve SQLite veritabanı.

## Kullanılan Teknolojiler

### Frontend

React

Tailwind CSS

Axios / Fetch API

Vercel (Frontend Hosting)

### Backend

 .NET Core 9 Web API

 SQLite (Entity Framework Core ile)

 Render.com (Backend Hosting)

 Hugging Face API (Duygu Analizi Servisi)

## Projeyi Yerel Olarak Kurulum
### Backend Kurulumu (.NET Core)
```bash
(# Proje dizinine gidin
cd Backend

# Gerekli paketleri yükleyin
dotnet restore

# Veritabanını oluşturun
dotnet tool install --global dotnet-ef
dotnet ef database update

# Uygulamayı çalıştırın
dotnet run
```
Not: Backend Render üzerinde barındırıldığı için yerelde çalıştırmak zorunlu değildir, ancak debug etmek isterseniz bu adımlar gereklidir.

### Frontend Kurulumu (React)
```bash

Frontend klasörüne gidin
cd frontend

Bağımlılıkları yükleyin
npm install

```
src/App.jsx dosyasındaki API_BASE_URL değişkeninin doğru adrese işaret ettiğinden emin olun:

const API_BASE_URL = "https://aichat-backend-gvor.onrender.com";


Ardından uygulamayı başlatın:
```bash

npm run dev
```

Tarayıcı otomatik olarak http://localhost:5173/ adresinde açılacaktır.

### API Entegrasyonu

## Duygu analizi backend tarafından şu akışta yönetilir:

Frontend mesajı (text) backend'e gönderir.

Backend, mesajı Hugging Face API’sine iletir.

Model, mesajın duygusunu (positive, neutral, negative) döndürür.

Backend sonucu SQLite veritabanına kaydeder.

Mesaj verisi sentiment sonucu ile birlikte frontend’e geri gönderilir.

Bu sayede her mesaj hem saklanır hem analiz edilir hem de kullanıcıya anlık olarak gösterilir.

## Kullanıcı Geçişi: 
Ceren veya Selim olarak geçiş yapabilirsiniz.
Yalnızca seçilen kullanıcının ve karşı tarafın mesajları görünür.
Farklı kullanıcıya geçiş yaptığınızda, aynı sohbet geçmişi karşı tarafın bakış açısından görüntülenir.
Bu sayede sohbet akışı değişmez, sadece “konuşmacı perspektifi” değişir.

NOT: Render Backend 15 dakika hareketsiz kalırsa “sleep mode”a geçer.
İlk istekte 15–30 saniye kadar bekleyin veya sayfayı yenileyin.
