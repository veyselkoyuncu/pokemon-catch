"use client";

import { Layout } from "antd";

const { Footer: AntdFooter } = Layout;

const Footer = () => {
    return (
        <AntdFooter style={{ textAlign: "center", padding: "10px 50px" }}>
            Pokémon Catch ©2025 Created by Veysel Koyuncu
        </AntdFooter>
    );
};

export default Footer;
