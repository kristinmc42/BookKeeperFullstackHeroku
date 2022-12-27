import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <>
            <h1>Book Keeper</h1>
            <p>Book Keeper is a virtual library.</p>
            <p>It helps keep track of the books you have read, are currently reading, or want to read.</p>
            <button>Log In</button>
            <p>Don't have an account? <Link to="">Register</Link></p>
        </>
    )
};

export default Home;