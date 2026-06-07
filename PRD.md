---
tags: [project/captura, prd, frontend, nextjs]
date: 2026-06-02
status: living-document
parent: [[../PRD|Captura AI PRD]]
---

# Captura Frontend PRD

## 1. Ringkasan

Frontend Captura adalah pengalaman web utama untuk pengguna, fotografer, dan calon pembeli foto. Frontend harus membuat proses menemukan foto terasa mudah, visual, dan premium: pengguna mengingat lokasi, waktu, kendaraan, plat nomor, atau ciri pakaian; antarmuka membantu menerjemahkan ingatan itu menjadi pencarian yang jelas.

Frontend mengacu pada [[../PRD|Captura AI PRD]] sebagai konteks produk utama dan [[../DESIGN|Design System]] sebagai arahan visual.

## 2. Tujuan Frontend

- Menyediakan pengalaman discovery foto yang cepat dan mudah dipahami.
- Menampilkan hasil pencarian foto dengan konteks fotografer, lokasi, waktu, dan tingkat kecocokan.
- Menyediakan detail foto yang cukup untuk membantu pengguna membeli atau menyimpan foto.
- Menampilkan direktori fotografer dan area aktif mereka.
- Menyediakan checkout yang jelas untuk pembelian foto atau lisensi.
- Menjaga estetika Captura: editorial, hangat, premium, dan fokus pada fotografi.

## 3. Target Pengguna

## 3.1 Photo Seeker

Pengguna yang ingin menemukan foto berdasarkan:

- Lokasi dan waktu.
- Plat nomor kendaraan.
- Tipe kendaraan.
- Warna atau style pakaian.
- Deskripsi bebas tentang momen.

## 3.2 Photographer

Fotografer yang membutuhkan:

- Profil publik.
- Halaman portfolio atau directory listing.
- Upload workflow.
- Preview hasil AI metadata.

## 3.3 Buyer

Pengguna yang sudah menemukan foto dan ingin:

- Melihat detail lisensi.
- Memahami harga.
- Checkout dengan aman.
- Mendapat akses download setelah pembayaran.

## 4. Information Architecture

## 4.1 Navigasi Global

Navbar utama harus konsisten pada Home, Explorer, Explorer Detail, Photographers, Photographer Detail, dan Heatmap.

Menu utama:

- Home (`/`)
- Explorer (`/explorer`)
- Photographers (`/photographers`)
- Heatmap (`/hotspot`)

Checkout boleh menggunakan layout standalone karena memiliki progress checkout sendiri.

## 4.2 Route Map MVP

Keputusan IA per 2026-06-07:

- Public discovery: `/`, `/explorer`, `/explorer/[id]`, `/photographers`, `/photographers/[slug]`, `/hotspot`.
- Account buyer surface: `/account/profile`, `/account/library`.
- Checkout and orders: `/checkout`, `/checkout/success`. Route `/orders/[id]` disiapkan sebagai opsi backend-driven setelah order API tersedia, tetapi bukan route MVP phase 1.
- Photographer workspace: `/dashboard/photographer`, `/dashboard/photographer/uploads`, `/dashboard/photographer/moments`, `/dashboard/photographer/bookings`, `/dashboard/photographer/earnings`.
- Trust and support placeholders: `/support/removal`, `/support/payments`, `/support/orders/[id]`, `/privacy`, `/licenses`.
- AI Studio: `/studio` tetap standalone untuk MVP awal. Pada Phase 4, experience ini akan diputuskan ulang apakah menjadi alias/redirect ke `/dashboard/photographer/uploads` atau tetap menjadi lab-style AI surface.

## 4.3 Halaman Utama

## Home

Tujuan:

- Memperkenalkan Captura.
- Mengarahkan pengguna ke pencarian.
- Menjelaskan value platform secara visual.

Kebutuhan:

- Hero editorial.
- Search entry point.
- Showcase stories/moments.
- Photographer teaser.
- CTA untuk explorer atau onboarding fotografer.

## Explorer

Tujuan:

- Menjadi halaman utama pencarian foto.

Kebutuhan:

- Input pencarian natural language.
- Filter lokasi.
- Filter waktu.
- Filter kendaraan.
- Filter plat nomor.
- Filter ciri visual/person.
- Result grid.
- Match badge dan metadata ringkas.

## Explorer Detail

Tujuan:

- Menampilkan foto, metadata, cerita, lisensi, fotografer, dan opsi pembelian.

Kebutuhan:

- Gallery utama.
- Metadata lokasi/waktu.
- Deteksi AI atau visual tags.
- Informasi fotografer.
- License selector.
- CTA checkout.
- Similar moments.

## Photographers

Tujuan:

- Menampilkan direktori fotografer.
- Membantu pengguna memilih fotografer untuk sesi pribadi atau melihat portfolio.

Kebutuhan:

- Filter kota/area.
- Card fotografer.
- Rating dan statistik.
- Thumbnail portfolio.
- CTA view profile.
- CTA book session.

## Photographer Detail

Status: implemented for Phase 2.

Tujuan:

- Menampilkan profil lengkap fotografer.
- Menampilkan portfolio, area aktif, rate, dan booking.

Kebutuhan:

- Bio dan wilayah operasi.
- Portfolio grid.
- Schedule/session packages.
- Reviews/testimonials.
- Link ke foto yang pernah diunggah.
- Link dari directory card ke `/photographers/[slug]`.
- CTA booking menuju section package/detail profile.
- CTA menuju Explorer dengan filter fotografer terkait.

