import { formatUrl } from "@/lib/utils/string.utils";
import whiteLogo from "@/public/logo_white.svg";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link
            style={{
                height: "100%",
                width: "auto",
            }}
            href={formatUrl("")}>
            <Image
                style={{ height: "100%", width: "auto" }}
                src={whiteLogo}
                alt="BASF"
                unoptimized
            />
        </Link>
    );
}
