document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("note-input");
  const saveNoteBtn = document.getElementById("save-note-btn");
  const notesList = document.getElementById("notes-list");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function renderNotes() {
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
      const noteCard = document.createElement("div");
      noteCard.className = "note-card";

      const text = document.createElement("p");
      text.textContent = note;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
      });

      noteCard.appendChild(text);
      noteCard.appendChild(deleteBtn);
      notesList.appendChild(noteCard);
    });
  }

  saveNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (noteText === "") return;

    notes.push(noteText);
    saveNotes();
    renderNotes();
    noteInput.value = "";
  });

  renderNotes();
});