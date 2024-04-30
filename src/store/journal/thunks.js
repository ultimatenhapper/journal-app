import { collection, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async(dispatch, getState) =>{
        dispatch( savingNewNote())

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`)) 
        const setDocRes = await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote(newNote));
        dispatch( setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe')

        const notes = await loadNotes( uid )
        dispatch(setNotes( notes ))
    }
}

export const startSavingNotes = () => {
    return async ( dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const {active: note} = getState().journal;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true})

        //Updating the notes array in our state
        dispatch( updateNote(note))
    }
}