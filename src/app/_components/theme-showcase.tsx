import React from "react";

interface ColorThemeExample {
    name: string;
    className: string;
}

const colors: ColorThemeExample[] = [
    { name: "Primary", className: "bg-primary text-white" },
    { name: "Secondary", className: "bg-secondary text-white" },
    { name: "Accent", className: "bg-accent text-white" },
    { name: "Background", className: "bg-bg text-black" },
    { name: "Muted Background", className: "bg-bg-muted text-black" },
    { name: "Inverted Background", className: "bg-bg-inverted text-white" },
    { name: "Text", className: "text-text bg-white" },
    { name: "Muted Text", className: "text-text-muted bg-white" },
    { name: "Inverted Text", className: "text-text-inverted bg-black" },
    { name: "Link", className: "text-link underline bg-white" },
    { name: "Border", className: "border border-border text-black" },
    { name: "Muted Border", className: "border border-border-muted text-black" },
    { name: "Focus Border", className: "border border-border-focus text-black" },
    { name: "Success", className: "bg-success text-white" },
    { name: "Warning", className: "bg-warning text-black" },
    { name: "Error", className: "bg-error text-white" },
    { name: "Info", className: "bg-info text-white" },
    { name: "Disabled", className: "bg-disabled text-black" },
];

const ThemeColorShowcase = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-white">
            {colors.map((color: ColorThemeExample) => (
                <div
                    key={color.name}
                    className={`rounded-xl shadow p-4 ${color.className}`}
                >
                    {color.name}
                </div>
            ))}
        </div>
    );
};

export default ThemeColorShowcase;
