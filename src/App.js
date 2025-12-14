import React, {useState} from "react";
import "./App.css";
import pic1 from "./img/pic1.gif";

function App() {
    const [items, setItems] = useState([
        { id: 1, name: "George Best", position: "Forward" },
        { id: 2, name: "Andrei Kancheslkis", position: "Winger" },
        { id: 3, name: "Bobby Charlton", position: "Forward" },
        { id: 4, name: "Mark Hughess", position: "Forward" },
        { id: 5, name: "Bryan Robson", position: "Midfielder" },
        { id: 6, name: "Gary Pallister", position: "Defender" },
        { id: 7, name: "Dennis Law", position: "Forward" },
        { id: 8, name: "Ole Solskjaer", position: "Forward" },
        { id: 9, name: "Tommy Taylor", position: "Forward" },
        { id: 10, name: "David Beckham", position: "Midfielder" },
        { id: 11, name: "Dwight Yorke", position: "Forward" },
        { id: 11, name: "Andy Cole", position: "Striker" }
    ]);

    const [newItem, setNewItem] = useState({ name: "", position: "" });
    const [editingId, setEditingId] = useState(null);
    const [editingItem, setEditingItem] = useState({ name: "", position: "" });

    // CREATE
    const handleAdd = (e) => {
        e.preventDefault();
        if (!newItem.name.trim()) return;

        const item = {
            id: Date.now(),
            name: newItem.name.trim(),
            position: newItem.position.trim(),
        };

        setItems((prev) => [...prev, item]);
        setNewItem({ name: "", position: "" });
    };

    // DELETE
    const handleDelete = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // START EDIT
    const handleEditStart = (item) => {
        setEditingId(item.id);
        setEditingItem({ name: item.name, position: item.position });
    };

    // SAVE EDIT
    const handleEditSave = (id) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, ...editingItem } : item
            )
        );
        setEditingId(null);
        setEditingItem({ name: "", position: "" });
    };

    // CANCEL EDIT
    const handleEditCancel = () => {
        setEditingId(null);
        setEditingItem({ name: "", position: "" });
    };

    return (
        <div className="app">
            <img src={pic1} alt="logo" height={210} width={210} />
            <h1>Legends</h1>

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
                    <label className="field-label">Position</label>
                    <input
                        type="text"
                        className="field-input"
                        value={newItem.position}
                        onChange={(e) =>
                            setNewItem({ ...newItem, position: e.target.value })
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
                                    <label className="field-label">Position</label>
                                    <input
                                        type="text"
                                        className="field-input"
                                        value={editingItem.position}
                                        onChange={(e) =>
                                            setEditingItem({
                                                ...editingItem,
                                                position: e.target.value,
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
                                    <span className="line-label">Position:</span>
                                    <span className="line-value">{item.position}</span>
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
