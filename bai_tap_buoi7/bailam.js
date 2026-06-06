
const tenInput = document.getElementById("ten-sp");
const giaInput = document.getElementById("gia-sp");
const btnThem = document.getElementById("btn-them");
const btnXoaHet = document.getElementById("btn-xoa-het");
const container = document.getElementById("container");
const demSp = document.getElementById("dem-sp");

let danhSach = [];

function render() {
  const htmls = danhSach.map(sp => `
    <div class="card">
      <h4>${sp.ten}</h4>
      <p>Giá: ${sp.gia.toLocaleString()}đ</p>
    </div>
  `).join("");
  
  container.innerHTML = htmls;
  
  demSp.innerText = `Tổng: ${danhSach.length} sản phẩm`;
}

btnThem.addEventListener("click", () => {
  const ten = tenInput.value.trim();
  const gia = giaInput.value.trim();

  if (!ten || !gia) return;

  const sanPhamMoi = {
    id: Date.now(), 
    ten: ten,
    gia: Number(gia) 
  };
  
  danhSach.push(sanPhamMoi);
  
  render();

  tenInput.value = "";
  giaInput.value = "";
});

btnXoaHet.addEventListener("click", () => {
  danhSach = [];
  
  container.innerHTML = "";
  
  demSp.innerText = "Tổng: 0 sản phẩm";
});

const tabs = document.querySelectorAll(".tab");
const noiDung = document.getElementById("noi-dung");

const duLieu = {
  ao:   [{ ten: "Áo thun", gia: 250000 }, { ten: "Áo khoác", gia: 650000 }],
  quan: [{ ten: "Quần jean", gia: 450000 }, { ten: "Quần short", gia: 180000 }],
  giay: [{ ten: "Giày sneaker", gia: 800000 }, { ten: "Giày da", gia: 1200000 }],
};


noiDung.innerHTML = duLieu["ao"].map(sp => `
  <div class="product-item">
    <strong>${sp.ten}</strong> - ${sp.gia.toLocaleString()}đ
  </div>
`).join("");



tabs.forEach(tab => {
  tab.addEventListener("click", (e) => {
    tabs.forEach(t => t.classList.remove("active"));
    
    e.target.classList.add("active");
    
    const selectedTab = e.target.getAttribute("data-tab");
    
    const danhSachSp = duLieu[selectedTab]; 
    
    noiDung.innerHTML = danhSachSp.map(sp => `
      <div class="product-item">
        <strong>${sp.ten}</strong> - ${sp.gia.toLocaleString()}đ
      </div>
    `).join("");
  });
}); 

const dsSanPham = document.getElementById("ds-san-pham");
const dsGio = document.getElementById("ds-gio");
const soLuongHtml = document.getElementById("so-luong");
const tongTienHtml = document.getElementById("tong-tien");

const sanPhams = [ 
  { id: 1, ten: "Áo thun", gia: 250000 }, 
  { id: 2, ten: "Quần jean", gia: 450000 }, 
  { id: 3, ten: "Giày sneaker", gia: 800000 }, 
];
const gio = []; 

dsSanPham.innerHTML = sanPhams.map(sp => `
  <div style="margin-bottom: 8px;">
    <span>${sp.ten} - ${sp.gia.toLocaleString()}đ</span>
    <button onclick="themVaoGio(${sp.id})">Thêm vào giỏ</button>
  </div>
`).join("");


window.themVaoGio = function(id) {
  
  const spChon = sanPhams.find(sp => sp.id === id);
  
  const spTrongGio = gio.find(item => item.id === id);
  
  if (spTrongGio) {
    spTrongGio.soLuong += 1;
  } else {
    gio.push({ ...spChon, soLuong: 1 });
  }
  
  dsGio.innerHTML = gio.map(item => `
    <div>${item.ten} x ${item.soLuong} = ${(item.gia * item.soLuong).toLocaleString()}đ</div>
  `).join("");
  
  const tongSoLuong = gio.reduce((sum, item) => sum + item.soLuong, 0);
  
  const tongTien = gio.reduce((sum, item) => sum + (item.gia * item.soLuong), 0);
  
  soLuongHtml.innerText = tongSoLuong;
  tongTienHtml.innerText = tongTien.toLocaleString();
};
const tenHvInput = document.getElementById("ten-hv");
const diemInput = document.getElementById("diem");
const btnThem1 = document.getElementById("btn-them1");
const btnXoaHet1 = document.getElementById("btn-xoa-het1");
const noiDungBang = document.getElementById("noi-dung-bang");
const thongKeHtml = document.getElementById("thong-ke");

