// on off address-------------------------------------------------------------
const addressof = document.querySelector('#address-form')
//console.log(addressof)
addressof.addEventListener("click", function() {
    document.querySelector('.address-form').style.display = "flex";
});
const addressclose = document.querySelector('#address-close')
addressclose.addEventListener("click", function() {
    document.querySelector('.address-form').style.display = "none";
});
//slider right-left----------------------------------------------------------------------
const rightbtn = document.querySelector('.fa-chevron-right')
const leftbtn = document.querySelector('.fa-chevron-left')
let index = 0;
const img = document.querySelectorAll('.slider-content-left-top img')
rightbtn.addEventListener("click", function(){
    index = index + 1
    if(index > img.length-1) {
        index = 0
    }
    removeActive()
    document.querySelector(".slider-content-left-top").style.right = index*100+"%"
    imgNumberLi[index].classList.add("active")
})
leftbtn.addEventListener("click", function(){
    index = index - 1
    if(index < 0) {
        index = img.length - 1
    }
    removeActive()
    document.querySelector(".slider-content-left-top").style.right = index*100+"%"
    imgNumberLi[index].classList.add("active")
})
//slider under ---------------------------------------------------------------
const imgNumberLi = document.querySelectorAll('.slider-content-left-bottom li')

imgNumberLi.forEach(function(image, index){
    image.addEventListener("click", function(){
        document.querySelector(".slider-content-left-top").style.right = index*100+"%"
        removeActive()
        image.classList.add("active")
    })
})
function removeActive() {
    let imgactive = document.querySelector('.active')
    imgactive.classList.remove("active")
}
//slider auto----------------------------------------------------------------
function imgauto() {
    index = index + 1
    if(index > img.length-1) {
        index = 0
    }
    removeActive()
    document.querySelector(".slider-content-left-top").style.right = index*100+"%"
    imgNumberLi[index].classList.add("active")
}
setInterval(imgauto, 9000);

let tmpp1

//import database----------------------------------------------------
fetch('http://127.0.0.1:5500/Web-Main/data2.json') // URL API Flask
.then(response => response.json())
.then(data => {
    const contentItems = document.querySelector('.slider-product-one-content-items');
    contentItems.innerHTML = ''; // Xóa nội dung mặc định (nếu cần)
    tmpp1 = data.length

    console.log('Số lượng dữ liệu:', tmpp1);
    
    data.forEach(product => {
        product.rating = 5;
        const itemHTML = `
            <div class="slider-product-one-content-item">
                <img src="${product.image_path}" alt="${product.card_name}">
                <div class="slider-product-one-content-item-text">
                    <li><img src="image/icon1.jpg" alt="icon sản phẩm"><p>Hot nhất trong ngày</p></li>
                    <li>${product.card_name}</li>
                    <li>${product.set_name}</li>
                    <li>${product.rerity}</li>
                    <li>${product.price}<sup></sup></li>
                    <li>${product.price_market}<sup></sup></li>
                    <li>
                        ${generateStars(product.rating)}
                    </li>
                    <li><button class="add-to-cart-btn"><i class="fa-solid fa-cart-shopping"></i></button></li>
                </div>
            </div>
        `;
        contentItems.insertAdjacentHTML('beforeend', itemHTML);
    });

    document.addEventListener('click', function(e) {
        if (e.target && e.target.closest('.add-to-cart-btn')) {
            const button = e.target.closest('.add-to-cart-btn');
            const productDiv = button.closest('.slider-product-one-content-item');
            if (productDiv) {
                // Lấy thông tin sản phẩm cần thiết
                const product = {
                    image: productDiv.querySelector('img').src,
                    name: productDiv.querySelector('li:nth-child(2)').innerText,
                    rarity: productDiv.querySelector('li:nth-child(4)').innerText,
                    price: productDiv.querySelector('li:nth-child(5)').innerText,
                };
                cartItems.push(product);
                //alert(`${product.name} đã được thêm vào giỏ hàng!`);
            } else {
                console.error("Không tìm thấy thông tin sản phẩm.");
            }
        }
    });
    
    
})
.catch(error => console.error('Error fetching data:', error));

// Hàm tạo HTML cho đánh giá sao
function generateStars(rating) {
let starsHTML = '';
for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
    } else {
        starsHTML += '<i class="fa-regular fa-star"></i>';
    }
}
return starsHTML;
}


/* searching------------------------------------------------ */



//slider product---------------------------------------------------------------------
/*const rightbtn2 = document.querySelector('.fa-chevron-right2')
const leftbtn2 = document.querySelector('.fa-chevron-left2')
const imglist = 4
let index2 = 0
rightbtn2.addEventListener("click", function(){
    index2 = index2 + 1
    if(index2 > imglist-1) {
        index2 = 0
    }
    removeActive()
    document.querySelector(".slider-product-one-item-container").style.right = index2*100+"%"
    imgNumberLi[index2].classList.add("active")
})
leftbtn2.addEventListener("click", function(){
    index2 = index2 - 1
    if(index2 < 0) {
        index2 = imglist - 1
    }
    removeActive()
    document.querySelector(".slider-product-one-item-container").style.right = index2*100+"%"
    imgNumberLi[index2].classList.add("active")
})*/
const rightbtn2 = document.querySelector('.fa-chevron-right2');
const leftbtn2 = document.querySelector('.fa-chevron-left2');
const imglist = 198/5;
let index2 = 0;

