import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImagen } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const userPokemonList = routeLoader$<SmallPokemon[]>(async (
    { query, redirect, pathname }
) => {

    // console.log(query)
    // console.log(pathname)
    // console.log(offsetString.get('offset'))
    const offset = Number(query.get('offset') ?? 0);
    console.log('%c%s', 'color: #00e600', offset);
    if (isNaN(offset)) throw redirect(301, pathname);
    if (offset < 0) throw redirect(301, pathname);
    if (offset > 1000) throw redirect(301, pathname);

    const pokemons = await getSmallPokemons(offset);
    // console.log(pokemons)
    return pokemons;

    // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit10&offset=${offset}`);
    // const data = await resp.json() as PokemonListResponse;
    // // console.log(data)
    // return data.results;
});



export default component$(() => {

    const pokemons = userPokemonList();

    const location = useLocation();
    // console.log(location.url.searchParams.get('offset'))
    const currentOffset = useComputed$<number>(() => {
        // const offsetString = location.url.searchParams.get('offset');
        const offsetString = new URLSearchParams(location.url.search);
        return Number(offsetString.get('offset')) || 0;
    })






    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Página actual: {currentOffset.value}</span>
                <span>Está cargando página: {location.isNavigating ? 'Si' : 'No'}  </span>

            </div>

            <div class="mt-10">
                {
                    currentOffset.value > 10 && (
                        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
                            class="btn btn-primary mr-2">
                            Anteriores
                        </Link>

                    )
                }
                <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
                    class="btn btn-primary mr-2">
                    Siguientes
                </Link>

            </div>

            <div class="grid grid-cols-6 mt-5">
                {
                    pokemons.value.map(({ name, id }) => (
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
    )
});

export const head: DocumentHead = {
    title: "SSR-List",
    meta: [
        {
            name: "description",
            content: "Esta es mi primera aplicación en Qwik",
        },
    ],
};
