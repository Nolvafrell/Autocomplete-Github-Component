type TOpenInNewTab = (url: string) => void;

export const openInNewTab: TOpenInNewTab = (url) => window.open(url, "_blank");
