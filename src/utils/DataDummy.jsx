// 1. KATEGORI BERBENTUK OBJEK (Sesuai arsitektur asli aplikasi lu)
export const SEED_CATEGORIES = [
  {
    name: "Metode Pedigree",
    theme: "danger",
    iconName: "tag", 
    variant: "outline-danger",
    text: "text-danger"
  },
  {
    name: "Multiplikasi Benih CMS",
    theme: "success",
    iconName: "camera",
    variant: "outline-success",
    text: "text-success"
  },
  {
    name: "Analisis AgriPOP",
    theme: "info",
    iconName: "globe",
    variant: "outline-info",
    text: "text-info"
  }
];

// 2. DATA CATATAN DUMMY (Properti 'date' diganti jadi 'timeAndDate')
export const DATADUMMY = [
  {
    id: "seed-1",
    title: "148 Galur kombinasi F5-F6",
    category: "Metode Pedigree",
    theme: "danger", 
    timeAndDate: "2018-05-19", 
    description: `### Seleksi Galur Potensial F5-F6(Pedigree Method)
- **Kriteria Seleksi**: Malai panjang, pengisian bulir ≥80%, tahan hama dan penyakit.  
- **Tanggal Tanam**: 17 Mei 2018
- **Jarak Tanam**: 20 x 20xm(Internal Plot) | Jarak antar galur: 0.5 x 0.5m. 
- **Umur Bibit**: 21 hari HSS (Hari Setelah Semai).
- **Sistem Pengairan**: Intermittent irrigation (pengairan berselang)
- **Tujuan**: 1. Mendapatkan galur murni(*pure lines*) homozigot yang stabil dan seragam sebagai kandidat varietas inbrida baru. 2. Sebagai komponen tetua persilangan hibrida baru.   

#### Parameter Evaluasi Lapangan:
1. [ ] **Fase Vegetatif**: Keseragaman tinggi tanaman dan tipe simetri rumpun.
2. [ ] **Fase Generatif**: Sinkronisasi keluar malai (*heading date*) dan tingkat sterilitas.
3. [ ] **Fase Masak**: Uji *shattering* (kemudahan rontok bulir) saat panen.

#### Dokumentasi Lapangan:
<img src="https://www.dropbox.com/scl/fi/vzmklm74gao0hcp64xvtf/20150818_150408.jpg?rlkey=tzdzpk8ij1b55pg3nknvs4zws&st=kq7db7c4&raw=1" style="max-width: 100%; height: auto; display: block; margin: 10px auto;"/>
*(Evaluasi visual populasi tanaman: Pengamatan keseragaman tinggi rumpun dan arsitektur anakan galur F5-F6 di plot penelitian)*`
  },
  {
    id: "seed-2",
    title: "Multiplikasi Benih CMS A-15 & A-56",
    category: "Multiplikasi Benih CMS",
    theme: "success", 
    timeAndDate: "2018-06-05", // Menyesuaikan timeline riset historis lu
    description: `### Produksi & Maintenance Benih Sumber CMS (Line A)
- **Lokasi Riset**: 
  1. Blok Pabuaran, Subang (CMS A-15 & CMS A-56 | Luas: @500 m²)
  2. Blok Tanjungan, Lampung (CMS A-15 Only | Luas: 900 m²)
- **Metode Sinkronisasi**: Selisih waktu semai (*seeding interval*) antara CMS (Line A) dengan Maintainer (Line B) adalah 3 dan 5 hari.
- **Rasio Baris (A:B)**: 1:4 (1 Baris Maintainer : 4 Baris CMS).
- **Spasasi & Populasi**: Jarak tanam 20cm x 20cm | 1 bibit per lubang tanam (*single seedling per hill*).
- **Strategi Roguing**: *Tanpa aplikasi hormon GA3 (Gibberellic Acid)* untuk menciptakan perbedaan tinggi tanaman secara alami, mempermudah eliminasi tanaman menyimpang (*off-types*).

#### Log Pengamatan Lapangan & Checklist:
1. [ ] **Sinkronisasi Heading**: Cek inisiasi primordia bunga untuk memastikan *flowering time* Line A dan Line B bertemu (*overlap*).
2. [ ] **Fase Roguing I (Vegetatif Maksimum)**: Eliminasi tanaman yang memiliki warna pelepah atau vigor menyimpang di baris CMS.
3. [ ] **Fase Roguing II (Flowering)**: Cek sterilitas polen pada jepitan malai CMS (bunga harus 100% steril jantan).

#### Dokumentasi Lapangan:
<img src="https://www.dropbox.com/scl/fi/yg0sd0b2wuh96ba8f9gzr/DSC_0268.JPG?rlkey=lenk4yfx6tdyl7gfrryqu2q3u&st=k2hz7cw5&raw=1" style="max-width: 100%; height: auto; display: block; margin: 10px auto;"/>
*(Layout pertanaman metode blok isolasi plot tanaman untuk multiplikasi galur steril jantan CMS Line A serta metode pengeprakan->supplementary pollination sebagai upaya pelepasan poleh maintener secara masif pada baris CMS.)*`
  },
 {
    id: "seed-3",
    title: "Proyeksi Populasi & Sertifikasi Benih SS",
    category: "Analisis AgriPOP",
    theme: "info", 
    timeAndDate: "2018-07-12", // Timeline fase generatif/pemeriksaan lapang BPSB
    description: `### Analisis Stand Populasi & Validasi Lapang BPSB
- **Komoditas**: Padi Inbrida Sawah Inpari 33 (Target Sertifikasi Benih Pokok / *Stock Seed* Label Ungu).
- **Agenda**: Pemeriksaan lapang Fase Generatif (Keluar Malai/Masak Masak) oleh Tim Inspektor BPSB untuk memverifikasi tingkat kemurnian varietas (*varietal purity*) dan persentase campuran varietas lain (CVL).
- **Parameter Input AgriPOP**:
  - **Nama Blok**: C_PADI
  - **Jarak Tanam**: 25cm x 25cm (Legowo / Tegel Standar)
  - **Jumlah Bibit per Lubang**: 2 batang
  - **Daya Berkecambah (Germination Rate)**: 99% (Berdasarkan uji laboratorium benih sumber).
- **Tujuan**: Melakukan kalkulasi *Pop-gap* dan memproyeksikan kebutuhan benih sisipan (*Risk Mitigation Buffer*) guna mengunci target populasi ideal 320.000 tanaman/ha demi memenuhi kuota tonase sertifikasi.

#### Eksekusi Analitik Data:
- [ ] Buka Kalkulator Populasi Digital: [Jalankan Modul AgriPop v2](https://agripop-v2.netlify.app)
- [ ] Ekspor Summary Report (Format PDF) untuk dilampirkan pada Dokumen Pengajuan Sertifikasi Akhir BPSB.

#### Dokumentasi Lapangan:
<img src="https://www.dropbox.com/scl/fi/1yiy3ke5jxv4zhnp9xzg4/Pengawasan-BPSB.jpg?rlkey=1qszibiv15vm3w3msodvnagb7&st=nyjmk8qs&raw=1" style="max-width: 100%; height: auto; display: block; margin: 10px auto;"/>
*Pemeriksaan lapang oleh tim inspeksi BPSB untuk validasi kemurnian galur dan perhitungan sampel populasi riil sebelum rilis label ungu.*`
  }
];