import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
      }
      stats {
        base_stat
        stat {
          name
        }
      }
    }
  }
`;

export async function getPokemonDetails(name: string) {
    try {
        const { data } = await client.query({
            query: GET_POKEMON_DETAILS,
            variables: { name: name.toLowerCase() },
        });

        if (!data.pokemon) {
            console.error("⚠️ API'den null yanıt döndü!");
            return null;
        }

        return {
            id: data.pokemon.id,
            name: data.pokemon.name,
            image: data.pokemon.sprites.front_default,
            abilities: data.pokemon.abilities.map((a: { ability: { name: string } }) => a.ability.name),
            stats: data.pokemon.stats.map((s: { base_stat: number; stat: { name: string } }) => ({
                name: s.stat.name,
                value: s.base_stat,
            })),
        };
    } catch (error) {
        console.error("❌ Pokémon detayları çekilirken hata oluştu:", error);
        return null;
    }
}
