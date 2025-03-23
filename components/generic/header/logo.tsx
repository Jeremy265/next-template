import { formatUrl } from "@/lib/utils/string.utils";
import logo from "@/public/logo.jpg";
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
                alt="Logo"
                style={{ height: "100%", width: "auto" }}
                src={logo}
                unoptimized
            />
        </Link>
    );
}
