"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/navigation";
import {Button, Space} from "antd";


const LocaleSwitcher = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const handleChange = (selectedLocale: string) => {
        window.location.href = `/${selectedLocale}${pathname}`;
    };

    return (
        <Space>
            <Button
                type={locale === "en" ? "primary" : "default"}
                shape="round"
                size="middle"
                style={{ opacity: locale === "en" ? 1 : 0.7 }}
                onClick={() => handleChange("en")}
            >
                ENG
            </Button>
            <Button
                type={locale === "tr" ? "primary" : "default"}
                shape="round"
                size="middle"
                style={{ opacity: locale === "tr" ? 1 : 0.7 }}
                onClick={() => handleChange("tr")}
            >
                TR
            </Button>
        </Space>
    );
};

export default LocaleSwitcher;
