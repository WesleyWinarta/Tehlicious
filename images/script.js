let cart = [];

function updateQuantity(id, change) {
    const qtyElement = document.getElementById(`${id}-qty`);
    let qty = parseInt(qtyElement.innerText);
    qty += change;
    if (qty < 0) qty = 0;
    qtyElement.innerText = qty;
}

function addToCart(name, price, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).innerText);
    if (qty > 0) {
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ name, price, qty });
        }
        updateCartDisplay();
        document.getElementById(qtyId).innerText = 0; // reset jumlah di UI
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");

        const itemText = document.createElement("span");
        itemText.textContent = `${item.name} x ${item.qty} = Rp ${item.qty * item.price}`;

        const btnKurangi = document.createElement("button");
        btnKurangi.textContent = " - ";
        btnKurangi.className = "btn-kurangi";
        btnKurangi.onclick = () => {
            item.qty--;
            if (item.qty <= 0) {
                cart.splice(index, 1);
            }
            updateCartDisplay();
        };

        li.appendChild(itemText);
        li.appendChild(btnKurangi);
        li.classList.add("cart-item-animate");
        cartItems.appendChild(li);

        total += item.qty * item.price;
    });

    cartTotal.innerText = total;

    cartTotal.classList.add("cart-total-animate");
    setTimeout(() => {
        cartTotal.classList.remove("cart-total-animate");
    }, 500);
}

function checkout() {
    if (cart.length === 0) {
        alert("Keranjang kosong! Silakan pilih produk terlebih dahulu.");
        return;
    }

    const confirmed = confirm("Apakah pesanan Anda sudah benar? Pesanan yang sudah dikonfirmasi tidak dapat dibatalkan.");
    if (!confirmed) return;

    const namaPelanggan = prompt("Masukkan nama Anda:");
    if (!namaPelanggan || namaPelanggan.trim() === "") {
        alert("Nama wajib diisi untuk melanjutkan pesanan.");
        return;
    }

    const metode = prompt("Pilih metode pembayaran:\n1. Bayar di Tempat\n2. Transfer ke Rekening", "1");
    let metodePembayaran = "";

    if (metode === "1") {
        metodePembayaran = "Bayar di Tempat";
        kirimPesanWhatsApp(metodePembayaran, namaPelanggan);
    } else if (metode === "2") {
        metodePembayaran = "Transfer ke Rekening (BCA Michael Antonio 8325125949 a.n. Makanan Ringan)";
        alert("Silakan transfer ke:\nBCA Michael Antonio 8325125949 a.n. Makanan Ringan\nSetelah transfer, kirim bukti ke WhatsApp.");
        const lanjut = confirm("Apakah kamu sudah melakukan transfer?");
        if (lanjut) {
            kirimPesanWhatsApp(metodePembayaran, namaPelanggan);
        } else {
            alert("Transaksi dibatalkan karena belum ada konfirmasi transfer.");
        }
    } else {
        alert("Metode pembayaran tidak valid!");
        return;
    }
}

function kirimPesanWhatsApp(metodePembayaran, namaPelanggan) {
    let message = `*Pesanan Baru!*\n`;
    message += `*Nama:* ${namaPelanggan}\n\n`;

    let total = 0;
    cart.forEach(item => {
        message += `• ${item.name} x ${item.qty} = Rp ${item.qty * item.price}\n`;
        total += item.qty * item.price;
    });

    message += `\n*Total: Rp ${total}*`;
    message += `\n*Metode Pembayaran:* ${metodePembayaran}`;
    message += `\n\nTerima kasih telah memesan!`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "6281338059679"; // Ubah sesuai nomor WA
    const waURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(waURL, '_blank');
}

// Efek Ripple Opsional
document.querySelectorAll('.btn-add, .btn-checkout').forEach(button => {
    button.addEventListener('click', function (e) {
        const circle = document.createElement('span');
        circle.classList.add('ripple-effect');
        const rect = this.getBoundingClientRect();
        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top = `${e.clientY - rect.top}px`;
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });
});
