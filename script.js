// Lazy loading images using Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy");
    
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Lấy URL thực từ data-src
            img.onload = () => img.classList.add("is-loaded"); // Thêm class khi tải xong
            observer.unobserve(img); // Ngừng quan sát khi đã tải xong
          }
        });
      });
  
      lazyImages.forEach(img => {
        observer.observe(img);
      });
    } else {
      // Fallback cho trình duyệt không hỗ trợ Intersection Observer
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.onload = () => img.classList.add("is-loaded");
      });
    }
  });
  
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
let count_item = 200;
fetch('http://127.0.0.1:5500/Web-Main/data2 copy.json') // URL API Flask
.then(response => response.json())
.then(data => {
    const contentItems = document.querySelector('.slider-product-one-content-items');
    contentItems.innerHTML = ''; // Xóa nội dung mặc định (nếu cần)
    count_item = data.length;

    console.log('Số lượng dữ liệu:', count_item);
    
    data.forEach(product => {
        product.rating =  Math.floor(Math.random() * 3) + 3;
        const itemHTML = `
            <div class="slider-product-one-content-item">
                <img class="lazy" src="${product.image_path}" alt="${product.card_name}">
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

// searching---------------------------------------------------------


document.getElementById('searchButton').addEventListener('click', function () {
    // Lấy giá trị từ ô input
    const searchValue2 = document.getElementById('searchInput').value;
    let imageNameFilter = searchValue2.trim(); // Loại bỏ khoảng trắng thừa

    if (imageNameFilter !== '') {  // Kiểm tra nếu người dùng đã nhập dữ liệu
        // Gọi API và lọc dữ liệu sau khi nhận giá trị tìm kiếm
        fetch('http://127.0.0.1:5500/Web-Main/data2.json') // URL của file JSON
        .then(response => response.json())
        .then(data => {
            count_item = 0;
            const contentItems = document.querySelector('.slider-product-one-content-items');
            contentItems.innerHTML = ''; // Xóa nội dung mặc định (nếu cần)

            // Lọc dữ liệu chỉ lấy các item có image_name chứa imageNameFilter
            const filteredData = data.filter(product => 
                product.card_name.toLowerCase().includes(imageNameFilter.toLowerCase())
            );

            count_item = filteredData.length;
            console.log(count_item);
            
            filteredData.forEach(product => {
                product.rating = Math.floor(Math.random() * 3) + 3;
                const itemHTML = `
                    <div class="slider-product-one-content-item">
                        <img class="lazy" src="${product.image_path}" alt="${product.card_name}">
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
        })
        .catch(error => console.error('Error fetching data:', error));
    } else {
        console.log('Vui lòng nhập tên lá bài vào ô tìm kiếm.');
    }
});

//search by rarity--------------------------------------------------------
document.getElementById('Rare').addEventListener('click', function () {
    console.log("Đã nhận ấn vào rare");

    // Kiểm tra điều kiện thực tế, ví dụ nếu có giá trị tìm kiếm nhập vào
    if (true) {  // Thay thế bằng điều kiện phù hợp
        // Gọi API và lọc dữ liệu sau khi nhận giá trị tìm kiếm
        fetch('http://127.0.0.1:5500/Web-Main/data2.json') // URL của file JSON
        .then(response => response.json())
        .then(data => {
            let count_item = 0;
            const contentItems2 = document.querySelector('.slider-product-one-content-items');
            contentItems2.innerHTML = ''; // Xóa nội dung mặc định (nếu cần)

            // Lọc dữ liệu chỉ lấy các item có rarity = "Rare"
            const filteredData2 = data.filter(product => 
                product.rerity === "Rare" // Chỉnh lại chính tả
            );

            count_item = filteredData2.length;
            console.log(count_item);
            
            filteredData2.forEach(product => {
                product.rating = Math.floor(Math.random() * 3) + 3; // Tạo rating ngẫu nhiên

                const itemHTML2 = `
                    <div class="slider-product-one-content-item">
                        <img class="lazy" src="${product.image_path}" alt="${product.card_name}">
                        <div class="slider-product-one-content-item-text">
                            <li><img src="image/icon1.jpg" alt="icon sản phẩm"><p>Hot nhất trong ngày</p></li>
                            <li>${product.card_name}</li>
                            <li>${product.set_name}</li>
                            <li>${product.rerity}</li> 
                            <li>${product.price}<sup></sup></li>
                            <li>${product.price_market}<sup></sup></li>
                            <li>
                                ${generateStars(product.rating)} <!-- Hàm generateStars cần phải được định nghĩa -->
                            </li>
                            <li><button class="add-to-cart-btn"><i class="fa-solid fa-cart-shopping"></i></button></li>
                        </div>
                    </div>
                `;
                contentItems2.insertAdjacentHTML('beforeend', itemHTML2);
            });
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
        });
    }
});

