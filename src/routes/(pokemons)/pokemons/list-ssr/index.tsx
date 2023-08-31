import { $, component$, useComputed$, useSignal, useStore } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImagen } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
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

    const modalVisible = useSignal(false);
    const modalPokemon = useStore({
        id: '',
        name: ''
    });

    // Modal functions
    const showModal = $((id: string, name: string) => {
        // console.log("id: ", id, " name: ", name);
        modalPokemon.id = id;
        modalPokemon.name = name;
        modalVisible.value = true;
    })
    // Modal functions
    const closeModal = $(() => {
        modalVisible.value = false;
    })



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
                        <div key={name}
                            onClick$={() => showModal(id, name)}
                            class="m-5 flex flex-col justify-center items-center">
                            <PokemonImagen
                                id={Number(id)}

                            />
                            <span class="capitalize">{name}</span>
                        </div>

                    ))
                }
            </div>

            <Modal
                persistent={true}
                showModal={modalVisible.value}
                closeFn={closeModal}
            >
                <div q:slot='title'>{modalPokemon.name}</div>
                <div q:slot='content' class="flex flex-col justify-center items-center">
                    <PokemonImagen id={Number(modalPokemon.id)} />
                    <span>Preguntandole a ChatGPT</span>
                </div>
            </Modal>


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
