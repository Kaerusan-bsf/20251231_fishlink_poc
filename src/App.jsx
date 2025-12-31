import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { getInitialListings } from "./api/listings";
import mockRequests from "./data/mockRequests";
import { strings } from "./i18n/strings";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import FarmerNewListingPage from "./pages/FarmerNewListingPage";
import RequestsPage from "./pages/RequestsPage";
import NewRequestPage from "./pages/NewRequestPage";
import "./styles/app.css";

const App = () => {
  const [listings, setListings] = useState(getInitialListings());
  const [requests, setRequests] = useState([...mockRequests]);
  const [farmerProfile, setFarmerProfile] = useState({
    farmerName: "",
    telegramUrl: "",
    farmerAvatarUrl: "",
    farmerLocation: ""
  });
  const [lang, setLang] = useState("en");

  const t = (key) => strings[lang]?.[key] ?? strings.en?.[key] ?? key;

  const addListing = (newListing) => {
    setListings((prev) => [newListing, ...prev]);
  };

  const addRequest = (newRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
  };

  const updateRequestStatus = (requestId, status) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <Link to="/" className="brand-title">
            FishLink
          </Link>
          <p className="brand-subtitle">{t("subtitle")}</p>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            {t("navHome")}
          </Link>
          <Link to="/farmer/new" className="nav-link">
            {t("navAddListing")}
          </Link>
          <Link to="/requests" className="nav-link">
            {t("navRequests")}
          </Link>
        </nav>
        <div className="lang-toggle">
          <button
            type="button"
            className={`toggle-button ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={`toggle-button ${lang === "km" ? "active" : ""}`}
            onClick={() => setLang("km")}
          >
            KM
          </button>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<ListingsPage listings={listings} t={t} />}
          />
          <Route
            path="/listings/:id"
            element={<ListingDetailPage listings={listings} t={t} />}
          />
          <Route
            path="/farmer/new"
            element={
              <FarmerNewListingPage
                onAddListing={addListing}
                farmerProfile={farmerProfile}
                onSaveFarmerProfile={setFarmerProfile}
                t={t}
              />
            }
          />
          <Route
            path="/requests"
            element={
              <RequestsPage
                requests={requests}
                listings={listings}
                onUpdateRequestStatus={updateRequestStatus}
                t={t}
              />
            }
          />
          <Route
            path="/requests/new"
            element={
              <NewRequestPage
                listings={listings}
                onAddRequest={addRequest}
                t={t}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
