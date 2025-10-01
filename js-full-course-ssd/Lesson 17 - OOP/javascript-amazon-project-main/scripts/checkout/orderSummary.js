import {cart,removeFromCart,updateCartQuantity,totalCartQuantity,saveToLocalStorage} from '../../data/cart.js';
import {products} from '../../data/products.js';
import * as utils from '../utils/money.js'
import {deliveryOptions, FindDeliveryOption} from '../../data/deliveryOptionId.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {renderPaymentSummary} from './paymentSummary.js'
renderOrderSummary();
export function renderOrderSummary () {
  let html = '';
  cart.forEach((cartItem)=> {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product)=> {
    if(productId == product.id) {
      matchingProduct = product;
    }
  });
  const deliveryOption = FindDeliveryOption(cartItem.deliveryOptionId);
  const today = dayjs();
  const deliveryDate = getCaculateDeliveryDay(deliveryOption);
  html += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDate}
            </div>
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price product-price-${matchingProduct.id}">
                $${utils.formatCurrency(matchingProduct.priceCents*cartItem.quantity)}
                </div>
                <div class="product-quantity js-product-quantity" data-product-id = "${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-container">
                    <span class ="updateBtn updateBtn-${matchingProduct.id}" data-product-id= "${matchingProduct.id}">
                        Update
                    </span>
                    <input value ="1" type = "number" min="1" max = "99"
                    class = "hidden quantity-input quantity-input-${matchingProduct.id}">
                    <span class = "hidden save-quantity-link save-quantity-link-${matchingProduct.id} link-primary" data-product-id= "${matchingProduct.id}">
                    Save</span>
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-product" data-product-id = '${matchingProduct.id}'>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
                ${renderDeliveryHTML(matchingProduct,cartItem)}
              </div>
              </div>
            </div>
          </div>
  `

})
document.querySelector('.order-summary')
  .innerHTML = html;
}

function renderDeliveryHTML (matchingProduct,cartItem) {
  let deliveryHTML = '';
  let today = dayjs();
  deliveryOptions.forEach((deliveryOption)=> {
  const deliveryDays = deliveryOption.deliveryDays;
  const deliveryDate = getCaculateDeliveryDay(deliveryOption);
  const deliveryCents = utils.formatCurrency(deliveryOption.priceCents);
  const isChecked = cartItem.deliveryOptionId === deliveryOption.id ? 'checked' : '';
  deliveryHTML += `
              
                <div class="delivery-option">
                  <input type="radio" ${isChecked}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                    data-product-id = "${matchingProduct.id}"
                    data-delivery-option-id = "${deliveryOption.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                      ${deliveryCents == 0 ?  'FREE Shipping' : `$${deliveryCents} - Shipping`}
                    </div>
                  </div>
                </div>
  `;
  })
  return deliveryHTML;
}




displayCheckOutItem();
function displayCheckOutItem () {
  const checkOutItemElement = document.querySelector('.js-checkout-item');
  if(checkOutItemElement) {
  let cartQuantity;
  checkOutItemElement.textContent = totalCartQuantity();
}
}



function toggleHidden (element,show) {
  if(!element) {
    return;
  }
  if(show) {
    element.classList.remove('hidden');
  }else {
    element.classList.add('hidden');
  }
}
function updateItemCheckOut () {
  document.querySelector('.js-checkout-item')
    .textContent = totalCartQuantity();
}
function updateTotalItem (productId) {
  let matchingItem;
  //Kiếm sản phẩm trong giỏ hàng
  cart.forEach((cartItem)=> {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })

  //tìm thông tin sản phẩm đó trong danh mục sản phẩm
  let totalPriceOfItemByCents = 0;
  products.forEach((product)=> {
    if(matchingItem.productId === product.id) {
      totalPriceOfItemByCents = (product.priceCents *matchingItem.quantity);
      document.querySelector(`.product-price-${matchingItem.productId}`)
        .innerHTML = `$${utils.formatCurrency(totalPriceOfItemByCents)}`;
    }
  })
}

document.querySelector('.order-summary')
  .addEventListener('click',(e)=> {
    if(e.target.matches('.js-delete-product')) {
      console.log('Ban dang an vao nut xóa')
      handleDeleteBtn(e);
    }
    if(e.target.matches('.updateBtn')) {
            console.log('Ban dang an vao nut update')
      handleUpdateBtn(e);
    }
    if(e.target.matches('.save-quantity-link')) {
      console.log('Ban dang an vao nut save')
      handleSaveBtn(e);
    }
    if(e.target.matches('.delivery-option-input')) {
      handleDeliveryOptionId(e);
    }
  })






function handleDeleteBtn (e) {
    const productID = e.target.dataset.productId;
    removeFromCart(productID);
    const container = document.querySelector(`.js-cart-item-container-${productID}`);
    container.remove();
    displayCheckOutItem();
    renderPaymentSummary();
}
function handleUpdateBtn (e) {
    const productId = e.target.dataset.productId;
    const quantityInputElement = document.querySelector(`.quantity-input-${productId}`);
    // false: ẩn đi, true: hiện ra
    renderPaymentSummary();
    toggleHidden(e.target,false);
    toggleHidden(quantityInputElement,true);
    toggleHidden(document.querySelector(`.save-quantity-link-${productId}`),true)
    toggleHidden(document.querySelector(`.quantity-label-${productId}`),false);
    

}
function handleSaveBtn (e) {
      const productId = e.target.dataset.productId;
      let matchingProduct;
      cart.forEach((cartItem)=> {
        if(productId === cartItem.productId) {
          matchingProduct = cartItem;
        }
      })
      if(matchingProduct) {
        const quantityInputElement = document.querySelector(`.quantity-input-${productId}`);
        const quantityNum = quantityInputElement.value;
        if(quantityNum>=1 && quantityNum <=999) {
          matchingProduct.quantity = Number(quantityInputElement.value);
          document.querySelector(`.quantity-label-${matchingProduct.productId}`).textContent = `${matchingProduct.quantity}`;
          updateItemCheckOut();
          updateTotalItem(matchingProduct.productId);
          renderPaymentSummary();
        }else {
          alert('Invalid Quantity! Please try again');
          quantityInputElement.value = '';
        }
        
      }

      // Xử lí xuất hiện của các nút
      // false: ẩn đi, true: hiện ra
      toggleHidden(e.target,false);
      toggleHidden(document.querySelector(`.quantity-input-${productId}`),false);
      toggleHidden(document.querySelector(`.quantity-label-${productId}`),true);
      toggleHidden(document.querySelector(`.updateBtn-${productId}`),true);

      saveToLocalStorage();
}
function handleDeliveryOptionId (e) {
  const productId = e.target.dataset.productId;
  let matchingProduct;
  cart.forEach((cartItem)=> {
    if(cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  })
  const newDeliveryOptionId = e.target.dataset.deliveryOptionId;
  if(matchingProduct) {
    matchingProduct.deliveryOptionId = newDeliveryOptionId;
    saveToLocalStorage();
    renderPaymentSummary();
    renderOrderSummary();
  }
}

// HÀM XỬ LÍ NGÀY KHÔNG GIAO THỨ 7 CHỦ NHẬT
function getCaculateDeliveryDay (deliveryOption) {
  const today = dayjs();
  const waitDays = skipWeekends(deliveryOption.deliveryDays);
  const deliveryDate = today.add(waitDays,'days');
  return deliveryDate.format('dddd MMMM D');
  }

function skipWeekends (deliveryDays) {
  let waitDays =  deliveryDays//là số ngày mà khách phải chờ để nhận được hàng // 3
  const today = dayjs();
  for(let i = 1;i<=waitDays;i++) {
    const nextDay = today.add(i,'days').format('dddd');
    if(nextDay === 'Saturday' || nextDay === 'Sunday') {
      waitDays++;
    }
  }
  return waitDays;
}