import { getRelativeTime } from '../../utils/Time';
import './A1_CardManager.css'

function NoteCards({ note, onSelect, categories}) {
    const stripMarkdown = (text) => {
    if (!text) return "";

    return text
        // 1. Hapus Code Blocks (``` dan `) - Harus paling atas biar isinya gak ganggu regex lain
        .replace(/`{1,3}[^`]*`{1,3}/g, "")
        
        // 2. Hapus Headers (Meskipun ada spasi di depannya)
        // Kita tambah [\s\t]* supaya kalau ada spasi/tab sebelum # tetep kena bantai
        .replace(/^[\s\t]*#+\s+/gm, "")
        
        // 3. Hapus Horizontal Rules (--- atau ***)
        .replace(/^[-*_]{3,}$/gm, "")

        // 4. Hapus Link [Text](URL) -> ambil "Text" aja
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

        // 5. Hapus Bold/Italic
        .replace(/[*_]{1,3}/g, "")

        // 6. Hapus Blockquotes (>) - Sama, kasih toleransi spasi di depannya
        .replace(/^[\s\t]*>\s+/gm, "")

        // 7. Hapus List markers
        .replace(/^[\s\t]*[*+-]\s+/gm, "")
        .replace(/^[\s\t]*\d+\.\s+/gm, "")

        // 8. Bersihkan Newlines dan spasi ganda
        .replace(/\s+/g, " ") 
        .trim();
};
    const categoryData= categories.find(c=> c.name=== note.category);
    const theme= categoryData ? categoryData.theme : "secondary";
    return (
      <div className={`col-12 col-md-6 col-lg-4 mb-3 position-relative`}>
        <div
          className={`position-absolute bg-${theme} rounded-3 side-decoration`}
        ></div>
        <div
          className={`h-100 bg-dark btn-card px-3 py-1 btn-card`}
          onClick={() => onSelect(note)}
          role="button"
        >
          <h5 className={`card-title text-${theme}`}>{note.title}</h5>
          <p className="card-text text-white small opacity-50">
            {stripMarkdown(note.description || "").slice(0, 50)}...
          </p>
          <div className="d-flex align-items-start justify-content-between ps-0 ms-0 mt-2">
            <p className={`text-secondary small opacity-75 mb-0`}>{note.category}</p>
            <p className='text-secondary small opacity-75 mb-0'>{getRelativeTime(note.id)}</p>
          </div>
        </div>
      </div>
    );
}
export default NoteCards;