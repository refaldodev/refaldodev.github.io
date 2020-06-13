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

                .bindPopup("<h6 style='margin-bottom: -16px;'> Country :" + peta[p].attributes.Country_Region +
                    " </h6> <br>" +
                    "<h6 style='margin-bottom: -16px;'> Confirmed :" + set_titik(peta[p].attributes.Confirmed) + " </h6> <br>" +
                    "<h6 style='margin-bottom: -16px;'> Deaths :" + set_titik(peta[p].attributes.Deaths) + " </h6> <br>" +
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
        document.getElementById('positif').innerHTML = "Confirmed : " + set_titik(data[30].attributes.Confirmed);
        // 
        document.getElementById('sembuh').innerHTML = "Recovered   : " + set_titik(data[30].attributes.Recovered);
        document.getElementById('pos').innerHTML = set_titik(jumlah_postif);
        document.getElementById('men').innerHTML = set_titik(jumlah_meninggal);
        document.getElementById('sem').innerHTML = set_titik(jumlah_sembuh);
        // document.getElementById('positif').innerHTML = positif;
        document.getElementById('isi').innerHTML = hasil;
        document.getElementById('meninggal').innerHTML = "Deaths : " + set_titik(data[30].attributes.Deaths);



        call_hightchart();










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



function call_hightchart() {

    // Highcharts.chart('container', {
    //     chart: {
    //         type: 'column'
    //     },
    //     title: {
    //         text: 'Data Corona Indonesia'
    //     },
    //     subtitle: {
    //         text: 'refaldodev.github.io'
    //     },
    //     xAxis: {
    //         categories: Country,
    //         crosshair: true
    //     },
    //     yAxis: {
    //         min: 0,
    //         title: {
    //             text: 'Jumlah Orang'
    //         }
    //     },

    //     tooltip: {
    //         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //             '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
    //         footerFormat: '</table>',
    //         shared: true,
    //         useHTML: true
    //     },
    //     plotOptions: {
    //         column: {
    //             pointPadding: 0.2,
    //             borderWidth: 0
    //         }
    //     },
    //     series: [{
    //         name: 'Jumlah Sakit',
    //         data: Jumlah_Sak
    //     }, {
    //         name: 'Jumlah Sembuh',
    //         data: Jumlah_Semb

    //     }, {
    //         name: 'Jumlah Meninggal',
    //         data: Jumlah_Mat

    //     }]
    // });
    Highcharts.chart('container', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Statistik Penyebaran Corona'
        },
        subtitle: {
            text: 'Refaldodev.github.io'
        },
        xAxis: {
            categories: Country,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            labels: {
                format: '{value}%'
            },
            title: {
                enabled: false
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b></b> ({point.y:,.0f} )<br/>',
            split: true
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff'
                },
                accessibility: {
                    pointDescriptionFormatter: function (point) {
                        function round(x) {
                            return Math.round(x * 100) / 100;
                        }
                        return (point.index + 1) + ', ' + point.category + ', ' +
                            point.y + ' milions, ' + round(point.percentage) + '%, ' +
                            point.series.name;
                    }
                }
            }
        },
        series: [{
            name: 'Deaths',
            data: Jumlah_Mat
        }, {
            name: 'Confirmed',
            data: Jumlah_Sak
        }, {
            name: 'Recovered',
            data: Jumlah_Semb

        }]
    });

}