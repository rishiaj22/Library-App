import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Books.css"

const role = localStorage.getItem("role");

function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const handleCreateBooks = () => {
    navigate("/create");
  };

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    try {
      let response;
      if (role === "viewer") {
        // Fetch only the books created by this viewer
        response = await fetch("https://library-app-g74n.onrender.com/library/view_books", {
          headers: {
            Authorization: `${token}`,
          },
        });
      } else if (role === "creator" || role === "view_all") {
        // Fetch all books for creator and view_all roles
        response = await fetch("https://library-app-g74n.onrender.com/library/books", {
          headers: {
            Authorization: `${token}`,
          },
        });
      }
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data.books || data.libraryData || []);
    } catch (error) {
      alert(`Error while fetching the books: ${error.message}`);
    }
  };

  const handleDeleteBook = async (bookId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://library-app-g74n.onrender.com/library/delete/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the book");
      }

      // Remove the deleted book from the list without refetching
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      alert("Book deleted Successfully")
    } catch (error) {
      alert(`You are not authorized to delete book ${error}`);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="booksContainer">
      <h1>Books</h1>
      {books.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Description</th>
              <th>Published Year</th>
              <th>Language</th>
              {role === "creator" && <th>Actions</th>} 
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.description}</td>
                <td>{book.publishedYear}</td>
                <td>{book.language}</td>
                {role === "creator" && (
                  <td>
                    <button id="deleteBtn" onClick={() => handleDeleteBook(book._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found</p>
      )}
      <br />
      {(role === "creator" || role === "viewer") && (
        <button  onClick={handleCreateBooks}>Create Books</button>
      )}

    </div>
  );
}

export default Books;
