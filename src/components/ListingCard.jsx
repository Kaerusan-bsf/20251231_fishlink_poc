const ListingCard = ({ listing, onViewDetails, t }) => {
  const handleCardClick = () => {
    onViewDetails(listing.id);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onViewDetails(listing.id);
    }
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const updatedText = listing.updatedText || "";
  const quantityNote = listing.quantityNote || "";
  const isFresh =
    updatedText.includes("15m") || updatedText.includes("30m");
  const lowerQuantity = quantityNote.toLowerCase();
  const isAlmostSoldOut =
    lowerQuantity.includes("few") ||
    lowerQuantity.includes("almost") ||
    quantityNote.includes("残りわずか");
  const badgeText = isFresh ? "Fresh" : isAlmostSoldOut ? "Almost sold out" : "";
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
    <article
      className="listing-card"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      <div className="listing-photo-wrap">
        <img
          src={photoUrl}
          alt={listing.fishName}
          className="listing-photo"
          onError={handleImageError}
        />
        {badgeText ? (
          <span className="listing-badge">{badgeText}</span>
        ) : null}
      </div>
      <div className="listing-body">
        <div className="listing-header">
          <h3>{listing.fishName}</h3>
          <span className="listing-size">{listing.sizeRange}</span>
        </div>
        <div className="listing-meta">
          <span>${listing.priceUsdPerKg} / kg</span>
        </div>
        <div className="listing-meta">
          <span>{listing.quantityNote}</span>
          <span>{listing.updatedText}</span>
        </div>
        <div className="listing-farmer">
          <img
            src={avatarUrl}
            alt={listing.farmerName}
            className="farmer-avatar"
            onError={handleAvatarError}
          />
          <span>{listing.farmerName}</span>
        </div>
        <div className="listing-actions">
          <a
            href={listing.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="button"
            onClick={stopPropagation}
          >
            {t("contactTelegram")}
          </a>
          <button
            type="button"
            className="button button-ghost"
            onClick={(event) => {
              stopPropagation(event);
              onViewDetails(listing.id);
            }}
          >
            {t("viewDetails")}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ListingCard;