## Heatmap / Hotspot

Tujuan:

- Menampilkan area aktif fotografer dan lokasi dengan banyak foto.

Kebutuhan:

- Map interaktif.
- Hotspot markers.
- Feed moment terkait area.
- Photographer activity.
- Filter kota atau periode waktu.

## Checkout

Tujuan:

- Menyelesaikan pembelian foto atau lisensi.

Kebutuhan:

- Contact info.
- Payment method.
- Order summary.
- Promo code.
- Trust markers.
- Clear total.
- Payment CTA.

Checkout harus mempertahankan nav progres sendiri dan tidak wajib memakai navbar global.

## Checkout Success

Status: implemented for Phase 1.

Tujuan:

- Menutup payment journey dengan konfirmasi success, pending, dan failed.
- Mengarahkan user ke library, retry checkout, atau support sesuai status pembayaran.
- Menyimpan struktur order summary agar siap menerima order id dari backend.

Route final MVP:

- `/checkout/success`

## Account Profile

Status: implemented for Phase 1.

Tujuan:

- Menjadi account surface untuk identitas user, preferensi pencarian, privacy settings, linked accounts, dan support shortcuts.

Route final MVP:

- `/account/profile`

## Account Library

Status: implemented for Phase 1.

Tujuan:

- Menampilkan purchased moments, license info, invoice link, download CTA, dan status order/download.

Route final MVP:

- `/account/library`

## 5. UX Requirements

## 5.1 Search Experience

- Pengguna harus dapat mulai dari input bebas atau filter terstruktur.
- Filter aktif harus terlihat jelas.
- Hasil pencarian harus mudah discan.
- Empty state harus memberi saran filter atau parameter lain.
- Pengguna harus bisa berpindah dari hasil ke detail dengan cepat.

## 5.2 Visual Match Feedback

Frontend harus dapat menampilkan:

- Match score.
- Partial match label.
- Plate partial/fuzzy indicator.
- Vehicle type.
- Scene or style tags.
- Location and time metadata.

## 5.3 Photographer Experience

- Card fotografer harus menonjolkan nama, area, spesialisasi, rating, portfolio mini, dan CTA.
- Profil fotografer harus terasa seperti portfolio editorial, bukan tabel admin.

## 5.4 Checkout Experience

- Total harga harus selalu jelas.
- Payment method aktif harus jelas.
- CTA payment harus memiliki kontras tinggi.
- Promo code harus memberi feedback setelah applied.
- Trust markers tidak boleh mengganggu fokus utama checkout.

## 6. Design Requirements

Frontend harus mengikuti [[../DESIGN|Design System]].

Prinsip visual:

- Background warm paper.
- Serif untuk headline besar.
- Sans untuk body dan button.
- Mono untuk metadata dan label.
- Border halus dan struktur editorial.
- Foto menjadi elemen visual utama.
- Hindari UI yang terasa terlalu SaaS dashboard untuk halaman publik.

## 7. Data Dependencies

Frontend membutuhkan API dari [[../backend/PRD|Backend PRD]]:

- Authentication session.
- Moments list/search.
- Moment detail.
- Photographer list.
- Photographer detail.
- Hotspot data.
- License types.
- Checkout/order.
- Download access.

Frontend membutuhkan hasil AI yang sudah dipersist oleh backend:

- Vehicle type.
- Plate OCR result.
- Visual tags.
- Embedding/search match.
- Confidence score.

## 8. Architecture Requirements

Frontend saat ini menggunakan Next.js dengan struktur:

- `src/app` untuk routing.
- `src/domains` untuk entity dan service content/domain.
- `src/application` untuk use case.
- `src/infrastructure` untuk repository/API.
- `src/presentation` untuk UI components dan feature views.

Aturan pengembangan:

- Ikuti pola domain/application/presentation yang sudah ada.
- Halaman publik utama sebaiknya menggunakan global `Header` dan `Footer`.
- Checkout dapat menggunakan standalone layout.
- Gunakan design token global dari `globals.css`.
- Hindari style yang terlalu tersebar jika bisa dinyatakan dengan Tailwind utility sesuai pola existing.
- Jika CSS Module dipakai untuk halaman prototype, pastikan scope jelas dan tidak bertabrakan dengan reset/global style.

## 9. MVP Acceptance Criteria

- Home mengarahkan pengguna ke Explorer.
- Explorer dapat menampilkan search UI dan result grid.
- Explorer Detail menampilkan foto, metadata, license, dan CTA.
- Photographers menampilkan directory dan CTA yang terbaca jelas.
- Heatmap menampilkan hotspot visual.
- Checkout menampilkan order summary, payment method, dan CTA dengan kontras benar.
- Navbar global konsisten di halaman non-checkout.
- Halaman responsive di desktop dan mobile.

## 10. Open Questions

- Apakah Photographer Detail menjadi prioritas sebelum upload workflow?
- Apakah upload fotografer akan dibangun di frontend utama atau dashboard terpisah?
- Apakah user bisa membeli foto tanpa login?
- Apakah pencarian plat nomor harus ditampilkan sebagai masked text di UI publik?
- Apakah heatmap akan berbasis foto tersedia atau jadwal fotografer aktif?
