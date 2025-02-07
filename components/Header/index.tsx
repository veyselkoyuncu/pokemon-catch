"use client";

import { Menu, Avatar, Dropdown, Row, Col, Badge } from "antd";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { usePokemon } from "@/context/PokemonContext";
import "./Header.css";
import Image from "next/image";

const Header = () => {
    const t = useTranslations("common");
    const { data: session } = useSession();
    const { caughtPokemons } = usePokemon();

    return (
        <div style={{ background: "#001529", padding: "10px 0", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: "1440px", padding: "0 20px" }}>
                <Menu
                    mode="horizontal"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: "transparent",
                        borderBottom: "none",
                        alignItems: "center",
                    }}
                >
                    <Menu.Item key="logo" style={{ padding: "0" }}>
                        <Link style={{ fontSize: "28px", fontStyle: "italic", color: "white", fontWeight: "bold" }} href="/">
                            {t("title")}
                        </Link>
                    </Menu.Item>

                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <Menu.Item key="pokemons" style={{ padding: "0" }}>
                            <Link style={{ color: "white", fontSize: "16px" }} href="/pokemons">
                                {t("pokemons")}
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="language" style={{ padding: "0" }}>
                            <LocaleSwitcher />
                        </Menu.Item>

                        {session ? (
                            <Menu.Item key="profile" style={{ padding: "0" }}>
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: "profile",
                                                label: <Link href="/profile">{t("profile")}</Link>,
                                            },
                                            {
                                                key: "logout",
                                                label: <span onClick={() => signOut()}>{t("logout")}</span>,
                                            },
                                        ],
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                                        <Avatar src={session.user?.image || "/default-avatar.png"} />
                                        <span style={{ color: "white", fontSize: "14px" }}>{session.user?.name || t("profile")}</span>
                                    </div>
                                </Dropdown>
                            </Menu.Item>
                        ) : (
                            <Menu.Item key="login" style={{ padding: "0" }}>
                                <Link style={{ color: "white", fontSize: "16px" }} href="/login">
                                    {t("login")}
                                </Link>
                            </Menu.Item>
                        )}
                        {session && (
                            <Menu.Item key="pokeball" style={{ padding: "0" }}>
                                <Badge count={caughtPokemons.length} showZero color="red">
                                    <Image src="/pokeball.png" alt="Pokeball" width={40} height={40} />
                                </Badge>
                            </Menu.Item>
                        )}
                    </div>
                </Menu>
            </div>
        </div>
    );
};

export default Header;
