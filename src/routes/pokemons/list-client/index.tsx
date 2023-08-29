import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImagen } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
// import type { SmallPokemon } from '~/interfaces';

// interface PokemonPageState {
//     currentPage: number;
//     isLoading: boolean;
//     pokemons: SmallPokemon[];
// }


export default component$(() => {

    // const pokemonState = useStore<PokemonPageState>({
    //     currentPage: 0,
    //     isLoading: false,
    //     pokemons: [],
    // });
    const pokemonState = useContext(PokemonListContext);

    // solo el client
    // useVisibleTask$(async ({ track }) => {
    //     track(() => pokemonState.currentPage)
    //     // console.log("use visible")
    //     const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    //     pokemonState.pokemons = pokemons;
    // })


    useTask$(async ({ track }) => {
        track(() => pokemonState.currentPage)

        pokemonState.isLoading = true;

        // console.log("use visible")
        const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

        pokemonState.isLoading = false;
    })

    useOnDocument('scroll', $((event) => {
        console.log('scroll ', event)
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;

        if ((currentScroll + 200) >= maxScroll && !pokemonState.isLoading) {
            pokemonState.isLoading = true;
            pokemonState.currentPage++;
        }

        // console.log('maxScroll: ', maxScroll);
        // console.log('currentScroll: ', currentScroll);

    }))

    return <>
        <div class="flex flex-col">
            <span class="my-5 text-5xl">Status</span>
            <span>Página actual: {pokemonState.currentPage} </span>
            <span>Está cargando página:   </span>

        </div>

        <div class="mt-10">


            {/* <button onClick$={() => pokemonState.currentPage--}
                class="btn btn-primary mr-2">
                Anteriores
            </button> */}

            <button onClick$={() => pokemonState.currentPage++}
                class="btn btn-primary mr-2">
                Siguientes
            </button>

        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
            {
                pokemonState.pokemons.map(({ name, id }) => (
                    <div key={name} class="m-5 flex flex-col justify-center items-center">
                        <PokemonImagen
                            id={Number(id)}

                        />
                        <span class="capitalize">{name}</span>
                    </div>

                ))
            }


        </div>


    </>
});

export const head: DocumentHead = {
    title: "Client-SSR",
    meta: [
        {
            name: "description",
            content: "Esta es mi primera aplicación en Qwik",
        },
    ],
};