document.getElementById('Ultra Rare').addEventListener('click', function () {
    console.log("Đã nhận ấn vào ultra rare");

    // Kiểm tra điều kiện thực tế, ví dụ nếu có giá trị tìm kiếm nhập vào
    if (true) {  // Thay thế bằng điều kiện phù hợp
        // Gọi API và lọc dữ liệu sau khi nhận giá trị tìm kiếm
        fetch('http://127.0.0.1:5500/Web-Main/data2.json') // URL của file JSON
        .then(response => response.json())
        .then(data => {
            let count_item = 0;
            const contentItems2 = document.querySelector('.slider-product-one-content-items');
            contentItems2.innerHTML = ''; // Xóa nội dung mặc định (nếu cần)

            // Lọc dữ liệu chỉ lấy các item có rarity = "Rare"
            const filteredData2 = data.filter(product => 
                product.rerity === "Ultra Rare" // Chỉnh lại chính tả
            );

            count_item = filteredData2.length;
            console.log(count_item);
            
            filteredData2.forEach(product => {
                product.rating = Math.floor(Math.random() * 3) + 3; // Tạo rating ngẫu nhiên

                const itemHTML2 = `
                    <div class="slider-product-one-content-item">
                        <img class="lazy" src="${product.image_path}" alt="${product.card_name}">
                        <div class="slider-product-one-content-item-text">
                            <li><img src="image/icon1.jpg" alt="icon sản phẩm"><p>Hot nhất trong ngày</p></li>
                            <li>${product.card_name}</li>
                            <li>${product.set_name}</li>
                            <li>${product.rerity}</li> 
                            <li>${product.price}<sup></sup></li>
                            <li>${product.price_market}<sup></sup></li>
                            <li>
                                ${generateStars(product.rating)} <!-- Hàm generateStars cần phải được định nghĩa -->
                            </li>
                            <li><button class="add-to-cart-btn"><i class="fa-solid fa-cart-shopping"></i></button></li>
                        </div>
                    </div>
                `;
                contentItems2.insertAdjacentHTML('beforeend', itemHTML2);
            });
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
        });
    }
});

document.getElementById('Super Rare').addEventListener('click', function () {
    console.log("Đã nhận ấn vào super rare");

    // Kiểm tra điều kiện thực tế, ví dụ nếu có giá trị tìm kiếm nhập vào
    if (true) {  // Thay thế bằng điều kiện phù hợp
        // Gọi API và lọc dữ liệu sau khi nhận giá trị tìm kiếm
        fetch('http://127.0.0.1:5500/Web-Main/data2.json') // URL của file JSON
        .then(response => response.json())
        .then(data => {
            let count_item = 0;
            const contentItems2 = document.querySelector('.slider-product-one-content-items');
            contentItems2.innerHTML = ''; // Xóa nội dung mặc định (nếu cần)

            // Lọc dữ liệu chỉ lấy các item có rarity = "Rare"
            const filteredData2 = data.filter(product => 
                product.rerity === "Super Rare" // Chỉnh lại chính tả
            );

            count_item = filteredData2.length;
            console.log(count_item);
            
            filteredData2.forEach(product => {
                product.rating = Math.floor(Math.random() * 3) + 3; // Tạo rating ngẫu nhiên

                const itemHTML2 = `
                    <div class="slider-product-one-content-item">
                        <img class="lazy" src="${product.image_path}" alt="${product.card_name}">
                        <div class="slider-product-one-content-item-text">
                            <li><img src="image/icon1.jpg" alt="icon sản phẩm"><p>Hot nhất trong ngày</p></li>
                            <li>${product.card_name}</li>
                            <li>${product.set_name}</li>
                            <li>${product.rerity}</li> 
                            <li>${product.price}<sup></sup></li>
                            <li>${product.price_market}<sup></sup></li>
                            <li>
                                ${generateStars(product.rating)} <!-- Hàm generateStars cần phải được định nghĩa -->
                            </li>
                            <li><button class="add-to-cart-btn"><i class="fa-solid fa-cart-shopping"></i></button></li>
                        </div>
                    </div>
                `;
                contentItems2.insertAdjacentHTML('beforeend', itemHTML2);
            });
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
        });
    }
});

