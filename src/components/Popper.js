import React from "react"
import Colors from "./Colors"
import { SettingsIcon, DeleteIcon } from "@chakra-ui/icons"
import {
  Button,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"

export default function Popper(props) {
  return (
    <div>
      <Popover placement="bottom">
        <PopoverTrigger>
          <IconButton
            colorScheme="blue"
            aria-label="color picker"
            icon={<SettingsIcon />}
            size="xs"
            variant="ghost"
          />
        </PopoverTrigger>
        <PopoverContent w="10rem" bg="orange.300">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <div className="buttons">
              <Button
                leftIcon={<DeleteIcon />}
                variant="solid"
                size="xs"
                onClick={() => props.deleteJot(props.jot)}
              >
                Delete
              </Button>
              <span>&nbsp;</span>
              <div>
                <Colors
                  boxSize={8}
                  color="#fc8181"
                  onClick={() => props.editBG1(props.jot)}
                />
                <Colors
                  boxSize={8}
                  color="#67d391"
                  onClick={() => props.editBG2(props.jot)}
                />
                <Colors
                  boxSize={8}
                  color="#C4DEF6"
                  onClick={() => props.editBG3(props.jot)}
                />
              </div>
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  )
}
