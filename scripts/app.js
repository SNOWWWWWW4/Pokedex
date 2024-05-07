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
let endNam = document.getElementById("endNam");

let starBtn = document.getElementById("starBtn");
let favoritesBtn = document.getElementById("favoritesBtn");
let favoritesDiv = document.getElementById("favoritesDiv");

let poki = "";
let defaultImg;
let shinyImg;

// firstForm
let defaultImg1;
let shinyImg1;

// secondFOrm
let defaultImg2;
let shinyImg2;

// thirdForm
let defaultImg3;
let shinyImg3;


// fetching
const pokemonApi = async (poki) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${poki}`);
    const data = await promise.json();
    return data;
}
// onLoad
const preview = async (pokiM) => {
    poki = await pokemonApi(pokiM);
    

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

        const moves = poki.moves.map(move => move.move.name.split("-").join(" "));
        movesDiv.textContent = moves;

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
        const ev = await fetch(description.evolution_chain.url)
        const evolvePathWay = await ev.json();

        if(evolvePathWay.chain.evolves_to.length == 0){
            // firstForm Name
            const firstForm = evolvePathWay.chain.species.name;  // .chain.species.name; is first form
            startNam.textContent = firstForm;
            console.log(`first form is ${startNam}`);
        
            // firstForm Img
            let ev1 = await pokemonApi(firstForm)
            console.log(ev1.sprites.other["official-artwork"].front_default)
            
            defaultImg1 = ev1.sprites.other["official-artwork"].front_default;
            shinyImg1 = ev1.sprites.other["official-artwork"].front_shiny;
        
            start.src = defaultImg1;

            middle.src = " ";
            middleNam.textContent = "N/A";

            end.src = " ";
            endNam.textContent = "N/A";
            
        } else if(evolvePathWay.chain.evolves_to.length == 1){
            
            if(evolvePathWay.chain.evolves_to[0].evolves_to.length == 1){

                // firstForm Name
                const firstForm = evolvePathWay.chain.species.name;  // .chain.species.name; is first form
                startNam.textContent = firstForm;
                console.log(`first form is ${startNam}`);
            
                // firstForm Img
                let ev1 = await pokemonApi(firstForm)
                console.log(ev1.sprites.other["official-artwork"].front_default)
                
                defaultImg1 = ev1.sprites.other["official-artwork"].front_default;
                shinyImg1 = ev1.sprites.other["official-artwork"].front_shiny;
            
                start.src = defaultImg1;
    
                //secondForm Name
                const secondForm = evolvePathWay.chain.evolves_to[0].species.name; // .chain.evolves_to[0].species.name
                middleNam.textContent = secondForm;
                const ev2 = await pokemonApi(secondForm)
    
                // secondForm Img
                defaultImg2 = ev2.sprites.other["official-artwork"].front_default;
                shinyImg2 = ev2.sprites.other["official-artwork"].front_shiny;
                middle.src = defaultImg2;

                //thirdForm Name
                const thirdForm = evolvePathWay.chain.evolves_to[0].evolves_to[0].species.name;
                 endNam.textContent = thirdForm;
                 console.log(thirdForm);
                //thirdForm Img
                const ev3 = await pokemonApi(thirdForm)
                defaultImg3 = ev3.sprites.other["official-artwork"].front_default;
                shinyImg3 = ev3.sprites.other["official-artwork"].front_shiny;
                end.src = defaultImg3;


            }else{
                // firstForm Name
                const firstForm = evolvePathWay.chain.species.name;  // .chain.species.name; is first form
                startNam.textContent = firstForm;
                console.log(`first form is ${startNam}`);
            
                // firstForm Img
                let ev1 = await pokemonApi(firstForm)
                console.log(ev1.sprites.other["official-artwork"].front_default)
                
                defaultImg1 = ev1.sprites.other["official-artwork"].front_default;
                shinyImg1 = ev1.sprites.other["official-artwork"].front_shiny;
            
                start.src = defaultImg1;
    
                //secondForm Name
                const secondForm = evolvePathWay.chain.evolves_to[0].species.name; // .chain.evolves_to[0].species.name
                middleNam.textContent = secondForm;
                const ev2 = await pokemonApi(secondForm)
    
                // secondForm Img
                defaultImg2 = ev2.sprites.other["official-artwork"].front_default;
                shinyImg2 = ev2.sprites.other["official-artwork"].front_shiny;
                middle.src = defaultImg2;

                end.src = " ";
                endNam.textContent = "N/A";

                console.log("no third stage");
            }

        } else {
            alert("Special case pokemon. Has more than one evolution pathway");
        }
}

preview("1");


// lg search function   (flowbite navbar had two inputs with the same ID so this was my work around that issue)
let searchh = document.getElementById("searchh");
searchh.addEventListener('keydown', async (event) => {
    if(event.key === "Enter"){
        preview(event.target.value);
    }
})


// sm and md search function
search.addEventListener('keydown', async (event) => {

    if(event.key === "Enter"){
        preview(event.target.value);
    }
})

let rndBtn = document.getElementById("rndBtn");

rndBtn.addEventListener('click', async () =>{

    let random = Math.floor(Math.random() * 649);
    preview(random);
})

imgHero.addEventListener("click", () => {
    if(imgHero.src == defaultImg) {
        imgHero.src = shinyImg;
    } else {
        imgHero.src = defaultImg;
    }
})

start.addEventListener("click", () => {
    if(start.src == defaultImg1) {
        start.src = shinyImg1;
    } else {
        start.src = defaultImg1;
    }
})


starBtn.addEventListener("click", () => {
    
    let favorites = getlocalStorage();

    if(!favorites.includes(poki.name)){
        console.log("add");
        console.log(poki.name)
        saveToLocalStorage(poki.name);
        starBtn.src = "../assets/star-fill.png";
        
    } else {
        console.log("del");
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
            updateStarButton();
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


start.addEventListener("click", () => {
    console.log("ckucj");
    console.log(shinyImg1);
    console.log(start.src);
    if(start.alt === "base stage pokemon") {
        start.src = shinyImg1;
        start.alt = "shiny"
    } else {
        start.src = defaultImg1;
        start.alt = "base stage pokemon";
    }
})

middle.addEventListener("click", () => {
    if(middle.src == defaultImg2) {
        middle.src = shinyImg2;
    } else {
        middle.src = defaultImg2;
    }
})

end.addEventListener("click", () => {
    if(end.src == defaultImg3) {
        end.src = shinyImg3;
    } else {
        end.src = defaultImg3;
    }
})
