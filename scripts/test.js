// Testing and trying things



const evolutionApiCall = async () => {
    
    // grouping all the api fecth calls
    
    
}

// const fetches = [
//      fetch(`https://pokeapi.co/api/v2/pokemon/`).then(res => console.log(request1)), // needs to end with /{poki}
//      fetch(`https://pokeapi.co/api/v2/pokemon-species/`).then(res => console.log(request2)), // needs to end with /{species number}/
//      fetch(`https://pokeapi.co/api/v2/evolution-chain/`).then(res => console.log(request3)) // needs to end with /{species number}/
// ]

// passing all the api fetches as one singular fetch
// Promise.any(fetches)
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err =>{
//         console.log('Oh noooo!!');
//         console.log(err);
//     })





    let howManyForms = evolvePathWay.map()
    console.log()

    if(evolvePathWay.chain.evolves_to.length == 0){
        const firstForm = evolvePathWay.chain.species.name;  // .chain.species.name; is first form
        startNam.textContent = firstForm;
        console.log(`Only has one form: ${startNam}`);

        start.src = defaultImg;
        
        middle.src = " ";
        middleNam.textContent = "N/A";

        end.src = " ";
        endNam.textContent = "N/A";


    }else if (evolvePathWay.chain.evolves_to == 1){
        console.log(`Has Two Forms`);

        const firstForm = evolvePathWay.chain.species.name;  // .chain.species.name; is first form
        startNam.textContent = firstForm;
        const ev1 = await fetch (evolvePathWay.chain.species.url)
        const ev1Img = await ev1.json();   

        defaultImg1 = ev1Img.sprites.other["official-artwork"].front_default;
        shinyImg1 = ev1Img.sprites.other["official-artwork"].front_shiny;
        start.src = defaultImg1;
        
    
        const secondForm = evolvePathWay.chain.evolves_to[0].species.name; // .chain.evolves_to[0].species.name
        middleNam.textContent = secondForm;
        const ev2 = await fetch(evolvePathWay.chain.evolves_to[0].species.url)
        const ev2Img = await ev2.json();

        defaultImg2 = ev2Img.sprites.other["official-artwork"].front_default;
        shinyImg2 = ev2Img.sprites.other["official-artwork"].front_shiny;
        middle.src = defaultImg2;
        
    } else {
        console.log(`Has Three Forms`);
        // First Stage
        const firstForm = evolvePathWay.chain.species.name;  // .chain.species.name; is first form
        startNam.textContent = firstForm;

        const ev1 = await fetch (evolvePathWay.chain.species.url)
        const ev1Img = await ev1.json();

        defaultImg1 = ev1Img.sprites.other["official-artwork"].front_default;
        shinyImg1 = ev1Img.sprites.other["official-artwork"].front_shiny;
        start.src = defaultImg1;
        
        // Second Stage 
        const secondForm = evolvePathWay.chain.evolves_to[0].species.name; // .chain.evolves_to[0].species.name
        middleNam.textContent = secondForm;

        const ev2 = await fetch(evolvePathWay.chain.evolves_to[0].species.url)
        const ev2Img = await ev2.json();

        defaultImg2 = ev2Img.sprites.other["official-artwork"].front_default;
        shinyImg2 = ev2Img.sprites.other["official-artwork"].front_shiny;
        middle.src = defaultImg2;
        
        
        // Third Stage
        // .chain.evolves_to[0].evolves.to[1].species.name
        const thirdForm = evolvePathWay.chain.evolves_to[0].evolves.to[1].species.name;
        endNam.textContent = thirdForm;

        const ev3 = await fetch(evolvePathWay.chain.evolves_to[0].evolves.to[1].species.url);
        const ev3Img = await ev3.json();

        defaultImg3 = ev3Img.sprites.other["official-artwork"].front_default;
        shinyImg3 = ev3Img.sprites.other["official-artwork"].front_shiny;
        end.src = defaultImg3;

       
    }


    start.addEventListener("click", () => {
        if(start.src == defaultImg1) {
            start.src = shinyImg1;
        } else {
            start.src = defaultImg1;
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




const preview = async (poki) => {
    poki = await pokemonApi(poki);
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

                console.log("no");
            }

        } else {
            alert("Has more than one");
        }
}
