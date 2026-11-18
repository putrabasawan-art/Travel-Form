// Langkah 1 : Ambil elemen HTML yang akan di pakai
// ==========================================================================

const bagianForm = document.getElementById("bagianForm");
const formBooking = document.getElementById("formBooking");
const bagianInvoice = document.getElementById("bagianInvoice");
const pesanError = document.getElementById("pesanError");

// Ambil inputan dari form
const inputNama = document.getElementById("nama");
const inputPaket = document.getElementById("paket");
const inputJumlah = document.getElementById("jumlah");
const inputBerangkat = document.getElementById("berangkat");


// Data paket wisata
const dataPaket = {
  "Bali Escape": { durasi: "3 Hari 2 Malam", malam: 2, harga: 2450000 },
  "Bromo Sunrise Trip": { durasi: "2 Hari 1 Malam", malam: 1, harga: 1350000 },
  "Raja Ampat": { durasi: "4 Hari 3 Malam", malam: 3, harga: 5750000 },
  "Labuan Bajo Explorer": {
    durasi: "3 Hari 2 Malam",
    malam: 2,
    harga: 3950000,
  },
};

// Langkah 2 : formatting
// =========================================================
// Mengubah angka 2450000 menjadi "Rp 2.450.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// Mengubah tanggal (objek Date) menjadi teks "20 November 2026"
function formatTanggal(tanggal) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Langkah 3 : perintah saat form di submit
// ======================================================

formBooking.addEventListener("submit", function (event) {
  // Cegah halaman reload (kebiasaan bawaan form adalah reload)
  event.preventDefault();

  // mengambil isi setiap form
  const nama = inputNama.value;
  const paket = inputPaket.value;
  const jumlahInput = inputJumlah.value;
  const berangkat = inputBerangkat.value;

  // Validasi form
  // semua pesan error dikumpulkan di dalam array ini
  const daftarError = [];
  pesanError.classList.add("d-none");

  // 1. Nama : tidak boleh kosong, min 3 karakter
  if (nama === "") {
    daftarError.push("Nama pemesan wajib diisi !");
  } else if (nama.length < 3) {
    daftarError.push("Nama pemesan minimal 3 karakter !");
  }

  // 2. Paket tidak boleh kosong
  if (paket === "") {
    daftarError.push("Paket wisata wajib dipilih !");
  }

  // 3. Jumlah orang minimal 1 dan maksimal 20
  if (jumlahInput === "") {
    daftarError.push("Jumlah orang wajib diisi !");
  } else {
    const jumlah = Number(jumlahInput);
    if (jumlah < 1) {
      daftarError.push("Jumlah orang minimal 1 !");
    } else if (jumlah > 20) {
      daftarError.push("Jumlah orang maksimal 20 !");
    }
  }

  if (berangkat === "") {
    daftarError.push("Tanggal berangkat wajib diisi !");
  }else if (tglBerangkat < hariIni) {
    daftarError.push("Tanggal berangkat tidak boleh sebelum hari ini.")
  }

  if (daftarError.length > 0) {
    pesanError.innerHTML = daftarError.join("<br>");
    pesanError.classList.remove("d-none");
    return; // berhenti disini, dan invoice tidak ditampilkan
  }

  //mengubah String "2026-11-18" menjadi objek Date JavaScript.
  //Dengan bagitu, kita bisa melakukan operasi tanggal
  const tglBerangkat = new Date(berangkat);

  //Tanggal hari ini (jamnya dibuang, sisanya tanggal saja)
  const hariIni = new Date();
  hariIni.setHours(0,0,0,0)
});
const detail = dataPaket(paket);

const total = detail.harga * jumlah;

document.getElementById("outNama").textContent = nama
document.getElementById("outPaket").textContent = paket


document.getElementById("outDurasi").textContent = detail.durasi;

bagianForm.classList.add("d-none");
