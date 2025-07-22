type HexColor = `#${string}`;
type AccentType = 'solid' | 'gradient' | 'pattern' | 'none';
type TemplateId = 'CLASSIC' | 'MODERN' | 'PASTEL' | 'NEON' | 'YELLOW' | 'GREEN' | 'BLUE';

export interface Template {
    readonly id: TemplateId;
    readonly name: string;
    readonly background_color: HexColor;
    readonly text_color: HexColor;
    readonly border_color: HexColor;
    readonly accent_type: AccentType;
    readonly accent_color: HexColor;
    readonly bars: readonly [HexColor, HexColor, HexColor, HexColor, HexColor];
}

export function isValidHexColor(color: string): color is HexColor {
    return /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(color);
}

export const templates: readonly Template[] = [
    {
        id: "CLASSIC",
        name: "Classic",
        background_color: "#F5F5F5",
        text_color: "#000000",
        border_color: "#000000",
        accent_type: "solid",
        accent_color: "#000000",
        bars: ["#252525", "#404040", "#606060", "#808080", "#A0A0A0"],
    },
    {
        id: "MODERN",
        name: "Modern",
        background_color: "#FFFFFF",
        text_color: "#000000",
        border_color: "#E5E7EB",
        accent_type: "solid",
        accent_color: "#3B82F6",
        bars: ["#3B82F6", "#8B5CF6", "#EF4444", "#10B981", "#F59E0B"],
    },
    {
        id: "PASTEL",
        name: "Pastel",
        background_color: "#FDF2F8",
        text_color: "#374151",
        border_color: "#E5E7EB",
        accent_type: "solid",
        accent_color: "#F472B6",
        bars: ["#FBBF24", "#34D399", "#60A5FA", "#F472B6", "#A78BFA"],
    },
    {
        id: "NEON",
        name: "Neon",
        background_color: "#0F0F23",
        text_color: "#00FF41",
        border_color: "#00FF41",
        accent_type: "solid",
        accent_color: "#FF00FF",
        bars: ["#00FF41", "#FF00FF", "#00FFFF", "#FFFF00", "#FF4500"],
    },
    {
        id: "YELLOW",
        name: "Yellow",
        background_color: "#FFFBEB",
        text_color: "#92400E",
        border_color: "#D97706",
        accent_type: "solid",
        accent_color: "#F59E0B",
        bars: ["#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A", "#FEF3C7"],
    },
    {
        id: "GREEN",
        name: "Green",
        background_color: "#F0FDF4",
        text_color: "#14532D",
        border_color: "#16A34A",
        accent_type: "solid",
        accent_color: "#22C55E",
        bars: ["#16A34A", "#22C55E", "#4ADE80", "#86EFAC", "#BBF7D0"],
    },
    {
        id: "BLUE",
        name: "Blue",
        background_color: "#196CFF",
        text_color: "#FFFFFF",
        border_color: "#1E40AF",
        accent_type: "solid",
        accent_color: "#3B82F6",
        bars: ["#C5172E", "#FDFAF6", "#FFCC00", "#1DCD9F", "#3B82F6"],
    },
] as const;