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
        console.log(`first form is ${startNam}`);
        console.log(firstForm);
    
        const secondForm = evolvePathWay.chain.evolves_to[0].species.name; // .chain.evolves_to[0].species.name
        middleNam.textContent = secondForm;
        console.log(`second form is`);
        console.log(secondForm);
    
        // .chain.evolves_to[0].evolves.to[0].species.name
        const thirdForm = evolvePathWay.chain.evolves_to[0].evolves.to[0].species.name;
        endName.textContent = thirdForm;
        console.log(`third form is ${endName}`);
    }
