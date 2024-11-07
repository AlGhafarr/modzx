// Pilih semua gambar untuk box-group
const images = document.querySelectorAll('.box-group img');

// Array untuk menyimpan URL gambar latar belakang
const backgrounds = [
    'url(asset/1.bc.png)', // Ganti dengan path gambar 1
    'url(asset/2.bc.png)', // Ganti dengan path gambar 2
    'url(asset/3.bc.png)', // Ganti dengan path gambar 3
    'url(asset/4.bc.png)', // Ganti dengan path gambar 4
    'url(asset/5.bc.png)', // Ganti dengan path gambar 5
];

// Array untuk menyimpan teks artikel untuk setiap gambar
const articles = [
    'Ini adalah artikel untuk gambar 1.',
    'Ini adalah artikel untuk gambar 2.',
    'Ini adalah artikel untuk gambar 3.',
    'Ini adalah artikel untuk gambar 4.',
    'Ini adalah artikel untuk gambar 5.',
];

// Ambil elemen untuk teks artikel
const articleText = document.getElementById('articleText');

// Tambahkan event listener untuk setiap gambar dalam box-group
images.forEach((image, index) => {
    image.addEventListener('click', function() {
        // Hapus kelas 'selected' dari semua gambar
        images.forEach(img => img.classList.remove('selected'));
        
        // Tambahkan kelas 'selected' pada gambar yang diklik
        image.classList.add('selected');

        // Pindahkan gambar yang dipilih ke tengah
        const parent = image.parentNode;

        // Ambil semua gambar dan konversi ke array
        const imagesArray = Array.from(images);

        // Hapus gambar yang dipilih dari array
        imagesArray.splice(index, 1);

        // Buat urutan gambar baru dengan gambar yang dipilih di tengah
        const newOrder = [
            imagesArray[0],
            imagesArray[1],
            image,
            imagesArray[2],
            imagesArray[3]
        ].filter(Boolean); // Pastikan tidak ada elemen yang undefined

        // Kosongkan elemen box-group
        parent.innerHTML = '';

        // Tambahkan gambar dalam urutan baru
        newOrder.forEach(img => parent.appendChild(img));

        // Ubah background pada section.main-content dengan efek transisi
        const mainContent = document.querySelector('.main-content');
        mainContent.style.transition = 'background 0.5s ease'; // Efek transisi
        mainContent.style.background = `${backgrounds[index]} no-repeat center center`;
        mainContent.style.backgroundSize = 'cover'; // Memastikan background memenuhi lebar perangkat

        // Tampilkan artikel yang sesuai dengan efek transisi
        articleText.style.transition = 'opacity 0.5s ease'; // Efek transisi pada teks
        articleText.style.opacity = 0; // Mulai dari tidak terlihat
        setTimeout(() => {
            articleText.textContent = articles[index];
            articleText.style.opacity = 1; // Tampilkan artikel
        }, 500); // Tunggu sampai background diubah
    });
});

// Script untuk hamburger menu dan sidebar
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');

// Event untuk membuka sidebar ketika hamburger ditekan
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Fungsi untuk mengganti gambar portofolio secara otomatis
let currentIndex = 0;
const portfolioImages = document.querySelectorAll('.portfolio-image');
const portfolioCaptions = document.querySelectorAll('.portfolio-caption');

// Mengatur semua gambar untuk disembunyikan kecuali gambar pertama
portfolioImages.forEach((img, index) => {
    img.style.display = index === 0 ? 'block' : 'none';
    portfolioCaptions[index].style.display = index === 0 ? 'block' : 'none'; // Sinkronisasi teks dengan gambar
});

// Fungsi untuk mengubah gambar portofolio
function changePortfolioImage() {   
    // Sembunyikan gambar dan teks saat ini
    portfolioImages[currentIndex].style.display = 'none';
    portfolioCaptions[currentIndex].style.display = 'none';

    // Perbarui indeks gambar yang akan ditampilkan
    currentIndex = (currentIndex + 1) % portfolioImages.length;

    // Tampilkan gambar dan teks berikutnya
    portfolioImages[currentIndex].style.display = 'block';
    portfolioCaptions[currentIndex].style.display = 'block';
}

// Mengganti gambar setiap 3 detik
setInterval(changePortfolioImage, 1750);

// Inisialisasi gambar dan caption pertama
portfolioImages[currentIndex].style.display = 'block';
portfolioCaptions[currentIndex].style.display = 'block';
