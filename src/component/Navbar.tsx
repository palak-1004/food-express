import '../styles/home.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocationStore } from "../types/useLocationStore";
import { useState } from "react";
import { searchApi } from "../api/searchApi"; // ✅ API import

export default function Navbar() {
    const address = useLocationStore((state) => state.address);
    const navigate = useNavigate();

    // ✅ STATE
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    // ✅ FUNCTION WHERE API IS USED
    const handleSearchChange = async (value: string) => {
        setQuery(value);

        if (value.length < 2) {
            setResults([]);
            return;
        }

        const res = await searchApi(value); // 🔥 API CALL
        setResults(res);
    };

    return (
        <header className='navv'>
            <div className="logo">
                🍴 FoodExpress
            </div>

            <div className="nav-center">
                {/* LOCATION */}
                <div
                    className="locationBar"
                    onClick={() => navigate("/select-location")}
                >
                    📍 {address ? address.split(",")[0] : "Select Location"}
                    <span style={{ marginLeft: "5px", fontSize: "12px" }}>
                        {address ? "Change" : ""}
                    </span>
                </div>

                {/* SEARCH */}
                <div className="nav-search" style={{ position: "relative" }}>

                    <input
                        type="text"
                        placeholder="Search dishes or restaurants..."
                        value={query}
                        onChange={(e) => handleSearchChange(e.target.value)} // ✅ API TRIGGER
                    />

                    <button className="searchBtn">🔍</button>

                    {/* 🔥 DROPDOWN RESULTS */}
                    {results.length > 0 && (
                        <div className="search-dropdown">
                            {results.map((item) => (
                                <div
                                    key={item.id}
                                    className="search-item"
                                    onClick={() => navigate(`/search?q=${item.name}`)}
                                >
                                    {item.type === "restaurant" ? "🏬" : "🍴"} {item.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="nav-right">
                <Link to="/cart">🛒 Cart</Link>
                <Link to="/profile">🙍 Profile</Link>
                <Link to="/help">❓ Help</Link>
            </div>
        </header>
    );
}