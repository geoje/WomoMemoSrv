export type Memo = {
  id: number;
  userId: string;
  title: string;
  content: string;
  color: string;
  checkBox: boolean;
  modified: Date;
};

export const defaultMemos: Memo[] = [
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
].map((c, i) => ({
  id: i,
  userId: "0",
  title: c.toUpperCase(),
  content: c,
  checkBox: false,
  color: c,
  modified: new Date(),
}));

export const emptyMemo: Memo = {
  id: -1,
  userId: "",
  title: "",
  content: "",
  color: "white",
  checkBox: false,
  modified: new Date(),
};
