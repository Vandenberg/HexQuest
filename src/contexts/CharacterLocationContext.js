import React, { createContext, useState, useEffect } from "react";
import {
  CaretDownIcon,
  ChevronRightIcon,
  HamburgerMenuIcon,
  CheckIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const CharacterLocationContext = createContext({
  characterLocations: [],
  updateCharacterLocation: () => {},
  gridConfig: { width: 7, height: 8 },
});

export const CharacterLocationProvider = ({ children }) => {
  const [characterLocations, setCharacterLocations] = useState([]);
  // Define grid configuration here to match HexagonalGrid
  const gridConfig = { width: 7, height: 8 };

  // Load from localStorage on mount
  useEffect(() => {
    const storedLocations = localStorage.getItem("characterLocations");
    if (storedLocations) {
      try {
        setCharacterLocations(JSON.parse(storedLocations));
      } catch (error) {
        console.error("Failed to parse character locations:", error);
      }
    }
  }, []);

  // Save to localStorage whenever locations change
  useEffect(() => {
    localStorage.setItem(
      "characterLocations",
      JSON.stringify(characterLocations)
    );
    console.log(JSON.stringify(characterLocations));
  }, [characterLocations]);

  const updateCharacterLocation = (characterId, row, col) => {
    if (row === null && col === null) {
      // Remove character location
      setCharacterLocations((prev) =>
        prev.filter((loc) => loc.characterId !== characterId)
      );
    } else {
      // Update or add character location
      setCharacterLocations((prev) => {
        const filtered = prev.filter((loc) => loc.characterId !== characterId);
        return [...filtered, { characterId, row, col }];
      });
    }
  };

  return (
    <CharacterLocationContext.Provider
      value={{
        characterLocations,
        updateCharacterLocation,
        gridConfig,
      }}
    >
      {children}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="IconButton" aria-label="Customise options">
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenu.Item className="DropdownMenuItem"></DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem">
              New Window <div className="RightSlot">⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem" disabled>
              New Private Window <div className="RightSlot">⇧+⌘+N</div>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                More Tools
                <div className="RightSlot">
                  <ChevronRightIcon />
                </div>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent
                  className="DropdownMenuSubContent"
                  sideOffset={2}
                  alignOffset={-5}
                >
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Save Page As… <div className="RightSlot">⌘+S</div>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Create Shortcut…
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Name Window…
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="DropdownMenu.Separator" />
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Developer Tools
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            <DropdownMenu.Separator className="DropdownMenuSeparator" />

            <DropdownMenu.CheckboxItem
              className="DropdownMenuCheckboxItem"
              //   checked={bookmarksChecked}
              //   onCheckedChange={setBookmarksChecked}
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              Show Bookmarks <div className="RightSlot">⌘+B</div>
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
              className="DropdownMenuCheckboxItem"
              //   checked={urlsChecked}
              //   onCheckedChange={setUrlsChecked}
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              Show Full URLs
            </DropdownMenu.CheckboxItem>

            <DropdownMenu.Separator className="DropdownMenuSeparator" />

            <DropdownMenu.Label className="DropdownMenuLabel">
              People
            </DropdownMenu.Label>
            <DropdownMenu.RadioGroup
            //   value={person}
            //   onValueChange={setPerson}
            >
              <DropdownMenu.RadioItem
                className="DropdownMenuRadioItem"
                value="pedro"
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                Pedro Duarte
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem
                className="DropdownMenuRadioItem"
                value="colm"
              >
                <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                  <DotFilledIcon />
                </DropdownMenu.ItemIndicator>
                Colm Tuite
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>

            <DropdownMenu.Arrow className="DropdownMenuArrow" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </CharacterLocationContext.Provider>
  );
};
