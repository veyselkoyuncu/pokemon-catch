import type { Metadata } from "next";
import ApolloWrapper from "@/components/ApolloWrapper";
import { PokemonProvider } from "@/context/PokemonContext";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Pokémon Catch App",
    description: "Pokémonları yakala ve koleksiyonunu genişlet!",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const messages = await getMessages();

    return (
        <html lang="tr">
        <body>
        <SessionProviderWrapper>
            <PokemonProvider>
                <ApolloWrapper>
                    <NextIntlClientProvider messages={messages}>
                        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                            <Header />
                            <main style={{ flex: 1, padding: "20px", maxWidth: "1440px", margin: "0 auto" }}>
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </NextIntlClientProvider>
                </ApolloWrapper>
            </PokemonProvider>
        </SessionProviderWrapper>
        </body>
        </html>
    );
}
