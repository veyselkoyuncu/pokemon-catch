import { LocalePrefix, Pathnames } from "next-intl/routing";

export const locales = ["en", "tr"] as const;

export const localePrefix = {
    mode: "always",
} satisfies LocalePrefix<typeof locales>;

export const pathnames = {
    "/": {
        en: "/",
        tr: "/",
    },
    "/pokemons": {
        en: "/pokemons",
        tr: "/pokemonlar",
    },
    "/pokemons/[name]": {
        en: "/pokemons/[name]",
        tr: "/pokemonlar/[name]",
    },
    "/profile": {
        en: "/profile",
        tr: "/profil",
    },
    "/login": {
        en: "/login",
        tr: "/giris-yap",
    },
} satisfies Pathnames<typeof locales>;
