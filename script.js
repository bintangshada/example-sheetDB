// GANTI DENGAN URL SHEETDB MILIK SI ANAK
const API_URL = 'https://sheetdb.io/api/v1/{API_KEY}'; 

function ambilData() {
    const wadahCard = document.getElementById('daftarCard');
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            wadahCard.innerHTML = ''; // Kosongkan teks "Memuat..."

            // Cek kalau belum ada data di Sheets
            if(data.length === 0) {
                wadahCard.innerHTML = '<p>Belum ada tiket yang dibooking.</p>';
                return;
            }

            // Looping data dan buatkan elemen Card HTML
            data.forEach(tiket => {
                const cardHTML = `
                    <div class="card">
                        <h3>👤 ${tiket.Nama}</h3>
                        <span class="destinasi">📍 ${tiket.Destinasi}</span>
                    </div>
                `;
                wadahCard.innerHTML += cardHTML;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            wadahCard.innerHTML = '<p style="color:red;">Gagal memuat data.</p>';
        });
}

// Hanya jalankan ambilData & event form jika ada di halaman booking.html
const form = document.getElementById('formTiket');
if (form) {
    ambilData(); // Panggil saat web diload

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const btn = document.getElementById('btnSubmit');
        btn.innerText = "Memproses...";

        const dataBaru = {
            Nama: document.getElementById('nama').value,
            Destinasi: document.getElementById('destinasi').value
        };

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [dataBaru] })
        })
        .then(response => response.json())
        .then(data => {
            alert('Booking Sukses!');
            form.reset(); 
            btn.innerText = "Konfirmasi Booking"; 
            ambilData(); // Render ulang card-nya
        })
        .catch(error => {
            alert('Gagal booking tiket!');
            btn.innerText = "Konfirmasi Booking";
        });
    });
}
