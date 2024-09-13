import { useState } from "react";
import "../Style/Create.css"

function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createBook = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); 
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (role !== "creator" && role !== "viewer") {
        setError("You do not have permission to create books.");
        setIsLoading(false);
        return;
      }

    const payload = {
      title,
      author,
      genre,
      publishedYear,
      description,
      language,
    };

    try {
      const response = await fetch(
        "https://library-app-g74n.onrender.com/library/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, 
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`${data.message}`);
        clearForm();
      } else {
        setError(typeof data.error === "string" ? data.error : JSON.stringify(data.error));
      }
    } catch (error) {
      setError(`Error while creating the book: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublishedYear("");
    setDescription("");
    setLanguage("");
    setIsLoading(false);
  };

  return (
    <>
    <div className="container" id= "createContainer">
      <h2>Create Book</h2>
      {error && <div className="error" style={{ color: "red" }}>{error}</div>}
      <form onSubmit={createBook}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Published Year"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <br />
        <input
          type="text"
          placeholder="Language"
          value={language}    
          onChange={(e) => setLanguage(e.target.value)}
          required
        />
        <br />
        <button id="createBtn" type="submit" disabled={isLoading}>
          {isLoading ? "Creating Book..." : "Create Book"}
        </button>
      </form>
    </div>
    </>
  );
}

export default Create;
