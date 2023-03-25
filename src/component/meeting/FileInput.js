import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FileInput({ name, value, onChange, onSubmit }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange({ target: { name, value: nextValue } });
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    onChange({ target: { name } }, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      {value && <img src={preview} width="150" alt="미리보기" />}
      <Form.Group>
        <Form.Control
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          ref={inputRef}
          onSubmit={onSubmit}
        />
      </Form.Group>
      {value && (
        <Button variant="light" size="sm" onClick={handleClearClick}>
          X
        </Button>
      )}
    </div>
  );
}

export default FileInput;
