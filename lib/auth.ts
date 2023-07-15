import { FcGoogle } from "react-icons/fc";
import { IconType } from "react-icons/lib";
import { SiNaver } from "react-icons/si";

export const providers: {
  alt: string;
  c: string;
  bg: string;
  variant: string;
  icon: IconType;
}[] = [
  {
    alt: "google",
    c: "black",
    bg: "white",
    variant: "outline",
    icon: FcGoogle,
  },
  { alt: "naver", c: "white", bg: "#03c75a", variant: "", icon: SiNaver },
];
