const danhSachHocVien = [
    { id:1, ten:"Nguyễn Văn A", lop:"Web01", diem:9.2 },
    { id:2, ten:"Trần Thị B", lop:"Web01", diem:6.5 },
    { id:3, ten:"Lê Văn C", lop:"Web02", diem:4.8 },
    { id:4, ten:"Phạm Văn D", lop:"Web02", diem:8.3 },
    { id:5, ten:"Nguyễn Thị E", lop:"Web03", diem:5.5 },
    { id:6, ten:"Đặng Văn F", lop:"Web03", diem:7.2 },
    { id:7, ten:"Nguyễn Văn G", lop:"Web01", diem:9.5 },
    { id:8, ten:"Trần Văn H", lop:"Web02", diem:3.5 },
    { id:9, ten:"Lý Thị I", lop:"Web03", diem:6.8 },
    { id:10, ten:"Hoàng Văn K", lop:"Web01", diem:8.8 }
];

const bangHocVien = document.querySelector("#tbody");
const oTimKiem = document.querySelector("#search");
const boLocXepLoai = document.querySelector("#filter");
const thongKe = document.querySelector("#thong-ke");
const formThem = document.querySelector("#form-them");
const nutThemHocVien = document.querySelector("#btn-them");
const oNhapTen = document.querySelector("#ten");
const oNhapLop = document.querySelector("#lop");
const oNhapDiem = document.querySelector("#diem");
const nutLuu = document.querySelector("#luu");
let cotSapXep = "";
let sapXepTangDan = true;
function xepLoai(diem){

    if(diem >= 8){
        return "Giỏi";
    }

    if(diem >= 6.5){
        return "Khá";
    }

    if(diem >= 5){
        return "TB";
    }

    return "Yếu";
}

function render(){

    let duLieu = [...danhSachHocVien];

    const tuKhoa = oTimKiem.value.toLowerCase();

    duLieu = duLieu.filter(hocVien =>
        hocVien.ten.toLowerCase().includes(tuKhoa)
    );

    if(boLocXepLoai.value !== "Tất cả"){

        duLieu = duLieu.filter(hocVien =>
            xepLoai(hocVien.diem) === boLocXepLoai.value
        );

    }

    if(cotSapXep){

        duLieu.sort((a,b)=>{
            if(typeof a[cotSapXep] === "string"){

                if(sapXepTangDan){
                    return a[cotSapXep].localeCompare(b[cotSapXep]);
                }

                return b[cotSapXep].localeCompare(a[cotSapXep]);
            }
            document.getElementById("mui-ten").textContent = sapXepTangDan ? "▼" : "▲";
            if(sapXepTangDan){
                return a[cotSapXep] - b[cotSapXep];
                
            }
            return b[cotSapXep] - a[cotSapXep];

        });
    }

    bangHocVien.innerHTML = duLieu.map((hocVien,index)=>{

        const loai = xepLoai(hocVien.diem);

        let mau = "";

        if(loai === "Giỏi"){
            mau = "gioi";
        }
        else if(loai === "Khá"){
            mau = "kha";
        }
        else if(loai === "TB"){
            mau = "tb";
        }
        else{
            mau = "yeu";
        }

        return `
            <tr>
                <td>${index + 1}</td>
                <td>${hocVien.ten}</td>
                <td>${hocVien.lop}</td>
                <td>${hocVien.diem}</td>

                <td>
                    <span class="badge ${mau}">
                        ${loai}
                    </span>
                </td>

                <td>
                    <button
                        class="xoa"
                        data-id="${hocVien.id}">
                        Xóa
                    </button>
                </td>
            </tr>
        `;
    })

    thongKe.textContent = `Hiển thị ${duLieu.length} / ${danhSachHocVien.length} học viên`;
}

render();

oTimKiem.addEventListener("input", render);

boLocXepLoai.addEventListener("change", render);

document.querySelectorAll("th[data-sort]").forEach(tieuDe => {

    tieuDe.addEventListener("click", ()=>{

        const cotDuocChon = tieuDe.dataset.sort;

        if(cotSapXep === cotDuocChon){

            sapXepTangDan = !sapXepTangDan;

        }else{

            cotSapXep = cotDuocChon;
            sapXepTangDan = true;
        }

        render();
    });

});

bangHocVien.addEventListener("click",(e)=>{
    const id = Number(e.target.dataset.id);
    confirm("Bạn có chắc muốn xóa?");
    const viTri = danhSachHocVien.findIndex(
        hocVien => hocVien.id === id
    );

    if(viTri !== -1){

        danhSachHocVien.splice(viTri,1);

        render();
    }

});

nutThemHocVien.addEventListener("click",()=>{

    formThem.classList.toggle("hidden");

});

nutLuu.addEventListener("click",()=>{

    const tenMoi = oNhapTen.value;
    const lopMoi = oNhapLop.value;
    const diemMoi = Number(oNhapDiem.value);

    if(tenMoi === ""){

        alert("Vui lòng nhập tên");

        return;
    }

    if(lopMoi === ""){

        alert("Vui lòng nhập lớp");

        return;
    }

    if(diemMoi < 0 || diemMoi > 10){

        alert("Điểm phải từ 0 đến 10");

        return;
    }

    danhSachHocVien.unshift({
        id: Date,
        ten: tenMoi,
        lop: lopMoi,
        diem: diemMoi
    });

    oNhapTen.value = "";
    oNhapLop.value = "";
    oNhapDiem.value = "";

    render();
});