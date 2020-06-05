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

                .bindPopup("<h6 style='margin-bottom: -16px;'> Negara :" + peta[p].attributes.Country_Region +
                    " </h6> <br>" +
                    "<h6 style='margin-bottom: -16px;'> Positif :" + peta[p].attributes.Confirmed + " </h6> <br>" +
                    "<h6 style='margin-bottom: -16px;'> Meninggal :" + peta[p].attributes.Deaths + " </h6> <br>" +
                    "<h6 style='margin-bottom: -16px;'> Sembuh :" + peta[p].attributes.Recovered + " </h6> <br>"


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

        function test(data) {
            var a = data[32]['attributes']['Confirmed'];

            console.log(a);
        }
        test(data);

        var j = Object.keys(data).length;

        // console.log(j);
        var no = 1;
        for (var i = 0; i < j; i++) {
            jumlah_postif = jumlah_postif + Number(data[i].attributes.Confirmed);
            jumlah_meninggal += Number(data[i].attributes.Deaths);
            jumlah_sembuh += Number(data[i].attributes.Recovered);
            totalPos += Number(data[i].attributes.Confirmed);
            totalMen += Number(data[i].attributes.Deaths);
            totalSem += Number(data[i].attributes.Recovered);
            // if (i == 32) {
            //   postif += Number(data[32].attributes.Confirmed);
            //   sembuh += Number(data[32].attributes.Recovered);
            //   meninggal += Number(data[32].attributes.Deaths);
            // }
            hasil += "<tr>"
            hasil += "<td>" + no + "</td>\n";
            hasil += "<td>" + data[i].attributes.Country_Region + "</td>\n";
            hasil += "<td>" + data[i].attributes.Confirmed + "</td>\n";
            hasil += "<td>" + data[i].attributes.Recovered + "</td>\n";
            hasil += "<td>" + data[i].attributes.Deaths + "</td>\n";

            hasil += "</tr>\n"
            no++;
            statPos += Number(data[i].attributes.Confirmed);
            statCountry += Number(data[i].attributes.Confirmed);
            // 
        }

        // totalPos +=  Number(data[i].attributes.Confirmed);
        // totalMen +=  Number(data[i].attributes.Deaths);
        // totalSem +=  Number(data[i].attributes.Recovered);
        hasil += "<tr>"
        hasil += "<td colspan='2'> Jumlah </td>"
        hasil += "<td> " + totalPos + "</td>"
        hasil += "<td> " + totalMen + "</td>"
        hasil += "<td> " + totalSem + "</td>"


        hasil += "</tr>"
        // positif += data[32].attributes.Confirmed;
        document.getElementById('positif').innerHTML = "Positif : " + data[32].attributes.Confirmed;
        // 
        document.getElementById('sembuh').innerHTML = "Sembuh   : " + data[32].attributes.Recovered;
        document.getElementById('pos').innerHTML = jumlah_postif;
        document.getElementById('men').innerHTML = jumlah_meninggal;
        document.getElementById('sem').innerHTML = jumlah_sembuh;
        // document.getElementById('positif').innerHTML = positif;
        document.getElementById('isi').innerHTML = hasil;
        document.getElementById('meninggal').innerHTML = "Meninggal : " + data[32].attributes.Deaths;


        Highcharts.chart('container', {

            chart: {
                type: 'area'
            },
            title: {
                text: 'Data Penyebaran Coronavirus di Dunia'
            },
            subtitle: {
                text: 'Refaldodev.github.io'
            },
            xAxis: {
                categories: [data[32].attributes.Last_Update],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Billions'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                split: true,
                valueSuffix: 'Ribu'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },


            series: [{
                name: data[32].attributes.Country_Region,
                data: [502, 635, 809, 947, 1402, 3634, 5268]

            }]
        });
    });