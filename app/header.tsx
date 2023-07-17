"use client";
import { Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Box,
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
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { RiMoonClearFill } from "react-icons/ri";
import { HiSun, HiOutlineSearch } from "react-icons/hi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { RxExit } from "react-icons/rx";
import { providers } from "@/lib/auth";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === "dark";
  const isOverMd = useBreakpointValue({ base: false, md: true });
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [scrollStatus, setScrollStatus] = useState({ up: true, y: 0 });
  const [loginUrl, setLoginUrl] = useState("");

  const handleWindowScroll = () =>
    setScrollStatus((prev) => {
      return {
        up: window.scrollY < prev.y,
        y: window.scrollY,
      };
    });
  useEffect(() => {
    setLoginUrl(
      process.env.NEXT_PUBLIC_NEXTAUTH_URL +
        "/login?callbackUrl=" +
        encodeURIComponent(
          typeof window !== "undefined" && window.location.origin
            ? window.location.origin
            : ""
        )
    );
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
          <InputLeftElement color={dark ? "whiteAlpha.400" : "gray.500"}>
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
      {session ? (
        <Menu>
          <MenuButton
            as={Button}
            minW={12}
            w={12}
            h={12}
            p={0}
            variant="ghost"
            rounded="full"
          >
            {session?.user?.image ? (
              <Avatar w={9} h={9} src={session?.user?.image ?? ""} />
            ) : (
              <Icon as={PiUserCircleDuotone} />
            )}
          </MenuButton>
          <MenuList width="fit-content" alignItems={"center"}>
            <Box
              px={3}
              py={1.5}
              fontWeight={600}
              fontSize="xs"
              color={dark ? "gray.400" : "gray.500"}
            >
              <Flex gap={2} alignItems="center">
                {session.user?.provider == "naver" ? (
                  <Center
                    p={1}
                    alignItems="center"
                    bg={"#03c75a"}
                    color="white"
                  >
                    <Icon
                      as={
                        providers.find((p) => p.alt == session.user?.provider)
                          ?.icon
                      }
                      w={2}
                      h={2}
                    />
                  </Center>
                ) : (
                  <Icon
                    as={
                      providers.find((p) => p.alt == session.user?.provider)
                        ?.icon
                    }
                    w={4}
                    h={4}
                  />
                )}
                <Text>{session.user.name}</Text>
              </Flex>
              <Text mt={1}>{session.user.email}</Text>
            </Box>
            <MenuDivider />
            <MenuItem icon={<Icon as={RxExit} />} onClick={() => signOut()}>
              {"Logout"}
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Link href={loginUrl}>
          <Button colorScheme="yellow" fontSize="sm">
            {"Login"}
          </Button>
        </Link>
      )}
    </Flex>
  );
}
