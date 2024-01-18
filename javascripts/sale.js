const products = [
  {
  id: 1,
  name: "オリジナルブレンド200g",
  price: 500,
  },
  {
    id: 2,
    name:"オリジナルブレンド500g",
    price: 900,
  },
  {
    id: 3,
    name: "スペシャルブレンド200g",
    price: 700,
  },
  {
    id: 4,
    name: "スペシャルブレンド500g",
    price: 1200,
  }
]
const priceElement  = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
  const targetId = parseInt(priceElement.options[priceElement.selectedIndex].value);
  const product = products.find(item => item.id == targetId);
  const number = numberElement.value;

  let purchase = {
    product: product,
    number: parseInt(number),
  };

  const newPurchase = purchases.findIndex((item) => item.product.id === purchase.product.id)
  if (purchases.length < 1 || newPurchase === -1) {
    purchases.push(purchase)
  } else {
    purchases[newPurchase].number += purchase.number
  }
  //ここ難しい。

  window.alert(`${display()}\n小計${subtotal()}円`);
  priceElement.value = "";
  numberElement.value = "";//displayに出た表示と小計を表示。その後、一旦空にする。
}

function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.product.price * purchase.number;
  }, 0)//小計を表す。前の小計分と追加した分の値段✖️個数分を合算して返す。
}

function display() {
  return purchases.map(purchase => {
    return `${purchase.product.name} ${purchase.product.price}円:${purchase.number}点\n`;//商品名、値段、個数を追加した分だけ返す表示
  }).join("")
};

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0
  } else if (sum < 1000) {
    return 500
  } else {
    return 250
  } //送料の計算。
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`${display()}\n小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  priceElement.value = "";
  numberElement.value = "";
} //合計ボタンを押した時に表示される。
