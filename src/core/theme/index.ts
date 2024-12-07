import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import { DefaultColors } from "tailwindcss/types/generated/colors";

type Colors = DefaultColors & {
    orient: Record<number, string>;
    lynch: Record<number, string>;
    emerald: Record<number, string>;
    text: {
        primary: string;
        secondary: string;
        placeholder: string;
    };
    border: {
        primary: string;
    };
};

const fullConfig = resolveConfig(tailwindConfig);

export const colors: Colors = fullConfig.theme.colors as Colors;
