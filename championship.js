var drivers = []
var constructors = []

axios({
	method: "get",
	url: "http://ergast.com/api/f1/current/driverStandings",
})
.then(function getDrivers(response) {
    var text, parser, xmlDoc;
    text = response.data
	parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
    for(let driver of xmlDoc.getElementsByTagName('Driver')) {
        drivers.push(driver)
    }   
})
.then(()=> {
    let tableBody = document.querySelector("#tableBody")
    for(let i = 0; i < drivers.length; i++) {
        tableBody.innerHTML += 
        `
        <tr>
            <th scope="row">${drivers[i].parentElement.attributes[0].value}</th>
            <td>${drivers[i].children[1].innerHTML + ' ' + drivers[i].children[2].innerHTML}</td>
            <td>${drivers[i].parentElement.children[1].children[0].innerHTML}</td>
            <td>${drivers[i].parentElement.attributes[2].value}</td>
            <td>${drivers[i].parentElement.attributes[3].value}</td>
      </tr>
        `
    }
}) 


axios({
	method: "get",
	url: "http://ergast.com/api/f1/current/constructorStandings",
})
.then(function getConstructors(response) {
    var text, parser, xmlDoc;
    text = response.data
	parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
    for(let constructor of xmlDoc.getElementsByTagName('Constructor')) {
        constructors.push(constructor)
    }   
    console.log(constructors[0].parentElement.attributes[0])
})
.then(()=> {
    let tableBody = document.querySelector("#tableBody2")
    for(let i = 0; i < constructors.length; i++) {
        tableBody.innerHTML += 
        `
        <tr>
            <th scope="row">${constructors[i].parentElement.attributes[0].value}</th>
            <td>${constructors[i].parentElement.children[0].children[0].innerHTML}</td>
            <td>${constructors[i].parentElement.children[0].children[1].innerHTML}</td>
            <td>${constructors[i].parentElement.attributes[2].value}</td>
            <td>${constructors[i].parentElement.attributes[3].value}</td>
      </tr>
        `
    }
}) 




