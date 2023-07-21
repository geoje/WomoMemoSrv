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
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  Memo,
  defaultMemos,
  emptyMemo,
  getBgColor,
  getBorderColor,
} from "@/lib/memo";
import { FiPlus } from "react-icons/fi";
import { LuPalette, LuTrash2, LuUndo2, LuRedo2 } from "react-icons/lu";
import { MasonryGrid } from "@egjs/react-grid";
import { IconType } from "react-icons/lib";

export default function Body() {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const [memos, setMemos] = useState(defaultMemos);
  const [modalMemo, setModalMemo] = useState<Memo>();
  const masonryRef = useRef<MasonryGrid>(null);

  const saveModalMemo = () => {
    if (modalMemo && (modalMemo?.title != "" || modalMemo?.content != "")) {
      const idx =
        modalMemo?.id == -1
          ? -1
          : memos.findIndex((memo) => memo.id == modalMemo?.id);
      if (idx == -1) {
        setMemos([
          {
            ...modalMemo,
            id: memos.reduce((acc, { id }) => Math.max(acc, id) + 1, -1),
            updatedAt: new Date(),
          },
          ...memos,
        ]);
      } else {
        let tempMemos = [...memos];
        tempMemos[idx] = { ...modalMemo };
        setMemos(tempMemos);
      }
    }
    setModalMemo(undefined);
    masonryRef.current?.renderItems({ useResize: true });
  };
  const ToolIconButton = ({
    label,
    icon,
    isDisable,
    onClick,
  }: {
    label: string;
    icon: IconType;
    isDisable?: boolean;
    onClick?: () => void;
  }) => (
    <Tooltip key={label} label={label} placement="top">
      <IconButton
        aria-label={label}
        variant="ghost"
        borderRadius="full"
        color={dark ? "white" : "gray.700"}
        colorScheme={dark ? undefined : "blackAlpha"}
        icon={<Icon as={icon} boxSize={5} />}
        isDisabled={isDisable}
        onClick={onClick}
      />
    </Tooltip>
  );

  return (
    <>
      <title>Womo Memo</title>
      <Box pt={24} pb={8} px={[4, null, 8]}>
        <MasonryGrid align="center" gap={16} ref={masonryRef}>
          {memos.map((memo) => (
            <Card
              key={memo.id}
              variant="filled"
              boxShadow={"md"}
              cursor={"pointer"}
              w={["100%", "48%", "60", null, "72"]}
              bg={getBgColor(memo.color, dark)}
              border="1px"
              borderColor={getBorderColor(memo.color, dark)}
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
              <CardBody overflow="hidden">
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
          transition="background-color 0.2s"
          bg={getBgColor(modalMemo?.color ?? "white", dark)}
        >
          <ModalHeader pr={14}>
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
            <Popover
              returnFocusOnClose={false}
              placement="top"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Box>
                  <ToolIconButton label="Color" icon={LuPalette} />
                </Box>
              </PopoverTrigger>
              <PopoverContent
                border={0}
                bgColor={dark ? "whiteAlpha.100" : "blackAlpha.100"}
              >
                <PopoverBody>
                  {defaultMemos.map(({ color, title }) => (
                    <Tooltip key={color} label={title} placement="top">
                      <Button
                        minW={6}
                        w={6}
                        h={6}
                        m={1}
                        p={0}
                        bgColor={getBgColor(color, dark)}
                        border={(modalMemo?.color == color ? 2 : 1) + "px"}
                        borderColor={
                          modalMemo?.color == color
                            ? dark
                              ? "whiteAlpha.600"
                              : "blackAlpha.600"
                            : getBorderColor(color, dark)
                        }
                        _hover={{
                          bgColor: getBgColor(color, dark),
                        }}
                        onClick={() =>
                          setModalMemo({ ...(modalMemo ?? emptyMemo), color })
                        }
                      />
                    </Tooltip>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
            {[
              {
                label: "Undo",
                icon: LuUndo2,
                isDisable: true,
              },
              {
                label: "Redo",
                icon: LuRedo2,
                isDisable: true,
              },
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
            ].map(ToolIconButton)}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
