"use client";

import React from "react";
import { BubbleMenu } from "@tiptap/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Icon } from "@iconify/react";
import { Editor } from "@tiptap/core";

export default function CustomBubbleMenu({ editor }: { editor: Editor }) {
  const inlineFormatting = [
    {
      icon: "mdi:format-bold",
      isActive: editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: "mdi:format-italic",
      isActive: editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: "mdi:format-strikethrough",
      isActive: editor.isActive("strike"),
      command: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: "mdi:format-underline",
      isActive: editor.isActive("underline"),
      command: () => editor.chain().focus().toggleUnderline().run(),
    },
  ];

  const headingFormatting = [1, 2, 3].map((level) => ({
    level,
    icon: `mdi:format-header-${level}`,
    command: () =>
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 })
        .run(),
    isActive: editor.isActive("heading", { level }),
  }));

  const alignmentOptions = ["left", "center", "right"].map((align) => ({
    icon: `mdi:format-align-${align}`,
    command: () => editor.chain().focus().setTextAlign(align).run(),
    isActive: editor.isActive({ textAlign: align }),
  }));

  const specialActions = [
    {
      icon: "mdi:minus",
      command: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false, // No active status for HR
    },
    {
      icon: "mdi:code-tags",
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
    },
  ];

  const activeHeading =
    headingFormatting.find((item) => item.isActive)?.level || "";

  const activeAlignment = alignmentOptions.find((item) => item.isActive);

  return (
    <BubbleMenu
      editor={editor}
      className="bg-background flex flex-row items-center gap-2 w-full"
      tippyOptions={{
        placement: "top-start",
      }}
    >
      <div className="border rounded-lg flex overflow-clip">
        {inlineFormatting.map((item, index) => (
          <Toggle
            key={index}
            onClick={item.command}
            pressed={item.isActive}
            className="cursor-pointer rounded-none"
          >
            <Icon icon={item.icon} />
          </Toggle>
        ))}
      </div>

      <ToggleGroup
        type="single"
        value={activeHeading.toString()}
        className="border bg-inherit"
      >
        {headingFormatting.map((item) => (
          <ToggleGroupItem
            key={item.level}
            value={item.level.toString()}
            onClick={item.command}
            className="cursor-pointer bg-inherit"
          >
            <Icon icon={item.icon} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        type="single"
        value={activeAlignment?.icon}
        className="border"
      >
        {alignmentOptions.map((item) => (
          <ToggleGroupItem
            key={item.icon}
            value={item.icon}
            onClick={item.command}
            className="cursor-pointer"
          >
            <Icon icon={item.icon} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="border rounded-lg flex bg-inherit overflow-clip">
        {specialActions.map((item, index) => (
          <Toggle
            key={index}
            onClick={item.command}
            pressed={item.isActive}
            className="cursor-pointer rounded-none"
          >
            <Icon icon={item.icon} />
          </Toggle>
        ))}
      </div>
    </BubbleMenu>
  );
}