document.getElementById('Quarter Century Secret Rare').addEventListener('click', function () {
    console.log("Đã nhận ấn vào Quarter Century Secret Rare");

    // Kiểm tra điều kiện thực tế, ví dụ nếu có giá trị tìm kiếm nhập vào
    if (true) {  // Thay thế bằng điều kiện phù hợp
        // Gọi API và lọc dữ liệu sau khi nhận giá trị tìm kiếm
        fetch('http://127.0.0.1:5500/Web-Main/data2.json') // URL của file JSON
        .then(response => response.json())
        .then(data => {
            let count_item = 0;
            const contentItems2 = document.querySelector('.slider-product-one-content-items');
            contentItems2.innerHTML = ''; // Xóa nội dung mặc định (nếu cần)

            // Lọc dữ liệu chỉ lấy các item có rarity = "Rare"
            const filteredData2 = data.filter(product => 
                product.rerity === "Quarter Century Secret Rare" // Chỉnh lại chính tả
            );

            count_item = filteredData2.length;
            console.log(count_item);
            
            filteredData2.forEach(product => {
                product.rating = Math.floor(Math.random() * 3) + 3; // Tạo rating ngẫu nhiên

                const itemHTML2 = `
                    <div class="slider-product-one-content-item">
                        <img class="lazy" src="${product.image_path}" alt="${product.card_name}">
                        <div class="slider-product-one-content-item-text">
                            <li><img src="image/icon1.jpg" alt="icon sản phẩm"><p>Hot nhất trong ngày</p></li>
                            <li>${product.card_name}</li>
                            <li>${product.set_name}</li>
                            <li>${product.rerity}</li> 
                            <li>${product.price}<sup></sup></li>
                            <li>${product.price_market}<sup></sup></li>
                            <li>
                                ${generateStars(product.rating)} <!-- Hàm generateStars cần phải được định nghĩa -->
                            </li>
                            <li><button class="add-to-cart-btn"><i class="fa-solid fa-cart-shopping"></i></button></li>
                        </div>
                    </div>
                `;
                contentItems2.insertAdjacentHTML('beforeend', itemHTML2);
            });
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
        });
    }
});

document.getElementById('Common / Short Print').addEventListener('click', function () {
    console.log("Đã nhận ấn vào Common / Short Print");

    // Kiểm tra điều kiện thực tế, ví dụ nếu có giá trị tìm kiếm nhập vào
    if (true) {  // Thay thế bằng điều kiện phù hợp
        // Gọi API và lọc dữ liệu sau khi nhận giá trị tìm kiếm
        fetch('http://127.0.0.1:5500/Web-Main/data2.json') // URL của file JSON
        .then(response => response.json())
        .then(data => {
            let count_item = 0;
            const contentItems2 = document.querySelector('.slider-product-one-content-items');
            contentItems2.innerHTML = ''; // Xóa nội dung mặc định (nếu cần)

            // Lọc dữ liệu chỉ lấy các item có rarity = "Rare"
            const filteredData2 = data.filter(product => 
                product.rerity === "Common / Short Print" // Chỉnh lại chính tả
            );

            count_item = filteredData2.length;
            console.log(count_item);
            
            filteredData2.forEach(product => {
                product.rating = Math.floor(Math.random() * 3) + 3; // Tạo rating ngẫu nhiên

                const itemHTML2 = `
                    <div class="slider-product-one-content-item">
                        <img class="lazy" src="${product.image_path}" alt="${product.card_name}">
                        <div class="slider-product-one-content-item-text">
                            <li><img src="image/icon1.jpg" alt="icon sản phẩm"><p>Hot nhất trong ngày</p></li>
                            <li>${product.card_name}</li>
                            <li>${product.set_name}</li>
                            <li>${product.rerity}</li> 
                            <li>${product.price}<sup></sup></li>
                            <li>${product.price_market}<sup></sup></li>
                            <li>
                                ${generateStars(product.rating)} <!-- Hàm generateStars cần phải được định nghĩa -->
                            </li>
                            <li><button class="add-to-cart-btn"><i class="fa-solid fa-cart-shopping"></i></button></li>
                        </div>
                    </div>
                `;
                contentItems2.insertAdjacentHTML('beforeend', itemHTML2);
            });
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
        });
    }
});

