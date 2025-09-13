# 🚀 Speedtest Web App

Web ini adalah aplikasi **Speedtest** sederhana berbasis **Flask (Python)** + **HTML/JS (Frontend)** yang bisa mengukur:

- **Ping (ms)**
- **Kecepatan Download (Mbps & MB/s)**
- **Kecepatan Upload (Mbps & MB/s)**
- **Informasi Provider (ISP & Server uji)**

---

## 🎯 Fungsi Web
1. **Tes Ping**
   - Mengukur seberapa cepat koneksi internet merespons permintaan (dalam milidetik).
   - Ping rendah → koneksi lebih responsif (penting buat gaming / meeting online).

2. **Tes Download**
   - Mengukur kecepatan unduh data dari server ke perangkat.
   - Ditampilkan dalam **Mbps** (megabit per detik) dan juga dikonversi ke **MB/s** (megabyte per detik) biar lebih gampang dibandingkan sama kecepatan unduh di aplikasi seperti Steam, Epic Games, atau browser.

3. **Tes Upload**
   - Mengukur kecepatan unggah data dari perangkat ke server.
   - Cocok buat tahu performa saat upload file besar, streaming, atau video call.

4. **Deteksi Provider (ISP)**
   - Menampilkan informasi tentang **ISP** yang digunakan, termasuk nama provider, lokasi server, dan sponsor server uji.

---

## 📏 Kenapa Ada Konversi Mbps → MB/s?
- **Speedtest** umumnya menampilkan hasil dalam **Mbps (megabit per second)**.  
- Tapi aplikasi download (misalnya Steam, Epic, Google Drive) biasanya menampilkan dalam **MB/s (megabyte per second)**.  

> **1 Byte = 8 bit**  
> Jadi untuk mengonversi:  
> ```
> 1 Mbps ≈ 0.125 MB/s
> 100 Mbps ≈ 12.5 MB/s
> ```

Contoh:  
- Hasil Speedtest: **100 Mbps**  
- Kecepatan unduh di Steam: **12–13 MB/s** → ini wajar, karena sudah dikonversi.

---

## 🤔 Kenapa Kecepatan Download File/Game Tidak Sama Dengan Hasil Speedtest?
Ada beberapa alasan kenapa kecepatan unduh yang lo lihat di aplikasi/game kadang lebih rendah dari hasil speedtest:

1. **Satuan Berbeda**
   - Speedtest pakai **Mbps**, aplikasi unduh biasanya pakai **MB/s**.
   - Tanpa konversi, keliatan lebih kecil padahal sama aja.

2. **Server Sumber File**
   - Speedtest pakai server khusus yang dekat & dioptimalkan.
   - Server game (Steam/Epic/Origin) mungkin jauh, penuh, atau ada limit bandwidth.

3. **Kualitas Jaringan**
   - Latensi tinggi, packet loss, atau jalur koneksi yang padat bisa bikin speed unduh real lebih rendah.

4. **Batasan dari Aplikasi**
   - Beberapa aplikasi/game kadang **membatasi kecepatan unduh** biar server mereka stabil.

5. **Kondisi Lokal**
   - Kalau ada banyak device lain yang juga pakai internet (streaming, upload, download), kecepatan unduh akan terbagi.

---