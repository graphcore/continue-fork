import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ContextItemWithId } from "core";
import { ExtensionIde } from "core/ide";
import React from "react";
import styled from "styled-components";
import {
  defaultBorderRadius,
  lightGray,
  vscBackground,
  vscForeground,
} from "..";
import FileIcon from "../FileIcon";

const ContextItemDiv = styled.div`
  cursor: pointer;
  padding-left: 6px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  border-radius: ${defaultBorderRadius};
  width: fit-content;

  &:hover {
    background-color: #fff1;
  }
`;

interface ContextItemsPeekProps {
  contextItems?: ContextItemWithId[];
}

const ContextItemsPeek = (props: ContextItemsPeekProps) => {
  const [open, setOpen] = React.useState(false);

  if (!props.contextItems || props.contextItems.length === 0) {
    return null;
  }

  function openContextItem(contextItem: ContextItemWithId) {
    if (contextItem.description.startsWith("http")) {
      window.open(contextItem.description, "_blank");
    } else if (
      contextItem.description.startsWith("/") ||
      contextItem.description.startsWith("\\")
    ) {
      new ExtensionIde().openFile(
        contextItem.description.split(" ").shift() || ""
      );
    } else {
      new ExtensionIde().showVirtualFile(contextItem.name, contextItem.content);
    }
  }

  return (
    <div
      style={{
        paddingLeft: "8px",
        paddingTop: "8px",
        backgroundColor: vscBackground,
      }}
    >
      <div
        style={{
          color: lightGray,
          cursor: "pointer",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          fontSize: "11px",
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <ChevronUpIcon
            width="1.0em"
            height="1.0em"
            style={{ color: lightGray }}
          ></ChevronUpIcon>
        ) : (
          <ChevronDownIcon
            width="1.0em"
            height="1.0em"
            style={{ color: lightGray }}
          ></ChevronDownIcon>
        )}
        Context Used
      </div>
      {open && (
        <div
          style={{
            paddingTop: "2px",
          }}
        >
          {props.contextItems?.map((contextItem) => {
            if (contextItem.description.startsWith("http")) {
              return (
                <a
                  href={contextItem.description}
                  target="_blank"
                  style={{ color: vscForeground, textDecoration: "none" }}
                >
                  <ContextItemDiv
                    onClick={() => {
                      openContextItem(contextItem);
                    }}
                  >
                    <FileIcon
                      filename={
                        contextItem.description
                          .split(" ")
                          .shift()
                          .split("#")
                          .shift() || ""
                      }
                      height="1.6em"
                      width="1.6em"
                    ></FileIcon>
                    {contextItem.name}
                  </ContextItemDiv>
                </a>
              );
            }

            return (
              <ContextItemDiv
                onClick={() => {
                  openContextItem(contextItem);
                }}
              >
                <FileIcon
                  filename={contextItem.description.split(" ").shift()}
                  height="1.6em"
                  width="1.6em"
                ></FileIcon>
                {contextItem.name}
              </ContextItemDiv>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContextItemsPeek;
