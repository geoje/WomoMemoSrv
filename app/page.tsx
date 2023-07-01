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

export default function Page() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <Flex wrap="wrap" justifyContent="center" gap={4} p={8}>
        {colors.map((color, i) => (
          <Card
            key={color}
            variant="filled"
            boxShadow={"md"}
            cursor={"pointer"}
            w={["100%", "47%", "60", null, "72"]}
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
        onClose={onClose}
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
