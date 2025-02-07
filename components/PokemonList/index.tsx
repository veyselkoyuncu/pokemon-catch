"use client";

import { useQuery, gql } from "@apollo/client";
import { Card, Spin, Button, notification, Pagination, Row, Col } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePokemon } from "@/context/PokemonContext";
import { useState } from "react";
import { Link } from "@/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

// GraphQL Query
const GET_POKEMONS = gql`
  query GetPokemons {
    getAllPokemon {
      species
      sprite
    }
  }
`;

const sanitizePokemonId = (id: string) => {
    return id.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const PokemonList = () => {
    const t = useTranslations("pokemonList");
    const { loading, error, data } = useQuery(GET_POKEMONS);
    const { caughtPokemons, catchPokemon } = usePokemon();
    const [animatingPokemon, setAnimatingPokemon] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 18;
    const { data: session } = useSession();
    const router = useRouter();
    const locale = useLocale();

    if (loading) return <Spin size="large" />;
    if (error) return <p>{t("errorMessage")}: {error.message}</p>;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPokemons = data.getAllPokemon.slice(startIndex, endIndex);

    const isPokemonCaught = (species: string) => {
        if (!session) return false;
        return caughtPokemons.some((pokemon) => pokemon.name === species);
    };

    const handleCatch = (pokemon: { species: string; sprite: string }) => {
        if (!session) {
            router.push(`/${locale}/login`);
            return;
        }
        setAnimatingPokemon(pokemon.species);
        catchPokemon({
            id: sanitizePokemonId(pokemon.species),
            name: pokemon.species,
            image: pokemon.sprite,
        });

        setTimeout(() => {
            setAnimatingPokemon(null);
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
        <div style={{ padding: "20px" }}>
            <Row gutter={[24, 24]} justify="center">
                {paginatedPokemons.map((pokemon: { species: string; sprite: string }) => (
                    <Col key={pokemon.species} xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Card hoverable style={{ textAlign: "center" }}>
                            <Link href={`/pokemons/${sanitizePokemonId(pokemon.species)}`}>
                                <div style={{ cursor: "pointer" }}>
                                    <Image src={pokemon.sprite} alt={pokemon.species} width={100} height={100} />
                                    <p>{pokemon.species}</p>
                                </div>
                            </Link>

                            {animatingPokemon === pokemon.species ? (
                                <motion.div
                                    animate="animate"
                                    initial="initial"
                                    variants={pokeballVariants}
                                    style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
                                >
                                    <Image src="/pokeball.png" alt="Pokeball" width={50} height={50} />
                                </motion.div>
                            ) : (
                                <Button
                                    type={isPokemonCaught(pokemon.species) ? "default" : "primary"}
                                    disabled={isPokemonCaught(pokemon.species)}
                                    onClick={() => handleCatch(pokemon)}
                                    style={{ marginTop: "10px" }}
                                >
                                    {isPokemonCaught(pokemon.species) ? t("caughtButton") : t("catchButton")}
                                </Button>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={data.getAllPokemon.length}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default PokemonList;
