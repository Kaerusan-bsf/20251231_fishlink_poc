import { useMemo, useState } from "react";

const RequestsPage = ({ requests, listings, onUpdateRequestStatus, t }) => {
  const [viewMode, setViewMode] = useState("restaurant");

  const sortedRequests = useMemo(
    () => [...requests].sort((a, b) => Number(b.id) - Number(a.id)),
    [requests]
  );

  const listingById = useMemo(() => {
    const map = new Map();
    listings.forEach((listing) => {
      map.set(listing.id, listing);
    });
    return map;
  }, [listings]);

  return (
    <section className="page">
      <div className="page-header">
        <h2 className="page-title">{t("requestsTitle")}</h2>
        <div className="toggle-group">
          <button
            type="button"
            className={`toggle-button ${viewMode === "restaurant" ? "active" : ""}`}
            onClick={() => setViewMode("restaurant")}
          >
            {t("restaurantView")}
          </button>
          <button
            type="button"
            className={`toggle-button ${viewMode === "farmer" ? "active" : ""}`}
            onClick={() => setViewMode("farmer")}
          >
            {t("farmerView")}
          </button>
        </div>
      </div>

      {sortedRequests.length === 0 ? (
        <p className="empty-state">{t("noRequestsYet")}</p>
      ) : (
        <div className="request-list">
          {sortedRequests.map((request) => (
            <article key={request.id} className="request-card">
              <div>
                <h3>{request.listingSummary}</h3>
                <p className="muted">{request.createdText}</p>
              </div>
              <div className="request-meta">
                <span>{request.quantityKg} kg</span>
                <span className={`status status-${request.status.toLowerCase()}`}>
                  {request.status}
                </span>
              </div>
              {request.preferredTime ? (
                <p className="request-note">
                  {t("preferredTimeLabel")} {request.preferredTime}
                </p>
              ) : null}
              {viewMode === "restaurant" && request.status === "Ready" ? (() => {
                const listing = listingById.get(request.listingId);
                const telegramUrl = listing?.telegramUrl?.trim();
                if (!telegramUrl) {
                  return null;
                }
                return (
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button"
                  >
                    {t("openTelegramConfirm")}
                  </a>
                );
              })() : null}
              {viewMode === "farmer" && request.status === "Sent" ? (
                <div className="request-actions">
                  <button
                    type="button"
                    className="button"
                    onClick={() =>
                      onUpdateRequestStatus(request.id, "Accepted")
                    }
                  >
                    {t("accept")}
                  </button>
                  <button
                    type="button"
                    className="button button-ghost"
                    onClick={() =>
                      onUpdateRequestStatus(request.id, "Rejected")
                    }
                  >
                    {t("reject")}
                  </button>
                </div>
              ) : null}
              {viewMode === "farmer" && request.status === "Accepted" ? (
                <div className="request-actions">
                  <button
                    type="button"
                    className="button"
                    onClick={() =>
                      onUpdateRequestStatus(request.id, "Ready")
                    }
                  >
                    {t("markReady")}
                  </button>
                </div>
              ) : null}
              {request.note ? (
                <p className="request-note">
                  {t("noteLabel")} {request.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default RequestsPage;
