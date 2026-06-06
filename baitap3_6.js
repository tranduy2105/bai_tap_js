const form = document.getElementById("form");
const ten = document.getElementById("ten");
const tuoi = document.getElementById("tuoi");
const danhSach = document.getElementById("danh-sach");

const hocViens = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const hoTen = ten.value;
  const tuoi1 = Number(tuoi.value);
  if (hoTen === "") {
    alert("Vui lòng nhập tên");
    return;
  }
  if (tuoi1 < 1 || tuoi1 > 100) {
    alert("Tuổi không hợp lệ");
    return;
  }
  hocViens.push({
    ten: hoTen,
    tuoi: tuoi1
  });
  danhSach.innerHTML = hocViens.map(hv => `<li>${hv.ten} - ${hv.tuoi} tuổi</li>`)
    .join("");
});

[ten, tuoi].forEach(input => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
    hocViens.push({
    ten: hoTen,
    tuoi: tuoi1
  });
    }

    if (e.key === "Escape") {
      ten.value = "";
      tuoi.value = "";
    }
  });
});

const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const password = document.getElementById("password");
const pwError = document.getElementById("pw-error");
const submitBtn = document.getElementById("submit-btn");

email.addEventListener("blur", () => {
  if (!email.value.includes("@") || !email.value.includes(".")) {
    emailError.textContent = "Email không hợp lệ";
    email.classList.add("invalid");
  } else {
    emailError.textContent = "";
  }
  submitBtn.disabled =
    !(
      email.value.includes("@") &&
      email.value.includes(".") &&
      password.value.length >= 6
    );
});

email.addEventListener("focus", () => {
  emailError.textContent = "";
  email.classList.remove("invalid");
});

password.addEventListener("blur", () => {
  if (password.value.length < 6) {
    pwError.textContent = "Mật khẩu ít nhất 6 ký tự";
  } else {
    pwError.textContent = "";
  }

  submitBtn.disabled =
    !(
      email.value.includes("@") &&
      email.value.includes(".") &&
      password.value.length >= 6
    );
});

password.addEventListener("input", () => {
  if (password.value.length < 6) {
    pwError.textContent = "Mật khẩu ít nhất 6 ký tự";
  } else {
    pwError.textContent = "";
  }
}); 

const container = document.getElementById("container");

const sanPhams = [
  { id: 1, ten: "Áo thun", gia: 250000, soLuong: 10 },
  { id: 2, ten: "Quần jean", gia: 450000, soLuong: 5 },
  { id: 3, ten: "Giày sneaker", gia: 800000, soLuong: 2 },
  { id: 4, ten: "Mũ bucket", gia: 150000, soLuong: 0 },
];

function render() {
  container.innerHTML = "";
  for (const sp of sanPhams) {
    container.innerHTML = sanPhams
  .map(sp => `
      <div class="${sp.soLuong === 0 ? "het-hang" : ""}">
        <h3>${sp.ten}</h3>
        <p>Giá: ${sp.gia} VNĐ</p>
        <p>Số lượng: ${sp.soLuong}</p>
        <button class="them-gio" data-id="${sp.id}" ${sp.soLuong === 0 ? "disabled" : ""}>Thêm giỏ</button>
        <button class="xoa" data-id="${sp.id}">Xóa</button>
      </div>
    `)
    .join("");
  }
  let tongTonKho = 0;
  for (const sp of sanPhams) {
    tongTonKho += sp.soLuong;
  }
  console.log(
    `Còn lại ${sanPhams.length} sản phẩm, tổng tồn kho ${tongTonKho} cái`
  );
}
render();
container.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("them-gio")) {
    const sp = sanPhams.find(sp => sp.id === id);
    if (sp.soLuong > 0) {
      sp.soLuong--;
    }
    render();
  }

  if (e.target.classList.contains("xoa")) {
    const index = sanPhams.findIndex(sp => sp.id === id);
    sanPhams.splice(index, 1);
    render();
  }
});