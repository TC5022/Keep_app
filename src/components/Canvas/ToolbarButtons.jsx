import React from "react";
import { MenuButton, IconButton, MenuItem, Button } from "@chakra-ui/react";

const sizes = [2, 4, 8, 12, 16, 20, 24, 28, 32];

const colors = [
  "#ebebeb",
  "#000000",
  "#ff5252",
  "#ffbc00",
  "#00c853",
  "#00b0ff",
  "#d500f9",
  "#8d6e63",
];

export const Menubutton = ({onClick, icon, rightIcon, click}) => {
  if(click) {
    return (
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={icon}
        rightIcon={rightIcon}
        variant="none"
        onClick={() => onClick()}
      />
    );
  }else {
    return (
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={icon}
        rightIcon={rightIcon}
        variant="none"
      />
    );
  }
  
};

export const Iconbutton = ({icon, onClick}) => {
  return (
    <IconButton
      _hover={{ bg: "rgba(95,99,104,0.157)" }}
      _focus={{ bg: "none" }}
      bg="none"
      variant="none"
      icon={icon}
      onClick={() => onClick()}
    />
  );
}

export const Sizemenu = ({ canvasProps, setCanvasProps, element }) => {
  return (
    <MenuItem
      alignItems="center"
      _hover={{ bg: "none" }}
      _focus={{ bg: "none" }}
    >
      {sizes.map((size, index) => (
        <Button
          borderRadius="full"
          w={size + "px"}
          h={size + "px"}
          key={index}
          bg="black"
          minW={0}
          p={0}
          m={3}
          onClick={() => setCanvasProps({ ...canvasProps, [element]: size })}
        ></Button>
      ))}
    </MenuItem>
  );
};

export const Colormenu = ({ canvasProps, setCanvasProps, element }) => {
  return (
    <MenuItem
      alignItems="center"
      _hover={{ bg: "none" }}
      _focus={{ bg: "none" }}
    >
      {colors.map((color, index) => (
        <Button
          _hover={{ transform: "scale(1.5)" }}
          borderRadius="full"
          boxShadow="0 0 5px grey"
          w="20px"
          h="20px"
          key={index}
          bg={color}
          minW={0}
          p={0}
          m={3}
          onClick={() => setCanvasProps({ ...canvasProps, [element]: color })}
        ></Button>
      ))}
    </MenuItem>
  );
};