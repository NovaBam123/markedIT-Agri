import { useEffect, useState } from 'react';
import { Button, Form, Modal} from 'react-bootstrap';
import { iconMap, themeOption } from '../utils/InitialCategories';


function Z3_ModalCat({ smShow, setSmShow, isEdit, editData, onAddCategory, handleAddClick, onUpdateCategory }) {
    // const [smShow, setSmShow] = useState(false);
    const [newCatName, setNewCatName]= useState("")
    const [selectedTheme, setSelectedTheme] = useState("primary");
    const [selectedIcon, setSelectedIcon]= useState("tag");
    const handleSave= ()=> {
        if(!newCatName.trim()) return alert ("Name is required!")
        const payload= {
            name: newCatName,
            theme: selectedTheme,
            iconName: selectedIcon,
            variant: `outline-${selectedTheme}`,
            text: `text-${selectedTheme}`
        }
        if(isEdit){
            onUpdateCategory(editData.id, payload, editData.name)
        }else {
            onAddCategory({ ...payload, isSystem: false})
        }
        setNewCatName("")
        setSmShow(false);
        setNewCatName("");
        setSelectedTheme("primary");
        setSelectedIcon("tag")
        setSmShow(false);
    }

  useEffect(()=> {
    if(isEdit && editData){
        setNewCatName(editData.name)
        setSelectedTheme(editData.theme)
        setSelectedIcon(editData.iconName)
    }else {
        setNewCatName("");
        setSelectedTheme("primary");
        setSelectedIcon("tag");
    }
  }, [isEdit, editData, smShow])  
  return (
    <>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        contentClassName='bg-dark text-white border-secondary'
      >
        <Modal.Header 
            closeButton 
            closeVariant='white'
            className='bg-secondary bg-opacity-25'>
          <Modal.Title className='fw-bold text-info'>
           {isEdit ? "Edit Category" : "Add New Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label className='fw-semibold'>Category Name</Form.Label>
                    <Form.Control
                        type="text"    
                        className='bg-secondary text-white border-0 bg-opacity-75'
                        placeholder="e.g Biologi, Math..."
                        value={newCatName}
                        onChange={(e)=> setNewCatName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='fw-semibold'>
                        Pick Theme Color
                    </Form.Label>
                    <Form.Select 
                        className='bg-secondary border-0 bg-opacity-75 text-white'
                        value={selectedTheme}
                        onChange={e=> setSelectedTheme(e.target.value)}
                    >
                        {themeOption.map(opt=> (
                            <option key={opt.value} value={opt.value}>
                                {opt.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='fw-semibold'>Pick Icon</Form.Label>
                    <Form.Select 
                        value={selectedIcon}
                        onChange={e=> setSelectedIcon(e.target.value)}
                    > 
                    {Object.keys(iconMap).filter(key=> key!== 'layout-grid').map(iconKey=> (
                        <option key={iconKey} value={iconKey}>
                            {iconKey.charAt(0).toUpperCase() + iconKey.slice(1)}
                        </option>
                    ))}
                    </Form.Select>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer className='bg-secondary bg-opacity-25'>
            <Button 
                variant='secondary' 
                onClick={()=>setSmShow(false)}
            >Cancel
            </Button>
            <Button 
                variant='info'
                onClick={handleSave}
            >Save
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Z3_ModalCat;