import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";

export const Create = () => {
    const [lastName, setLastName] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState(0);
    const [position, setPosition] = useState("");

    const navigate = useNavigate();
    const playersCollection = collection(db, "players")

    const createPlayer = async (e) => {
        e.preventDefault()

        await addDoc(playersCollection, {
            lastName: lastName,
            name: name,
            number: Number(number),
            position: position,
        })
        navigate("/");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Create Player</h1>
                    <form onSubmit={createPlayer}>
                        {/* name */}
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        {/* last name */}
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} 
                                required 
                            />
                        </div>
                        {/* number */}
                        <div className="mb-3">
                            <label className="form-label">Number</label>
                            <input type="number"
                                className="form-control"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)} 
                                required
                            />
                        </div>
                        {/* position */}
                        <div className="mb-3">
                            <label className="form-label">Position</label>
                            <input type="text"
                                className="form-control"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)} 
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">CREATE PLAYER</button>
                    </form>
                </div>
            </div>
        </div>
    )
};


// Para refactorizar -----------------------
// const initialStatePlayer = {
//     lastname: "",
//     name: "",
//     number: "",
//     position: "",
// };
// const [player, setPlayer] = useState(initialStatePlayer);