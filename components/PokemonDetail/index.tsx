"use client";

import { useQuery, gql } from "@apollo/client";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Divider from "antd/es/divider";
import Spin from "antd/es/spin";
import Button from "antd/es/button";
import { notification } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePokemon } from "@/context/PokemonContext";

const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
      num
      species
      sprite
      types {
        name
      }
      abilities {
        first { name }
        second { name }
        hidden { name }
        special { name }
      }
      baseStats {
        hp
        attack
        defense
        specialattack
        specialdefense
        speed
      }
    }
  }
`;

const sanitizePokemonId = (id: string) => {
    return id.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const PokemonDetail = () => {
    const t = useTranslations("pokemonDetails");
    const params = useParams();
    const { caughtPokemons, catchPokemon } = usePokemon();
    const [animating, setAnimating] = useState(false);

    const rawId = params.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";
    const pokemonId = sanitizePokemonId(decodeURIComponent(rawId));


    const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
        variables: { pokemon: pokemonId },
    });

    if (!pokemonId) {
        return <Typography.Title level={3}>{t("notFound")}</Typography.Title>;
    }

    if (loading) return <Spin size="large" />;
    if (error || !data?.getPokemon) return <Typography.Title level={3}>{t("notFound")}</Typography.Title>;

    const pokemon = data.getPokemon;

    const isPokemonCaught = caughtPokemons.some((p) => p.name === pokemon.species);

    const handleCatch = () => {
        setAnimating(true);
        catchPokemon({
            id: sanitizePokemonId(pokemon.species),
            name: pokemon.species,
            image: pokemon.sprite,
        });

        setTimeout(() => {
            setAnimating(false);
            notification.success({
                message: t("catchSuccessTitle"),
                description: t("catchSuccessDescription", { pokemon: pokemon.species }),
            });
        }, 3000);
    };

    const pokeballVariants = {
        initial: { y: 0, rotate: 0, scale: 1 },
        animate: {
            y: [0, -150, 0, -50, 0],
            rotate: [0, 360, 0],
            transition: { duration: 2, ease: "easeInOut" },
        },
    };

    return (
        <Card style={{ maxWidth: 500, margin: "20px auto", textAlign: "center" }}>
            <Typography.Title>{pokemon.species}</Typography.Title>
            <Image src={pokemon.sprite} alt={pokemon.species} width={150} height={150} />
            <Divider />
            <Typography.Text strong>{t("types")}:</Typography.Text>
            <p>{pokemon.types.map((t: { name: string }) => t.name).join(", ")}</p>
            <Divider />
            <Typography.Text strong>{t("abilities")}:</Typography.Text>
            <ul style={{ listStyle: "none" }}>
                {Object.values(pokemon.abilities)
                    .filter((ability) => ability !== null)
                    .map((ability: { name: string }) => (
                        <li key={ability.name}>{ability.name}</li>
                    ))}
            </ul>
            <Divider />
            <Typography.Text strong>{t("stats")}:</Typography.Text>
            <ul style={{ listStyle: "none" }}>
                {Object.values(pokemon.abilities)
                    .filter((ability): ability is { name: string } => ability !== null && ability !== undefined)
                    .map((ability) => (
                        <li key={ability.name}>{ability.name}</li>
                    ))}
            </ul>

            {animating ? (
                <motion.div
                    animate="animate"
                    initial="initial"
                    variants={pokeballVariants}
                    style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
                >
                    <Image src="/pokeball.png" alt="Pokeball" width={50} height={50} />
                </motion.div>
            ) : (
                <Button
                    type={isPokemonCaught ? "default" : "primary"}
                    disabled={isPokemonCaught}
                    onClick={handleCatch}
                    style={{ marginTop: "20px" }}
                >
                    {isPokemonCaught ? t("caughtButton") : t("catchButton")}
                </Button>
            )}
        </Card>
    );
};

export default PokemonDetail;
