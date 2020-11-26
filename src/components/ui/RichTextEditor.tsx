import { Skeleton } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FC } from "react";
import { ReactQuillProps } from "react-quill";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
];

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Skeleton />,
});

export interface RichTextEditorProps extends ReactQuillProps {}

/* TODO: custom medium like toolbar https://github.com/zenoamaro/react-quill#html-toolbar */
const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  ...rest
}) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      {...rest}
    />
  );
};

export default RichTextEditor;
