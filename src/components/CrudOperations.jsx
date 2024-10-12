import { db, auth } from '../config/firebase'
import { useState, useEffect } from 'react'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

function Crud() {

    const [movieList, setMovieList] = useState([])
    const [newMovieTitle, setNewMovieTitle] = useState("")
    const [newReleaseDate, setNewReleaseDate] = useState(0)
    const [isOscar, setIsOscar] = useState(false)
    const [updateTitle, setUpdatedTitle] = useState("")
    const moviesCollectionRefference = collection(db, "movies")

    useEffect(() => {
        const getMovieList = async () => {
            try {
                const data = await getDocs(moviesCollectionRefference)
                const filteredData = data.docs.map(
                    (doc) => (
                        {
                            ...doc.data(),
                            id: doc.id
                        }))
                setMovieList(filteredData)
            } catch (error) {
                console.log(error)
            }
        }
        getMovieList()
    }, [movieList])

    const deleteMovie = async (id) => {
        const movieDoc = doc(db, "movies", id)
        await deleteDoc(movieDoc)
    }

    const updateMovieTitle = async (id) => {
        const movieDoc = doc(db, "movies", id)
        await updateDoc(movieDoc, { title: updateTitle })
    }

    const onSubmit = async () => {
        try {
            await addDoc(moviesCollectionRefference, {
                title: newMovieTitle,
                releaseDate: newReleaseDate,
                receivedOscar: isOscar,
                userId: auth?.currentUser?.uid
            })
        } catch (error) {
            console.log(error)
        }
        setNewMovieTitle("")
        setNewReleaseDate("")
        setIsOscar(false)
    }

    return (
        <div>
            <div>
                <input type="text" placeholder='title' onChange={(e) => setNewMovieTitle(e.target.value)} value={newMovieTitle} />
                <input type="number" placeholder='release date' onChange={(e) => setNewReleaseDate(e.target.value)} value={newReleaseDate} />
                <input type="checkbox" checked={isOscar} onChange={(e) => setIsOscar(e.target.checked)} value={isOscar} />
                <label>Recieved oscar</label>
                <button onClick={onSubmit}>Submit the movie</button>


            </div>
            <div>
                {movieList.map((movie) => (
                    <div key={movie.id}>
                        <h1 style={{ color: movie.receivedOscar ? "green" : "red" }}>{movie.title}</h1>
                        <p>Date: {movie.releaseDate}</p>
                        <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
                        <input type="text" placeholder='new title' onChange={(e) => setUpdatedTitle(e.target.value)} />
                        <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
                    </div>
                ))}

            </div>
        </div>
    )

}
export default Crud