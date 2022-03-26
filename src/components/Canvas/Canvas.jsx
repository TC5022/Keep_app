import React, { useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {
  Flex,
  Menu,
  Stack,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  
} from "@chakra-ui/react";
import { BsPenFill, BsEraserFill, BsGrid3X3 } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdUndo, MdRedo, MdFormatColorFill } from "react-icons/md";
import { AiOutlineClear, AiOutlineSave } from "react-icons/ai";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import { Colormenu, Iconbutton, Menubutton, Sizemenu } from "./ToolbarButtons";

const styles = {
  border: "0.0625rem solid #ebebeb",
  borderRadius: "0.25rem",
};

export function Canvas(props) {

  const [canvasProps, setCanvasProps] = useState({
    backgroundImage: "",
    strokeWidth: 4,
    eraserWidth: 5,
    strokeColor: "#000000",
    canvasColor: "#ebebeb80",
  });
  const [fullscreen, setFullscreen] = useState(true);
  const canvasRef = React.createRef();
  const { isOpen, onClose } = props;

  function undoHandler() {
    const undo = canvasRef.current?.undo;

    if (undo) {
      undo();
    }
  };

  function redoHandler() {
    const redo = canvasRef.current?.redo;

    if (redo) {
      redo();
    }
  };

  function clearHandler() {
    const clearCanvas = canvasRef.current?.clearCanvas;

    if (clearCanvas) {
      clearCanvas();
    }
  };

  const penHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;

    if (eraseMode) {
      eraseMode(false);
    }
  };

  const eraserHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;

    if (eraseMode) {
      eraseMode(true);
    }
  };

  const imageExportHandler = async () => {
    const exportImage = canvasRef.current?.exportImage;

    if (exportImage) {
      const exportedDataURI = await exportImage("png");
      props.handleChange("imagesrc", exportedDataURI);
    }

    onClose();
  };


  return (
    <Modal size={fullscreen ? "full" : "5xl"} onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <Flex flexDir="column" height={fullscreen ? "100vh" : "80vh"}>
            <Stack p={5} direction="row" spacing={10}>
              <Menu>
                <Menubutton
                  onClick={() => penHandler()}
                  icon={<BsPenFill fontSize={"25px"} />}
                  rightIcon={<RiArrowDropDownLine fontSize={"25px"} />}
                  click={true}
                />
                <MenuList>
                  <Sizemenu
                    canvasProps={canvasProps}
                    setCanvasProps={setCanvasProps}
                    element={"strokeWidth"}
                  />
                  <MenuDivider />
                  <MenuItem
                    alignItems="center"
                    _hover={{ bg: "none" }}
                    _focus={{ bg: "none" }}
                  >
                    <Colormenu
                      canvasProps={canvasProps}
                      setCanvasProps={setCanvasProps}
                      element={"strokeColor"}
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <Menubutton
                  icon={<BsEraserFill fontSize={"25px"} />}
                  rightIcon={<RiArrowDropDownLine fontSize={"25px"} />}
                  onClick={() => eraserHandler()}
                  click={true}
                />
                <MenuList>
                  <Sizemenu
                    canvasProps={canvasProps}
                    setCanvasProps={setCanvasProps}
                    element={"eraserWidth"}
                  />
                </MenuList>
              </Menu>
              <Menu>
                <Menubutton
                  icon={<BsGrid3X3 fontSize={"25px"} />}
                  rightIcon={<RiArrowDropDownLine fontSize={"25px"} />}
                  click={true}
                />
              </Menu>
              <Menu>
                <Menubutton
                  icon={<MdFormatColorFill fontSize={"25px"} />}
                  rightIcon={<RiArrowDropDownLine fontSize={"25px"} />}
                  click={false}
                />
                <MenuList>
                  <Colormenu
                    canvasProps={canvasProps}
                    setCanvasProps={setCanvasProps}
                    element={"canvasColor"}
                  />
                </MenuList>
              </Menu>
              <Iconbutton
                icon={<MdUndo fontSize={"25px"} />}
                onClick={() => undoHandler()}
              />
              <Iconbutton
                icon={<MdRedo fontSize={"25px"} />}
                onClick={() => redoHandler()}
              />
              <Iconbutton
                icon={<AiOutlineClear fontSize={"25px"} />}
                onClick={() => clearHandler()}
              />
              <Iconbutton
                icon={
                  fullscreen ? (
                    <BiExitFullscreen fontSize={"25px"} />
                  ) : (
                    <BiFullscreen fontSize={"25px"} />
                  )
                }
                onClick={() => setFullscreen(!fullscreen)}
              />
              <Iconbutton
                icon={<AiOutlineSave fontSize={"25px"} />}
                onClick={() => imageExportHandler()}
              />
            </Stack>
            <Flex h="full" w="full">
              <ReactSketchCanvas
                ref={canvasRef}
                style={styles}
                width="100%"
                height="100%"
                strokeWidth={4}
                strokeColor="red"
                {...canvasProps}
              />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
