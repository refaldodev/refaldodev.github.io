


    

setTimeout(function () {
    $('.loader_bg').fadeToggle();
}, 500);

function scrollAppear() {
    var tabel = document.querySelector('.tabel');
    var tabelPosition = tabel.getBoundingClientRect().top;
    var screenPosition = window.innerHeight;

    if (tabelPosition < screenPosition) {
        tabel.classList.add('tabel-appear');
    }
}

window.addEventListener('scroll', scrollAppear);


function scrollGambar() {
    var gambar = document.querySelector('.gambar');
    var gambarPosition = gambar.getBoundingClientRect().top;
    var gambarScreen = window.innerHeight;

    if (gambarPosition < gambarScreen) {
        gambar.classList.add('gambar-view');
    }


}
window.addEventListener('scroll', scrollGambar);



function scrollText() {
    var textJumbo = document.querySelector('.text-jumbo');
    var textJumboPosition = textJumbo.getBoundingClientRect().top;
    var textScreen = window.innerHeight;

    if (textJumboPosition < textScreen) {
        textJumbo.classList.add('text-view');
    }


}
window.addEventListener('scroll', scrollText);

function scrollCard() {
    var cardPanel = document.querySelector('.card-corona');
    var cardPosition = cardPanel.getBoundingClientRect().top;
    var cardScreen = window.innerHeight;

    if (cardPosition < cardScreen) {
        cardPanel.classList.add('card-panel-view');
    }


}
window.addEventListener('scroll', scrollCard);


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

// indo


var mymap = L.map('mapid').setView([5, 110], 3.5);

L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {

        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',


    }).addTo(mymap);
fetch(
        "https://api.kawalcorona.com/"
    )
    .then((response) => {
        return response.json();
    })
    .then((peta) => {
        var lat = 0;
        var long = 0;
        var peta_meninggal = 0;
        var peta_postif = 0;
        var peta_sembuh = 0;


        var a = Object.keys(peta).length;

        var div = document.getElementById('negara');
        var country = "";


        for (var p = 0; p < a; p++) {
            L.marker([peta[p].attributes.Lat, peta[p].attributes.Long_]).addTo(mymap)

                .bindPopup("<h6 style='margin-bottom: -16px;'> Country : " + peta[p].attributes.Country_Region +
                    " </h6> <br>" +
                    "<h6 style='margin-bottom: -16px;'> Confirmed : " + set_titik(peta[p].attributes.Confirmed) + " </h6> <br>" +
                    "<h6 style='margin-bottom: -16px;'> Deaths : " + set_titik(peta[p].attributes.Deaths) + " </h6> <br>" +
                    "<h6 style='margin-bottom: -16px;'> Recovered :" + peta[p].attributes.Recovered + " </h6> <br>"


                )
            // .openPopup();

        }




    });
// akhir peta js
const sidenav = document.querySelectorAll('.sidenav');
M.Sidenav.init(sidenav);

const slider = document.querySelectorAll('.slider');
M.Slider.init(slider, {
    indicators: true,
    height: 500,
    transition: 600,
    interval: 3000

});

const parallax = document.querySelectorAll('.parallax');
M.Parallax.init(parallax);


const materialbox = document.querySelectorAll('.materialboxed');
M.Materialbox.init(materialbox);

const scroll = document.querySelectorAll('.scrollspy');
M.ScrollSpy.init(scroll, {
    scrollOffset: 0
});
const carousel = document.querySelectorAll('.carousel');
M.Carousel.init(carousel, {
    indicators: true,
    transition: 600,

    interval: 2000
});


var Jumlah_Sak = [];
var Country = [];
var Jumlah_Semb = [];
var Jumlah_Mat = [];


