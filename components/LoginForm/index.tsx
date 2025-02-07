"use client";

import { signIn, useSession } from "next-auth/react";
import { Button, notification } from "antd";
import { useTranslations } from "next-intl";

const LoginForm = () => {
    const { data: session } = useSession();
    const t = useTranslations("login");

    const handleLogin = async () => {
        try {
            const result = await signIn("github", { redirect: false });

            if (result?.error) {
                notification.error({
                    message: t("failure"),
                    description: t("failureDescription"),
                });
            } else {
                notification.success({
                    message: t("success"),
                    description: t("successDescription"),
                });
            }
        } catch {
            notification.error({
                message: t("unexpectedError"),
                description: t("unexpectedErrorDescription"),
            });
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            {session ? (
                <h1>
                    {t("welcome")}, {session.user?.name || t("user")}!
                </h1>
            ) : (
                <>
                    <h1>{t("title")}</h1>
                    <p>{t("description")}</p>
                    <Button type="primary" onClick={handleLogin}>
                        {t("button")}
                    </Button>
                </>
            )}
        </div>
    );
};

export default LoginForm;
