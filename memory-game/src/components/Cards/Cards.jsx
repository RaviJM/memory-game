import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "../Cards/Cards.css";

function Cards() {
  // contains names and urls of pokemons
  const [rawPokemonData, setRawPokemonData] = useState([]);

  // contains names and img urls of pokemons
  const [pokemonData, setPokemonData] = useState([]);

  async function getPokemons() {
    let rawData = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12", {
      mode: "cors",
    });

    let data = await rawData.json();
    data = data.results;

    return data;
  }

  async function getPokemonDetails(pokemon) {
    let rawData = await fetch(pokemon.url, { mode: "cors" });
    let imgURL = await rawData.json();

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
  // runs when data of pokemons is fetched (after the completion of getPokemons in the first useEffect() call)
  useEffect(() => {
    async function fetchPokemonDetails() {
      const detailsPromises = rawPokemonData.map((pokemon) =>
        getPokemonDetails(pokemon)
      );
      const pokemonDetails = await Promise.all(detailsPromises);
      setPokemonData(pokemonDetails);
    }

    if (rawPokemonData.length > 0) {
      fetchPokemonDetails();
    }
  }, [rawPokemonData]);

  return (
    <div className="game-container">
      {pokemonData.map((pokemon, index) => {
        return <Card name={pokemon.name} imgURL={pokemon.url} key={index} />;
      })}
    </div>
  );
}

export default Cards;
