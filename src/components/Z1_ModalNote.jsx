import { useState, useEffect, useMemo } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { parseMarkdown } from "../utils/InitialCategories";

function Z1_ModalNote({ onShow, onHide, kirimData, editData, onClear, categories }) {
  const resetForm= ()=> {
    setNoteData({
        title: "",
        timeAndDate: "",
        category: defaultCat,
        description: ""
    })
  }
  const handleClose = () => {
    onHide();
    onClear();
    resetForm();
  };
  
  const defaultCat = categories.find((c) => c.name !== "AllNote")?.name || "";
  const [noteData, setNoteData] = useState({
    title: "",
    timeAndDate: "",
    category: defaultCat,
    description: "",
  });
  const mdeOptions= useMemo(()=> {
    return {
      autoFocus: true,
      spellChecker: false,
      placeholder: "Your description",
      status: ["lines", "words"],
      previewRender: (plainText)=> {
        return parseMarkdown(plainText)
      },
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
        "|",
        "guide",
      ],
      minHeight: "250px",
    };
  }, [])
  const handleSave = () => {
    if(!noteData.title.trim()) return alert("Warning! Title is required!")
    kirimData(noteData);
    handleClose();
  };
  useEffect(() => {
    if (editData) {
      setNoteData(editData);
    } else {
      setNoteData({
        title: "",
        timeAndDate: "",
        category: defaultCat,
        description: "",
      });
    }
  }, [editData, defaultCat, onShow]);
  
  return (
    <>
      <Container>
        <Modal
          scrollable={true}
          contentClassName="bg-dark text-white"
          show={onShow}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header
            closeButton
            className="bg-secondary bg-opacity-25"
            closeVariant="white"
            onClick={onHide}
          >
            <Modal.Title className="fw-bold text-info">
              {editData ? "Edit Note" : "Add New Note"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* INPUT  */}
              <Form.Group className="mb-1">
                <Form.Label className="fw-semibold m-0">Title</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  className="bg-secondary text-white border-0 bg-opacity-75"
                  placeholder="e.g Organic farm, Pest control, Phyton..."
                  value={noteData.title}
                  onChange={(e) =>
                    setNoteData({ ...noteData, title: e.target.value })
                  }
                />
                {/* TIME & DATE  */}
                <Form.Label className="m-0 mt-2 fw-semibold">
                  Time dan Date
                </Form.Label>
                <Form.Control
                  type="date"
                  className="bg-secondary border-0 bg-opacity-75 text-white"
                  value={noteData.timeAndDate}
                  onChange={(e) =>
                    setNoteData({ ...noteData, timeAndDate: e.target.value })
                  }
                />
                {/* CATEGORY  */}
                <Form.Label className="m-0 mt-2 fw-semibold">
                  Category
                </Form.Label>
                <Form.Select
                  className="bg-secondary text-white border-0 bg-opacity-75"
                  value={noteData.category}
                  onChange={(e) =>
                    setNoteData({ ...noteData, category: e.target.value })
                  }
                >
                  {categories
                    .filter((c) => c.name !== "AllNote")
                    .map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              {/* TEXTAREA  */}
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="m-0 mt-2">
                  Markdown Desription
                </Form.Label>
                <SimpleMDE 
                    value={noteData.description}
                    onChange={(value)=> setNoteData({...noteData, description:value })}
                    options={mdeOptions}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="bg-secondary bg-opacity-25">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
export default Z1_ModalNote;
