import {cart,totalCartQuantity} from '../../data/cart.js';
import { FindDeliveryOption } from '../../data/deliveryOptionId.js';
import {products,getProduct} from '../../data/products.js'
import {formatCurrency} from '../utils/money.js'
export function renderPaymentSummary () {
  let totalPrice = 0;
  let ShippingHandling = 0;
  cart.forEach((cartItem)=> {
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
            <div>Items (${totalCartQuantity()}):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `
  document.querySelector('.payment-summary')
    .innerHTML = paymentSummaryHTML;
}