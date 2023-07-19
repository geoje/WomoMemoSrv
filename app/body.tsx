"use client";
import AutoResizeTextarea from "@/components/autoResizeTextArea";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Memo, defaultMemos, emptyMemo } from "@/lib/memo";
import { FiPlus } from "react-icons/fi";
import { LuPalette, LuTrash2, LuUndo2, LuRedo2 } from "react-icons/lu";
import { MasonryGrid } from "@egjs/react-grid";

export default function Body() {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const [memos, setMemos] = useState(defaultMemos);
  const [modalMemo, setModalMemo] = useState<Memo>();
  const masonryRef = useRef(null);

  const saveModalMemo = () => {
    if (!modalMemo || (modalMemo?.title == "" && modalMemo?.content == "")) {
      setModalMemo(undefined);
      console.log(masonryRef.current);

      return;
    }

    const idx =
      modalMemo?.id == -1
        ? -1
        : memos.findIndex((memo) => memo.id == modalMemo?.id);
    if (idx == -1) {
      setMemos([
        {
          ...modalMemo,
          id: memos.reduce((acc, { id }) => Math.max(acc, id) + 1, -1),
          modified: new Date(),
        },
        ...memos,
      ]);
      setModalMemo(undefined);
      return;
    } else {
      let tempMemos = [...memos];
      tempMemos[idx] = { ...modalMemo };
      setMemos(tempMemos);
      setModalMemo(undefined);
    }
  };

  return (
    <>
      <title>Womo Memo</title>
      <Box pt={24} pb={8} px={[4, null, 8]}>
        <MasonryGrid align="center" gap={16}>
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
              transition="0.2s"
              transform={modalMemo?.id == memo.id ? "scale(1.01)" : ""}
              _hover={{ transform: "scale(1.01)" }}
              onClick={() => setModalMemo(memo)}
            >
              <CardHeader pb={0}>
                <Heading size="sm" opacity={dark ? 0.8 : 1}>
                  {memo.title}
                </Heading>
              </CardHeader>
              <CardBody
                maxHeight="private name() {
              
            }"
                overflow="hidden"
              >
                <Text opacity={dark ? 0.8 : 1} whiteSpace="pre-line">
                  {memo.content}
                </Text>
              </CardBody>
            </Card>
          ))}
        </MasonryGrid>
      </Box>
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
        onClose={saveModalMemo}
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
            <Input
              variant="unstyled"
              placeholder="Title"
              fontWeight="bold"
              value={modalMemo?.title}
              onChange={(e) =>
                setModalMemo({
                  ...(modalMemo ?? emptyMemo),
                  title: e.currentTarget.value,
                })
              }
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AutoResizeTextarea
              variant="unstyled"
              placeholder="Content"
              value={modalMemo?.content}
              onChange={(e) =>
                setModalMemo({
                  ...(modalMemo ?? emptyMemo),
                  content: e.currentTarget.value,
                })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Spacer />
            {[
              { label: "Color", icon: LuPalette, onClick: () => {} },
              {
                label: "Delete",
                icon: LuTrash2,
                onClick: () => {
                  if (modalMemo?.id != -1) {
                    let tempMemos = [...memos];
                    tempMemos.splice(
                      memos.findIndex((memo) => memo.id == modalMemo?.id),
                      1
                    );
                    setMemos(tempMemos);
                  }
                  setModalMemo(undefined);
                },
              },
              {
                label: "Undo",
                icon: LuUndo2,
                isDisable: true,
                onClick: () => {},
              },
              {
                label: "Redo",
                icon: LuRedo2,
                isDisable: true,
                onClick: () => {},
              },
            ].map((tool) => (
              <Tooltip key={tool.label} label={tool.label} placement="top">
                <IconButton
                  aria-label={tool.label}
                  variant="ghost"
                  borderRadius="full"
                  color={dark ? "white" : "gray.700"}
                  colorScheme={dark ? undefined : "blackAlpha"}
                  icon={<Icon as={tool.icon} boxSize={5} />}
                  isDisabled={tool.isDisable}
                  onClick={tool.onClick}
                />
              </Tooltip>
            ))}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