let danhSachDiem = []; // Thống nhất dùng mảng này xuyên suốt bài 12

btnThem1.addEventListener("click", () => {
  const ten = tenHvInput.value.trim();
  const diemText = diemInput.value.trim();
  const diem = parseFloat(diemText);

  if (!ten || diemText === "" || isNaN(diem) || diem < 0 || diem > 10) {
    alert("Vui lòng nhập tên hợp lệ và điểm từ 0 đến 10!");
    return;
  }

  let xl = "Yếu";
  if (diem >= 8) xl = "Giỏi";
  else if (diem >= 6.5) xl = "Khá";
  else if (diem >= 5) xl = "TB";

  // Đã sửa: danhSach1 -> danhSachDiem
  danhSachDiem.push({
    id: Date.now(),
    ten: ten,
    diem: diem,
    xepLoai: xl
  });

  // Đã sửa: danhSach1 -> danhSachDiem
  noiDungBang.innerHTML = danhSachDiem.map((hv, index) => {
    let classNen = "";
    if (hv.xepLoai === "Giỏi") classNen = "bg-gioi";
    if (hv.xepLoai === "Yếu") classNen = "bg-yeu";

    return `
      <tr class="${classNen}">
        <td>${index + 1}</td>
        <td>${hv.ten}</td>
        <td>${hv.diem}</td>
        <td>${hv.xepLoai}</td>
        <td><button class="btn-xoa" onclick="xoaHocVien(${hv.id})">Xóa</button></td>
      </tr>
    `;
  }).join("");

  const tongSoHv = danhSachDiem.length;
  const tongDiem = danhSachDiem.reduce((sum, hv) => sum + hv.diem, 0);
  const diemTB = (tongSoHv > 0 ? (tongDiem / tongSoHv).toFixed(1) : 0);
  const diemCaoNhat = (tongSoHv > 0 ? Math.max(...danhSachDiem.map(hv => hv.diem)) : 0);
  
  thongKeHtml.innerText = `Tổng: ${tongSoHv} học viên | Điểm TB: ${diemTB} | Cao nhất: ${diemCaoNhat}`;

  tenHvInput.value = "";
  diemInput.value = "";
});

window.xoaHocVien = function(id) {
  danhSachDiem = danhSachDiem.filter(hv => hv.id !== id);

  noiDungBang.innerHTML = danhSachDiem.map((hv, index) => {
    let classNen = "";
    if (hv.xepLoai === "Giỏi") classNen = "bg-gioi";
    if (hv.xepLoai === "Yếu") classNen = "bg-yeu";

    return `
      <tr class="${classNen}">
        <td>${index + 1}</td>
        <td>${hv.ten}</td>
        <td>${hv.diem}</td>
        <td>${hv.xepLoai}</td>
        <td><button class="btn-xoa" onclick="xoaHocVien(${hv.id})">Xóa</button></td>
      </tr>
    `;
  }).join("");

  // Đã sửa: danhSach1 -> danhSachDiem
  if (danhSachDiem.length === 0) {
    thongKeHtml.innerText = "Tổng: 0 học viên | Điểm TB: 0 | Cao nhất: 0";
  } else {
    const tongSoHv = danhSachDiem.length;
    const tongDiem = danhSachDiem.reduce((sum, hv) => sum + hv.diem, 0);
    const diemTB = (tongDiem / tongSoHv).toFixed(1);
    const diemCaoNhat = Math.max(...danhSachDiem.map(hv => hv.diem));

    thongKeHtml.innerText = `Tổng: ${tongSoHv} học viên | Điểm TB: ${diemTB} | Cao nhất: ${diemCaoNhat}`;
  }
};

btnXoaHet1.addEventListener("click", () => {
  danhSachDiem = []; // Đã sửa: danhSach1 -> danhSachDiem
  noiDungBang.innerHTML = "";
  thongKeHtml.innerText = "Tổng: 0 học viên | Điểm TB: 0 | Cao nhất: 0";
});