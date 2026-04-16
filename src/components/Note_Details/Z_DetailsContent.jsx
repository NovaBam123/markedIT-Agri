import { StepBack, Save, FilePlusCorner } from "lucide-react";
import { Button } from "react-bootstrap";
import { marked } from "marked";
import "../Note_Details/Details.css"
import { parseMarkdown } from "../../utils/InitialCategories";

function Z_DetailsContent({ note, onBack, onDelete, onEdit, categories, onOpenModal, downloadSingleMD }) {
  const currentCatData= categories.find(c=> c.name=== note.category) || {}
  const themeColor = currentCatData.theme || "secondary";
  const getMarkedIt= (text)=> {
    const rawHtml= marked.parse(text || "");
    return { __html: rawHtml }
  }
  return (
    <div
      className="details-container d-flex flex-column position-relative rounded-3 overflow-hidden content-body "
    >
      {/* --- 1. ZONA ATAS: HEADER (STATIS) --- */}
      <div className="position-relative ps-1 py-1 border-bottom border-secondary border-opacity-10 bg-dark">
        {/* Garis Dekorasi Header (Pendek saja menyesuaikan Header) */}
        <div
          className={`position-absolute rounded-pill bg-${themeColor}`}
        >
        </div>

        <div className={`p-2 d-flex flex-column bg-${themeColor} rounded-3`}>
          <h3 className={`${themeColor==="light"? "text-dark" : "text-white"} m-0 fw-bold ms-2`}>{note.title}</h3>
          <p className={`m-0 text-content opacity-75 text-content ms-2
            ${themeColor==="light"? "text-dark": "text-white"}
            `}>
            Date Created: {note.timeAndDate}
          </p>
        </div>
      </div>

      {/* --- 2. ZONA TENGAH: ISI MARKDOWN (SCROLLABLE) --- */}
      <div className="flex-grow-1 overflow-y-auto position-relative scroll-content">
        <div className="position-relative ps-1 py-1">
          {/* Garis Dekorasi Body (Manjang ngikutin teks Markdown) */}
          <div
            className={`position-absolute rounded-pill bg-${themeColor} side-decoration`}
          >
          </div>

          <div
            className="ms-4 p-2 markdown-body text-white"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(note.description)}}
          />
        </div>
      </div>

      {/* --- 3. ZONA BAWAH: BUTTON WRAPPER (STATIS) --- */}
      <div className="d-flex justify-content-between align-items-center px-3 w-100 py-2 border-top border-secondary border-opacity-50 button-box">
        <div className="d-flex align-items-center back-button-wrapper">
          <Button
            variant={themeColor}
            className="btn-sm text-white back-button ms-2"
            onClick={onBack}
          >
            <StepBack size={14} 
            className={`${themeColor==="light"? "text-dark": "text-white"}`}
            /> <span className={`${themeColor==="light"? "text-dark": "text-white"}`}>Back to list</span>
          </Button>
        </div>

        <div className="d-flex gap-2">
          <Button 
            variant={themeColor}
            onClick={()=> downloadSingleMD(note)}    
          >
            <div className="d-flex gap-2">
            <Save size={20}/> 
            <span className="text-content">Save</span>
            </div>
          </Button>
          <Button variant={themeColor} onClick={() => onEdit(note)}>
            <p className="m-0 p-0">Edit</p>
          </Button>
          <Button
            className="bg-transparent border-danger fw-semibold delete-btn"
            onClick={() => onDelete(note.id)}
          >
            <p className="m-0 p-0 text-white fw-semibold">Delete</p>
          </Button>
        </div>
      
      </div>
         <Button
        className={`d-flex align-items-center justify-content-center gap-1 bg-dark border-0 text-${themeColor} fw-semibold mt-2 fs-5 btn-details new-note`}
        onClick={onOpenModal}
      >
        <FilePlusCorner size={24} />Add New Note
      </Button>
    </div>
  );
}
export default Z_DetailsContent;
