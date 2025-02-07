"use client";

import { usePokemon } from "@/context/PokemonContext";
import { Card, Empty, Typography, Select, Divider } from "antd";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Pokemon } from "@/types";

const { Title, Text } = Typography;
const { Option } = Select;

const ProfilePokemons = () => {
    const t = useTranslations("profile");
    const { data: session } = useSession();
    if (!session) return null;

    const { caughtPokemons } = usePokemon();
    const [favoritePokemon, setFavoritePokemon] = useState<Pokemon | null>(null);

    const uniquePokemonCount = new Set(caughtPokemons.map((pokemon) => pokemon.name)).size;

    return (
        <div style={{ padding: "20px 0" }}>
            <Title level={3}>{t("title")}</Title>
            <Text strong>
                {t("total")}: {caughtPokemons.length} | {t("unique")}: {uniquePokemonCount}
            </Text>

            <Divider />

            {caughtPokemons.length === 0 ? (
                <Empty description={t("noPokemon")} />
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                    {caughtPokemons.map((pokemon) => (
                        <Card key={pokemon.id} title={pokemon.name} bordered hoverable>
                            <Image src={pokemon.image} alt={pokemon.name} width={100} height={100} />
                        </Card>
                    ))}
                </div>
            )}

            <Divider />

            <Title level={4}>{t("favorite")}</Title>
            <Select
                placeholder={t("favorite")}
                style={{ width: "100%" }}
                onChange={(value) => {
                    const selectedPokemon = caughtPokemons.find((pokemon) => pokemon.id === value);
                    setFavoritePokemon(selectedPokemon || null);
                }}
            >
                {caughtPokemons.map((pokemon) => (
                    <Option key={pokemon.id} value={pokemon.id}>
                        {pokemon.name}
                    </Option>
                ))}
            </Select>

            {favoritePokemon && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <Typography.Text strong>{t("yourFavorite")}</Typography.Text>
                    <Card
                        title={favoritePokemon.name}
                        style={{ width: "200px", margin: "0 auto" }}
                        cover={<Image src={favoritePokemon.image} alt={favoritePokemon.name} width={150} height={150} />}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfilePokemons;
