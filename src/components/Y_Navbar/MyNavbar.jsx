import React from "react";
import { useState, useEffect } from "react";
import "./A3_NonContents.css";
import {
  CloudUpload,
  CloudDownload,
  Settings,
  Eraser,
  Search,
  Moon,
  Sun,
  Download,
  FileJson,
  FileText,
  Sprout,
} from "lucide-react";
import {
  Navbar,
  Nav,
  Button,
  Collapse,
  Dropdown,
  Container,
} from "react-bootstrap";
import { getFormattedTime } from "../../utils/Time";
import { svgAgri } from "../../utils/InitialCategories";

function MyNavbar({
  searchQuery,
  setSearchQuery,
  onUpload,
  onJson,
  onMarked,
  onDeleteDataJson,
  onNavigate,
  currentView,
}) {
  const [openSearch, setOpenSearch] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [clock, setClock] = useState(getFormattedTime());
  const fileInputRef = React.useRef(null);
  const triggerUpload = () => {
    fileInputRef.current.click();
  };
  const [expanded, setExpanded] = useState(false);
   
  useEffect(() => {
    const interval = setInterval(() => {
      setClock(getFormattedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Navbar
      expand="lg"
      variant="dark"
      expanded={expanded}
      className="text-white py-2 sticky-top navbar-utama"
      onToggle={(expandedState) => setExpanded(expandedState)}
    >
      <Container className="navbar-wrapper">
        {/* KIRI: Logo */}
        <div className="d-flex align-items-center position-relative">
          <div>
            <svg
              width="33"
              height="33"
              viewBox="0 0 100 100"
              className="main-logo position-absolute"
            >
              <path d="M20 80 L50 20 V50 L20 80Z" className="logo-left" />
              <path d="M80 80 L50 20 V50 L80 80Z" className="logo-right" />
              <path d="M50 50 L27 78 H73 L50 50Z" className="logo-center" />
            </svg>
            {svgAgri.gearSvg({
              fillCore: "#39FF14",
              fillPath2: "#FF5F15",
              fillPath1: "#00E5ff",
              fillPath3: "yellow",
              width: "40",
            })}
          </div>
          <div className="d-flex flex-column ms-2 title-app">
            <h2 className="mb-0 fw-bold fs-2">
              Marked<span>IT Agri</span>
            </h2>
            <div>CLOUD-SYNC FIELD LOG</div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".json"
            onChange={onUpload}
          />
        </div>

        {/* Toggle & Mobile-style Icons (Sekarang aktif di md) */}
        <div className="d-lg-none d-flex align-items-center custom-toggle ms-auto gap-2">
          <div className="d-flex flex-column">
            {/* Search */}
            <button
              className={`btn btn-link border-0 text-white p-1 tombol-menu ${
                openSearch ? "aktif" : ""
              }`}
              onClick={() => setOpenSearch(!openSearch)}
            >
              <Search size={20} className="opacity-50" />
            </button>
          </div>

          {/* SaveAs */}
          <div>
            <button
              className={`btn btn-link setting-menu p-1 text-white ${
                openDownload ? "aktif" : ""
              }`}
              title="Save As"
              onClick={() => setOpenDownload(!openDownload)}
            >
              <Download size={20} className="opacity-50" />
            </button>
          </div>

          {/* AboutView */}
          <div className="d-flex flex-column justify-content-center align-items-center me-2 d-lg-none">
            <button
              className={`btn btn-link border-0 text-white p-1 setting-menu sprout 
              ${currentView === "AboutView" ? "aktif" : ""}
              }`}
              onClick={() => {
                const nextView =
                  currentView === "AboutView" ? "dashboard" : "AboutView";
                onNavigate(nextView);
              }}
            >
              <Sprout size={20} className="opacity-50" />
            </button>
          </div>
          <Navbar.Toggle
            aria-controls="navbarTools"
            className="border-0 text-light shadow-none hamburger-menu p-1"
          />
        </div>

        {/* Collapse Container (Sekarang aktif di md) */}
        <div className="w-100 d-lg-none d-flex flex-column align-items-end mt-1">
          <Collapse in={openSearch}>
            <div>
              <div className="d-flex border border-info border-2 bg-white rounded-pill input-style">
                <input
                  className="flex-grow-1 rounded-pill bg-transparent border-0 p-0 shadow-none fs-6 ps-2 font-icon-style"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn-warning d-flex rounded-pill justify-content-center align-items-center btn-custom">
                  <Search size={20} className="text-dark" />
                </button>
              </div>
            </div>
          </Collapse>

          <Collapse in={openDownload}>
            <div>
              <div className="d-flex flex-column me-3 m-0 gap-2">
                <Button 
                    className="d-flex border-0 bg-transparent align-items-center download-icon p-0 opacity-75"
                    onClick={onJson}
                >
                  <FileJson size={20} />
                  <span className="font-icon-style ms-1">Save as JSON</span>
                </Button>
                <Button 
                    className="d-flex border-0 bg-transparent align-items-center download-icon p-0 opacity-75"
                    onClick={onMarked}
                >
                  <FileText size={20} />
                  <span className="font-icon-style ms-1">Save as Text</span>
                </Button>
              </div>
            </div>
          </Collapse>
        </div>

        {/* Navbar Items (Hanya muncul di lg keatas) */}
        <Navbar.Collapse id="navbarTools">
          <Nav className="d-flex flex-row justify-content-end justify-content-lg-center ms-auto me-auto gap-2 mt-1">
            <div className="menu-icon-style" onClick={triggerUpload}>
              <CloudUpload size={20} />
              <span className="font-icon-style">Upload Data</span>
            </div>

            <Dropdown align="center" autoClose="outside">
              <Dropdown.Toggle
                as="div"
                className="d-none d-lg-block menu-icon-style setting-arrow"
                role="button"
              >
                <div className="menu-icon-style">
                  <CloudDownload size={20} />
                  <span className="font-icon-style settings">Save All As
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-dark rounded-2 border">
                <Dropdown.Item
                  as="button"
                  className="d-flex align-items-center gap-2"
                  onClick={onJson}
                >
                  <FileJson size={18} /> Save as JSON
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  className="d-flex align-items-center gap-2"
                  onClick={onMarked}
                >
                  <FileText size={18} /> Save as Text/Marker
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div className="menu-icon-style delete" onClick={onDeleteDataJson}>
              <Eraser size={20} />
              <span className="font-icon-style">Delete Data</span>
            </div>

            {/* =========Sprout u/ layar besar===================     */}
            <div
              className="d-none d-lg-block"
              onClick={() => {
                const nextView =
                  currentView === "AboutView" ? "dashboard" : "AboutView";
                onNavigate(nextView);
              }}
              role="button"
            >
              <div className="menu-icon-style setting-menu sprout d-flex flex-column">
                <Sprout size={20} className="fw-bold" />
                <span className="font-icon-style">About</span>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>

        {/* KANAN: Jam (Sembunyi di md, muncul di lg) */}
        <div className="text-end d-none d-lg-block">
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex border border-info border-2 bg-white rounded-pill ms-4 input-style">
              <input
                className="flex-grow-1 rounded-pill bg-transparent border-0 p-0 shadow-none fs-6 ps-2 font-icon-style"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn-warning d-flex rounded-pill justify-content-center align-items-center btn-custom">
                <Search size={20} className="text-dark" />
              </button>
            </div>
            <div className="text-end clock-style" style={{ minWidth: "120px" }}>
              <p className="fw-bold p-0 m-0">{clock.time}</p>
              <small className="text-white text-opacity-50 uppercase fw-semibold">
                {clock.date}
              </small>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;