rightbtn2.addEventListener("click", function () {
    index2 = index2 + 1;
    if (index2 > imglist - 1) {
        index2 = 0;
    }
    updateSlider();
});

leftbtn2.addEventListener("click", function () {
    index2 = index2 - 1;
    if (index2 < 0) {
        index2 = imglist - 1;
    }
    updateSlider();
});
function updateSlider() {
    const sliderContainer = document.querySelector(".slider-product-one-content-items");
    sliderContainer.style.transform = `translateX(-${index2 * 100}%)`;
}

// on off cart-------------------------------------------------------------
// Tìm các phần tử cần thiết
const cartof = document.querySelector('#cart');
const cartclose = document.querySelector('#cart-close');
const cartForm = document.querySelector('.cart-form');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartContainer = document.querySelector('#cart-container');

// Mảng lưu trữ sản phẩm trong giỏ hàng
let cartItems = [];

// Kiểm tra sự tồn tại của các phần tử trước khi thêm sự kiện
if (cartof && cartclose && cartForm) {
    // Hiển thị giỏ hàng
    cartof.addEventListener("click", function() {
        cartForm.style.display = "flex";
        renderCartItems();
    });

    // Ẩn giỏ hàng
    cartclose.addEventListener("click", function() {
        cartForm.style.display = "none";
    });
} else {
    console.error("Không tìm thấy phần tử giỏ hàng hoặc nút đóng.");
}

// Xử lý sự kiện thêm vào giỏ hàng
if (addToCartButtons) {
    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            const productDiv = button.closest('.slider-product-one-content-item');
            if (productDiv) {
                const product = {
                    image: productDiv.querySelector('img').src,
                    name: productDiv.querySelector('li:nth-child(2)').innerText,
                    setName: productDiv.querySelector('li:nth-child(3)').innerText,
                    rarity: productDiv.querySelector('li:nth-child(4)').innerText,
                    price: productDiv.querySelector('li:nth-child(5)').innerText,
                    marketPrice: productDiv.querySelector('li:nth-child(6)').innerText,
                };
                cartItems.push(product);
                //alert(`${product.name} đã được thêm vào giỏ hàng!`);
            } else {
                console.error("Không tìm thấy thông tin sản phẩm.");
            }
        });
    });
}

// Hiển thị các sản phẩm trong giỏ hàng
function renderCartItems() {
    if (cartContainer) {
        cartContainer.innerHTML = ""; // Xóa nội dung cũ
        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống!</p>";
        } else {
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width: 45px; height: 60px; object-fit: cover;">
                    <p class="name">${item.name}</p>
                    <p class="rarity">${item.rarity}</p>
                    <p class="price">${item.price}</p>
                    <button class="remove-cart-item" data-index="${index}">Xóa</button>
                `;
                cartContainer.appendChild(cartItem);
            });
        }
        updateTotalPrice(); // Cập nhật tổng tiền khi giỏ hàng thay đổi
    }

    // Thêm sự kiện xóa sản phẩm
    const removeButtons = document.querySelectorAll('.remove-cart-item');
    removeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const index = parseInt(button.dataset.index);
            if (!isNaN(index)) {
                cartItems.splice(index, 0); // Xóa sản phẩm khỏi mảng
                renderCartItems(); // Cập nhật lại giỏ hàng
                
            }
        });
    });
}

// tiền--------------------
// Mảng lưu trữ các sản phẩm trong giỏ hàng


// Hàm tính tổng tiền
function calculateTotal() {
    let total = 0;
    let count = 29;
    cartItems.forEach(item => {
        // Loại bỏ ký tự '$' và chuyển giá trị sang số thực
        let price = parseFloat(item.price.replace('$', '').replace(',', '').trim()); // Loại bỏ '$', ',' và chuyển thành số
        total += price;
        count ++;
    });
    return total*25000 + 30000*(count - count%30)/30;
}

// Hàm cập nhật tổng tiền
function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const total = calculateTotal(); // Tính tổng tiền
    // Định dạng tiền Việt và hiển thị
    totalPriceElement.innerText = `Tổng tiền: ${total.toLocaleString('vi-VN')} VND`; // Cập nhật tổng tiền với định dạng tiền Việt
}

// Sự kiện khi nhấn nút "Xác nhận"
document.getElementById('cart').addEventListener('click', function() {
    updateTotalPrice(); // Cập nhật tổng tiền khi nhấn "Xác nhận"
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('remove-cart-item')) {
        const index = e.target.getAttribute('data-index'); // Lấy chỉ số của sản phẩm cần xóa
        cartItems.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
        renderCartItems(); // Cập nhật lại giỏ hàng và tổng tiền
    }
});
  
