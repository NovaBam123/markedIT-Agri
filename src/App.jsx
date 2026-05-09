import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import A2_CardManager from "./components/Cards/A2_CardManager";
import MyNavbar from "./components/Y_Navbar/MyNavbar";
import Z1_ModalNote from "./components/Z1_ModalNote";
import { defaultCategories, categoryIcons } from "./utils/InitialCategories";
import ButtonNav from "./components/Y_Navbar/Z3_BottomNav";
import BottomNav from "./components/Y_Navbar/Z3_BottomNav";
import AboutView from "./components/Y_Navbar/Y1_AboutView";

function App() {
  // ForModalNote =========================================
  const [listNote, setListNote] = useState(() => {
    const savedNotes = localStorage.getItem("myNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [noteToEdit, setNoteToEdit] = useState(null);
  const handleTerimaData = (dataDariModal) => {
    const idx = listNote.findIndex((n) => n.id === dataDariModal.id);
    if (idx !== -1) {
      const cloneNotes = [...listNote];
      cloneNotes[idx] = dataDariModal;
      setListNote(cloneNotes);
      localStorage.setItem("markedit_notes", JSON.stringify(cloneNotes));
      setNoteToEdit(dataDariModal);
      alert("Data updated successfully!");
    } else {
      const newNote = { ...dataDariModal, id: Date.now() };
      const updatedList = [...listNote, newNote];
      setListNote(updatedList);
      localStorage.setItem("markedit_notes", JSON.stringify(updatedList));
      alert("New note added!");
    }
  };
  const handleOpenEditModal = (note) => {
    setShowModal(true);
    setNoteToEdit(note);
  };
  const handleClearResiduData = () => {
    setNoteToEdit(null);
  };
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("myCategories");
    if (!savedCategories) return defaultCategories;
    const parsedSaved = JSON.parse(savedCategories);
    return parsedSaved.map((cat) => {
      const blueprint = defaultCategories.find((d) => d.id === cat.id);
      if (blueprint) {
        return {
          ...cat,
          theme: blueprint.theme,
          variant: blueprint.variant,
        };
      }
      return cat;
    });
  });
  const [showModal, setShowModal] = useState(false);
  const handleOpenNewNote = () => {
    setNoteToEdit(null);
    setShowModal(true);
  };

  // For CardManager ===============================================
  const [searchQuery, setSearchQuery] = useState("");
  const handleDelete = (id) => {
    if (window.confirm("Are you sure want delete this note?")) {
      const updateNotes = listNote.filter((note) => note.id !== id);
      setListNote(updateNotes);
    }
  };
  const [activeCategory, setActiveCategory] = useState("AllNote");
  // For ModalCategory ========================================
  const handleAddCategory = (newCat) => {
    const finalTheme = newCat.theme || "secondary";
    const categoryWithId = {
      ...newCat,
      id: Date.now(),
      theme: finalTheme,
      variant: `outline-${finalTheme}`,
      text: `text-${finalTheme}`,
    };
    setCategories([...categories, categoryWithId]);
    alert("Succeed! New Category Added!");
  };

  const handleDeleteCategory = (idToDelete, nameToDelete) => {
    const category = categories.find((c) => c.id === idToDelete);
    if (category?.isSystem)
      return alert("Warning! This category can't deleted!");
    if (
      !window.confirm(
        `Delete Category: "${nameToDelete}" ? !Info: All notes in it will be moved to Uncategorized.`
      )
    )
      return;
    setCategories((prev) => prev.filter((c) => c.id !== idToDelete));
    setListNote((prevNotes) =>
      prevNotes.map((note) =>
        note.category === nameToDelete
          ? { ...note, category: "Uncategorized" }
          : note
      )
    );
    alert("Succeed! Category deleted dan Move to Uncategorized!");
  };
  const handleRenameCategory = (idToRename, oldName, newName) => {
    if (!newName.trim() || newName === oldName) return;
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === idToRename ? { ...cat, name: newName } : cat
      )
    );
    setListNote((prevNotes) =>
      prevNotes.map((note) =>
        note.category === oldName ? { ...note, category: newName } : note
      )
    );
    setActiveCategory(newName);
    alert(`Category rename from ${oldName} to ${newName}!`);
  };
  const handleUpdateCategory = (idToUpdate, updatedData, oldName) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === idToUpdate ? { ...cat, ...updatedData } : cat
      )
    );
    if (updatedData.name !== oldName) {
      setListNote((prevNotes) =>
        prevNotes.map((note) =>
          note.category === oldName
            ? { ...note, category: updatedData.name }
            : note
        )
      );
      setActiveCategory(updatedData.name);
    }
  };
  // CRUD storage ==========================================================
  const handleUploadData = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    let text = "";
    // ✅ TRY 1: file.text()
    try {
      text = await file.text();
    } catch (err) {
      console.log("Error:", err);
    }
    // ✅ TRY 2: fallback FileReader
    if (!text) {
      try {
        text = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          // Pakai UTF-8 secara eksplisit
          reader.onload = () => resolve(reader.result);
          reader.onerror = () =>
            reject(new Error("Error!, Failed to read file via FileReader!"));
          reader.readAsText(file, "UTF-8");
        });
      } catch (err) {
        console.error(err);
        alert("📢Error! Failed to read file from system.");
        return;
      }
    }
    // ✅ TRY 3: THE "SAKTI" CLEAN-UP & PARSING
    try {
      if (!text) throw new Error("File kosong atau tidak terbaca.");
      const cleanText = text
        .replace(/^\uFEFF/, "") // Buang BOM (Byte Order Mark)
        .replace(/^[^{|[^\s]*/, "") // Buang karakter sampah sebelum '{' atau '['
        .trim(); // Buang spasi/newline liar di akhir
      const jsonData = JSON.parse(cleanText);
      if (jsonData && typeof jsonData === "object") {
        console.log("✅Success! Restore:JsonData", jsonData);
        alert("✅Success! Data backup has been restored!");
      } else {
        throw new Error("Non-JSON Object data structure.");
      }
    } catch (err) {
      console.error("Parsing Error:", err);
      alert("📢Error!, Failed to parse aata");
    }
  };

  const handleDeleteJson = () => {
    const isConfirm = window.confirm(
      "Are you sure want delete all data in this App?"
    );
    if (!isConfirm) return;
    localStorage.clear();
    setListNote([]);
    setCategories(defaultCategories);
    alert("Succeed! Data deleted successfully!");
  };
  //=====Jalur share u/ mem-byPass strict lock os di AndroidMobile======
  const downloadJSON = async () => {
    if (listNote.length === 0) return alert("Warning! Data is Empty.");
    const now = new Date();
    const dateStr = now.toLocaleDateString("id-ID").replace(/\//g, "-");
    // Opsional: Tambah Jam & Menit biar file gak bentrok kalau download berkali-kali
    const timeStr =
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0");
    const fileName = `Markedit_Backup_${dateStr}_${timeStr}.json`;
    const backupData = {
      notes: listNote,
      categories: categories,
    };
    const fileContent = JSON.stringify(backupData, null, 2);
    // --- ENGINE 1: Modern SaveFilePicker ---
    if ("showSaveFilePicker" in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "JSON File",
              accept: { "application/json": [".json"] },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(fileContent);
        await writable.close();
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("SaveFilePicker Error:", err);
      }
    }
    // --- ENGINE 2: Fallback Standard ---
    const blob = new Blob(["\ufeff", fileContent], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
    alert(`Success! Data saved as: ${fileName}`);
  };
  const downloadTxt = () => {
    if (listNote.length === 0) return alert("Warning! Data is Empty!");
    // 1. Gabungkan semua note jadi satu string besar
    const fileContent = listNote
      .map((note) => {
        return `---
            Title: ${note.title}
            Category: ${note.category}
            Date: ${note.date || new Date().toLocaleDateString()}
            ---
            # ${note.title}
            # ${note.description}
            --- 
            Generated by Markedit Notes - ©NovaNov 2026`;
      })
      .join("\n\n"); // Kasih jarak antar catatan
    // 2. Proses Download
    const blob = new Blob([fileContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Markedit_Notes_All_${new Date()
      .toISOString()
      .slice(0, 10)}.md`;
    link.click();
    // 3. Cleanup
    URL.revokeObjectURL(url);
  };
  const downloadSingleMD = (note) => {
    // 1. SATPAM: Kalau note gak ada, langsung pulang, jangan lanjut!
    if (!note || !note.title) {
      console.error("Warning!, Data is empty!");
      return;
    }
    // 2. Gunakan Optional Chaining (?.) biar lebih aman lagi
    const safeTitle = note.title?.replace(/\s+/g, "_") || "Untitled_Note";

    const fileContent = `---
        Title: ${note.title}
        Category: ${note.category}
        Date: ${note.date || new Date().toLocaleDateString()}
        ---
        # ${note.title}
        ${note.description}
        ---
        Generated by Markedit Notes - ©NovaNov 2026`;
    const blob = new Blob([fileContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeTitle}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const [currentView, setCurrentView] = useState("dashboard");

  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(listNote));
  }, [listNote]);
  useEffect(() => {
    localStorage.setItem("myCategories", JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Cari apakah elemen yang diklik (atau parent-nya) adalah tag <a>
      const anchor = e.target.closest("a");
      if (anchor && anchor.href) {
        // Cek apakah link-nya eksternal (bukan link internal app)
        if (anchor && anchor.href && anchor.href.startsWith("http")) {
          if (anchor.host !== window.location.host) {
            e.preventDefault(); // Stop link biar gak buka di tab yang sama
            window.open(anchor.href, "_blank", "noopener,noreferrer"); // Paksa buka tab baru
          }
        }
      }
    };
    // Kita pasang "satpam" di dokumen
    document.addEventListener("click", handleGlobalClick);
    // Bersihkan pas modal ditutup
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className="bg-dark">
      <MyNavbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onUpload={handleUploadData}
        onJson={downloadJSON}
        onMarked={downloadTxt}
        onDeleteDataJson={handleDeleteJson}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      {currentView === "dashboard" && (
        <>
          <Container className="bg-dark mt-2 px-4 min-vh-100">
            <A2_CardManager
              listNote={listNote}
              categories={categories}
              categoryIcons={categoryIcons}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              onDelete={handleDelete}
              onEdit={handleOpenEditModal}
              onAddCategory={handleAddCategory}
              onOpenModal={handleOpenNewNote}
              onDeleteCategory={handleDeleteCategory}
              handleRenameCategory={handleRenameCategory}
              onUpdateCategory={handleUpdateCategory}
              downloadSingleMD={downloadSingleMD}
            />
            <Z1_ModalNote
              onShow={showModal}
              onHide={() => setShowModal(false)}
              kirimData={handleTerimaData}
              editData={noteToEdit}
              onClear={handleClearResiduData}
              categories={categories}
            />
          </Container>
          <BottomNav />
        </>
      )}
      {currentView === "AboutView" && (
        <AboutView onBack={() => setCurrentView("dashboard")} />
      )}
    </div>
  );
}
export default App;
