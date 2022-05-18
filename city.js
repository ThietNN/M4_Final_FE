showCityList();
showCountryList();

function getCityInfo(city){
    return `<tr>
<td>${city.name}</td>
<td>${city.country.name}</td>
<td><button type="button" onclick="showCityInfo(${city.id})">More detail</button> </td>`
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
function showCountryListEdit(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/country",
        success: function (data) {
            let content = '<select id="editCountry">';
            for (let i = 0; i < data.length; i++) {
                content += getCountryInfo(data[i]);
            }
            content += "</select>"
            document.getElementById("showCountryListEdit").innerHTML = content;
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
            showCityList();
        }
    });
    event.preventDefault();
}
function removeCity(id){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/city/${id}`,
        success: function (){
            showCityList();
        }
    });
    event.preventDefault();
}

function showUpdateCityForm(id){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/city/${id}`,
        success: function (data){
            let content = `<h2>Update info of a City</h2>
    <form>
        <table>
            <tr>
                <td>Name:</td>
                <td><input id="editName" type="text" value="${data.name}"></td>
            </tr>
            <tr>
                <td>Country:</td>
                <td><tbody id="showCountryListEdit"></tbody></td>
            </tr>
            <tr>
                <td>Area:</td>
                <td><input id="editArea" type="text" value="${data.area}"></td>
            </tr>
            <tr>
                <td>Population:</td>
                <td><input id="editPopulation" type="text" value="${data.population}"></td>
            </tr>
            <tr>
                <td>GDP:</td>
                <td><input id="editGdp" type="text" value="${data.gdp}"></td>
            </tr>
            <tr>
                <td>Description:</td>
                <td><input id="editDescription" type="text" value="${data.description}"></td>
            </tr>
            <tr>               
                <td><input type="button" onclick="updateCity(${data.id})" value="Update City information"></td>
            </tr>
        </table>
    </form>`;
            document.getElementById("updateCityInfo").innerHTML = content;
            showCountryListEdit();
        }
    });
}
function updateCity(id){
    let name = $(`#editName`).val();
    let country = $('#editCountry').val();
    let area = $('#editArea').val();
    let population = $('#editPopulation').val();
    let gdp = $('#editGdp').val();
    let description = $('#editDescription').val();
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
        type: "PUT",
        data: JSON.stringify(city),
        url: `http://localhost:8080/city/${id}` ,
        success: function (){
            $(`#editName`).val(null)
            $(`#editCountry`).val(null)
            $(`#editArea`).val(null)
            $(`#editPopulation`).val(null)
            $(`#editGdp`).val(null)
            $(`#editDescription`).val(null)
            showCityList();
        }
    });
    event.preventDefault();
}
function showCityInfo(id){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/city/${id}`,
        success: function (data) {
            let content = `<h1>City Info:</h1><table><tr><td>City Name:</td><td>${data.name}</td></tr>` +
                `<tr><td>Country:</td><td>${data.country.name}</td></tr>` +
                `<tr><td>Area:</td><td>${data.area}</td></tr>` +
                `<tr><td>Population:</td><td>${data.population}</td></tr>` +
                `<tr><td>GDP:</td><td>${data.gdp}</td></tr>` +
                `<tr><td>Description:</td><td>${data.description}</td></tr></table>`
            document.getElementById("cityInfo").innerHTML = content;
        }
    })
}
