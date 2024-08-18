'use client'

import styles from "./Evernote.module.scss"; 
import React, { useState, useEffect } from "react"; 
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'; 
import { app, database } from '../../firebaseConfig'; 
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc 
} from 'firebase/firestore'; 
import ReactQuill from "react-quill"; 
import 'react-quill/dist/quill.snow.css';

const dbInstance = collection(database, 'notes')
export default function Evernote() {
    const getData = () => {
        getDocs(dbInstance)
        .then((data) => {
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }))
            })
    }

    useEffect(() => {
        getData()
    }, []); // hook runs when app loads 

    const [id, setid] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false); 
    const [isInputVisible, setInputVisible] = useState(false); 
    const [note, setNote] = useState(''); 
    const [notesArray, setNotesArray] = useState([]); 
    const [noteDesc, setNoteDesc] = useState('');

    const addDesc = (value) => {
        setNoteDesc(value); 
    }

    const addNote = () => {
        setInputVisible(true); 
    }
    
    const saveNote = () => {
        // reset fields after new notes
        setNote('') 
        setNoteDesc('')

        addDoc(dbInstance, {
            note: note,
            noteDesc: noteDesc
        }).then (() => {
                getData() 
            }
        )
    }

    const getId = (id, note, noteDesc) => {
        setid(id)
        setNoteDesc(noteDesc)
        setIsUpdate(true) 
        setInputVisible(true)
        setNote(note) 
        
    }

    const editNote = () => {
        // reset fields 
        setNote('')
        setNoteDesc('')
        const collectionById = doc(database, 'notes', id)
       
        // make edits on existing note 
        updateDoc(collectionById, {
            note: note,
            noteDesc: noteDesc
        }).then (() => {
            getData() 
        }
    )}

    const deleteNote = (id) => {
        const collectionById = doc(database, 'notes', id); 
        deleteDoc(collectionById)
        .then(() => {
            getData() 
        }) 
    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.btnContainer}>
                <button 
                    onClick={addNote}
                    className={styles.button}>
                    Add a New Note 
                </button>
            </div>
            {isInputVisible ? (
                <div className={styles.inputContainer}>
                    <div>
                        <input 
                            onChange={(e) => setNote(e.target.value)}
                            className={styles.addInput}
                            value={note}
                            placeholder='Enter the Title'/>
                    </div>
                    <div className={styles.ReactQuill}>
                        <ReactQuill
                            value={noteDesc}
                            onChange={addDesc}
                        />
                    </div>
                    <div>
                        {isUpdate ? (
                            <button 
                                className={styles.saveBtn}
                                onClick={editNote} 
                            >
                                Update Note
                            </button>
                        ) : (
                            <button 
                                className={styles.saveBtn}
                                onClick={saveNote} 
                            >
                                Save Note
                            </button>
                        )}
                        
                    </div>
                </div>
            ) : (
                <div>
                    
                </div>
            )}

            <div className={styles.showNotes}>
                {notesArray.length > 0 && notesArray.map((note) => {
                    return (
                        <div className={styles.innerNotes}>
                            <AiFillEdit 
                                onClick={() => getId(note.id, note.note, note.noteDesc)}
                                size={30} 
                                className={styles.editIcon}/> 
                            <AiFillDelete 
                                onClick={() => deleteNote(note.id)}
                                size={30}
                                color='#801805'
                                className={styles.editIcon}/> 
                            <p>{note.note}</p>
                            <div dangerouslySetInnerHTML={{__html: note.noteDesc}}></div>
                        </div>
                    )
                })}
            </div>
            
        </div>
    ); 
}
