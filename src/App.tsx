import { useState, useEffect } from "react";
import { Note } from "./types";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notes");
      const data: Note[] = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Note</button>
      </form>
      <div>
        {notes.map((note) => (
          <div key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
