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

// selectbox 찾기
const $selectBox = document.getElementById("products");

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

productsSelectBox();
