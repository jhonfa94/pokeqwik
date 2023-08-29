import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type PokemonGameState, PokemonGameContext } from "./pokemon-game.context";
import { type PokemonListState, PokemonListContext } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 4,
        showBackImage: true,
        isPokemonVisible: false
    });


    // Estado inicial del context de lista
    const pokemonList = useStore<PokemonListState>({
        currentPage: 1,
        isLoading: false,
        pokemons: [],
    })

    useContextProvider(PokemonGameContext, pokemonGame);
    useContextProvider(PokemonListContext, pokemonList);

    useVisibleTask$(() => {
        // LEER EL LOCALSTORE
        // console.log("primer visible Task")
        if (localStorage.getItem('pokemon-game')) {
            // console.log(localStorage.getItem('pokemon-game'))
            const {
                isPokemonVisible = true,
                pokemonId = 1,
                showBackImage = false
            } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;
            pokemonGame.isPokemonVisible = isPokemonVisible;
            pokemonGame.pokemonId = pokemonId;
            pokemonGame.showBackImage = showBackImage;


        }
    })

    useVisibleTask$(({ track }) => {
        // console.log("segundo visible Task")
        track(() => [pokemonGame.isPokemonVisible, pokemonGame.showBackImage, pokemonGame.pokemonId])
        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
    })

    return (<Slot />);
});