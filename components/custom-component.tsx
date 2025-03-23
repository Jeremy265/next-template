"use client";

import { Typography } from "@mui/material";
import { useState } from "react";
import Aligned from "./generic/aligned";
import CustomButton from "./generic/button";
import Expandable from "./generic/expandable";
import AutocompleteField from "./generic/fields/autocomplete.field";
import DateField from "./generic/fields/date.field";
import Field from "./generic/fields/field";
import CustomModal from "./generic/modal";
import ListItemSkeleton from "./generic/skeletons/list.skeleton";
import CustomTable from "./generic/table/table";

export default function CustomComponent() {
    const [open, setOpen] = useState(false);
    return (
        <Aligned col>
            <ListItemSkeleton />
            <Field label="Custom field" />
            <AutocompleteField
                label="Searchable field"
                schema={{
                    getOptionLabel: (option) => option.title,
                    getOptionDescription: (option) => option.description,
                }}
                options={[
                    { title: "option 1", description: "option 1 description" },
                    { title: "option 2", description: "option 2 description" },
                    { title: "option 3", description: "option 3 description" },
                ]}
            />
            <AutocompleteField
                label="Multiple field"
                multiple
                unlimitTags
                schema={{
                    getOptionLabel: (option) => option.title,
                    getOptionDescription: (option) => option.description,
                }}
                options={[
                    { title: "option 1", description: "option 1 description" },
                    { title: "option 2", description: "option 2 description" },
                    { title: "option 3", description: "option 3 description" },
                ]}
            />
            <DateField label="Date field" />
            <CustomButton className="info" onClick={() => setOpen(true)}>
                Open modal
            </CustomButton>
            <CustomTable
                data={[
                    { a: 1, b: 1, c: "Yes", d: new Date() },
                    { a: 2, b: 2, c: "No", d: new Date("1970-01-01") },
                ]}
                columns={[
                    { label: "A", dataKey: "a", filterKey: "a" },
                    { label: "B", dataKey: "b", filterKey: "b" },
                    {
                        label: "C",
                        dataKey: "c",
                        filterKey: "c",
                        selectable: true,
                    },
                    {
                        label: "D",
                        dataKey: "d",
                        filterKey: "d",
                    },
                ]}
            />
            <CustomModal
                title="Custom modal"
                open={open}
                onClose={() => setOpen(false)}>
                <Typography>Content</Typography>
            </CustomModal>
            <Expandable title="Expandable title" paper>
                <Typography>Expandable content</Typography>
            </Expandable>
        </Aligned>
    );
}
