"use client"
import { useMemo, useState, useRef, useEffect } from "react";
import YooptaEditor, { createYooptaEditor, PluginElementRenderProps, YooptaContentValue, YooptaOnChangeOptions } from "@yoopta/editor";
import NextImage from 'next/image';

// Import plugins
import Paragraph from '@yoopta/paragraph';
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import Blockquote from '@yoopta/blockquote';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Code from '@yoopta/code';
import Accordion from '@yoopta/accordion';
import Table from '@yoopta/table';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import Divider from '@yoopta/divider';
import Callout from '@yoopta/callout';
import Embed from '@yoopta/embed';
import Video from '@yoopta/video';
import File from '@yoopta/file';

// Import tools
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';

// Import marks
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import { uploadToCloudinary } from "@/lib/cloudinary";
import { INITIAL_VALUE } from "./init-value";

const plugins = [
    Paragraph,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Blockquote,
    Link,
    Accordion,
    Table,
    NumberedList,
    BulletedList,
    TodoList,
    Divider,
    Callout,
    Code,
    Embed,
    Image.extend({
        options: {
            HTMLAttributes: {
                className: 'image-element-extended',
            },
            async onUpload(file) {
                try {
                    console.log("Uploading image to Cloudinary...");
                    const data = await uploadToCloudinary(file, 'image');
                    console.log("Cloudinary response:", data);

                    return {
                        src: data.secure_url,
                        alt: file.name,
                        sizes: {
                            width: data.width,
                            height: data.height,
                        },
                    };
                } catch (error) {
                    console.error("Error uploading image:", error);
                    throw error;
                }
            },
        },
    }),
    Video.extend({
        options: {
            async onUpload(file) {
                const data = await uploadToCloudinary(file, 'video');
                return {
                    src: data.secure_url,
                    alt: file.name,
                    sizes: {
                        width: data.width,
                        height: data.height,
                    },
                };
            },
            async onUploadPoster(file) {
                const image = await uploadToCloudinary(file, 'image');
                return image.secure_url;
            },
        },
    }),
    File.extend({
        options: {
            async onUpload(file) {
                const data = await uploadToCloudinary(file, 'auto');
                return {
                    src: data.secure_url,
                    alt: file.name,
                    format: data.format,
                    name: data.name,
                    size: data.bytes,
                };
            },
        },
    }),
];

const TOOLS = {
    ActionMenu: {
        render: DefaultActionMenuRender,
        tool: ActionMenuList,
    },
    Toolbar: {
        render: DefaultToolbarRender,
        tool: Toolbar,
    },
    LinkTool: {
        render: DefaultLinkToolRender,
        tool: LinkTool,
    },
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

interface EditorProps {
    value?: YooptaContentValue;
    onInit?: (editorInstance: ReturnType<typeof createYooptaEditor>) => void;
    onChange?: (value: YooptaContentValue, options: YooptaOnChangeOptions) => void;
    isReady?: boolean;
    readOnly?: boolean;
}

export default function Editor({
    value,
    onInit,
    onChange,
    isReady = false,
    readOnly = true
}: EditorProps) {
    const editor = useMemo(() => createYooptaEditor(), []);
    const selectionRef = useRef(null);
    const initialFocusRef = useRef(false);

    // Use provided value or fallback to INITIAL_VALUE
    const editorValue = useMemo(() => value || INITIAL_VALUE, [value]);

    useEffect(() => {
        if (onInit) onInit(editor);
    }, [editor, onInit]);

    // Only focus when editor first becomes ready, not on every value change
    useEffect(() => {
        if (isReady && editor && !initialFocusRef.current && !readOnly) {
            try {
                const timer = setTimeout(() => {
                    try {
                        editor.focus();
                        initialFocusRef.current = true;
                    } catch (e) {
                        console.log("Could not focus editor:", e);
                    }
                }, 200);

                return () => clearTimeout(timer);
            } catch (e) {
                console.log("Error in focus effect:", e);
            }
        }
    }, [isReady, editor, readOnly]);

    // Handle changes without losing cursor position
    const handleChange = (newValue: YooptaContentValue, options: YooptaOnChangeOptions) => {
        if (onChange) {
            onChange(newValue, options);
        }
    };

    return (
        <div className="w-full" ref={selectionRef}>
            <YooptaEditor
                width="100%"
                editor={editor}
                plugins={plugins}
                tools={TOOLS}
                marks={MARKS}
                value={editorValue}
                placeholder="Type something"
                selectionBoxRoot={selectionRef}
                autoFocus={!readOnly}
                readOnly={readOnly}
                onChange={handleChange}
            />
        </div>
    );
}