"use client";
import AutoResizeTextarea from "@/components/autoResizeTextArea";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { Memo, defaultMemos, emptyMemo } from "@/lib/memo";
import { FiPlus } from "react-icons/fi";

export default function Body() {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const [memos, setMemos] = useState(defaultMemos);
  const [modalMemo, setModalMemo] = useState<Memo>();

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
        {memos.map((memo) => (
          <Card
            key={memo.id}
            variant="filled"
            boxShadow={"md"}
            cursor={"pointer"}
            w={["100%", "48%", "60", null, "72"]}
            bg={
              memo.color == "white"
                ? dark
                  ? "whiteAlpha.300"
                  : "white"
                : memo.color + (dark ? ".900" : ".100")
            }
            border="1px"
            borderColor={
              memo.color == "white"
                ? dark
                  ? "gray.700"
                  : "gray.50"
                : memo.color + (dark ? ".900" : ".100")
            }
            transition="transform 0.2s"
            transform={modalMemo?.id == memo.id ? "scale(1.05)" : ""}
            _hover={{ transform: "scale(1.05)" }}
            onClick={() => setModalMemo(memo)}
          >
            <CardHeader pb={0}>
              <Heading size="sm" opacity={dark ? 0.8 : 1}>
                {memo.title}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text opacity={dark ? 0.8 : 1}>{memo.content}</Text>
            </CardBody>
          </Card>
        ))}
      </Flex>
      <IconButton
        position="fixed"
        right={6}
        bottom={6}
        w={16}
        h={16}
        aria-label="create"
        borderRadius="full"
        boxShadow="md"
        color="white"
        bgColor={dark ? "whiteAlpha.300" : "blackAlpha.700"}
        _hover={{ bgColor: dark ? "whiteAlpha.400" : "blackAlpha.800" }}
        icon={<Icon as={FiPlus} boxSize={8} />}
        onClick={() => setModalMemo(emptyMemo)}
      />
      <Modal
        isCentered
        size="xl"
        onClose={() => {
          if (
            !modalMemo ||
            (modalMemo?.title == "" && modalMemo?.content == "")
          )
            return;
          const idx =
            modalMemo?.id == -1
              ? -1
              : memos.findIndex((memo) => memo.id == modalMemo?.id);
          if (idx == -1) setMemos([modalMemo, ...memos]);
          memos[idx] = modalMemo;
          setMemos(memos);
          setModalMemo(undefined);
        }}
        isOpen={modalMemo != undefined}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          mx="4"
          bg={
            modalMemo?.color == "white"
              ? dark
                ? "whiteAlpha.300"
                : "white"
              : modalMemo?.color + (dark ? ".900" : ".100")
          }
        >
          <ModalHeader>
            <Input variant="unstyled" placeholder="Title" fontWeight="bold" />
          </ModalHeader>
          <ModalBody>
            <AutoResizeTextarea variant="unstyled" placeholder="Content" />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme={dark ? undefined : "blackAlpha"}
              onClick={() => setModalMemo(undefined)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
