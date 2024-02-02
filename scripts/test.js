const evolutionApiCall = async () => {
    
    // grouping all the api fecth calls
    
    
}

const fetches = [
     fetch(`https://pokeapi.co/api/v2/pokemon/`).then(res => console.log(request1)), // needs to end with /{poki}
     fetch(`https://pokeapi.co/api/v2/pokemon-species/`).then(res => console.log(request2)), // needs to end with /{species number}/
     fetch(`https://pokeapi.co/api/v2/evolution-chain/`).then(res => console.log(request3)) // needs to end with /{species number}/
]

// passing all the api fetches as one singular fetch
Promise.any(fetches)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err =>{
        console.log('Oh noooo!!');
        console.log(err);
    })