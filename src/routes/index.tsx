import { $, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImagen } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

// import Counter from "~/components/starter/counter/counter";
// import Hero from "~/components/starter/hero/hero";
// import Infobox from "~/components/starter/infobox/infobox";
// import Starter from "~/components/starter/next-steps/next-steps";

export default component$(() => {

  // const pokemonId = useSignal<number>(1);
  // const showBackImage = useSignal(false);
  // const isPokemonVisible = useSignal(true);

  const pokemonGame = useContext(PokemonGameContext);



  /**
   * useSignal para  primitivos => booleans, strings, numbers
   * useStore para arreglos y objetos
   */

  const changePokemonId = $((value: number) => {
    if ((pokemonGame.pokemonId + value) <= 0) return;

    pokemonGame.pokemonId += value;
    pokemonGame.isPokemonVisible = true;

  })

  const nav = useNavigate();
  const gotToPokemon = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonId}/`)
  })



  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      {/* <span class="text-9xl">{pokemonId}</span> */}
      <span class="text-9xl">{pokemonGame.pokemonId}</span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`}>
      </Link> */}
      <div onClick$={() => gotToPokemon()}>
        <PokemonImagen
          id={pokemonGame.pokemonId}
          backImage={pokemonGame.showBackImage}
          isVisible={pokemonGame.isPokemonVisible}
          size={300}
        />
      </div>

      <div class="flex space-x-2 mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary">Anterior</button>

        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary">Siguiente</button>

        <button onClick$={() => pokemonGame.showBackImage = !pokemonGame.showBackImage} class="btn btn-primary">Voltear</button>

        <button onClick$={() => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible} class="btn btn-primary">Revelar</button>
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
