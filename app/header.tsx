"use client";
import { Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Button,
  Center,
  CloseButton,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiMoonClearFill } from "react-icons/ri";
import { HiSun, HiOutlineSearch } from "react-icons/hi";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === "dark";
  const isOverMd = useBreakpointValue({ base: false, md: true });
  const [search, setSearch] = useState("");
  const [scrollStatus, setScrollStatus] = useState({ up: true, y: 0 });

  const handleWindowScroll = () =>
    setScrollStatus((prev) => {
      return {
        up: window.scrollY < prev.y,
        y: window.scrollY,
      };
    });
  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <Flex
      position="fixed"
      w="full"
      h={16}
      px={[2, null, 4]}
      gap={2}
      zIndex={3}
      alignItems="center"
      justifyContent="space-between"
      background={dark ? "gray.800" : "white"}
      transition="transform 0.2s, boxShadow 0.2s"
      transform={scrollStatus.up ? "" : "translateY(-100%)"}
      boxShadow={
        scrollStatus.up
          ? `0 1px 3px 0 rgb(0 0 0/0.${
              dark ? 4 : 1
            }),0 1px 2px -1px rgb(0 0 0/0.${dark ? 4 : 1})`
          : ""
      }
    >
      <Link href="/">
        <IconButton
          w={[12, null, 16]}
          h={12}
          aria-label="home"
          variant="ghost"
          icon={<Image src="/logo.svg" width={8} height={8} alt="logo" />}
        />
      </Link>
      <InputGroup w={{ base: "md", lg: "xl", xl: "2xl" }} mx="auto">
        {isOverMd && (
          <InputLeftElement>
            <Icon as={HiOutlineSearch} />
          </InputLeftElement>
        )}
        <Input
          variant="filled"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {search && (
          <InputRightElement>
            <CloseButton onClick={() => setSearch("")} />
          </InputRightElement>
        )}
      </InputGroup>

      <IconButton
        aria-label="mode"
        variant="ghost"
        onClick={toggleColorMode}
        colorScheme={colorMode === "dark" ? "yellow" : "gray"}
        icon={
          colorMode === "dark" ? (
            <Icon as={HiSun} color="yellow.500" />
          ) : (
            <Icon as={RiMoonClearFill} color="gray.500" />
          )
        }
      />

      <Menu>
        <MenuButton
          as={Button}
          minW={12}
          w={12}
          h={12}
          mr={[0, null, 4]}
          p={0}
          variant="ghost"
          rounded="full"
        >
          <Avatar
            size={"sm"}
            src={"https://api.dicebear.com/6.x/personas/svg"}
          />
        </MenuButton>
        <MenuList alignItems={"center"}>
          <br />
          <Center>
            <Avatar
              size={"2xl"}
              src={"https://api.dicebear.com/6.x/personas/svg"}
            />
          </Center>
          <br />
          <Center>
            <p>Username</p>
          </Center>
          <br />
          <MenuDivider />
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