document.getElementById('Platinum Secret Rare').addEventListener('click', function () {
    console.log("Đã nhận ấn vào Platinum Secret Rare");

    // Kiểm tra điều kiện thực tế, ví dụ nếu có giá trị tìm kiếm nhập vào
    if (true) {  // Thay thế bằng điều kiện phù hợp
        // Gọi API và lọc dữ liệu sau khi nhận giá trị tìm kiếm
        fetch('http://127.0.0.1:5500/Web-Main/data2.json') // URL của file JSON
        .then(response => response.json())
        .then(data => {
            let count_item = 0;
            const contentItems2 = document.querySelector('.slider-product-one-content-items');
            contentItems2.innerHTML = ''; // Xóa nội dung mặc định (nếu cần)

            // Lọc dữ liệu chỉ lấy các item có rarity = "Rare"
            const filteredData2 = data.filter(product => 
                product.rerity === "Platinum Secret Rare" // Chỉnh lại chính tả
            );

            count_item = filteredData2.length;
            console.log(count_item);
            
            filteredData2.forEach(product => {
                product.rating = Math.floor(Math.random() * 3) + 3; // Tạo rating ngẫu nhiên

                const itemHTML2 = `
                    <div class="slider-product-one-content-item">
                        <img class="lazy" src="${product.image_path}" alt="${product.card_name}">
                        <div class="slider-product-one-content-item-text">
                            <li><img src="image/icon1.jpg" alt="icon sản phẩm"><p>Hot nhất trong ngày</p></li>
                            <li>${product.card_name}</li>
                            <li>${product.set_name}</li>
                            <li>${product.rerity}</li> 
                            <li>${product.price}<sup></sup></li>
                            <li>${product.price_market}<sup></sup></li>
                            <li>
                                ${generateStars(product.rating)} <!-- Hàm generateStars cần phải được định nghĩa -->
                            </li>
                            <li><button class="add-to-cart-btn"><i class="fa-solid fa-cart-shopping"></i></button></li>
                        </div>
                    </div>
                `;
                contentItems2.insertAdjacentHTML('beforeend', itemHTML2);
            });
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
        });
    }
});

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
let imglist = count_item/5;
let index2 = 0;

rightbtn2.addEventListener("click", function () {
    imglist = count_item/5;
    console.log(count_item);
    console.log(imglist);
    index2 = index2 + 1;
    if (index2 > imglist - 1) {
        index2 = 0;
    }
    updateSlider();
});

