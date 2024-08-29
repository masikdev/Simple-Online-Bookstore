document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Atomic Habits", img: "Atomic Habits.jpg", price: 100000 },
      {
        id: 2,
        name: "Rich Dad Poor Dad",
        img: "Rich Dad Poor Dad.jpg",
        price: 80000
      },
      {
        id: 3,
        name: "Courage To Be Disliked",
        img: "The Courage To Be Disliked.jpg",
        price: 50000,
      },
      {
        id: 4,
        name: "The Psychology of Money",
        img: "The Psycology of money.webp",
        price: 50000,
      },
      { id: 5, name: "How To Win Friends and Influnce People", img: "How To Win Friends and Influece People.jpg", price: 50000 },
      { id: 6, name: "Ikigai", img: "Ikigai.jpg", price: 50000 },
      { id: 7, name: "The Power of Discipline", img: "The Power of Discipline.jpg", price: 50000 },
      { id: 8, name: "Kaizen", img: "Kaizen.jpg", price: 50000 },
      { id: 9, name: "Think and Grow Rich", img: "Think and Grow Rich.jpg", price: 50000 },
      { id: 10, name: "The Power of Habit", img: "The Power of Habit.jpg", price: 50000 },
      { id: 11, name: "The Secret", img: "The Secret.jpg", price: 50000 },
      { id: 12, name: "Thingking Fast and Slow", img: "Thingking Fast and Slow.jpg", price: 50000 },
    ],
    getBestSellers() {
      return this.items.slice(0,6);
    },
    getBestSellers2() {
      return this.items.slice(6,13);
    }
  }));

  Alpine.store("shoppingCart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Check same item
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // If not
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //  Jika barang sudah ada, cek apakah barang beda atau sama dengan yang disimpan di cart
        this.items = this.items.map((item) => {
          // Jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah quantity dan SubTotal
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
      // console.log(this.items);
      // console.log(this.total);
    },
    remove(id) {
      // Ambil item yang mau diremove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // Jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // Telusuri 1 1
        this.items = this.items.map((item) => {
          // Jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= cartItem.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);

        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});



// Form Validation
const btnCheckout = document.querySelector('.button-checkout');
btnCheckout.disabled = true;

const form = document.querySelector('#checkoutForm');

// Cek if all forms are filled
form.addEventListener('keyup', function () {
  for (let i = 2; i < form.elements.length-1; i++) {
    if (form.elements[i].value.length !== 0) {
      btnCheckout.classList.remove('disabled');
      btnCheckout.classList.add('disabled');
    } else {
      return false;
    }
  }
  btnCheckout.disabled = false;
  btnCheckout.classList.remove('disabled');
});


// Sending data when checkout button is clicked
btnCheckout.addEventListener('click', async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // const message = formatMessage(objData);
  // window.open('http://wa.me/6283164224974?text=' + encodeURIComponent(message));

  // ask for transaction token using ajax/fetch

  try {
    const response = await fetch('php/placeOrder.php', {
      method: 'POST',
      body: data,
    });
    const token = await response.text();
    // console.log(token);
    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        alert("payment success!"); console.log(result);
        window.open("../index.html","_self")
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        alert("wating your payment!"); console.log(result);
      },
      onError: function (result) {
        /* You may add your own implementation here */
        alert("payment failed!"); console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert('you closed the popup without finishing the payment');
      }
    });
  
  } catch (error) {
    console.log(error.message);
  }
});

// Whatsapp message format
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
Data Pesanan
  ${JSON.parse(obj.items).map((item)=> `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}

TOTAL: ${rupiah(obj.total)}
Terima kasih.`
}

// Currency Format
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    // minimumFractionDigits: 0,
  }).format(number);
};