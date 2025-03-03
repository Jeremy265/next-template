import moment from "moment";
import { toast } from "react-toastify";

export const addObjectToArray = <T>(object: T, array: T[]): T[] => [
    ...array,
    object,
];

export const updateObjectOfArray = <T>(
    object: T,
    key: keyof T,
    array: T[]
): T[] => {
    const newArray = [...array];
    const objectIndex: number = array.findIndex(
        (item: T) => object[key as keyof T] === item[key]
    );
    newArray[objectIndex] = object;
    return newArray;
};

export const removeObjectOfArray = <T>(
    object: T,
    key: keyof T,
    array: T[]
): T[] => array.filter((item) => object[key] !== item[key]);

export const sortArray = <T>({
    array,
    key,
    isDate = false,
    direction = "asc",
}: {
    array: T[];
    key?: keyof T;
    isDate?: boolean;
    direction?: "asc" | "desc";
}): T[] => {
    array = [...array];
    try {
        array.sort((a: T, b: T) => {
            if (key !== undefined) {
                a = a[key] as any;
                b = b[key] as any;
                if (a === undefined || b === undefined)
                    throw new Error(
                        `Sorting failed : objects must have key ${
                            key as string
                        }`
                    );
            }

            if (!a) return direction === "asc" ? -1 : 1;
            if (!b) return direction === "asc" ? 1 : -1;

            if (!isNaN(Number(a)) && !isNaN(Number(b))) {
                a = Number(a) as any;
                b = Number(b) as any;
            }

            if (typeof a !== typeof b) {
                throw new Error(
                    `Sorting failed : values must have identical type, ${typeof a} and ${typeof b} encountered.`
                );
            }

            // typeof new Date() === Object
            if (isDate || a instanceof Date)
                return direction === "asc"
                    ? moment(a as any).isAfter(b as any)
                        ? 1
                        : -1
                    : moment(a as any).isBefore(b as any)
                    ? 1
                    : -1;

            switch (typeof a) {
                case "number":
                    return direction === "asc"
                        ? a - (b as number)
                        : (b as number) - a;
                case "string":
                    return direction === "asc"
                        ? a.localeCompare(b as string)
                        : -a.localeCompare(b as string);
                case "boolean":
                    return direction === "asc"
                        ? a < b
                            ? -1
                            : 1
                        : a > b
                        ? 1
                        : -1;
                default:
                    throw new Error(
                        `Sorting failed : data type must be "number", "string" or "date", but object is type of ${typeof a}.`
                    );
            }
        });
        return array;
    } catch (error: any) {
        toast.error(error.message);
        return array;
    }
};
