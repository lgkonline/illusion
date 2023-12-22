export type ColorCardId = string
export type ArrowCardId = "red" | "green" | "blue" | "yellow"

export const colorToBootstrapVariant = (color: string) =>
    color === "red" ? "danger" : color === "green" ? "success" : color === "blue" ? "info" : "warning"
