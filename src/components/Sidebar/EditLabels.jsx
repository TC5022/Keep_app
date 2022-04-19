import React, { useState } from "react";
import {
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  InputLeftElement,
  Flex,
  Text,
} from "@chakra-ui/react";
import { NoteButton } from "../NoteButton";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteLabel, newLabel } from "../../actions/labels";

export function EditLabels(props) {

  const { isOpen, onClose } = props;
  const [labelInput, setLabelInput] = useState("");
  const dispatch = useDispatch();

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={0}>
        <ModalHeader
          fontSize="1rem"
          fontWeight={"bold"}
          color="#202124"
          px="15px"
          pt="15px"
          pb={0}
        >
          Edit Labels
        </ModalHeader>
        <ModalBody px="15px" pb="15px" pt={0}>
          <InputGroup mb="3px">
            <InputLeftElement
              border="none"
              _focus={{ border: "none" }}
              pointerEvents="none"
              children={<AiOutlinePlus color="#9e9e9e" fontSize={"1.25rem"} />}
            />
            <Input
              placeholder="Create new label"
              border="none"
              borderRadius={0}
              px={0}
              fontWeight={"bold"}
              fontSize="14px"
              margin="0 15px"
              _focus={{
                border: "none",
                boxShadow: "none",
                borderBottom: "1px solid rgba(0,0,0,0.2)",
              }}
              _placeholder={{ color: "#3c4043", opacity: "0.6" }}
              onChange={(e) => setLabelInput(e.target.value)}
              value={labelInput}
              color="#3c4043"
            />
            <NoteButton
              onChange={() => dispatch(newLabel(labelInput))}
              icon={<AiOutlineCheck color="#9e9e9e" fontSize={"1.25rem"} />}
            />
          </InputGroup>
          <Flex direction="column">
            {props.labels &&
              props.labels.map((label, index) => {
                return (
                  <Flex key={index}>
                    <NoteButton
                      onChange={() => dispatch(deleteLabel(label._id))}
                      icon={<MdDelete color="#00000" fontSize={"1.25rem"} />}
                    />
                    <Text pt="10px" m="0 15px" fontWeight={"bold"} fontSize="14px">{label.name}</Text>
                  </Flex>
                );
              })}
          </Flex>
        </ModalBody>
        <ModalFooter borderTop="1px solid #dadce0" p="15px 10px">
          <Button
            background={"none"}
            borderRadius={0}
            _hover={{ background: "rgba(95,99,104,0.039)" }}
            onClick={onClose}
          >
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
