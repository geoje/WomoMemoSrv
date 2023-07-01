"use client";

import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import { Image, Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Button,
  Center,
  CloseButton,
  Flex,
  IconButton,
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

const seeds = [
  "Shadow",
  "Oliver",
  "Maggie",
  "Sasha",
  "Nala",
  "Bear",
  "Bella",
  "Simon",
  "Scooter",
  "Mimi",
  "Oscar",
  "Milo",
  "Miss kitty",
  "Cuddles",
  "Pumpkin",
  "Chester",
  "Cali",
  "Snickers",
  "Zoey",
  "Charlie",
];

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isOverMd = useBreakpointValue({ base: false, md: true });
  const [search, setSearch] = useState("");
  const [seed, setSeed] = useState(seeds[0]);

  useEffect(() => setSeed(seeds[Math.floor(Math.random() * seeds.length)]), []);

  return (
    <Flex
      h={16}
      px={4}
      gap={2}
      alignItems="center"
      justifyContent="space-between"
      background={colorMode === "dark" ? "gray.800" : "white"}
      sx={{
        boxShadow: "0 1px 3px 0 rgb(0 0 0/0.1), 0 1px 2px -1px rgb(0 0 0/0.1)",
      }}
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
            <SearchIcon />
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
            <SunIcon color="yellow.500" />
          ) : (
            <MoonIcon color="gray.500" />
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
            src={"https://api.dicebear.com/6.x/personas/svg?seed=" + seed}
          />
        </MenuButton>
        <MenuList alignItems={"center"}>
          <br />
          <Center>
            <Avatar
              size={"2xl"}
              src={"https://api.dicebear.com/6.x/personas/svg?seed=" + seed}
            />
          </Center>
          <br />
          <Center>
            <p>Username</p>
          </Center>
          <br />
          <MenuDivider />
          <MenuItem>Your Servers</MenuItem>
          <MenuItem>Account Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
