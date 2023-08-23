import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number,
    size?: number,
    backImage?: boolean,
    isVisible?: boolean
}

export const PokemonImagen = component$(({
    id,
    size = 200,
    backImage = false,
    isVisible = false
}: Props) => {

    const imageLoaded = useSignal(false);

    // Identifica cuando señal es intervenida
    useTask$(({ track }) => {
        // console.log(track)
        track(() => id);
        imageLoaded.value = false;
    })

    const imageUrl = useComputed$(() => {
        return (backImage)
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    })


    // const urlPokemonImage = backImage
    //     ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    //     : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;


    return (
        <div class="flex items-center justify-center"
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            {!imageLoaded.value && (<span>Loading...</span>)}

            <img
                width={size}
                height={size}
                src={imageUrl.value}
                alt="poke"
                style={{ width: `${size}px` }}
                onLoad$={() => {
                    // Simulamos la conexión  lenta para el cargue de la imagen
                    // setTimeout(() => {
                    imageLoaded.value = true
                    // }, 1000);
                }}
                class={[{
                    'hidden': !imageLoaded.value,
                    'brightness-0': isVisible
                }, 'transition-all']}
            />
        </div>
    )
})