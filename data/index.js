let itemsContainerElement = document.querySelector(".items-container");

let bagItems;
onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displyItemsOnHomePage();
  displayBagIcon();
}

//add to bag button function
function addToBag(itemsId) {
  bagItems.push(itemsId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

//display bagIcon function
function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

//display items on HomePage function
function displyItemsOnHomePage() {
  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = "";
  items.forEach((items) => {
    innerHtml += `
    <div class="item-container">
    <img class="item-img" src="${items.image}" alt="1.jpg" />
    <div class="stars">${items.rating.stars}⭐ | ${items.rating.count}k</div>
    
    <div class="company">${items.company}</div>
    <div class="item-name">${items.item_name}</div>
    <div class="price-container">
    <span class="current-price">Rs ${items.current_price}</span>
    <span class="original-price">Rs ${items.original_price}</span>
    <span class="discount-percentage">(${items.discount_percentage} OFF)</span>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${items.id})">Add to Bag</button>
    </div>
    </div>
     
    `;
  });
  itemsContainerElement.innerHTML = innerHtml;
}
