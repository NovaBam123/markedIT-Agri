import { Button } from "react-bootstrap";
import "./A1_CardManager.css"

 function ForSearchPage({ note, onSelect, categories }) {
    const catMatch= categories.find(cat=> cat.name=== note.category);
    const themeColor= catMatch? catMatch.theme: "secondary";
    return (
      <div className="col-12 col-md-6 col-lg-6 mb-1 p-3">
          <div className="position-relative">
            {/* Garis warna Indicator - Otomatis ngikutin theme dari induk */}
            <div className={`position-absolute bg-${themeColor} h-100 rounded-end-3 top-50 translate-middle-y side-decoration`} 
                 style={{ width: '8px', zIndex: 2 }}>
            </div>

            <Button
              variant="dark"
              className="w-100 text-start ps-4 py-2 rounded-end-4 border-0 d-flex justify-content-between align-items-center btn-card"
              onClick={() => onSelect(note)}
            >
              <div className="d-flex flex-column">
                {/* Icon & Title - Gabungin biar cakep */}
                <h5 className={`fw-bold mb-1 text-${themeColor}`}>
                   {note.title}
                </h5>
                <p className="text-white-50 small m-0 text-truncate">
                 {note.description?.slice(0, 45) || "No Description..."}
                </p>
              </div>
              
              {/* Label Kategori di Pojok Kanan */}
              <h6 className="text-warning opacity-25 me-2">
                {note.category}
              </h6>
            </Button>
          </div>
        </div>
       
    )
 }
 export default ForSearchPage;