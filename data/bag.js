let ConvenienceFees = 99;
let bagItemObjects;
onLoad();

//onpage load function
function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummery();
}

//display bag summery function
function displayBagSummery() {
  let bagSummeryElement = document.querySelector(".bag-summary");

  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach((bagitem) => {
    totalMRP += bagitem.original_price;
    totalDiscount += bagitem.original_price - bagitem.current_price;
  });
  let finalAmount = totalMRP - totalDiscount + ConvenienceFees;
  ConvenienceFees = 0;
  bagSummeryElement.innerHTML = `<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹ ${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount"
      >₹ ${totalDiscount}</span
    >
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">₹ 99</span>
  </div>
  <hr />
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹ ${finalAmount}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>
</div>`;
}
//load bag Items function
function loadBagItemObjects() {
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

//display bag items
function displayBagItems() {
  console.log(bagItems);
  let containerElement = document.querySelector(".bag-items-container");
  let bagInnerHtml = "";

  bagItemObjects.forEach((bagItem) => {
    bagInnerHtml += generateItemsHtml(bagItem);
  });
  containerElement.innerHTML = bagInnerHtml;
}

//remove bag Items function
function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummery();
}

//generate bag Item UI function
function generateItemsHtml(item) {
  return `
  <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}" />
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">
               ${item.item_name}
              </div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
          </div>`;
}
