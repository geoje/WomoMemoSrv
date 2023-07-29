"use client";
import { Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Box,
  Button,
  Center,
  CloseButton,
  Collapse,
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
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { CgMenu, CgClose } from "react-icons/cg";
import { RiMoonClearFill } from "react-icons/ri";
import { HiSun, HiOutlineSearch } from "react-icons/hi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { RxExit } from "react-icons/rx";
import { providers } from "@/lib/auth";
import { downloadInfos } from "@/lib/tool";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === "dark";
  const { isOpen, onToggle } = useDisclosure();
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
    <Box
      position="fixed"
      w="full"
      zIndex={3}
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
      <Flex
        h={16}
        px={[2, null, 4]}
        gap={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          aria-label="menu"
          display={["flex", "none"]}
          icon={
            isOpen ? (
              <Icon as={CgClose} w={5} h={5} />
            ) : (
              <Icon as={CgMenu} w={5} h={5} />
            )
          }
          variant={"ghost"}
          onClick={onToggle}
        />
        <Link href="/">
          <IconButton
            aria-label="home"
            w={[12, null, 16]}
            h={12}
            position={["absolute", "unset"]}
            top={["8px", "unset"]}
            left={["calc(50% - 24px)", "unset"]}
            variant="ghost"
            icon={<Image src="/logo.svg" width={8} height={8} alt="logo" />}
          />
        </Link>
        <InputGroup
          display={["none", "block"]}
          w={{ base: "md", lg: "xl", xl: "2xl" }}
          mx="auto"
        >
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
          display={["none", "block"]}
          onClick={toggleColorMode}
          colorScheme={dark ? "yellow" : "gray"}
          icon={
            dark ? (
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
                <Avatar
                  w={9}
                  h={9}
                  src={session?.user?.image ?? ""}
                  referrerPolicy="no-referrer"
                />
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
              <SimpleGrid columns={3} px={2}>
                {downloadInfos.map(({ icon, name, url }) => (
                  <Link
                    key={name}
                    href={url}
                    _hover={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="ghost"
                      w="full"
                      h="fit-content"
                      px={1}
                      py={2}
                      color={dark ? "gray.300" : "gray.600"}
                    >
                      <Stack align="center">
                        <Icon as={icon} />
                        <Text fontSize="xs">{name}</Text>
                      </Stack>
                    </Button>
                  </Link>
                ))}
              </SimpleGrid>
              <MenuDivider />
              <MenuItem icon={<Icon as={RxExit} />} onClick={() => signOut()}>
                {"Logout"}
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link href={loginUrl}>
            <Button fontSize="sm">{"Login"}</Button>
          </Link>
        )}
      </Flex>
      <Box display={["block", "none"]}>
        <Collapse in={isOpen}>
          <Flex>
            <Button
              variant="ghost"
              fontSize="sm"
              colorScheme={dark ? "yellow" : "gray"}
              onClick={toggleColorMode}
              leftIcon={
                dark ? (
                  <Icon as={HiSun} color="yellow.500" />
                ) : (
                  <Icon as={RiMoonClearFill} color="gray.500" />
                )
              }
            >
              {dark ? "Light" : "Dark"} Mode
            </Button>
          </Flex>
          <Box p={2}>
            <InputGroup>
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
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
