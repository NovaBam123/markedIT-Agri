import { useState } from "react";
import { Wrench, Plus} from "lucide-react";
import { Button, Dropdown } from "react-bootstrap";
import "./A1_CardManager.css";
import DetailsManager from "../Note_Details/DetailsManager.jsx";
import NoteCards from "./B_NoteCards.jsx";
import ForSearchPage from "./ForSearchPage.jsx";
import Z3_ModalCat from "../Z3_ModalCat.jsx";
import { iconMap } from "../../utils/InitialCategories.jsx";

function A2_CardManager({ listNote, categories, categoryIcons, activeCategory, setActiveCategory, searchQuery, onDelete, onEdit, onAddCategory, onOpenModal, onDeleteCategory, handleRenameCategory, onUpdateCategory, downloadSingleMD}) {
    const [selectedNote, setSelectNote] = useState(null);
    const filteredNotes = listNote.filter((note) => {
      const matchCategory =
        activeCategory === "AllNote" ? true : note.category === activeCategory;
      const noteTitle = note.title ? note.title.toLowerCase() : "";
      const search = searchQuery ? searchQuery.toLowerCase() : "";
      return matchCategory && noteTitle.includes(search);
    });
    const handleSwitchCategory = (newCategory) => {
      const firstNoteInCat = listNote.find((n) => n.category === newCategory);
      if (firstNoteInCat) {
        setSelectNote(firstNoteInCat);
      } else {
        alert(`No Note have been recorded for ${newCategory}`);
      }
    };
    const searchedNotes = listNote.filter((note) => {
      const title = note.title ? note.title.toLowerCase() : "";
      const search = searchQuery ? searchQuery.toLowerCase() : "";
      return title.includes(search);
    });
    const getCategoryCount = (catName) => {
      if (catName === "AllNote") {
        return listNote.length;
      }
      return listNote.filter((note) => note.category === catName).length;
    };
    const getCategoryIcon= (cat)=> {
        if(cat.id=== "system-all") return categoryIcons.AllNote;
        if(cat.id=== "system-uncategorized" ) return categoryIcons.Default;
        return iconMap[cat.iconName] || iconMap.default;
    }
    const currentCat= categories.find(c=> c.name=== activeCategory);
    const isSystemCategory= currentCat?.isSystem
    // For Modal Category ======================================
    const [smShow, setSmShow]= useState(false)
    const [isEdit, setIsEdit]= useState(false)
    const handleAddClick= ()=> {
        setIsEdit(false);
        setSmShow(true)
    }
    const handleEditClick= ()=> {
        setIsEdit(true);
        setSmShow(true);
    }
    
    let mainContent;
    if (selectedNote) {
        const freshNote= listNote.find(n=> n.id=== selectedNote.id) || selectedNote
    mainContent = (
      <DetailsManager
        note={freshNote}
        notes={listNote}
        onSelectNote={setSelectNote}
        onBack={() => setSelectNote(null)}
        onSwitchCategory={handleSwitchCategory}
        searchQuery={searchQuery}
        onDelete={onDelete}
        onEdit={onEdit}
        categories={categories}
        onOpenModal={onOpenModal}
        getCategoryIcon={getCategoryIcon}
        downloadSingleMD={downloadSingleMD}
      />
    );
  } else if (searchQuery !== "") {
    mainContent = (
      <div className="row d-flex justify-content-center">
        <h5 className="text-white mb-3">Result search for: "{searchQuery}"</h5>
        {searchedNotes.length > 0 ? (
          searchedNotes.map((note) => (
            <ForSearchPage key={note.id} note={note} onSelect={setSelectNote} categories={categories}/>
          ))
        ) : (
          <div className="col-12 col-lg-6 text-center text-white p-3 bg-danger rounded-4 btn-card">
            Nothing found for: "{searchQuery}"
          </div>
        )}
      </div>
    );
  } else {
    mainContent = (
      <div>
        <div className="d-flex ms-md-2 tag-wrapper">
          <div className="d-flex overflow-hidden flex-grow-1 gap-1">
            <div className="d-flex gap-2 category-scroll">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.name;
                const count = getCategoryCount(cat.name);
                return (
                  <div
                    key={cat.id}
                    className="position-relative d-flex container-counter py-4"
                  >
                    <Button
                      variant={isActive ? cat.theme : cat.variant}
                      className={`d-flex align-items-center gap-1 rounded-pill btn-category btn-sm`}
                      onClick={() => {
                        setActiveCategory(cat.name);
                      }}
                    >
                      {getCategoryIcon(cat)} {cat.name}
                    </Button>
                    <Button
                      className={`small position-absolute btn-counter bg-${
                        cat.theme
                      } translate-middle border-white badge 
                      ${cat.theme === "light" ? "text-dark" : "text-white"}`}
                    >
                      <span className="small fw-bold">{count}</span>
                    </Button>
                  </div>
                );
              })}
             
            </div>
            <Z3_ModalCat
              smShow={smShow}
              setSmShow={setSmShow}
              isEdit={isEdit}
              editData={currentCat}
              onAddCategory={onAddCategory}
              onUpdateCategory={onUpdateCategory}
            />
             <Button
                className="btn-category plus btn-sm rounded-pill d-flex bg-primary align-items-center ms-3 ms-md-1 mt-3"
                onClick={handleAddClick}
              >
                <Plus size={26} />
              </Button>
          </div>

          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              role="button"
              className="d-inline-block mt-3"
            >
              <div className="d-flex flex-column text-white-50 menu-icon align-items-center align-items-start mt-1 me-md-3">
                <Wrench size={22} />
                <span className="text-white-50 text-icon">Manage</span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="dropdown-menu-dark rounded-2"
              popperConfig={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [-10, -25],
                    },
                  },
                ],
              }}
            >
              <Dropdown.Item
                disabled={activeCategory === "AllNote"}
                onClick={onOpenModal}
              >
                Add New Note
              </Dropdown.Item>
              <Dropdown.Item
                disabled={isSystemCategory}
                className={isSystemCategory ? "text-muted" : ""}
                onClick={() => {
                  const newName = prompt(
                    "Enter new category name:",
                    currentCat.name
                  );
                  if (newName) {
                    handleRenameCategory(
                      currentCat.id,
                      currentCat.name,
                      newName
                    );
                  }
                }}
              >
                Rename Category
              </Dropdown.Item>
              <Dropdown.Item
                disabled={isSystemCategory}
                className={isSystemCategory ? "text-muted" : ""}
                onClick={handleEditClick}
              >
                Edit Category
              </Dropdown.Item>
              <Dropdown.Item
                disabled={isSystemCategory}
                className={isSystemCategory ? "text-muted" : "text-danger"}
                onClick={() => onDeleteCategory(currentCat.id, currentCat.name)}
              >
                Delete Category
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="row">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteCards
                key={note.id}
                note={note}
                onSelect={setSelectNote}
                categories={categories}
                activeCategory={activeCategory}
              />
            ))
          ) : (
            <div className="text-white text-center p-4">
              There are no records in this category yets
            </div>
          )}
        </div>
      </div>
    );
  }

    return(
        <div>{mainContent}</div>
    )
}
export default A2_CardManager;
