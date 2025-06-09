import React, { useContext, memo, useState } from "react";
import { CharacterLocationContext } from "../contexts/CharacterLocationContext";
import "../styles/character-card.css";
import {
  CaretDownIcon,
  ChevronRightIcon,
  HamburgerMenuIcon,
  CheckIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// Character card shown when a label is clicked
const CharacterCard = ({ character, onClose }) => {
  return (
    <div className="character-card">
      <div className="card-header">
        <h3>{character.name}</h3>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="card-content">
        {character.characterData && (
          <>
            <div className="stat-row">
              <span>Class:</span>
              <span>{character.characterData.class || "Unknown"}</span>
            </div>
            <div className="stat-row">
              <span>Level:</span>
              <span>{character.characterData.level || "1"}</span>
            </div>
            <div className="stat-row">
              <span>Health:</span>
              <span>
                {character.characterData.health || "??"}/
                {character.characterData.maxHealth || "??"}
              </span>
            </div>
            <div className="stat-row">
              <span>Position:</span>
              <span>
                ({character.characterData.position?.col || "?"},{" "}
                {character.characterData.position?.row || "?"})
              </span>
            </div>
          </>
        )}
      </div>
      <div className="card-footer">
        <button
          className="view-button"
          onClick={() => console.log("View character sheet")}
        >
          View Character Sheet
        </button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="IconButton" aria-label="Customise options">
              <HamburgerMenuIcon />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="DropdownMenuContent"
              sideOffset={5}
            >
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
      </div>
    </div>
  );
};

const CharacterOverlay = ({ positions }) => {
  const { characterLocations } = useContext(CharacterLocationContext);
  const overlayRef = React.useRef();
  const [expandedCharacterId, setExpandedCharacterId] = useState(null);

  // Add click outside handler to close expanded character card
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        expandedCharacterId &&
        overlayRef.current &&
        !overlayRef.current.contains(event.target)
      ) {
        setExpandedCharacterId(null);
      }
    };

    // Add event listener when a card is expanded
    if (expandedCharacterId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedCharacterId]);

  // Debug logging
  React.useEffect(() => {
    console.log("CharacterOverlay positions:", positions);
    console.log("CharacterOverlay context locations:", characterLocations);
  }, [positions, characterLocations]);

  // Make sure positions exist and have entries
  const hasPositions = positions && Object.keys(positions).length > 0;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Allow clicks to pass through to the canvas
      }}
    >
      {" "}
      {hasPositions &&
        Object.entries(positions).map(([id, pos]) => (
          <div
            key={id}
            className={`character-label ${
              expandedCharacterId === id ? "expanded" : ""
            }`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
            }}
            onClick={() => {
              // Toggle expanded state for this character
              setExpandedCharacterId(expandedCharacterId === id ? null : id);
            }}
          >
            {pos.name}
            {expandedCharacterId === id && (
              <CharacterCard
                character={pos}
                onClose={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent's onClick
                  setExpandedCharacterId(null);
                }}
              />
            )}
          </div>
        ))}
    </div>
  );
};

// Use React.memo with a custom comparison function
export default memo(CharacterOverlay, (prevProps, nextProps) => {
  // Always re-render if positions have changed
  if (
    JSON.stringify(prevProps.positions) !== JSON.stringify(nextProps.positions)
  ) {
    return false;
  }
  // Internal state changes (like expandedCharacterId) will still trigger re-renders
  return true;
});
