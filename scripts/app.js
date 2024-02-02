import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

//Ids                                                         Api https://pokeapi.co/api/v2/pokemon/ditto
let pokemonName = document.getElementById("pokemonName");
let pokemonNum = document.getElementById("pokemonNum");
let search = document.getElementById("search-navbar");
let imgHero = document.getElementById("imgHero");


let abilitiesDiv = document.getElementById("abilitiesDiv");
let movesDiv = document.getElementById("movesDiv");
let locationDiv = document.getElementById("locationDiv");


let dscpt = document.getElementById("dscpt");
let typeDiv = document.getElementById("typeDiv");


// let none = document.getElementById("none");
let start = document.getElementById("start");
let startNam = document.getElementById("startNam");
let middle = document.getElementById("middle");
let middleNam = document.getElementById("middleNam");
let end = document.getElementById("end");
let endName = document.getElementById("endName");


let poki = "";
let defaultImg;
let shinyImg;


// fetching
const pokemonApi = async (poki) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${poki}`);
    const data = await promise.json();
    return data;
}

// lg search function   (flowbite navbar had two inputs with the same ID so this was my work around that issue)
let searchh = document.getElementById("searchh");
searchh.addEventListener('keydown', async (event) => {
    if(event.key === "Enter"){
        poki = await pokemonApi(event.target.value);
        console.log("keydown works");

        // Favorite btn (star)
        updateStarButton();

        // pokemong Name
        let name = poki.name[0].toUpperCase() + poki.name.substring(1);
        pokemonName.textContent = name.split("-").join(" ");

        // pokemon Id
        if(poki.id < 10){
            pokemonNum.textContent = "#00" + poki.id;
        }else if(poki.id < 100 && 10 < poki.id){
            pokemonNum.textContent = "#0" + poki.id;
        }else{
            pokemonNum.textContent = "#" + poki.id;
        }
        console.log(`${poki.name}  ${poki.id}`);

        // pokemonImg
        defaultImg = poki.sprites.other["official-artwork"].front_default;
        shinyImg = poki.sprites.other["official-artwork"].front_shiny;
        imgHero.src = defaultImg;

        // abilities and moves
        const  abilities = poki.abilities.map(ability => ability.ability.name).join(", ");
        abilitiesDiv.textContent = abilities.split("-").join(" ");

        const moves = poki.moves.map(move => move.move.name).join(", ");
        movesDiv.textContent = moves.split("-").join(" ");

        // location
        const location = await fetch(poki.location_area_encounters);
        const pokiLoc = await location.json();

        if(pokiLoc.length == 0) {
            locationDiv.textContent = "N/A";
        } else {
            locationDiv.textContent = pokiLoc[0].location_area.name.split("-").join(" ");
        }

        // description
        const desc = await fetch(poki.species.url);
        const description = await desc.json();
        const english = description.flavor_text_entries.findIndex(name => name.language.name == "en");
        dscpt.textContent = description.flavor_text_entries[english].flavor_text;

        // type
        const type = poki.types.map(type => type.type.name);
        typeDiv.textContent = type;

        // evolutions
        

    }
})


// sm and md search function
search.addEventListener('keydown', async (event) => {

    if(event.key === "Enter"){
        poki = await pokemonApi(event.target.value);
        console.log("keydown2 works");

        // Favorite btn (star)
        updateStarButton();

        // pokemong Name
        let name = poki.name[0].toUpperCase() + poki.name.substring(1);
        pokemonName.textContent = name.split("-").join(" ");

        // pokemon Id
        if(poki.id < 10){
            pokemonNum.textContent = "#00" + poki.id;
        }else if(poki.id < 100 && 10 < poki.id){
            pokemonNum.textContent = "#0" + poki.id;
        }else{
            pokemonNum.textContent = "#" + poki.id;
        }
        console.log(`${poki.name}  ${poki.id}`);

        // pokemonImg
        defaultImg = poki.sprites.other["official-artwork"].front_default;
        shinyImg = poki.sprites.other["official-artwork"].front_shiny;
        imgHero.src = defaultImg;

        // abilities and moves
        const  abilities = poki.abilities.map(ability => ability.ability.name).join(", ");
        abilitiesDiv.textContent = abilities.split("-").join(" ");

        const moves = poki.moves.map(move => move.move.name);
        movesDiv.textContent = moves.split("-").join(" ");

        // location
        const location = await fetch(poki.location_area_encounters);
        const pokiLoc = await location.json();

        if(pokiLoc.length == 0) {
            locationDiv.textContent = "N/A";
        } else {
            locationDiv.textContent = pokiLoc[0].location_area.name.split("-").join(" ");
        }

        // description
        const desc = await fetch(poki.species.url);
        const description = await desc.json();
        const english = description.flavor_text_entries.findIndex(name => name.language.name == "en");
        dscpt.textContent = description.flavor_text_entries[english].flavor_text;

        // type
        const type = poki.types.map(type => type.type.name).join(", ");
        typeDiv.textContent = type;

        // evolution

        
    }
})


imgHero.addEventListener("click", () => {
    if(imgHero.src == defaultImg) {
        imgHero.src = shinyImg;
    } else {
        imgHero.src = defaultImg;
    }
})



let starBtn = document.getElementById("starBtn");
let favoritesBtn = document.getElementById("favoritesBtn");
let favoritesDiv = document.getElementById("favoritesDiv");

starBtn.addEventListener("click", () => {
    
    let favorites = getlocalStorage();

    if(!favorites.includes(poki.name)){

        saveToLocalStorage(poki.name);
        starBtn.src = "../assets/star-fill.png";
        
    } else {
        
        removeFromLocalStorage(poki.name);   
        starBtn.src = "../assets/star.png";

    }
    updateStarButton();
})


favoritesBtn.addEventListener("click", () => {
    let favorites = getlocalStorage();

    favoritesDiv.textContent = "";

    favorites.map(pName => {

        let p = document.createElement("p");
        p.textContent = pName;
        p.className = "text-lg font-medium text-gray-900 dark:text-white mb-4";

        let button = document.createElement("button");
        button.type = "button";
        button.textContent = "x";
        button.classList.add(
            "text-gray-900",
            "bg-transparent",
            "hover:bg-gray-400",
            "hover:text-gray-900",
            "rounded-lg",
            "text-sm",
            "w-8",
            "h-8",
            "justify-end",
            "dark:hover:bg-gray-600",
            "dark:hover:text-white",
            "ms-8"
        );

        button.addEventListener("click", () => {
            removeFromLocalStorage(pName);
            p.remove();
            starBtn.src = "../assets/star.png";
        });

        p.append(button);
        favoritesDiv.append(p);
    });
});

const updateStarButton = () => { 
    let favorites = getlocalStorage();

    const isFavorite = favorites.includes(poki.name);

    starBtn.src = isFavorite ? "../assets/star-fill.png" : "../assets/star.png";
};



let rndBtn = document.getElementById("rndBtn");

rndBtn.addEventListener('click', async () =>{

    let random = Math.floor(Math.random() * 649);
    poki = await pokemonApi(random);
    console.log("rndBtn works");

    // Favorite btn (star)
    updateStarButton();

    // pokemon Name
    let name = poki.name[0].toUpperCase() + poki.name.substring(1);
    pokemonName.textContent = name.split("-").join(" ");

    // pokemon Id
    if(poki.id < 10){
        pokemonNum.textContent = "#00" + poki.id;
    }else if(poki.id < 100 && 10 < poki.id){
        pokemonNum.textContent = "#0" + poki.id;
    }else{
        pokemonNum.textContent = "#" + poki.id;
    }
    console.log(`${poki.name}  ${poki.id}`);

    // pokemonImg
    defaultImg = poki.sprites.other["official-artwork"].front_default;
    shinyImg = poki.sprites.other["official-artwork"].front_shiny;
    imgHero.src = defaultImg;

    // abilities and moves
    const  abilities = poki.abilities.map(ability => ability.ability.name).join(", ");
    abilitiesDiv.textContent = abilities.split("-").join(" ");

    const moves = poki.moves.map(move => move.move.name).join(", ");
    movesDiv.textContent = moves.split("-").join(" ");

    // location
    const location = await fetch(poki.location_area_encounters);
    const pokiLoc = await location.json();

    if(pokiLoc.length == 0) {
        locationDiv.textContent = "N/A";
    } else {
        locationDiv.textContent = pokiLoc[0].location_area.name.split("-").join(" ");
    }
    
    // type
    const type = poki.types.map(type => type.type.name).join(", ");
    typeDiv.textContent = type;

    // description
    const desc = await fetch(poki.species.url);
    const description = await desc.json();
    const english = description.flavor_text_entries.findIndex(name => name.language.name == "en");
    dscpt.textContent = description.flavor_text_entries[english].flavor_text;

    // evolution ?
    const ev = await fetch(description.evolution_chain.url)
    const evolvePathWay = await ev.json();
    
    if(evolvePathWay.chain.evolves_to == 0){
        const firstForm = evolvePathWay.chain.species.name;  // .chain.species.name; is first form
        startNam.textContent = firstForm;
        console.log(`Only has one form: ${startNam}`);
        console.log(firstForm);

    }else if (evolvePathWay.chain.evolves_to == 1){
        console.log(`Has Two Forms`);
        const firstForm = evolvePathWay.chain.species.name;  // .chain.species.name; is first form
        startNam.textContent = firstForm;
        console.log(`first form is ${startNam}`);
        console.log(firstForm);
    
        const secondForm = evolvePathWay.chain.evolves_to[0].species.name; // .chain.evolves_to[0].species.name
        middleNam.textContent = secondForm;
        console.log(`second form is`);
        console.log(secondForm);
    } else {
        console.log(`Has Three Forms`);
        const firstForm = evolvePathWay.chain.species.name;  // .chain.species.name; is first form
        startNam.textContent = firstForm;
        console.log(`first form is ${firstForm}`);
        console.log(firstForm);
    
        const secondForm = evolvePathWay.chain.evolves_to[0].species.name; // .chain.evolves_to[0].species.name
        middleNam.textContent = secondForm;
        console.log(`second form is`);
        console.log(secondForm);
    
        // .chain.evolves_to[0].evolves.to[0].species.name
        const thirdForm = evolvePathWay.chain.evolves_to[0].evolves_to[1].species.name;
        endName.textContent = thirdForm;
        console.log(`third form is ${endName}`);
        console.log(thirdForm);
    }

   





})

// let test = document.getElementById("test");

// test.addEventListener('click', async() => {
    
//     console.log("button works")
//     // let random = Math.floor(Math.random() * 649);
//     // poki = await pokemonApi(random);
//     // evolutionApiCall();
    
// })


