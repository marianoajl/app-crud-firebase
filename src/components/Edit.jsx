import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";

export const Edit = () => {
    const [lastName, setLastName] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState(0);
    const [position, setPosition] = useState("");

    const navigate = useNavigate();

    const {id} = useParams();

    // función que actualiza un documento
    const update = async (e) => {
        e.preventDefault();
        const playerDoc = doc(db, "players", id);
        const data = {
            lastName: lastName,
            name: name,
            number: Number(number),
            position: position,
        };
        await updateDoc(playerDoc, data);
        navigate("/");
    };

    //función que trae un doc por su id
    const getPlayerById = async(id) => {
        const playersDoc = await getDoc(doc(db, "players", id));
        if(playersDoc.exists()) {
            setLastName(playersDoc.data().lastName);
            setName(playersDoc.data().name);
            setNumber(playersDoc.data().number);
            setPosition(playersDoc.data().position);
        }else{
            console.log("El jugador no existe");
        }
    }

    useEffect (() => {
        getPlayerById(id);
    },[])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Edit Player</h1>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
                        {/* last name */}
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input 
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        {/* number */}
                        <div className="mb-3">
                            <label className="form-label">Number</label>
                            <input type="number"
                            className="form-control"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        {/* position */}
                        <div className="mb-3">
                            <label className="form-label">Position</label>
                            <input type="text"
                            className="form-control"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">EDIT PLAYER</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
