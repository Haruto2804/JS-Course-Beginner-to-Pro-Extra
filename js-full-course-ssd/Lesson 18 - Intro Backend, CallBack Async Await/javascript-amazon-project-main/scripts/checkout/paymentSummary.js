import {cart, loadCartFetch} from '../../data/cart-class.js';
import { FindDeliveryOption } from '../../data/deliveryOptionId.js';
import {products,getProduct} from '../../data/products.js'
import {formatCurrency} from '../utils/money.js'
import { addOrder } from '../../data/orders.js';
import { renderOrderSummary } from './orderSummary.js';

export function renderPaymentSummary () {
  let totalPrice = 0;
  let ShippingHandling = 0;
  cart.cartItems.forEach((cartItem)=> {
    const product = getProduct(cartItem.productId);
    const deliveryOption = FindDeliveryOption(cartItem.deliveryOptionId);
    totalPrice += product.priceCents * cartItem.quantity;
    ShippingHandling += deliveryOption.priceCents;
  })
  const totalPriceString = formatCurrency(totalPrice);
  const ShippingHandlingString = formatCurrency(ShippingHandling);
  const totalBeforeTax = totalPrice+ShippingHandling;
  const totalBeforeTaxString = formatCurrency(totalBeforeTax);
  const tax = totalBeforeTax *0.1
  const taxString = formatCurrency((tax))
  const totalAfterTaxString = formatCurrency((totalBeforeTax + tax));
  const paymentSummaryHTML = 
  `
      <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart. totalCartQuantity()}):</div>
            <div class="payment-summary-money">$${totalPriceString}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${ShippingHandlingString}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTaxString}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxString}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalAfterTaxString}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
  `
  document.querySelector('.payment-summary')
    .innerHTML = paymentSummaryHTML;
    document.querySelector('.js-place-order')
      .addEventListener('click', async ()=> {
        try {
          const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: { //header give the backend more information about our request
            'Content-Type': 'application/json' // what type data we want to send to the backend
          },
          body: JSON.stringify({ // here
            cart: cart // we need convent cart to JSON string
          })
        });
        const order = await response.json(); // wait finished
        const orderWithDeliveryOption = {
          ...order, // ...: spread opeator: copy toàn bộ thuộc tính từ order trả về từ sever POST/orders
          products: cart.cartItems.map(item=> ({
            productId: item.productId,
            quantity: item.quantity,
            deliveryOptionId: item.deliveryOptionId
          }))
        }


    
        addOrder(orderWithDeliveryOption);
        }catch (error) {
          console.log('Unexpected error',error);
        }

        cart.cartItems = [];
        cart.saveToLocalStorage();

        //cập nhật lại check out item về 0
        document.querySelector('.js-checkout-item')
          .textContent = '0';
          renderOrderSummary();
          renderPaymentSummary();
          closePlaceOrderBtn();
          window.location.href = 'orders.html'
        
      });
}



export function renderEmptyCart() {
  const emptyCartElement = document.querySelector('.js-cart-summary')
    .innerHTML = `
    <p class = "cart-empty-text">Your cart is empty</p>
    <a href = "amazon.html"><button class = "view-products">View products</button></a>
    
    `
}



export function closePlaceOrderBtn () {
    const placeOrderBtnElement = document.querySelector('.js-place-order');
    placeOrderBtnElement.style.opacity = '0.5';
    placeOrderBtnElement.style.cursor = 'none';
    placeOrderBtnElement.style.pointerEvents  = 'none';
}

export function openPlaceOrderBtn () {
  const placeOrderBtnElement = document.querySelector('.js-place-order');
  placeOrderBtnElement.style.opacity = '1';
  placeOrderBtnElement.style.cursor = 'auto';
  placeOrderBtnElement.style.pointerEvents  = 'pointer';
}
