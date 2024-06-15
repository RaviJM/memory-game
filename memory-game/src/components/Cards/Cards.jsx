import { useState, useEffect, useRef } from "react";
import Card from "../Card/Card";
import "../Cards/Cards.css";

const numberOfCards = 12;

function Cards({ setCurrentScore, setHighScore, currentScore, highScore }) {
  // contains names and urls of pokemons
  const [rawPokemonData, setRawPokemonData] = useState([]);

  // contains names and img urls of pokemons
  const [pokemonData, setPokemonData] = useState([]);

  // used to track number of clicks for all pokemons
  const pokeHashMap = useRef({});

  async function getPokemons() {
    const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=";

    const url = baseURL + numberOfCards;

    let rawData = await fetch(url, {
      mode: "cors",
    });

    let data = await rawData.json();
    data = data.results;

    return data;
  }

  async function getPokemonDetails(pokemon) {
    let rawData = await fetch(pokemon.url, { mode: "cors" });
    let imgURL = await rawData.json();

    // also put it in the pokeHashMap

    pokeHashMap.current[pokemon.name] = 0; // as pokemon is initially clicked 0 times

    imgURL = imgURL.sprites.front_default;

    let pokemonObj = { name: pokemon.name, url: imgURL };

    return pokemonObj;
  }

  // runs first time only, when data needs to be fetched
  useEffect(() => {
    async function fetchData() {
      const data = await getPokemons();
      setRawPokemonData(data);
    }

    fetchData();
  }, []);

  // function to fetch details (image and name of pokemon from pokomonData)
  // runs when raw data of pokemons is fetched (after the completion of getPokemons in the first useEffect() call)
  useEffect(() => {
    async function fetchPokemonDetails() {
      const detailsPromises = rawPokemonData.map((pokemon) =>
        getPokemonDetails(pokemon)
      );
      const pokemonDetails = await Promise.all(detailsPromises);

      // sets the data of all pokemons in one go
      setPokemonData(pokemonDetails);
    }

    if (rawPokemonData.length > 0) {
      fetchPokemonDetails();
    }
  }, [rawPokemonData]);

  function handleClick(pokemonName) {
    // check if it is clicked again
    if (pokeHashMap.current[pokemonName] > 0) {
      // Cleanup
      // reset the current score to 0
      setCurrentScore(0);

      // set the pokeHashMap values for all pokemons as 0
      for (let key in pokeHashMap.current) {
        pokeHashMap.current[key] = 0;
      }

      alert("Game Over");
    } else {
      //mark it clicked in the hash map by incrementing the count for that pokemon
      pokeHashMap.current[pokemonName]++;

      // update the current score
      setCurrentScore(currentScore + 1);

      // update the high score
      if (currentScore >= highScore) {
        setHighScore(highScore + 1);
      }

      // check if its winning condition
      if (currentScore + 1 === numberOfCards) {
        //Note: we're checking for currentScore+1 because value won't be updated right now, it will after re-rendering
        alert("You Won!");
      }
    }

    // Also, shuffle the data using function below
    shuffleData();
  }

  // function to shuffle the array 'pokemonData'. Called inside handleClick
  function shuffleData() {
    const shuffledArray = [...pokemonData];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    setPokemonData(shuffledArray);
  }

  return (
    <div className="game-container">
      {pokemonData.map((pokemon, index) => {
        return (
          <Card
            name={pokemon.name}
            imgURL={pokemon.url}
            key={index}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
}

export default Cards;
