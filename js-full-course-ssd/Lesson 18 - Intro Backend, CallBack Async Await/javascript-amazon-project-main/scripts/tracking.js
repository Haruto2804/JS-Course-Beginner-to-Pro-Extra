import {orders} from '../data/orders.js'
import {FindDeliveryOption} from '../data/deliveryOptionId.js'
import {getProduct,loadProductsFetch,products } from '../data/products.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
await loadProductsFetch();
renderOrderTracking();
  // const module = await import ('./orders.js')
  // const getDeliveryDate = module.getDeliveryDate;



async function renderOrderTracking () {
  const url = new URL (window.location.href);
  const orderId = url.searchParams.get('orderId');
  const cartItemId = url.searchParams.get('cartItemId');
  console.log('Current order Id:',orderId);
  console.log('Current productId:',cartItemId);




  const matchingOrder =  orders.find((order)=>order.id === orderId);
  const productsOfOrder =  matchingOrder.products;
  const matchingCartItem = productsOfOrder.find((product)=> product.productId === cartItemId);
  const matchingProduct = getProduct(matchingCartItem.productId);

  const orderTime = matchingOrder.orderTime;
  const deliveryOptionId = matchingCartItem.deliveryOptionId;
  const deliveryTime = getDeliveryDateTracking(orderTime,deliveryOptionId)

  //make progress bar active
  const percentProgress = calculateProgressDelivery(matchingOrder,deliveryTime);
  let orderTrackingHTML = `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveryTime}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingCartItem.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${
            percentProgress < 50 ? 'current-status' : ''
          }">
            Preparing
          </div>
          <div class="progress-label current-status" ${
            percentProgress >=50 && percentProgress <100 ? 'current-status' : ''
          }>
            Shipped
          </div>
          <div class="progress-label" ${
            percentProgress >=100 ? 'current-status' : ''
          }>
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style = "width: ${percentProgress}%"></div>
        </div>
      </div>

  `
  
  document.querySelector('.main')
    .innerHTML = orderTrackingHTML;
}

function getDeliveryDateTracking (orderTime,deliveryOptionId) {
    let matchingProduct = FindDeliveryOption(deliveryOptionId)
    const d = dayjs(orderTime);
    const deliveryDate = d.add(matchingProduct.deliveryDays,'days');
    return deliveryDate.format('dddd, MMMM D, YYYY');
}
 function calculateProgressDelivery(order,deliveryTime) {
  const currentTime = dayjs().toDate(); // ngày hiện tại - kể từ lúc vào trang tracking - today
  const orderTime = new Date (order.orderTime);
  const changeDeliveryTime = new Date (deliveryTime);
  const percentProgress = (currentTime-orderTime) / (changeDeliveryTime - orderTime) *100;
  console.log('Percent (%) Delivery Time;',percentProgress);
  return percentProgress;
}