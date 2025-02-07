import PokemonList from "@/components/PokemonList";

export default function PokemonsPage() {
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{
                maxWidth:"1440px"
            }}>
                <h1>Pokémons</h1>
                <PokemonList/>
            </div>

        </div>
    );
}
