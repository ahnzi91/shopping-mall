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

$selectBox.addEventListener("change", updateSelectedProducts);
productsSelectBox();
