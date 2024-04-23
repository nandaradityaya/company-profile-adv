let jsonData;

// Ambil data JSON
fetch("assets/js/data_language.json")
  .then((response) => response.json())
  .then((data) => {
    jsonData = data;
  });

document.querySelectorAll(".language-list a").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();

    // Hapus kelas "active" dari semua item bahasa
    document.querySelectorAll(".language-list a").forEach((link) => {
      link.parentElement.classList.remove("active");
    });

    // Tambahkan kelas "active" pada item bahasa yang diklik
    this.parentElement.classList.add("active");

    const lang = this.getAttribute("data-lang");
    if (jsonData && jsonData[lang]) {
      // Ganti teks sesuai dengan bahasa yang dipilih
      const langData = jsonData[lang];
      for (let key in langData) {
        document.querySelector("." + key).textContent = langData[key];
      }
    }
  });
});
