import { IconType } from "react-icons/lib";
import { FaWindows, FaLinux, FaAndroid, FaAppStoreIos } from "react-icons/fa";
import { MdLaptopMac } from "react-icons/md";

export const downloadInfos: { icon: IconType; name: string; url: string }[] = [
  { icon: FaWindows, name: "Windows", url: "/windows" },
  { icon: MdLaptopMac, name: "macOS", url: "/macos" },
  { icon: FaLinux, name: "Linux", url: "/linux" },
  { icon: FaAndroid, name: "Android", url: "/android" },
  { icon: FaAppStoreIos, name: "iOS", url: "/ios" },
];

export function compareObject(arg1: any, arg2: any): boolean {
  if (
    Object.prototype.toString.call(arg1) ===
    Object.prototype.toString.call(arg2)
  ) {
    if (
      Object.prototype.toString.call(arg1) === "[object Object]" ||
      Object.prototype.toString.call(arg1) === "[object Array]"
    ) {
      if (Object.keys(arg1).length !== Object.keys(arg2).length) {
        return false;
      }
      return Object.keys(arg1).every((key) =>
        compareObject(arg1[key], arg2[key])
      );
    }
    return arg1 === arg2;
  }
  return false;
}

export const fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => fetch(input, init).then((res) => res.json());
