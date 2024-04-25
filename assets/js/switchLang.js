// Fungsi untuk mengubah bahasa
function changeLanguage(lang, jsonData) {
  if (jsonData && jsonData[lang]) {
    // Ganti teks sesuai dengan bahasa yang dipilih
    const langData = jsonData[lang];
    for (let key in langData) {
      const element = document.querySelector("." + key);
      // Periksa apakah elemen dengan kelas yang sesuai ada di halaman HTML
      if (element) {
        element.textContent = langData[key];
      }
    }

    // Simpan preferensi bahasa ke localStorage
    localStorage.setItem("preferredLanguage", lang);
  }
}

// Fungsi untuk mendapatkan preferensi bahasa dari localStorage
function getPreferredLanguage() {
  const preferredLanguage = localStorage.getItem("preferredLanguage");
  // Periksa apakah nilai yang disimpan adalah null atau tidak
  if (preferredLanguage !== null) {
    return preferredLanguage; // Jika tidak null, kembalikan nilai tersebut
  } else {
    return "EN"; // Jika null, kembalikan default bahasa
  }
}

// Cek preferensi bahasa dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", async function () {
  const preferredLanguage = getPreferredLanguage();
  // Ubah bahasa sesuai dengan preferensi yang tersimpan
  try {
    const response = await fetch("assets/js/data_language.json");
    const jsonData = await response.json();
    // Ubah bahasa sesuai dengan preferensi yang tersimpan
    changeLanguage(preferredLanguage, jsonData);
    // Tambahkan kelas "active" pada item bahasa yang dipilih sebelumnya
    document
      .querySelector(`[data-lang="${preferredLanguage}"]`)
      .parentElement.classList.add("active");
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
});

// Tambahkan event listener pada setiap item bahasa
document.querySelectorAll(".language-list a").forEach((item) => {
  item.addEventListener("click", async function (event) {
    event.preventDefault();

    // Hapus kelas "active" dari semua item bahasa
    document.querySelectorAll(".language-list a").forEach((link) => {
      link.parentElement.classList.remove("active");
    });

    // Tambahkan kelas "active" pada item bahasa yang diklik
    this.parentElement.classList.add("active");

    const lang = this.getAttribute("data-lang");
    // Ubah bahasa
    try {
      const response = await fetch("assets/js/data_language.json");
      const jsonData = await response.json();
      // Ubah bahasa sesuai dengan preferensi yang tersimpan
      changeLanguage(lang, jsonData);
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  });
});
