import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography, styled } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CustomButton from "../buttons/button";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

type Props<T> = {
    id: string;
    onChange?: (formData: FormData | undefined) => void;
    required?: boolean;
};

export default function UploadField<T>(props: Props<T>) {
    const [file, setFile] = useState<string | null>(null);

    return (
        <>
            <CustomButton icon={<CloudUploadIcon />}>
                Sélectionner un fichier{props.required && "*"}
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (!e.target.files?.length) {
                            setFile(null);
                            props.onChange && props.onChange(undefined);
                            return;
                        }
                        setFile(e.target.files[0].name);
                        const formData = new FormData();
                        formData.append("file", e.target.files?.[0]!);
                        props.onChange && props.onChange(formData);
                    }}
                />
            </CustomButton>
            <Typography variant="body2">{file}</Typography>
        </>
    );
}
