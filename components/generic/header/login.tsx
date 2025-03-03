"use client";

import { AuthContext } from "@/lib/contexts/auth.provider";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import CustomButton from "../button";
import Field from "../fields/field";
import CustomModal from "../modal";
import Profile from "./profile";

const AppStoreAuthentication = dynamic(
    () => import("./appStoreAuthentication"),
    { ssr: false }
);

const devMode = process.env.NODE_ENV === "development";

export default function Login() {
    const user = useContext(AuthContext).user;
    const router = useRouter();
    const [_, setCookie] = useCookies();
    const [devModeModalOpen, setDevModeModalOpen] = useState<boolean>(devMode);
    const [token, setToken] = useState("");

    return (
        <>
            {user ? (
                <Profile />
            ) : (
                <>
                    {!devMode && <AppStoreAuthentication />}
                    <CustomModal
                        title="Dev Mode login"
                        open={devModeModalOpen}
                        onClose={() => setDevModeModalOpen(false)}>
                        <Field
                            id="token"
                            label="Token"
                            onChange={setToken}
                            required
                        />
                        <CustomButton
                            onClick={() => {
                                if (!token)
                                    return toast.error(
                                        "Le token est obligatoire"
                                    );
                                setCookie(
                                    "basf_federation_access_token",
                                    token!.trim(),
                                    {
                                        path: "/",
                                    }
                                );
                                toast.success("Token enregistré");
                                router.refresh();
                                return { token };
                            }}>
                            Valider
                        </CustomButton>
                    </CustomModal>
                </>
            )}
        </>
    );
}
