import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImagen } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";


export default component$(() => {

  const nav = useNavigate();

  const gotToPokemon = $((id: number) => {
    nav(`/pokemon/${id}/`)
  });


  const {
    pokemonId,
    showBackImage,
    isPokemonVisible,
    nextPokemon,
    previusPokemon,
    toogleFromBack,
    toogleVisible
  } = usePokemonGame();



  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      {/* <span class="text-9xl">{pokemonId}</span> */}
      <span class="text-9xl">{pokemonId.value}</span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`}>
      </Link> */}
      <div onClick$={() => gotToPokemon(pokemonId.value)}>
        <PokemonImagen
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
          size={300}
        />
      </div>

      <div class="flex space-x-2 mt-2">
        <button onClick$={previusPokemon} class="btn btn-primary">Anterior</button>

        <button onClick$={nextPokemon} class="btn btn-primary">Siguiente</button>

        <button onClick$={toogleFromBack} class="btn btn-primary">Voltear</button>

        <button onClick$={toogleVisible} class="btn btn-primary">Revelar</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera aplicación en Qwik",
    },
  ],
};
