function showSection(id){
document.querySelectorAll("section").forEach(sec=>sec.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

const hargaProduk={
"Robot Mainan":170000,
"Boneka Lucu":80000,
"Lego Anak":55000,
"Mobil Remote":150000,
"Puzzle Edukasi":78000,
"Barbie Cantik":100000
};

let pesanan=[];

function tambahKeranjang(produk){
let found=pesanan.find(item=>item.produk===produk);
if(found){found.jumlah++;}else{pesanan.push({produk:produk,jumlah:1});}
loadData();
}

function loadData(){
let dataPesanan=document.getElementById("dataPesanan");
let total=0;
dataPesanan.innerHTML="";

pesanan.forEach((item,index)=>{
let subtotal=hargaProduk[item.produk]*item.jumlah;
total+=subtotal;

dataPesanan.innerHTML+=`
<tr>
<td>${item.produk}</td>
<td>Rp ${hargaProduk[item.produk].toLocaleString()}</td>
<td>
<button onclick="kurang(${index})">-</button>
${item.jumlah}
<button onclick="tambah(${index})">+</button>
</td>
<td>Rp ${subtotal.toLocaleString()}</td>
<td><button onclick="hapus(${index})">Hapus</button></td>
</tr>`;
});

document.getElementById("grandTotal").textContent=total.toLocaleString();
document.getElementById("cartCount").textContent=pesanan.length;
}

function tambah(i){pesanan[i].jumlah++;loadData();}
function kurang(i){if(pesanan[i].jumlah>1)pesanan[i].jumlah--;loadData();}
function hapus(i){pesanan.splice(i,1);loadData();}

function checkout(){
if(pesanan.length==0){alert("Keranjang kosong!");return;}

let nama=document.getElementById("namaPembeli").value;
let alamat=document.getElementById("alamatPembeli").value;

if(nama==""||alamat==""){
alert("Nama & Alamat wajib diisi!");
return;
}

let metode=document.getElementById("metodeBayar").value;
let total=0;

let struk="<h2>STRUK</h2><hr>";
struk+=`Nama: ${nama}<br>Alamat: ${alamat}<hr>`;

pesanan.forEach(item=>{
let sub=hargaProduk[item.produk]*item.jumlah;
total+=sub;
struk+=`${item.produk} (${item.jumlah}) = Rp ${sub.toLocaleString()}<br>`;
});

struk+=`<hr>Metode: ${metode}<br>Total: Rp ${total.toLocaleString()}`;
struk+="<br><br>Terima kasih 😊";

document.getElementById("receipt").innerHTML=struk;
document.getElementById("receipt").style.display="block";

pesanan=[];
loadData();

document.getElementById("namaPembeli").value="";
document.getElementById("alamatPembeli").value="";
}