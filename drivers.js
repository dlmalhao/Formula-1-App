var drivers = []

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

axios({
	method: "get",
	url: "http://ergast.com/api/f1/2022/drivers",
})
.then(function getDrivers(response) {
    var text, parser, xmlDoc;
    text = response.data
	parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
    for(let driver of xmlDoc.getElementsByTagName('Driver')) {
        drivers.push(driver)
    }   
    console.log(drivers[0])
    console.log(drivers[0])
})
.then(()=> {
    let tableBody = document.querySelector("#tableBody")
    for(let i = 0; i < drivers.length; i++) {
        tableBody.innerHTML += 
        `
        <tr>
            <th scope="row">${drivers[i].children[0].innerHTML}</th>
            <td>${drivers[i].children[1].innerHTML + ' ' + drivers[i].children[2].innerHTML}</td>
            <td>${drivers[i].children[4].innerHTML}</td>
            <td>${getAge(drivers[i].children[3].innerHTML)}</td>
            <td><a href="${drivers[i].attributes[2].value}">Biography</a></td>
      </tr>
        `
    }
}) 




