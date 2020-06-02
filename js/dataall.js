

const fetchData = fetch( 
	"https://api.kawalcorona.com/"

)
.then((response) => {
	return response.json();
})
.then((data) =>{
var a =Object.keys(data);

document.write(data);
});
