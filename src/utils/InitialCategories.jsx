import { Sprout, Languages, CodeXml, Folder, LayoutGrid, Tag, FolderLock, Archive, BookMarked, TreePalm, Monitor, Globe, Camera, Wine, SquareCode, SquareFunction, Tractor, Wheat, Thermometer, Droplet, CloudDrizzle, Bean, Sun} from "lucide-react"
import { marked } from "marked"

export const defaultCategories= [
    {
        id: "system-all",
        name: "AllNote",
        theme: "info",
        variant: "outline-info",
        text: "text-info",
        iconName: "layout-grid",
        isSystem: true
    },
    {
        id: "system-uncategorized",
        name: "Uncategorized",
        theme: "warning",
        variant: "outline-warning",
        text: "text-warning",
        iconName: "archive",
        isSystem: true
    }
]
// Icon picker 
export const categoryIcons= {
    AllNote: <LayoutGrid size={20}/>,
    Default: <FolderLock size={20} />
}
export const iconMap= {
    archive: <Archive size={20} />,
    bookmarked: <BookMarked size={20} />,
    camera: <Camera size={20} />,
    code: <CodeXml size={20} />,
    default: <Folder size={20} />,
    globe: <Globe size={20} />,
    monitor: <Monitor size={20} />,
    language: <Languages size={20} />,
    sprout: <Sprout size={20} />,
    squarecode: <SquareCode />,
    squarefunction: <SquareFunction />,
    tag: <Tag size={20} />,
    treePalm: <TreePalm size={20} />,
    wine: <Wine size={20} />,
    tractor: <Tractor size={20} />,
    wheat: <Wheat size={20} />,
    thermometer: <Thermometer size={20} />,
    droplet: <Droplet size={20} />,
    cloudrizzle: <CloudDrizzle size={20} />,
    bean: <Bean size={20} />,
    sun: <Sun size={20} />
}   

export const getFavicon = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch {
    return 'https://www.google.com/s2/favicons?sz=64&domain=github.com';
  }
};

marked.use({
  renderer: {
    link({ href, title, text }) { // Perhatikan tanda kurung kurawal { } ini!
      let cleanHref = href || "#";
      const iconUrl = getFavicon(cleanHref);
      const tooltip = title ? `title="${title}"` : `title="${text}"`;
      
      return `<a href="${cleanHref}" target="_blank" rel="noopener noreferrer" class="custom-link" ${tooltip}>
                <img src="${iconUrl}" width="16" height="16" style="margin-right: 5px; vertical-align: middle; border-radius: 2px;" onerror="this.style.display='none'" />
                <span style="vertical-align: middle;">${text}</span>
              </a>`;
    }
  }
});

export const parseMarkdown = (text) => {
  if (!text) return "";
  
  try {
    return marked.parse(text); 
  } catch (err) {
    console.error("Marked Error:", err);
    return text; 
  }
};

export const themeOption = [
    {   
        name: "Blue", 
        value: "primary", 
        variant: "outline-primary", 
        text: "text-primary" 
    },
    {   
        name: "Green", 
        value: "success", 
        variant: "outline-success", 
        text: "text-success" 
    },
    { 
        name: "Red", 
        value: "danger", 
        variant: "outline-danger", 
        text: "text-danger" 
    },
    {   name: "Yellow", 
        value: "warning", 
        variant: "outline-warning", 
        text: "text-warning"
    },
    { 
        name: "Cyan", 
        value: "info", 
        variant: "outline-info", 
        text: "text-info"
    },
    { 
        name: "Gray", 
        value: "secondary",
        variant: "outline-secondary",
        text: "text-secondary"
    },
    { 
        name: "Light", 
        value: "light",
        variant: "outline-light",
        text: "text-light"
    }
];

export const svgAgri= {
    gearSvg: (props)=> (
        <svg
      width={props?.width || "32"}
      height={props?.height || props?.width || "32"}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props?.className || ""}
      style={props?.style}
    >
      {/* Element Tengah: Gear / Sun Core */}
      
      
      {/* Lintasan Orbital / Rotasi */}
     <path
        fill={props?.fillPath1 || "#39FF14"} // Default Hijau Stabilo
        d="M25.974 5.272a2.99 2.99 0 0 0-1.283-2.751a3.004 3.004 0 0 0-4.17.788a3.004 3.004 0 0 0 .788 4.17a3.006 3.006 0 0 0 3.777-.322c4.331 3.961 5.225 10.612 1.824 15.6c-.17.249-.356.48-.541.712l1.426 1.426c.267-.324.526-.658.767-1.012c4.087-5.993 2.866-14.051-2.588-18.61m-2.148.292a1.001 1.001 0 1 1-.263-1.39a1 1 0 0 1 .263 1.39"
      />

      {/* 3. Lintasan Atas Kiri */}
      <path
        fill={props?.fillPath2 || "#00E5FF"} // Default Electric Blue
        d="M5.43 8.108c-1.057 1.55-1.724 3.241-2.084 4.972a2.98 2.98 0 0 0-1.825 1.228a3.004 3.004 0 0 0 .788 4.17a3.004 3.004 0 0 0 4.17-.788a3.004 3.004 0 0 0-.788-4.17c-.119-.081-.245-.14-.37-.201A11.9 11.9 0 0 1 7.08 9.235C9.601 5.54 13.833 3.705 18 4.048v-2c-4.807-.337-9.665 1.8-12.57 6.06m-.603 8.455c-.311.455-.935.573-1.39.263s-.574-.935-.263-1.39a1 1 0 0 1 1.653 1.127"
      />

      {/* 4. Lintasan Bawah */}
      <path
        fill={props?.fillPath3 || "#FFFFFF"} // Default Putih
        d="M24.69 24.52a3.004 3.004 0 0 0-4.17.788a3 3 0 0 0-.468 2.25c-3.247.863-6.829.39-9.818-1.65A11.9 11.9 0 0 1 6.107 21H3.934a13.9 13.9 0 0 0 5.174 6.562c3.66 2.496 8.08 2.98 12.013 1.76c.064.051.12.11.188.157a3.004 3.004 0 0 0 4.17-.788a3.004 3.004 0 0 0-.788-4.17m-.865 3.043a1.001 1.001 0 1 1-.263-1.39a1 1 0 0 1 .263 1.39"
      />
    </svg>
    )
}