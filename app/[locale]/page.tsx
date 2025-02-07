"use client";

import RandomPokemon from "@/components/RandomPokemon";
import Typography from "antd/es/typography";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function Home() {
    const t = useTranslations("home");

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <Typography.Title level={1}>{t("welcomeTitle")}</Typography.Title>
            <Typography.Paragraph>{t("welcomeDescription")}</Typography.Paragraph>

            <Link href="/pokemons"
                style={{ marginBottom: "40px", padding:"10px 30px", backgroundColor:"#4096ff", color:"#fff", textDecoration:"none", borderRadius:"18px"}}>
                    {t("startAdventure")}
            </Link>

            <RandomPokemon />
        </div>
    );
}
