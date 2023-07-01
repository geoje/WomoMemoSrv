"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";

export default function Page() {
  const { colorMode } = useColorMode();

  return (
    <Flex wrap={"wrap"} justifyContent="center" gap={4} p={8}>
      {[
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
      ].map((color) => (
        <Card
          key={color}
          variant="filled"
          w="48"
          bg={
            color == "white"
              ? colorMode === "dark"
                ? "whiteAlpha.300"
                : "white"
              : color + (colorMode === "dark" ? ".900" : ".100")
          }
          border="1px"
          borderColor={
            color == "white"
              ? colorMode === "dark"
                ? "gray.700"
                : "gray.50"
              : color + (colorMode === "dark" ? ".900" : ".100")
          }
          boxShadow={"md"}
          cursor={"pointer"}
        >
          <CardHeader>
            <Heading size="sm" opacity={colorMode === "dark" ? 0.8 : 1}>
              {color.toUpperCase()}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text opacity={colorMode === "dark" ? 0.8 : 1}>{color}</Text>
          </CardBody>
        </Card>
      ))}
    </Flex>
  );
}
