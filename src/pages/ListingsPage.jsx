import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const ListingsPage = ({ listings, t }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/listings/${id}`);
  };

  return (
    <section className="page">
      <h2 className="page-title">{t("todaysPicks")}</h2>
      <div className="listing-grid">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onViewDetails={handleViewDetails}
            t={t}
          />
        ))}
      </div>
    </section>
  );
};

export default ListingsPage;
