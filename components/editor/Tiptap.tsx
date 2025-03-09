"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import { useUser } from "@/contexts/UserProvider";
import * as Y from "yjs";
import CustomBubbleMenu from "./BubbleMenu";
import CustomFloatingMenu from "./FloatingMenu";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import "./styles.scss";

//TipTap Extensions
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Typography from '@tiptap/extension-typography'
import { SmilieReplacer } from './SmilieReplacer';

//TipTap Pro Extensions

const colors = [
  "#958DF1",
  "#F98181",
  "#FBBC88",
  "#FAF594",
  "#70CFF8",
  "#94FADB",
  "#B9F18D",
  "#C3E2C2",
  "#EAECCC",
  "#AFC8AD",
  "#EEC759",
  "#9BB8CD",
  "#FF90BC",
  "#FFC0D9",
  "#DC8686",
  "#7ED7C1",
  "#F3EEEA",
  "#89B9AD",
  "#D0BFFF",
  "#FFF8C9",
  "#CBFFA9",
  "#9BABB8",
  "#E3F4F4",
];
const getRandomElement = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)];
const getRandomColor = () => getRandomElement(colors);

export default function Editor({
  ydoc,
  provider,
}: {
  ydoc: Y.Doc;
  provider: TiptapCollabProvider;
}) {
  const { user } = useUser();
  const collab_user = {
    name: user?.user_metadata.full_name,
    color: getRandomColor(),
  };

  const extensions = [
    StarterKit.configure({
      history: false,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Underline,
    Typography,
    SmilieReplacer,
    Collaboration.configure({
      document: ydoc,
    }),
    CollaborationCursor.configure({
      provider,
      user: collab_user,
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
  ];
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "w-full p-10 focus:outline-none overflow-y-auto whitespace-pre-wrap max-w-7xl mx-auto",
      },
    },
    immediatelyRender: false,
    onCreate({ editor }) {
      editor.commands.focus(0);
    },
  });

  if (!editor) return null;

  return (
    <div
      className="h-full w-full flex-row justify-center items-center md:p-10 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-inherit
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-neutral-400
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <EditorContent editor={editor} />
      <div className="w-full">
        <CustomBubbleMenu editor={editor} />
        <CustomFloatingMenu editor={editor} />
      </div>
    </div>
  );
}
