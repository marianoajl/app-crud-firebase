import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

export const Show = () => {
    //1 configurar los hooks
    const [players, setPlayers] = useState([])
    //2 referenciamos a la db de firestore
    const playersCollection = collection(db, "players")
    //3 funcion para mostrar todos los docs
    const getPlayers = async () => {
        const data = await getDocs(playersCollection)
        /* console.log(data.docs);  */
        setPlayers(                 //
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        console.log(players);
    }
    //4 funcion para eliminar un doc

    const deletePlayer = async (id) => {
        const playersDoc = doc(db, "players", id)
        await deleteDoc(playersDoc)
        getPlayers(); // Consulta a la BD para traer de vuelta los jugadores una vez borrado el seleccionado.
    }
    //5 funcion para la confirmacion de sweet alert
    const confirmDelete = (id, name, lastName) => {

        Swal.fire({
            title: `Querés borrar a ${name} ${lastName} ?`,
            text: "No podes Revertir Esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si quiero Borrarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePlayer(id)  //llamamos a la funcion eliminar
                Swal.fire(
                    'Borrado!',
                    'Borraste tu jugador.',
                    'success'
                )
            }
        })
    }

    //6 useEffect 
    useEffect(() => {
        getPlayers()
    }, [])


    // 7 devolvermos la vista de nuestro componente
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-grid gap-2">
                            <Link to="/create" className="btn btn-secondary mt-5">CREAR JUGADOR</Link>

                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido </th>
                                        <th>Número</th>
                                        <th>Posición</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {players.map((player) => (
                                        <tr key={player.id} id={player.id}>
                                            <td className="align-middle">{player.name}</td>
                                            <td className="align-middle">{player.lastName}</td>
                                            <td className="align-middle">{player.number}</td>
                                            <td className="align-middle">{player.position}</td>
                                            <td className="d-flex justify-content-around align-items-center">
                                                <Link to={`/edit/${player.id}`} className="btn btn-light"><i class="fa-sharp fa-solid fa-pen"></i></Link>
                                                <button onClick={() => { confirmDelete(player.id, player.name, player.lastName) }} className="btn btn-danger"><i class="fa-sharp fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))};
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}