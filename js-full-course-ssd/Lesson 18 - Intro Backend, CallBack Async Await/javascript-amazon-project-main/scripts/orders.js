import {orders} from '../data/orders.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { formatCurrency } from './utils/money.js';
import {products, loadProductsFetch,getProduct} from '../data/products.js'
import  {cart, loadCartFetch} from '../data/cart-class.js'
import { FindDeliveryOption } from '../data/deliveryOptionId.js';
function renderOrders () {
  let orderHTML = '';
  orders.forEach((order)=> {
    if(order===null) {
      return;
    }
    orderHTML += `
      <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatIsoStringToDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(`${order.totalCostCents}`)}</div>
              </div>
            </div>

          <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          <div class="order-details-grid js-order-details-grid ">
            ${renderProducts(order)}
          </div>
      </div>
    `
})
  document.querySelector('.js-order-grid')
    .innerHTML = orderHTML;
}
await loadProductsFetch();
renderOrders();



function formatIsoStringToDate (isoString) {
  const d = dayjs(isoString);
  return d.format('MMMM D');
}



 function renderProducts (order) {
  let productsHTML = '';
    const orderProducts = order.products
    let matchingProduct;
    let matchingCartItem;
    orderProducts.forEach((product)=> {
        matchingProduct = getProduct(product.productId);
        productsHTML += `
            <div class="product-image-container">
                <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
            </div>   
              <div class="product-delivery-date">
                Arriving on: ${getDeliveryDate(order.orderTime,product.deliveryOptionId)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary" data-product-id="${product.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html/?orderId&cartItemId">
                <button class="track-package-button button-secondary js-track-package" 
                data-order-id = "${order.id}" data-cart-item-id = "${product.productId}">
                  Track package
                </button>
              </a>
            </div>
      
      `
    })
    
      return productsHTML;
  }



export function getDeliveryDate (orderTime, orderDeliveryOptionId) {
  let matchingProduct = FindDeliveryOption(orderDeliveryOptionId)
  const d = dayjs(orderTime);
  const deliveryDate = d.add(matchingProduct.deliveryDays,'days');
  return deliveryDate.format('MMMM DD');
}


handleBuyAgain();
cart.updateCartQuantity();
function handleBuyAgain () {
  const buyAgainBtnElement = document.querySelectorAll('.buy-again-button');
  buyAgainBtnElement.forEach((button) => {
    let timeOutId;
    button.addEventListener('click', (e) => {
      cart.updateCartQuantity();
      cart.addToCart1(button.dataset.productId)
      const btn = e.currentTarget;

      if (timeOutId) {
        clearTimeout(timeOutId);
      }

      btn.textContent = 'Adding...';

      // dùng 1 setTimeout để điều khiển toàn bộ flow
      timeOutId = setTimeout(() => {
        btn.textContent = '✓ Added';
        // sau 1s nữa khôi phục lại
        setTimeout(() => {
          btn.innerHTML = 
          `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          `
          
        }, 500);

      }, 1000); // 2 giây chờ "Adding..."
    });
  });
}

document.querySelectorAll('.js-track-package').forEach(track => {
  track.addEventListener('click', (e) => {
    e.preventDefault(); // chặn chuyển hướng mặc định (nếu có thẻ <a>)
    
    const orderId = e.target.dataset.orderId;
    const cartItemId = e.target.dataset.cartItemId;
    // Chuyển hướng đúng tới URL có parameter
    window.location.href = `../tracking.html?orderId=${orderId}&cartItemId=${cartItemId}`;
  });
})
  