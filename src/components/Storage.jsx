import { storage } from "../config/firebase"
import { useState } from "react"
import { ref, uploadBytes } from "firebase/storage"

function Storage() {

    const [fileUpload, setFileUpload] = useState(null)

    const uploadFile = async () => {
        if (!fileUpload) return;
        const filesFolderRef = ref(storage, `moviesFiles/${fileUpload.name}`)
        try {
            await uploadBytes(filesFolderRef, fileUpload)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <input type="file" onChange={(e) => setFileUpload(e.target.files)} />
            <button onClick={uploadFile}>Upload file</button>
        </div>
    )

}

export default Storage