leftbtn2.addEventListener("click", function () {
    imglist = count_item/5;
    console.log(count_item);
    console.log(imglist);
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


//bill----------------------------------------------
// Lưu thông tin địa chỉ
let addressInfo = {};

document.getElementById('confirm-adr').addEventListener('click', function (e) {
    e.preventDefault(); // Ngăn hành động mặc định của form

    // Lấy giá trị từ các trường nhập liệu
    const province = document.querySelector('.address-form-content select:nth-of-type(1)').value;
    const district = document.querySelector('.address-form-content select:nth-of-type(2)').value;
    const ward = document.querySelector('.address-form-content select:nth-of-type(3)').value;
    const house = document.querySelector('.address-form-content input').value.trim();

    // Kiểm tra nếu tất cả các trường đều có giá trị
    if (province && district && ward && house) {
        // Lưu thông tin địa chỉ vào biến
        addressInfo = { province, district, ward, house };

        // Thông báo thành công và ẩn form
        
        document.querySelector('.address-form').style.display = 'none';
    } else {
        alert("Vui lòng điền đầy đủ thông tin địa chỉ!");
    }
});



// Mảng lưu trữ lịch sử đơn hàng
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

// Hiển thị hóa đơn khi nhấn "Xác nhận"
document.getElementById('confirm-btn').addEventListener('click', function () {
    // Kiểm tra nếu địa chỉ đã được lưu
    if (Object.keys(addressInfo).length === 0) {
        alert("Vui lòng nhập địa chỉ trước khi xác nhận!");
        return;
    }

    // Kiểm tra nếu giỏ hàng rỗng
    if (cartItems.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    // Tạo hóa đơn
    const invoice = {
        address: `${addressInfo.house}, ${addressInfo.ward}, ${addressInfo.district}, ${addressInfo.province}`,
        products: [...cartItems],
        total: calculateTotal(),
        date: new Date().toLocaleString('vi-VN') // Thời gian mua hàng
    };

    // Lưu hóa đơn vào lịch sử
    orderHistory.push(invoice);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    // Hiển thị hóa đơn trong cửa sổ mới
    const invoiceWindow = window.open("", "Invoice", "width=600,height=800");
    invoiceWindow.document.write(`
        <html>
        <head>
            <style>
                /* CSS hóa đơn */
                .invoice {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 20px auto;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .invoice-header {
                    background-color: #0e73d8;
                    color: white;
                    text-align: center;
                    padding: 15px;
                    font-size: 24px;
                    font-weight: bold;
                }
                .invoice-section {
                    padding: 20px;
                    border-bottom: 1px solid #ddd;
                }
                .invoice-products ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .invoice-products ul li {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    font-size: 16px;
                }
                .invoice-total {
                    padding: 20px;
                    text-align: right;
                    background-color: #f5f5f5;
                    font-size: 18px;
                    font-weight: bold;
                    color: #0e73d8;
                }
            </style>
        </head>
        <body>
            <div class="invoice">
                <div class="invoice-header">Hóa Đơn Mua Hàng</div>
                <div class="invoice-section">
                    <h3>Thông tin địa chỉ:</h3>
                    <p>${invoice.address}</p>
                </div>
                <div class="invoice-section invoice-products">
                    <h3>Thông tin sản phẩm:</h3>
                    <ul>
                        ${invoice.products
                          .map(
                            item =>
                              `<li><span>${item.name}</span><span>${item.rarity}</span><span>${item.price}</span></li>`
                          )
                          .join("")}
                    </ul>
                </div>
                <div class="invoice-total">Tổng tiền: ${invoice.total.toLocaleString("vi-VN")} VND</div>
            </div>
        </body>
        </html>
    `);
    invoiceWindow.document.close();

    // Làm trống giỏ hàng sau khi mua
    cartItems = [];
    renderCartItems();
    alert("Hóa đơn đã được lưu vào lịch sử đơn hàng!");
});

// Hiển thị lịch sử đơn hàng
document.querySelector('#order-history-btn').addEventListener('click', function () {
    const historySection = document.querySelector('#order-history');
    historySection.style.display = 'flex'; // Hiển thị lịch sử đơn hàng
    renderOrderHistory();
});

// Ẩn lịch sử đơn hàng khi nhấn nút đóng
document.querySelector('.close-btn').addEventListener('click', function () {
    document.querySelector('#order-history').style.display = 'none';
});


// Hiển thị lịch sử đơn hàng
function renderOrderHistory() {
    const historyContainer = document.querySelector('#order-history-container');
    historyContainer.innerHTML = '';

    if (orderHistory.length === 0) {
        historyContainer.innerHTML = '<p>Chưa có đơn hàng nào.</p>';
        return;
    }

    orderHistory.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order-item');
        orderElement.innerHTML = `
            <h3>Đơn hàng ngày: ${order.date}</h3>
            <p><strong>Địa chỉ:</strong> ${order.address}</p>
            <ul>
                ${order.products
                  .map(
                    product =>
                      `<li>${product.name} - ${product.rarity} - Giá: ${product.price}</li>`
                  )
                  .join('')}
            </ul>
            <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString('vi-VN')} VND</p>
        `;
        historyContainer.appendChild(orderElement);
    });
}
