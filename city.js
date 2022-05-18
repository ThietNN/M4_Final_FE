showCityList();
showCountryList();

function getCityInfo(city){
    return `<tr>
<td>${city.name}</td>
<td>${city.country.name}</td>
<td>${city.area}</td>
<td>${city.population}</td>
<td>${city.gdp}</td>
<td>${city.description}</td>`
    + `<td><button type="button" onclick="showUpdateCityForm(${city.id})">Edit</button></td>`
    + `<td><button type="button" onclick="removeCity(${city.id})">Delete</button> </td>`
}

function getCountryInfo(country){
    return `<option value="${country.id}">${country.name}</option>`
}

function showCityList(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city",
        success: function (data){
            let content = "";
            for (let i=0; i<data.length; i++){
                content += getCityInfo(data[i]);
            }
            document.getElementById("showCityList").innerHTML = content;
        }
    })
}

function showCountryList(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/country",
        success: function (data) {
            let content = '<select id="country">';
            for (let i = 0; i < data.length; i++) {
                content += getCountryInfo(data[i]);
            }
            content += "</select>"
            document.getElementById("showCountryList").innerHTML = content;
        }
    })
}

function addNewCity() {
    let name = $('#name').val();
    let country = $('#country').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let city = {
        "name": name,
        "country": {id: country},
        "area": area,
        "population": population,
        "gdp": gdp,
        "description": description
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(city),
        url: "http://localhost:8080/city",
        success: function (){
            $(`#name`).val(null)
            $(`#country`).val(null)
            $(`#area`).val(null)
            $(`#population`).val(null)
            $(`#gdp`).val(null)
            $(`#description`).val(null)
            showCountryList();
        }
    });
    event.preventDefault();
}
function removeCity(id){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/city/${id}`,
        success: function (){
            showCountryList();
        }
    });
    event.preventDefault();
}
function showUpdateCityForm(){

}
