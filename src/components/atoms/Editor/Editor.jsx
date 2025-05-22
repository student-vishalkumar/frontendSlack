import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PiTextAa } from "react-icons/pi";
import { Hint } from "../Hint/Hint";
import { MdSend } from "react-icons/md";
import { ImageIcon } from "lucide-react";
import useUploadImage from "@/hooks/firebase/useUploadImage";
import { Progress } from "@/components/ui/progress";

export const Editor = ({
  variant = "create",
  onSubmit,
  onCancel,
  placeholder,
  disabeled,
  defaultValue,
}) => {
  const {
    imageUrl,
    loadingPercentage,
    error,
    isUploading,
    isError,
    setImageUrl,
    uploadImageToFirebase,
    deleteImageFromFirebase,
    isDeletingImage,
  } = useUploadImage();
  const [toolbarVisible, setToolbarVisible] = useState(false);

  const containerRef = useRef();
  const submitRef = useRef();
  const disabeledRef = useRef();
  const defaultValueRef = useRef();
  const quillRef = useRef();
  const placeholderRef = useRef();
  const imageUrlRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef(null);

  async function handleImageUpload() {
    await uploadImageToFirebase(imageFile);
    console.log("yse1")
    imageInputRef.current.value = null;
    console.log("yse2")
  }

  async function handleImageCancel() {
    if (!imageUrl) return;
    await deleteImageFromFirebase(imageUrl);
    setImageUrl(null);
    setImageFile(null);
  }

  function toggleToolbar() {
    setToolbarVisible(!toolbarVisible);

    const toolbar = containerRef.current.querySelector(".ql-toolbar");
    if (toolbar) {
      toolbar.classList.toggle("hidden");
    }
  }

  useEffect(() => {
    imageUrlRef.current = imageUrl;
    console.log('imgUrlCurrentuef', imageUrlRef.current)
  }, [imageUrl]);

  function handleSend() {
    console.log('inside handleSend')
    console.log('quillRef.cureenrt',quillRef.current,quillRef.current?.getContents(),quillRef.current?.getText(),imageUrlRef.current )
    if (quillRef.current) {
      const data = JSON.stringify(quillRef.current?.getContents());
      console.log('data', data);
      console.log('imgUrlCurrent',typeof imageUrlRef.current)
      onSubmit({ body: data, image: imageUrlRef.current});
      quillRef.current.setText("");
      setImageUrl(null);
      setImageFile(null);
    }
  }

  useEffect(() => {
    if (!containerRef.current) return; //if containerRef is not initialized then return

    const container = containerRef.current;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        keyboard: {
          bindings: {
            
            enter: {
              key: "Enter",
              handler: function() {
                console.log('handleSend clicked')
                handleSend();
              },
            },

            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n"); // insert a new line
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);

    quillRef.current = quill;

    quillRef.current.focus();

    quill.setContents(defaultValueRef.current);
  }, []);

  useEffect(() => {
    if (!imageFile) return;
    setImageUrl(null);
    if (imageFile) {
      console.log('imgFile', imageFile)
      handleImageUpload();
    }
  }, [imageFile]);
  console.log('loading%', loadingPercentage)
  console.log('isupload', isUploading)
  console.log('imageUrl', imageUrl)
  return (
    <div>
    {imageFile && (
        <div className="h-20 w-20 rounded-md overflow-hidden shadow-md absolute z-20 border-2 mb-2 -top-20 bg-gray-200 dark:bg-gray-800">
          <Button
            className="absolute top-1 right-1"
            size="xs"
            variant="outline"
            onClick={handleImageCancel}
          >
            X
          </Button>
          {isUploading && (
            <Progress
              className="w-[90%] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              value={loadingPercentage}
            />
          )}
          {isError && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {getErrorMessage(error)}
            </div>
          )}
          {imageUrl && (
            <img className="size-full" src={imageUrl} alt="uploaded image" />
          )}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        className="hidden"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
    <div className="flex flex-col">
      
      <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white ">
        <div className="h-full ql-custom" ref={containerRef} />

        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={!toolbarVisible ? "Show toolbar" : "Hide toolbar"}
            side="bottom"
            align="center"
          >
            <Button
              size="iconSm"
              variant="ghost"
              disabled={false}
              onClick={toggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>

          <Hint label="Image">
            <Button
              size="iconSm"
              variant="ghost"
              disabled={isUploading || isDeletingImage}
              onClick={() => imageInputRef.current?.click()}
            >
              <ImageIcon className="size-4" />
            </Button>
          </Hint>

          <Hint label="Send Message">
            <Button
              size="iconSm"
              className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
              // onClick={() => {
              //   const messageContent = JSON.stringify(
              //     quillRef.current?.getContents()
              //   );
                
              //   onSubmit({ body: messageContent });
              //   quillRef.current?.setText("");
              // }}
              onClick = {handleSend}
              disabled={false}
            >
              <MdSend className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>

      <p className="p-2 text-[10px] text-mutes-foreground flex justify-end">
        <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  </div>
  );
};
