"use strict";

function Product(name, price) {
  this.name = name;
  this.price = price;
}

let products = [
  new Product("대뱃살", 3000),
  new Product("목살", 5000),
  new Product("배꼽살", 4000),
  new Product("중뱃살", 5000),
];

// DOM 찾기
// 상품 정보 목록 selectbox
const $selectBox = document.getElementById("products");
// 선택된 상품 목록 ul
const $selectedProducts = document.getElementById("selectedProducts");
// 총 가격 div
const $totalPrice = document.getElementById("totalPrice");
// 결제하기 button
const $paymentButton = document.getElementById("paymentButton");

// 조건 1. JS의 상품 정보대로 아래처럼 초기 화면이 나와야 한다.
function productsSelectBox() {
  // products 배열 안의 요소들을 하나씩 찾아서 option으로 만들어줘야 한다.
  products.forEach((product) => {
    // option 요소 생성
    const $option = document.createElement("option");
    $option.value = product.name;
    $option.textContent = `${product.name} - ${product.price}`;

    // selectbox에 option 추가
    $selectBox.appendChild($option);
  });
}

// 조건 2. 유저가 상품을 선택하면 아래처럼 선택된 상품 정보가 출력되어야 한다.
function updateSelectedProducts() {
  // 선택된 상품들 저장
  let selectedProducts = [];

  // 선택된 옵션을 selectedProducts 배열에 저장하기 위함
  Array.from($selectBox.selectedOptions).forEach((option) => {
    const productName = option.value;
    const product = products.find((p) => p.name === productName);
    selectedProducts.push(product);
  });

  let totalPrice = 0;

  $selectedProducts.innerHTML = "";

  selectedProducts.forEach((product) => {
    totalPrice += product.price;

    const $li = document.createElement("li");
    $li.textContent = `${product.name} - ${product.price}`;
    $selectedProducts.appendChild($li);
  });

  $totalPrice.textContent = `총액 : ${totalPrice}`;
}

// 결제 버튼 처리
function handlePayment() {
  const selectedOptions = Array.from($selectBox.selectedOptions);

  if (selectedOptions.length === 0) {
    alert("결제할 상품을 선택해야 합니다.");
  } else {
    const totalAmount = selectedOptions.reduce((total, option) => {
      const product = products.find((p) => p.name === option.value);
      return total + product.price;
    }, 0);

    // 새로운 창에 총 가격 보여주기
    const paymentWindow = window.open("", "_blank", "width=400,height=300");
    paymentWindow.document.write(`
      <h3>결제창</h3>
      <p>${totalAmount} 원을 결제하겠습니다.</p>
      <p>신용카드 번호를 입력하고 결제 버튼을 눌러주세요.</p>
      <input type="text" id="cardNumber" placeholder="카드 번호 입력" />
      <button id="confirmPaymentButton">결제</button>
      <script>
        document.getElementById('confirmPaymentButton').onclick = function() {
          const cardNumber = document.getElementById('cardNumber').value;
          if (cardNumber) {
            alert(cardNumber + '로 ' + ${totalAmount} + ' 원이 결제 완료 되었습니다.');
            window.close(); // 결제 후 창 닫기
          } else {
            alert("신용카드 번호를 입력하세요.");
          }
        };
      </script>
    `);
  }
}

$selectBox.addEventListener("change", updateSelectedProducts);
$paymentButton.addEventListener("click", handlePayment);

productsSelectBox();
