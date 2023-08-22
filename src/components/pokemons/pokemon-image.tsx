import { component$, useSignal, useTask$ } from "@builder.io/qwik";

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
    isVisible = true
}: Props) => {

    const imageLoaded = useSignal(false);

    // Identifica cuando señal es intervenida
    useTask$(({ track }) => {
        // console.log(track)
        track(() => id);
        imageLoaded.value = false;
    })

    const urlPokemonImage = backImage
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;


    return (
        <div class="flex items-center justify-center"
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            {!imageLoaded.value && (<span>Loading...</span>)}

            <img
                width={size}
                height={size}
                src={urlPokemonImage}
                alt="poke"
                style={{ width: `${size}px` }}
                onLoad$={() => {
                    // Simulamos la conexión  lenta para el cargue de la imagen
                    setTimeout(() => {
                        imageLoaded.value = true
                    }, 1500);
                }}
                class={[{
                    'hidden': !imageLoaded.value,
                    'brightness-0': isVisible
                }, 'transition-all']}
            />
        </div>
    )
})