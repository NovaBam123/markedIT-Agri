import { Button } from "react-bootstrap"
import "./Details.css"
import { categoryIcons } from "../../utils/InitialCategories";

function DetailsTitle({ note, notes, onSelectNote, onSwitchCategory, searchQuery, categories, getCategoryIcon }){
  const currentCatData= categories.find(c=> c.name=== note.category) || {};
  const themeColor= currentCatData.theme || "secondary";

  let sidebarContent;
  const filteredSidebar = notes.filter((item) => {
    const isSameCategory = item.category === note.category;
    const itemTitle = item.title ? item.title.toLowerCase() : "";
    const search = searchQuery ? searchQuery.toLowerCase() : "";
    const isMatchedSearch = itemTitle.includes(search);
    return isSameCategory && isMatchedSearch;
  });
  if (filteredSidebar.length > 0) {
    sidebarContent = filteredSidebar.map((item) => (
      <div
        key={item.id}
        className="position-relative d-flex flex-column justify-content-center"
      >
        <div
          className={`position-absolute rounded-end-4 side-details bg-${themeColor}`}
        ></div>
        <Button
          className={`btn-sm btn-dark text-start ps-3 mb-2 w-100 rounded-end-4 btn-details ${
            note.id === item.id ? "bg-secondary bg-opacity-25" : "bg-transparent"
          }`}
          onClick={() => onSelectNote(item)}
        >
          <p
            className={`fw-bold mb-0 text-title ${
              note.id === item.id ? "text-white" : `text-${themeColor}`
            }`}
          >
            {item.title}
          </p>
        </Button>
      </div>
    ));
  } else {
    sidebarContent = (
      <div className="text-center text-white mt-4 p-3">
        <small>
          "{searchQuery} not found in {note.category} category"
        </small>
      </div>
    );
  }

  return (
  <div>
     <div className="d-flex scrollable-tabs justify-content-between mb-3">
       {categories
          .filter(c=> c.name !=="AllNote")
          .map((cat=> {
            const isActive= cat.name=== note.category;
            return(
              <Button
                key={cat.id}
                variant={isActive? cat.theme: `outline-${cat.theme}`}
                className="rounded-pill d-flex align-items-center gap-2"
                onClick={e=> {
                  e.stopPropagation();
                  onSwitchCategory(cat.name);
                }}
              >
                {getCategoryIcon(cat) || categoryIcons.Default}
                {cat.name}
              </Button>
            )
          }))
       }
     </div>
     <div className="sidebar-container">{sidebarContent}</div>
  </div>
  )
}

export default DetailsTitle;