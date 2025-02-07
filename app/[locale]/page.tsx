"use client";

import RandomPokemon from "@/components/RandomPokemon";
import { Button } from "antd";
import Typography from "antd/es/typography";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function Home() {
    const t = useTranslations("home");

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <Typography.Title level={1}>{t("welcomeTitle")}</Typography.Title>
            <Typography.Paragraph>{t("welcomeDescription")}</Typography.Paragraph>

            <Link href="/pokemons">
                <Button type="primary" size="large" style={{ marginBottom: "40px" }}>
                    {t("startAdventure")}
                </Button>
            </Link>

            <RandomPokemon />
        </div>
    );
}
