// 화면에서 사용할 요소 찾기
const foodForm = document.getElementById("food-form");
const foodName = document.getElementById("food-name");
const expiryDate = document.getElementById("expiry-date");
const quantity = document.getElementById("quantity");
const storage = document.getElementById("storage");
const foodList = document.getElementById("food-list");

// 등록한 식품을 보관할 배열
const foods = [];

// 식품 목록을 화면에 표시
function renderFoods() {
  foodList.replaceChildren();

  if (foods.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 6;
    cell.textContent = "등록된 식품이 없습니다.";

    row.appendChild(cell);
    foodList.appendChild(row);
    return;
  }

  foods.forEach(function (food) {
    const row = document.createElement("tr");

    const values = [
      food.name,
      food.expiryDate,
      food.quantity,
      food.storage,
      "계산 기능 준비 중",
      "-"
    ];

    values.forEach(function (value) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    foodList.appendChild(row);
  });
}

// 식품 추가 버튼을 누르면 실행
foodForm.addEventListener("submit", function (event) {
  // 기본 제출 동작으로 인한 페이지 새로고침 방지
  event.preventDefault();

  const name = foodName.value.trim();
  const count = Number(quantity.value);

  if (name === "") {
    alert("식품 이름을 입력해 주세요.");
    foodName.focus();
    return;
  }

  if (!Number.isSafeInteger(count) || count < 1) {
    alert("수량은 1 이상의 정수로 입력해 주세요.");
    quantity.focus();
    return;
  }

  const food = {
    name: name,
    expiryDate: expiryDate.value,
    quantity: count,
    storage: storage.value
  };

  foods.push(food);
  renderFoods();

  // 등록 후 입력 칸 초기화
  foodForm.reset();
  foodName.focus();
});

renderFoods();