import { Container } from "react-bootstrap"
import Z_DetailsContent from "./Z_DetailsContent"
import DetailsTitle from "./DetailsTitle";
import "../Note_Details/Details.css"

function DetailsManager({ note, notes, onSelectNote, onBack, onSwitchCategory, searchQuery, onDelete, onEdit, categories, onOpenModal, getCategoryIcon, downloadSingleMD }){
    return (
      <Container>
        <div className="row">
          <div className="col-lg-4 d-none d-lg-block text-white">
            <DetailsTitle 
              note={note} 
              notes={notes}
              onSelectNote= {onSelectNote}
              onSwitchCategory={onSwitchCategory}
              searchQuery={searchQuery}
              categories={categories}
              getCategoryIcon={getCategoryIcon}
            />
          </div>
          <div className="col-lg-8 text-white content-manager">
            <Z_DetailsContent 
              note={note} 
              onBack={onBack} 
              onDelete={onDelete}
              onEdit={onEdit}
              categories={categories}
              onOpenModal={onOpenModal} 
              downloadSingleMD={downloadSingleMD} 
              />
          </div>
        </div>
      </Container>
    );
}
export default DetailsManager