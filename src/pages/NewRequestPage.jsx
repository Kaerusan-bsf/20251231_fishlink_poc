import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const NewRequestPage = ({ listings, onAddRequest, t }) => {
  const [searchParams] = useSearchParams();
  const listingId = searchParams.get("listingId");
  const navigate = useNavigate();
  const [quantityKg, setQuantityKg] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const listing = useMemo(
    () => listings.find((item) => item.id === listingId),
    [listings, listingId]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const quantityValue = Number(quantityKg);
    if (!quantityKg || Number.isNaN(quantityValue) || quantityValue <= 0) {
      setError(t("quantityGreaterThanZero"));
      return;
    }

    if (!listing) {
      setError(t("listingNotFound"));
      return;
    }

    const newRequest = {
      id: Date.now().toString(),
      listingId: listing.id,
      listingSummary: `${listing.fishName} (${listing.sizeRange})`,
      quantityKg: quantityValue,
      preferredTime: preferredTime.trim(),
      note: note.trim(),
      status: "Sent",
      createdText: "Just now"
    };

    onAddRequest(newRequest);
    setPreferredTime("");
    navigate("/requests");
  };

  return (
    <section className="page">
      <h2 className="page-title">{t("createRequestTitle")}</h2>

      {!listing ? (
        <div className="empty-state">
          <p>{t("listingNotFoundRequest")}</p>
          <Link to="/" className="link">
            {t("backToListings")}
          </Link>
        </div>
      ) : (
        <div className="request-layout">
          <div className="request-listing">
            <h3>{listing.fishName}</h3>
            <p className="muted">{listing.sizeRange}</p>
            <div className="detail-meta">
              <span>${listing.priceUsdPerKg} / kg</span>
            </div>
            <Link to={`/listings/${listing.id}`} className="link">
              {t("viewListingDetails")}
            </Link>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            {error ? <p className="form-error">{error}</p> : null}

            <div className="form-row">
              <label htmlFor="quantityKg">{t("quantityKg")} *</label>
              <input
                id="quantityKg"
                name="quantityKg"
                type="number"
                step="0.1"
                value={quantityKg}
                onChange={(event) => setQuantityKg(event.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="preferredTime">{t("preferredPickupTime")}</label>
              <input
                id="preferredTime"
                name="preferredTime"
                type="text"
                placeholder={t("preferredTimePlaceholder")}
                value={preferredTime}
                onChange={(event) => setPreferredTime(event.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="note">{t("noteOptional")}</label>
              <input
                id="note"
                name="note"
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>

            <button type="submit" className="button">
              {t("sendRequest")}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default NewRequestPage;
