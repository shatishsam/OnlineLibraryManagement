import './App.css';
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Signup from './components/UserMangement/SignUp';
import Login from './components/UserMangement/Login';
import Admin from './components/BookManagement/admin';
import Sections from './components/SectionManagement/Sections'
import Books from './components/BookManagement/Books'
import BookUpload from './components/BookManagement/book-upload'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoanedBooks from "./components/BookManagement/LoanedBooks";
import {Reports} from "./components/common/Reports";

function App() {
  return (
    <div className="App">
      < Router >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/books/:id" element={<Books />} />
          <Route path="/loaned_books/:id" element={<LoanedBooks />} />
          <Route path="/bookupload" element={<BookUpload />} />
          <Route path="/report" element={<Reports/>} />
        </Routes>
      </Router >
    </div>
  );
}

export default App;
