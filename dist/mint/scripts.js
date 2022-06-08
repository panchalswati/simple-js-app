const pokemonRepository = function () { let j = [], a = document.querySelector("#myInput"), b = document.getElementById("prevbtn"), c = document.getElementById("nextbtn"), k = null, l = null; function d(c) { let d = document.querySelector(".pokemon-list"), b = document.createElement("li"); b.classList.add("group-pokemon-list"); let a = document.createElement("button"); a.innerText = c.name, a.classList.add("highlights-name"), a.setAttribute("data-toggle", "modal"), a.setAttribute("data-target", "#pokemonModal"), b.append(a), d.append(b), e(a, c) } function e(a, b) { a.addEventListener("click", function () { f(b) }) } function f(a) { g(a).then(function () { i(a) }) } function g(a) { return fetch(a.detailsUrl).then(function (a) { return a.json() }).then(function (b) { a.imageUrlFront = b.sprites.front_default, a.imageUrlBack = b.sprites.back_default, a.height = b.height, a.weight = b.weight, a.types = b.types, a.nextButton = b.next, a.previousButton = b.previous }).catch(function (a) { console.error(a) }) } function h(a) { return fetch(a).then(function (a) { return a.json() }).then(function (a) { k = a.previous, l = a.next, a.results.forEach(function (a) { add({ name: a.name, detailsUrl: a.url }) }) }).catch(function (a) { console.error(a) }) } function m() { let a = document.querySelector(".pokemon-list"); a.innerHTML = "", j.length = 0 } function i(a) { let c = $(".modal-title"), b = $(".modal-body"), g = $("<h2>" + a.name + "</h2>"), h = $("<p>Height: " + a.height + " '</p>"), i = $("<p>Weight: " + a.weight + " lbs</p>"), d = $("<img class='pokemon-modal-image'>"); d.attr("src", a.imageUrlFront); let e = $("<img class='pokemon-modal-image'>"); e.attr("src", a.imageUrlBack); let f = document.createElement("p"); f.innerText = "Types: ", a.types.forEach((b, c) => { 1 === a.types.pokemon ? f.innerText += b.type.name : f.innerText += b.type.name + "," }), c.empty(), b.empty(), c.append(g), b.append(d), b.append(e), b.append(h), b.append(i), b.append(f) } return a.addEventListener("input", function (a) { let c = a.target.value, b = document.querySelectorAll("li"); b.forEach(a => { a.innerText.toUpperCase().includes(c.toUpperCase()) ? a.style.display = "block" : a.style.display = "none" }) }), add = a => j.push(a), getAll = () => j, b.addEventListener("click", function (a) { null == k ? b.disabled = !0 : (m(), h(k).then(function () { getAll().forEach(function (a) { d(a) }) })) }), c.addEventListener("click", function (a) { null == l ? c.disabled = !0 : (m(), h(l).then(function () { getAll().forEach(function (a) { d(a) }) })) }), { add, getAll, addListItem: d, showDetails: f, addEvent: e, loadList: h, loadDetails: g, showModal: i } }(), apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=28"; pokemonRepository.loadList("https://pokeapi.co/api/v2/pokemon/?limit=28").then(function () { pokemonRepository.getAll().forEach(function (a) { pokemonRepository.addListItem(a) }) })