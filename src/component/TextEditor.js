import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ setContent }) => {
  const editor = useRef(null);
  const [contents, setContents] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      buttons: [
        "italic",
        "bold",
        "underline",
        "link",
        "unlink",
        "hr",
        "font",
        "fontsize",
        "symbol",
        "brush",
      ],
      removeButtons: ["image", "fullsize"],
    }),
    []
  );

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="w-[320px] md:w-full">
          <JoditEditor
            ref={editor}
            value={contents}
            config={config}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TextEditor;
