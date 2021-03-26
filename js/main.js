
// $(document).ready(function(){
  
// });
const currentLocation = location.href;
const menuItem = document.querySelectorAll('li a');


const menuLength = menuItem.length
for ( let i = 0; i <menuLength; i++){
    if(menuItem[i].href === currentLocation){
        menuItem[i].className = "nav-link aktif";
        // menuItem[i].parentNode.className = "nav-item aktif";
       
    }
  
}

// back to top

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('#topBtn').fadeIn();
        } else {
            $('#topBtn').fadeOut();
        }
    });
    $('#topBtn').click(function () {
        $('html, body ').animate({
            scrollTop: 0
        }, 800);
    });

   
});
// }

// loader
setTimeout(function () {
    $('.progress-container').fadeToggle();
}, 500);



function set_titik(param, separator) {
    var param_ = param.toString();
    var jumlah = param_.length;
    var split_ = typeof separator === "undefined" ? "." : separator;
    var result = "";
    while (true) {
        if (jumlah > 3) {
            jumlah = jumlah - 3;
            result = split_ + param_.substr(jumlah, 3) + result;
        } else {
            result = param_.substr(0, jumlah) + result;
            break;
        }
    }
    return result;
}

$.getJSON('https://apicovid19indonesia-v2.vercel.app/api/indonesia', function(hasil){
    
    // dirawat, sembuh, meninggal, positif
    // var total = 0;
    $('#confirmed').append(`<p style="color:#faa307" id="isikonfirm">---</p>`);
    $('#recovered').append(`<p style="color:#2a9d8f" id="isisembuh">---</p>`) ;
    $('#hospital').append(`<p style="color:#f4a261" id="isidirawat">---</p>`) ;
    $('#rip').append(`<p style="color:#e63946" id="isimeninggal">---</p>`) ;
    setTimeout(() => {

        $('#isikonfirm').html(`${set_titik(hasil.positif)}`);
        $('#isisembuh').html(`${set_titik(hasil.sembuh)}`) ;
        $('#isidirawat').html(`${set_titik(hasil.dirawat)}`) ;
        $('#isimeninggal').html(`${set_titik(hasil.meninggal)}`) ;
},1000);
// console.log(hasil[2].attributes);


    // })
});

$.getJSON('https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian', function(data){
    // console.log(data);
    var update = data;
        var panjang = update.length-1;
        $('#posIndoPerHari').append(`<p style="color:#faa307" id="positifperhari">---</p>`);
        $('#semIndoPerHari').append(`<p style="color:#2a9d8f" id="sembuhperhari">---</p>`) ;
        $('#menIndoPerHari').append(`<p style="color:#e63946" id="meninggalperhari">---</p>`) ;

        setTimeout(() => {
        $('#positifperhari').html(`${set_titik(update[panjang].positif)}`);
        $('#sembuhperhari').html(`${set_titik(update[panjang].sembuh)}`) ;
        $('#meninggalperhari').html(`${set_titik(update[panjang].meninggal)}`) ;
        $('#update').append(`<p style="color:#007bff; fonst-size:10px" id="updateisi">${update[panjang].tanggal.substr(0,10)}</p>`) ;
        // console.log(update[panjang] );
    },1000);

});


$.getJSON('//apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi', function(data){
 var dataAll =data;
 var i=1;
$.each(dataAll, function(i,data){
    $('#isitabel').append(`<tr>
        <td>${i+1}</td>
        <td>${data.provinsi}</td>
        <td>${set_titik(data.kasus)}</td>
        <td>${set_titik(data.sembuh)}</td>
        <td>${set_titik(data.meninggal)}</td>        
    </tr>`);
})
}); 




// function scrollText() {
//   var textJumbo = document.querySelector('.text-jumbo');
//   var textJumboPosition = textJumbo.getBoundingClientRect().top;
//   var textScreen = window.innerHeight;

//   if (textJumboPosition < textScreen) {
//       textJumbo.classList.add('text-view');
//   }


// }
// window.addEventListener('scroll', scrollText);

const nav = document.querySelector('nav')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight ) {
        nav.classList.add('bg-light');
        nav.classList.add('shadow');
        
        
    } else {
        nav.classList.remove('bg-light');
        nav.classList.remove('shadow');
        
    }
}