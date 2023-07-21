export type Memo = {
  id: number;
  userId: string;
  title: string;
  content: string;
  color: string;
  checkBox: boolean;
  updatedAt: Date;
};

export const colors = [
  "white",
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export const emptyMemo: Memo = {
  id: -1,
  userId: "",
  title: "",
  content: "",
  color: "white",
  checkBox: false,
  updatedAt: new Date(),
};

export function getBgColor(color: string, dark: boolean) {
  return color == "white"
    ? dark
      ? "whiteAlpha.300"
      : "white"
    : color + (dark ? ".900" : ".100");
}
export function getBorderColor(color: string, dark: boolean) {
  return color == "white"
    ? dark
      ? "gray.700"
      : "gray.50"
    : color + (dark ? ".900" : ".100");
}
