import {cart,removeFromCart,updateCartQuantity,totalCartQuantity,saveToLocalStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import * as utils from './utils/money.js'


createHTML();
function createHTML () {
  let html = '';
  cart.forEach((cartItem)=> {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product)=> {
    if(productId == product.id) {
      matchingProduct = product;
    }
  });
  html += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `

})
document.querySelector('.order-summary')
  .innerHTML = html;
}


const deleteBtnElement = document.querySelectorAll('.js-delete-product');
deleteBtnElement.forEach((button)=> {
  button.addEventListener('click',()=> {
    const productID = button.dataset.productId;
    removeFromCart(productID);
    const container = document.querySelector(`.js-cart-item-container-${productID}`);
    container.remove();
    displayCheckOutItem();
  })
})

displayCheckOutItem();
function displayCheckOutItem () {
  const checkOutItemElement = document.querySelector('.js-checkout-item');
  if(checkOutItemElement) {
  let cartQuantity;
  checkOutItemElement.textContent = totalCartQuantity();
}
}

const saveBtnElement = document.querySelectorAll('.save-quantity-link');
saveBtnElement.forEach((button)=> {
  button.addEventListener('click',()=> {
      const productId = button.dataset.productId;
      let matchingProduct;
      cart.forEach((cartItem)=> {
        if(productId === cartItem.productId) {
          matchingProduct = cartItem;
        }
      })
      if(matchingProduct) {
        const quantityInputElement = document.querySelector(`.quantity-input-${productId}`);
        const quantityNum = quantityInputElement.value;
        if(quantityNum>=1 && quantityNum <=99) {
          matchingProduct.quantity = Number(quantityInputElement.value);
          document.querySelector(`.quantity-label-${matchingProduct.productId}`).textContent = `${matchingProduct.quantity}`;
          updateItemCheckOut();
          updateTotalItem(matchingProduct.productId);
        }else {
          alert('Invalid Quantity! Please try again');
          quantityInputElement.value = '';
        }
        
      }

      // Xử lí xuất hiện của các nút
      // false: ẩn đi, true: hiện ra
      toggleHidden(button,false);
      toggleHidden(document.querySelector(`.quantity-input-${productId}`),false);
      toggleHidden(document.querySelector(`.quantity-label-${productId}`),true);
      toggleHidden(document.querySelector(`.updateBtn-${productId}`),true);

      saveToLocalStorage();
  })

})
const updateBtnElement = document.querySelectorAll('.updateBtn');
updateBtnElement.forEach((button)=> {
  button.addEventListener('click',()=> {
    console.log('Dang trong nut')
    const productId = button.dataset.productId;
    const quantityInputElement = document.querySelector(`.quantity-input-${productId}`);
    // false: ẩn đi, true: hiện ra
    toggleHidden(button,false);
    toggleHidden(quantityInputElement,true);
    toggleHidden(document.querySelector(`.save-quantity-link-${productId}`),true)
    toggleHidden(document.querySelector(`.quantity-label-${productId}`),false);
  })

})


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
      console.log('asds')
      totalPriceOfItemByCents = (product.priceCents *matchingItem.quantity);
      document.querySelector(`.product-price-${matchingItem.productId}`)
        .innerHTML = `$${utils.formatCurrency(totalPriceOfItemByCents)}`;
              console.log('Tim thay san pham trong gio hang')
    }
  })
}