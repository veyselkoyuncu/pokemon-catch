import ProfileInfo from "@/components/ProfileInfo";
import ProfilePokemons from "@/components/ProfilePokemons";

export default function ProfilePage() {
    return (
        <div style={{ padding: "20px" }}>
            <ProfileInfo />
            <ProfilePokemons />
        </div>
    );
}
