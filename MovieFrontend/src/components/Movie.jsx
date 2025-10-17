import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Movie() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    duration: "",
    director: ""
  });

  const [movieList, setMovieList] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState("");
  const [viewMovie, setViewMovie] = useState(null);

  // Use port 2345 for your backend
  const baseUrl = `${import.meta.env.VITE_API_URL}/movieapi`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    try {
      if (editMode) {
        const response = await axios.put(`${baseUrl}/update`, { 
          id: editId, 
          ...formData 
        });
        if (response.status === 200) {
          setMessage(response.data);
          resetForm();
          fetchMovies();
        }
      } else {
        const response = await axios.post(`${baseUrl}/add`, formData);
        if (response.status === 200) {
          setMessage(response.data);
          resetForm();
          fetchMovies();
        }
      }
    } catch (err) {
      setError("Failed to save movie");
      console.error("Save error:", err);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", genre: "", duration: "", director: "" });
    setEditMode(false);
    setEditId(null);
    setError("");
    setMessage("");
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/viewall`);
      setMovieList(response.data);
    } catch (err) {
      setError("Failed to fetch movies");
      console.error("Fetch error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const response = await axios.delete(`${baseUrl}/delete/${id}`);
        setMessage(response.data);
        fetchMovies();
      } catch {
        setError("Failed to delete movie");
      }
    }
  };

  const handleEdit = (movie) => {
    setFormData({
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      director: movie.director
    });
    setEditId(movie.id);
    setEditMode(true);
    setError("");
    setMessage("");
  };

  const handleViewById = async () => {
    if (!viewId) {
      setError("Please enter a Movie ID");
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/viewbyid/${viewId}`);
      setViewMovie(response.data);
      setError("");
    } catch {
      setError("Movie not found");
      setViewMovie(null);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Add / Update Movie */}
      <div className="movie-form-container">
        <h3>{editMode ? "Update Movie" : "Add Movie"}</h3>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input 
              type="text" 
              id="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label>Genre:</label>
            <input 
              type="text" 
              id="genre" 
              value={formData.genre} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label>Duration (min):</label>
            <input 
              type="number" 
              id="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label>Director:</label>
            <input 
              type="text" 
              id="director" 
              value={formData.director} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit">
            {editMode ? "Update Movie" : "Add Movie"}
          </button>
          {editMode && (
            <button type="button" onClick={resetForm} style={{ marginLeft: "10px" }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* View by ID */}
      <div style={{ marginTop: "30px" }}>
        <h3>View Movie by ID</h3>
        <input
          type="number"
          placeholder="Enter Movie ID"
          value={viewId}
          onChange={(e) => setViewId(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleViewById}>View</button>

        {viewMovie && (
          <div style={{ marginTop: "15px", border: "1px solid #ccc", padding: "15px", borderRadius: "10px" }}>
            <h4>Movie Details</h4>
            <p><strong>ID:</strong> {viewMovie.id}</p>
            <p><strong>Title:</strong> {viewMovie.title}</p>
            <p><strong>Genre:</strong> {viewMovie.genre}</p>
            <p><strong>Duration:</strong> {viewMovie.duration} minutes</p>
            <p><strong>Director:</strong> {viewMovie.director}</p>
          </div>
        )}
      </div>

      {/* All Movies Table */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{ textAlign: "center" }}>All Movies</h3>
        {movieList.length === 0 ? (
          <p style={{ textAlign: "center" }}>No movies found</p>
        ) : (
          <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Duration</th>
                <th>Director</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movieList.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.duration}</td>
                  <td>{movie.director}</td>
                  <td>
                    <button onClick={() => handleEdit(movie)}>Edit</button>
                    <button onClick={() => handleDelete(movie.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}