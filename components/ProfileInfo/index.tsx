"use client";

import { Card, Avatar, Typography, Divider, Button } from "antd";
import { useSession } from "next-auth/react";
import { useTranslations , useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const ProfileInfo = () => {
    const t = useTranslations("profile");
    const locale = useLocale();
    const { data: session,status } = useSession();
    const router = useRouter();
    if (status === "unauthenticated") {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>{t("unauthenticatedTitle")}</h1>
                <p>{t("unauthenticatedMessage")}</p>
                <Button type="primary" onClick={() => router.push(`/${locale}/login`)}>
                    {t("loginButton")}
                </Button>
            </div>
        );
    }

    return (
        <Card style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <Avatar size={100} src={session?.user?.image || "/default-avatar.png"} />
            <Typography.Title level={2}>{session?.user?.name || "Misafir Kullanıcı"}</Typography.Title>
            <Typography.Text>{session?.user?.email}</Typography.Text>
            <Divider />
            <Typography.Text strong>{t("total")}: 0 | {t("unique")}: 0</Typography.Text>
        </Card>
    );
};

export default ProfileInfo;
