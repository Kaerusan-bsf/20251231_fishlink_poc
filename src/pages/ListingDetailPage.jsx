import { Link, useParams } from "react-router-dom";

const ListingDetailPage = ({ listings, t }) => {
  const { id } = useParams();
  const listing = listings.find((item) => item.id === id);

  if (!listing) {
    return (
      <section className="page">
        <h2 className="page-title">{t("listingNotFound")}</h2>
        <p>{t("listingNotFoundHelp")}</p>
        <Link to="/" className="link">
          {t("backToListings")}
        </Link>
      </section>
    );
  }

  const defaultPhotoUrl =
    listing.fishName === "Catfish"
      ? "/images/default-catfish.jpg"
      : listing.fishName === "Tilapia"
        ? "/images/default-tilapia.jpg"
        : "/images/default-fish.jpg";
  const photoUrl = listing.photoUrl?.trim() || defaultPhotoUrl;
  const handleImageError = (event) => {
    if (event.currentTarget.src.endsWith(defaultPhotoUrl)) {
      return;
    }
    event.currentTarget.src = defaultPhotoUrl;
  };
  const defaultAvatarUrl = "/images/avatars/default-farmer.jpg";
  const avatarUrl = listing.farmerAvatarUrl?.trim() || defaultAvatarUrl;
  const handleAvatarError = (event) => {
    if (event.currentTarget.src.endsWith(defaultAvatarUrl)) {
      return;
    }
    event.currentTarget.src = defaultAvatarUrl;
  };

  return (
    <section className="page detail-page">
      <div className="detail-header">
        <img
          src={photoUrl}
          alt={listing.fishName}
          className="detail-photo"
          onError={handleImageError}
        />
        <div className="detail-info">
          <h2>{listing.fishName}</h2>
          <p className="detail-size">{listing.sizeRange}</p>
          <div className="detail-meta">
            <span>${listing.priceUsdPerKg} / kg</span>
          </div>
          <div className="detail-meta">
            <span>{listing.quantityNote}</span>
            <span>{listing.updatedText}</span>
          </div>
          <div className="detail-farmer">
            <img
              src={avatarUrl}
              alt={listing.farmerName}
              className="farmer-avatar large"
              onError={handleAvatarError}
            />
            <div>
              <p className="farmer-name">{listing.farmerName}</p>
              {listing.farmerLocation ? (
                <p className="farmer-location">{listing.farmerLocation}</p>
              ) : null}
            </div>
          </div>
          <a
            href={listing.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            {t("contactTelegram")}
          </a>
          <Link
            to={`/requests/new?listingId=${listing.id}`}
            className="button button-ghost"
          >
            {t("createRequest")}
          </Link>
          <Link to="/" className="link">
            {t("backToListings")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ListingDetailPage;
