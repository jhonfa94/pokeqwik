import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImagen } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    // console.log(params)

    const id = Number(params.id);

    if (isNaN(id)) throw redirect(301, '/');
    // console.log("Sacar al usuario")

    if (id <= 0) throw redirect(301, '/');

    if (id > 1000) throw redirect(301, '/');

    return id;
});

export default component$(() => {
    // const location = useLocation(); 
    //location.params.id
    const pokemonId = usePokemonId();
    const pokemonGame = useContext(PokemonGameContext);

    return (
        <>
            <span class="text-5xl">Pokemon: {pokemonId} </span>
            {/* <span class="text-5xl">Pokemon: {location.params.id} </span> */}
            <PokemonImagen
                id={Number(pokemonId.value)}
                isVisible={pokemonGame.isPokemonVisible}
                backImage={pokemonGame.showBackImage}
            />
        </>
    )
});