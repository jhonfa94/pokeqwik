import { component$ } from "@builder.io/qwik";

interface Props {
    id: number,
    size?: number,
    backImage?: boolean
}


export const PokemonImagen = component$(({ id, size = 200, backImage = false }: Props) => {

    const urlPokemonImage = backImage ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;


    return (
        <>
            <img width="96" height="96" src={urlPokemonImage}
                alt="poke"
                style={{ width: `${size}px` }}
            />
        </>
    )
})