fetch(
        "https://api.kawalcorona.com/"
    )
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        var jumlah_postif = 0;
        var jumlah_sembuh = 0;
        var jumlah_meninggal = 0;
        var postif = 0;
        var sembuh = 0;
        var meninggal = 0;
        var hasil = "";
        var totalPos = 0;
        var totalMen = 0;
        var totalSem = 0;
        var statPos = 0;
        var statCountry = 0;
        var indoPos = 0;
        var indoMen = 0;
        var IndoSem = 0;


        // function test(data) {
        //     var a = data[32]['attributes']['Confirmed'];

        //     if (a)
        //         console.log(a);
        // }
        // test(data);

        var j = Object.keys(data).length;

        // console.log(j);
        var no = 1;
        for (var i = 0; i < j; i++) {
            jumlah_postif = jumlah_postif + (data[i].attributes.Confirmed);
            jumlah_meninggal += (data[i].attributes.Deaths);
            jumlah_sembuh += (data[i].attributes.Recovered);
            totalPos += (data[i].attributes.Confirmed);
            totalMen += (data[i].attributes.Deaths);
            totalSem += (data[i].attributes.Recovered);
            // if (i == 32) {
            //   postif += Number(data[32].attributes.Confirmed);
            //   sembuh += Number(data[32].attributes.Recovered);
            //   meninggal += Number(data[32].attributes.Deaths);
            // }
            if (data[i].attributes.Country_Region == "Indonesia") {
                indoPos = data[i]['attributes']['Confirmed'];
                IndoSem = data[i]['attributes']['Recovered'];
                indoMen = data[i]['attributes']['Deaths'];
            }

            hasil += "<tr>"
            hasil += "<td>" + no + "</td>\n";
            hasil += "<td>" + data[i].attributes.Country_Region + "</td>\n";
            hasil += "<td>" + set_titik(data[i].attributes.Confirmed) + "</td>\n";
            hasil += "<td>" + data[i].attributes.Recovered + "</td>\n";
            hasil += "<td>" + set_titik(data[i].attributes.Deaths) + "</td>\n";

            hasil += "</tr>\n"
            no++;
            statPos += Number(data[i].attributes.Confirmed);
            statCountry += Number(data[i].attributes.Confirmed);




            //  province[i] = hasil[i].attributes.Provinsi;

            Jumlah_Sak[i] = JSON.parse(data[i].attributes.Confirmed);
            Jumlah_Mat[i] = JSON.parse(data[i].attributes.Deaths);
            Jumlah_Semb[i] = JSON.parse(data[i].attributes.Recovered);
            Country[i] = data[i].attributes.Country_Region;

            jml_sak = Jumlah_Sak;
            jml_sem = jumlah_sembuh;
            jml_mat = Jumlah_Mat;
            negara = Country;
            // console.log(negara);
        }
        // totalPos +=  Number(data[i].attributes.Confirmed);
        // totalMen +=  Number(data[i].attributes.Deaths);
        // totalSem +=  Number(data[i].attributes.Recovered);
        hasil += "<tr>"
        hasil += "<td colspan='2'> Jumlah </td>"
        hasil += "<td> " + set_titik(totalPos) + "</td>"
        hasil += "<td> " + set_titik(totalMen) + "</td>"
        hasil += "<td> " + set_titik(totalSem) + "</td>"

        hasil += "</tr>"

        // positif += data[32].attributes.Confirmed;


        document.getElementById('positif').innerHTML = "Confirmed : " + set_titik(indoPos);
        // 
        document.getElementById('sembuh').innerHTML = "Recovered   : " + set_titik(IndoSem);
        document.getElementById('pos').innerHTML = set_titik(jumlah_postif);
        document.getElementById('men').innerHTML = set_titik(jumlah_meninggal);
        document.getElementById('sem').innerHTML = set_titik(jumlah_sembuh);
        // document.getElementById('positif').innerHTML = positif;
        document.getElementById('isi').innerHTML = hasil;
        document.getElementById('meninggal').innerHTML = "Deaths : " + set_titik(indoMen);



        // call_hightchart();










    });

// for(a= 0; a<j; a++){
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


$(document).ready(function () {

    dataGlobal();
    dataNegara();
    dataTable();

    function dataGlobal() {



        $.ajax({

            url: 'https://coronavirus-19-api.herokuapp.com/all',
            success: function (data) {
                try {
                    var json = data;
                    var kasus = set_titik(data.cases);
                    var meninggal = set_titik(data.deaths);
                    var Sembuh = set_titik(data.recovered);

                    $('#pos').html(kasus);
                    $('#men').html(meninggal);
                    $('#sem').html(Sembuh);
                } catch {
                    alert('error');
                }
            }



        });
    }

    function dataNegara() {
        $.ajax({
            url: 'https://coronavirus-19-api.herokuapp.com/countries',
            success: function (data) {
                try {

                    var json = data;

                    var html = [];

                    if (json.length > 0) {
                        var i;
                        for (i = 0; i < json.length; i++) {
                            var dataNegara = json[i];
                            var namaNegara = dataNegara.country;

                            if (namaNegara === 'Indonesia') {
                                var kasus = set_titik(dataNegara.cases);

                                var mati = set_titik(dataNegara.deaths);
                                var sembuh = set_titik(dataNegara.recovered);

                                $('#data-indo').html(
                                    '<p>Confirmed   : ' + kasus + '</p><br>' + '<p>Deaths         &nbsp : ' + mati + '</p><br>' + '<p>Recovered : ' + sembuh + '</p>'
                                )
                            }
                        }
                    }

                } catch {
                    alert('Error');
                }
            }
        });
    }

    function dataTable() {
        $.ajax({
            url: 'https://coronavirus-19-api.herokuapp.com/countries',
            success: function (data) {
                try {
                    var json = data;
                    var html = [];
                    var hasil = "";
                    var pos = 0;
                    var sem = 0;
                    var mat = 0;

                    var no = 1;
                    if (json.length > 0) {
                        var i;

                        for (i = 0; i < json.length; i++) {

                            var dataAll = json;


                            if (dataAll[i].country != "World") {
                                hasil += "<tr>"
                                hasil += "<td>" + no + "</td>\n";
                                hasil += "<td>" + dataAll[i].country + "</td>\n";
                                hasil += "<td>" + set_titik(dataAll[i].cases) + "</td>\n";
                                hasil += "<td>" + dataAll[i].recovered + "</td>\n";
                                hasil += "<td>" + set_titik(dataAll[i].deaths) + "</td>\n";
                                // hasil += "<td>" + set_titik(dataAll.cases) + "</td>\n";
                                // hasil += "<td>" + set_titik(dataAll.recovered) + "</td>\n";
                                // // hasil += "<td>" + set_titik(dataAll.deaths) + "</td>\n";
                                // var test = dataAll.country;

                                hasil += "</tr>\n"
                                no++;


                                pos += (dataAll[i].cases);
                                sem += (dataAll[i].recovered);
                                mat += (dataAll[i].deaths);

                            }
                        }
                        hasil += "<tr>"
                        hasil += "<td colspan='2'> Jumlah </td>"
                        hasil += "<td> " + set_titik(pos) + "</td>"
                        hasil += "<td> " + sem + "</td>"
                        hasil += "<td> " + set_titik(mat) + "</td>"


                        hasil += "</tr>"
                        $('#isi').html(hasil);
                    }
                } catch {
                    alert('eror');
                }

            }
        });
    }




