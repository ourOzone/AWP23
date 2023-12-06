import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getPublishDate } from '../global';

const Notes = () => {
    const [text, setText] = useState('');
    const [notes, setNotes] = useState([]);
    const textRef = useRef();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const { data } = await axios.get('http://localhost:8000/notes');
        const noteList = data.map(note => ({
            id: note._id,
            text: note.text
        }))

        setNotes(noteList);
    };

    const handleSubmit = async () => {
        const { data } = await axios.post('http://localhost:8000/notes', {
            text: text,
            publishDate: new Date()
        });
        
        setText('');
        getNotes();
    };

    const handleTextareaChange = (e) => {
        setText(e.target.value);
        textRef.current.style.height = 'auto';
        textRef.current.style.height = textRef.current.scrollHeight + 'px';
    };

    const handleNoteDelete = async (id) => {
        if (!window.confirm('진짜 삭제할래요?')) {
            return;
        }
        const { data } = await axios.get(`http://localhost:8000/deletenote?id=${id}`);

        getNotes();
    };

    return (
        <Container>
            <NotesLabelContainer>
                <NotesTitle>비고</NotesTitle>
                <NotesDesc>이번 주만 합주 안 해요, 이펙터 패치 쓸래요 등등</NotesDesc>
            </NotesLabelContainer>
            <NoteInputContainer>
                <NoteTextarea
                    ref={textRef}
                    value={text}
                    onChange={handleTextareaChange}
                    placeholder='여따 새로 써요'
                />
                <Button onClick={handleSubmit}>추가</Button>
            </NoteInputContainer>
            {notes && notes.map(note => (
                <Note key={note.id}>
                    <NoteText onBlur={handleSubmit}>{note.text}</NoteText>
                    <NoteDeleteButton onClick={() => handleNoteDelete(note.id)}>✕</NoteDeleteButton>
                </Note>
            ))}
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.white};
    border-radius: 40px;
    padding: 32px 16px 16px;
    width: 100%;
    max-width: 1080px;

    @media (max-width: 560px) {
        padding: 24px 8px 8px;
    }
`;

const NotesLabelContainer = styled.div`
    display: flex;
    align-items: flex-end;
    margin-left: 24px;

    @media (max-width: 380px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const NotesTitle = styled.div`
    font-size: 200%;
    margin-right: 8px;
    user-select: none;
`;

const NotesDesc = styled.div`
    color: ${({ theme }) => theme.gray};
    user-select: none;
    
    @media (max-width: 560px) {
        margin-left: 2px;
    }
`;

const NoteInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const NoteTextarea = styled.textarea`
    resize: none;
    border: none;
    overflow: hidden;
    font-size: 125%;
    min-height: 100px;
    width: 75%;
    height: auto;
    margin: 24px 16px 16px;
    padding: 16px;
    background-color: ${({ theme }) => theme.background};
    border-radius: 16px;
    
    &:focus {
        outline: 2px solid ${({ theme }) => theme.primary};
    }
    @media (max-width: 560px) {
        margin: 16px 8px 8px;
        min-height: 72px;
    }
`;

const Note = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 16px;
    min-height: 100px;
    background-color: ${({ theme }) => theme.background};
    border-radius: 16px;
    
    @media (max-width: 560px) {
        margin: 8px;
        min-height: 72px;
    }
`;

const NoteText = styled.div`
    padding: 16px;
    font-size: 125%;
    white-space: pre-line;
`;

const NoteDeleteButton = styled.div`
    margin: 8px 16px;
    font-size: 125%;
    user-select: none;
    height: 48px;
    cursor: pointer;
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.primary};
    padding: 8px 16px;
    margin: 8px 8px 16px 8px;
    width: 72px;
    border-radius: 100px;
    font-size: 125%;
    color: ${({ theme }) => theme.white};
    user-select: none;
    cursor: pointer;
    
    @media (max-width: 560px) {
        margin-bottom: 8px;
    }
`;

export default Notes;