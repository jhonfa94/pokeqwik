import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImagen } from "~/components/pokemons/pokemon-image";

// import Counter from "~/components/starter/counter/counter";
// import Hero from "~/components/starter/hero/hero";
// import Infobox from "~/components/starter/infobox/infobox";
// import Starter from "~/components/starter/next-steps/next-steps";

export default component$(() => {

  const pokemonId = useSignal<number>(1);
  const showBackImage = useSignal(false);

  /**
   * useSignal para  primitivos => booleans, strings, numbers
   * useStore para arreglos y objetos
   */

  const changePokemonId = $((value: number) => {
    if ((pokemonId.value + value) <= 0) return;

    pokemonId.value += value;

  })


  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      {/* <span class="text-9xl">{pokemonId}</span> */}
      <span class="text-9xl">{pokemonId.value}</span>


      <PokemonImagen id={pokemonId.value} backImage={showBackImage.value} />

      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>

        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary mr-2">Siguiente</button>

        <button onClick$={() => showBackImage.value = !showBackImage.value} class="btn btn-primary">Voltear</button>
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
