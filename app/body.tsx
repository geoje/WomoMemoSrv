"use client";
import AutoResizeTextarea from "@/components/autoResizeTextArea";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const colors = [
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

export default function Body() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <title>Womo Memo</title>
      <Flex
        wrap="wrap"
        justifyContent="center"
        gap={4}
        pt={24}
        pb={8}
        px={[4, null, 8]}
      >
        {colors.map((color, i) => (
          <Card
            key={color}
            variant="filled"
            boxShadow={"md"}
            cursor={"pointer"}
            w={["100%", "48%", "60", null, "72"]}
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
            transition="transform 0.2s"
            transform={selected == i ? "scale(1.05)" : ""}
            _hover={{ transform: "scale(1.05)" }}
            onClick={() => {
              setSelected(i);
              onOpen();
            }}
          >
            <CardHeader pb={0}>
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
      <Modal
        isCentered
        size="xl"
        onClose={() => {
          onClose();
          setSelected(-1);
        }}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          mx="4"
          bg={
            colors[selected] == "white"
              ? colorMode === "dark"
                ? "whiteAlpha.300"
                : "white"
              : colors[selected] + (colorMode === "dark" ? ".900" : ".100")
          }
        >
          <ModalHeader>
            <Input
              variant="unstyled"
              placeholder={colors[selected]?.toUpperCase()}
              fontWeight="bold"
            />
          </ModalHeader>
          <ModalBody>
            <AutoResizeTextarea
              variant="unstyled"
              placeholder={colors[selected]}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme={colorMode === "dark" ? undefined : "blackAlpha"}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
