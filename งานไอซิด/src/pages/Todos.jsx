import React, { useState, useEffect } from "react";
import { Badge, Button, Col } from "react-bootstrap";
function Todos() {
  const [allTodos, setAllTodos] = useState([]); // เก็บ todos ทั้งหมดจาก API
  const [displayTodos, setDisplayTodos] = useState([]); // เก็บ todos ที่จะแสดงผล
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showOnlyWaiting, setShowOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setAllTodos(data.slice(0, 100));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let processedTodos = allTodos;
    if (showOnlyWaiting) {
      processedTodos = allTodos.filter((todo) => !todo.completed);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = processedTodos.slice(
      indexOfFirstItem,
      indexOfLastItem,
    );

    setDisplayTodos(currentItems);
  }, [allTodos, showOnlyWaiting, currentPage, itemsPerPage]);

  const handleCheckboxChange = (e) => {
    setShowOnlyWaiting(e.target.checked);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = allTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setAllTodos(updatedTodos);
  };

  /**
   * ลบ todo item ออกจาก list
   */
  const handleDeleteTodo = (id) => {
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(updatedTodos);
  };

  /**
   * (ใหม่) เปิด Modal สำหรับเพิ่ม Todo
   */
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewTodoTitle("");
  };

  const handleSaveNewTodo = () => {
    if (newTodoTitle.trim() === "") {
      alert("Please enter a title");
      return;
    }

    const newId = Math.max(...allTodos.map((t) => t.id)) + 1;

    const newTodo = {
      userId: 1,
      id: newId,
      title: newTodoTitle,
      completed: false,
    };

    setAllTodos([newTodo, ...allTodos]);

    handleCloseAddModal();
  };

  const getNextId = () => {
    if (allTodos.length === 0) return 1;
    return Math.max(...allTodos.map((t) => t.id)) + 1;
  };

  // --- คำนวณค่าสำหรับ Pagination ---
  const filteredListLength = showOnlyWaiting
    ? allTodos.filter((todo) => !todo.completed).length
    : allTodos.length;

  const totalPages = Math.ceil(filteredListLength / itemsPerPage);

  // Removed unused getPageNumbers helper to satisfy diagnostics

  // --- Render Lgic ---
  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container-fluid mt-4">
      {/* Control Row (Checkbox และ Dropdown) */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* ด้านซ้าย: Checkbox + Badge */}
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="showWaitingCheck"
            checked={showOnlyWaiting}
            onChange={handleCheckboxChange}
          />
          <label
            className="form-check-label black"
            htmlFor="showWaitingCheck"
            style={{ color: "black" }}
          >
            Show only
            <Badge
              bg="warning"
              text="dark"
              style={{
                padding: "6px 12px",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "16px",
                transition: "all 0.3s ease",
              }}
            >
              Waiting
            </Badge>
          </label>
        </div>

        {/* ด้านขวา: Dropdown */}
        <div style={{ width: "200px" }}>
          <select
            className="form-select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="10">10 items per page</option>
            <option value="25">25 items per page</option>
            <option value="50">50 items per page</option>
            <option value="100">100 items per page</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th scope="col" style={{ width: "5%" }}>
                ID
              </th>
              <th scope="col" style={{ width: "70%" }}>
                Title
              </th>
              <th scope="col" style={{ width: "15%" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <span>Completed</span>
                  <button
                    className="btn btn-primary"
                    style={{
                      width: "30px",
                      height: "30px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "3px",
                    }}
                    onClick={handleShowAddModal}
                    title="Add new todo"
                  >
                    +
                  </button>
                </div>
              </th>
              <th scope="col" style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {displayTodos.map((todo) => (
              <tr key={todo.id}>
                <th scope="row">{todo.id}</th>
                <td>{todo.title}</td>
                <td>
                  <Badge
                    bg={todo.completed ? "success" : "warning "}
                    text={todo.completed ? "light" : "dark"}
                    onClick={() => handleToggleComplete(todo.id)}
                    style={{
                      cursor: "pointer",
                      padding: "8px 5px",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    title="Click to toggle status"
                  >
                    {todo.completed ? "done " : "waiting "}
                  </Badge>
                </td>
                <td>
                  <button
                    variant="danger"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer (Pagination) */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="d-flex align-items-center gap-3">
          <button
            className={`btn btn-outline-primary ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              fontSize: "16px",
              fontWeight: "500",
              padding: "8px 16px",
            }}
          >
            Previous
          </button>

          <div className="d-flex align-items-center gap-2">
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#0d6efd",
                minWidth: "30px",
                textAlign: "center",
              }}
            >
              {currentPage}
            </span>
            <span style={{ fontSize: "16px", color: "#6c757d" }}>/</span>
            <span
              style={{
                fontSize: "16px",
                color: "#6c757d",
                minWidth: "30px",
                textAlign: "center",
              }}
            >
              {totalPages}
            </span>
          </div>

          <button
            className={`btn btn-outline-primary ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              fontSize: "16px",
              fontWeight: "500",
              padding: "8px 16px",
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* --- (ใหม่) Add Todo Modal --- */}
      {/* Backdrop */}
      {showAddModal && <div className="modal-backdrop fade show"></div>}

      {/* Modal */}
      <div
        className={`modal fade ${showAddModal ? "show" : ""}`}
        style={{ display: showAddModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-plus-lg"></i> + Add Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseAddModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="todoId" className="form-label">
                    ID:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="todoId"
                    value={getNextId()}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="todoTitle" className="form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="todoTitle"
                    placeholder="typing your todo title here..."
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    autoFocus
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={handleCloseAddModal}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveNewTodo}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* --- End Add Todo Modal --- */}
    </div>
  );
}

export default Todos;
