import React, {useState} from "react";
import "./App.css";
import pic1 from "./img/pic1.gif";

function App() {
    const [items, setItems] = useState([
        { id: 1, name: "George Best", description: "Forward" },
        { id: 2, name: "Andrei Kancheslkis", description: "Winger" },
        { id: 3, name: "Bobby Charlton", description: "Forward" },
        { id: 4, name: "Mark Hughess", description: "Forward" },
        { id: 5, name: "Bryan Robson", description: "Midfielder" },
        { id: 6, name: "Gary Pallister", description: "Defender" },
        { id: 7, name: "Dennis Law", description: "Forward" },
        { id: 8, name: "Ole Solskjaer", description: "Forward" },
        { id: 9, name: "Tommy Taylor", description: "Forward" }
    ]);

    const [newItem, setNewItem] = useState({ name: "", description: "" });
    const [editingId, setEditingId] = useState(null);
    const [editingItem, setEditingItem] = useState({ name: "", description: "" });

    // CREATE
    const handleAdd = (e) => {
        e.preventDefault();
        if (!newItem.name.trim()) return;

        const item = {
            id: Date.now(),
            name: newItem.name.trim(),
            description: newItem.description.trim(),
        };

        setItems((prev) => [...prev, item]);
        setNewItem({ name: "", description: "" });
    };

    // DELETE
    const handleDelete = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // START EDIT
    const handleEditStart = (item) => {
        setEditingId(item.id);
        setEditingItem({ name: item.name, description: item.description });
    };

    // SAVE EDIT
    const handleEditSave = (id) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, ...editingItem } : item
            )
        );
        setEditingId(null);
        setEditingItem({ name: "", description: "" });
    };

    // CANCEL EDIT
    const handleEditCancel = () => {
        setEditingId(null);
        setEditingItem({ name: "", description: "" });
    };

    return (
        <div className="app">

            {/*<img src={pic1} alt="App logo" height={"202px"} width={"196px"} />*/}
            <img src={pic1} alt="logo" height={160} width={160} />
            <h2>Legends</h2>

            {/* CREATE FORM */}
            <form onSubmit={handleAdd} className="form">
                <div className="field-row">
                    <label className="field-label">Name</label>
                    <input
                        type="text"
                        className="field-input"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                </div>

                <div className="field-row">
                    <label className="field-label">Description</label>
                    <input
                        type="text"
                        className="field-input"
                        value={newItem.description}
                        onChange={(e) =>
                            setNewItem({ ...newItem, description: e.target.value })
                        }
                    />
                </div>

                <div className="form-actions">
                    <button type="submit">Add</button>
                </div>
            </form>

            {/* LIST */}
            <ul className="item-list">
                {items.map((item) => (
                    <li key={item.id} className="item">
                        {editingId === item.id ? (
                            <div className="item-edit">
                                <div className="field-row">
                                    <label className="field-label">Name</label>
                                    <input
                                        type="text"
                                        className="field-input"
                                        value={editingItem.name}
                                        onChange={(e) =>
                                            setEditingItem({ ...editingItem, name: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="field-row">
                                    <label className="field-label">Description</label>
                                    <input
                                        type="text"
                                        className="field-input"
                                        value={editingItem.description}
                                        onChange={(e) =>
                                            setEditingItem({
                                                ...editingItem,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="item-actions">
                                    <button onClick={() => handleEditSave(item.id)}>Save</button>
                                    <button type="button" onClick={handleEditCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="item-view">
                                <div className="item-line">
                                    <span className="line-label">Name:</span>
                                    <span className="line-value">{item.name}</span>
                                </div>

                                <div className="item-line">
                                    <span className="line-label">Description:</span>
                                    <span className="line-value">{item.description}</span>
                                </div>

                                <div className="item-actions">
                                    <button onClick={() => handleEditStart(item)}>Edit</button>
                                    <button type="button" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {items.length === 0 && <p>No items yet. Add one above.</p>}
        </div>
    );
}

export default App;
