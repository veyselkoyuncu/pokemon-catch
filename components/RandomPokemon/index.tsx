"use client";

import { gql, useQuery } from "@apollo/client";
import Card from "antd/es/card";
import Spin from "antd/es/spin";
import Typography from "antd/es/typography";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";


const GET_ALL_POKEMONS = gql`
  query GetAllPokemons {
    getAllPokemon {
      species
      sprite
    }
  }
`;

const RandomPokemon = () => {
    const t = useTranslations("home");
    const { loading, error, data } = useQuery(GET_ALL_POKEMONS);
    const [randomPokemon, setRandomPokemon] = useState<{ species: string; sprite: string } | null>(null);

    useEffect(() => {
        if (data?.getAllPokemon && data.getAllPokemon.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.getAllPokemon.length);
            setRandomPokemon(data.getAllPokemon[randomIndex]);
        }
    }, [data]);

    if (loading) return <Spin size="large" />;
    if (error) return <Typography.Paragraph>{t("randomPokemonError")}</Typography.Paragraph>;

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {randomPokemon && (
                <Card
                    title={t("randomPokemonTitle")}
                    style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}
                >
                    <Image
                        src={randomPokemon.sprite}
                        alt={randomPokemon.species}
                        width={150}
                        height={150}
                    />
                    <Typography.Title level={3}>{randomPokemon.species}</Typography.Title>
                </Card>
            )}
        </div>
    );
};

export default RandomPokemon;
