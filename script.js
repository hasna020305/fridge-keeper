// 화면에서 사용할 요소 찾기
const foodForm = document.getElementById("food-form");
const foodName = document.getElementById("food-name");
const expiryDate = document.getElementById("expiry-date");
const quantity = document.getElementById("quantity");
const storage = document.getElementById("storage");
const foodList = document.getElementById("food-list");

// 등록한 식품을 보관할 배열
// 식품 데이터를 저장할 이름
const STORAGE_KEY = "fridge-keeper-foods";

// 기존에 저장한 목록 불러오기
const foods = loadFoods();

function loadFoods() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      throw new Error("식품 목록 형식이 올바르지 않습니다.");
    }

    return parsed;
  } catch (error) {
    console.error("데이터 불러오기 실패:", error);
    alert("저장된 식품 목록을 불러오지 못했습니다.");
    return [];
  }
}

// 현재 식품 목록 저장
function saveFoods() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
  } catch (error) {
    console.error("데이터 저장 실패:", error);
    alert("데이터를 저장하지 못했습니다. 브라우저 설정을 확인해 주세요.");
  }
}

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

  foods.forEach(function (food, index) {
    const row = document.createElement("tr");

    const values = [
      food.name,
      food.expiryDate,
      food.quantity,
      food.storage,
      "계산 기능 준비 중",
    ];

    values.forEach(function (value) {
  const cell = document.createElement("td");
  cell.textContent = value;
  row.appendChild(cell);
});

// 관리 칸에 삭제 버튼 만들기
const manageCell = document.createElement("td");
const deleteButton = document.createElement("button");

deleteButton.type = "button";
deleteButton.textContent = "삭제";
deleteButton.className = "delete-button";
deleteButton.setAttribute("aria-label", food.name + " 삭제");

// 버튼 클릭 시 해당 식품 삭제
deleteButton.addEventListener("click", function () {
  const confirmed = confirm(food.name + "을(를) 삭제할까요?");

  if (confirmed) {
    foods.splice(index, 1);
    saveFoods();
    renderFoods();
  }
});

manageCell.appendChild(deleteButton);
row.appendChild(manageCell);

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
  saveFoods();
  renderFoods();

  // 등록 후 입력 칸 초기화
  foodForm.reset();
  foodName.focus();
});

renderFoods();