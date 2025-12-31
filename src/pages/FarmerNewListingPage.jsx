import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialListingState = {
  fishType: "",
  otherFishName: "",
  sizeOption: "",
  otherSizeRange: "",
  priceUsdPerKg: "",
  photoUrl: "",
  quantityStatus: ""
};

const initialProfileState = {
  farmerName: "",
  telegramUrl: "",
  farmerAvatarUrl: "",
  farmerLocation: ""
};

const FarmerNewListingPage = ({
  onAddListing,
  farmerProfile,
  onSaveFarmerProfile,
  t
}) => {
  const [formData, setFormData] = useState(initialListingState);
  const [profileData, setProfileData] = useState(initialProfileState);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [profileError, setProfileError] = useState("");
  const navigate = useNavigate();

  const hasProfile = Boolean(farmerProfile.farmerName?.trim());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    if (!profileData.farmerName.trim() || !profileData.telegramUrl.trim()) {
      setProfileError(t("profileRequired"));
      return;
    }

    if (!profileData.telegramUrl.trim().startsWith("http")) {
      setProfileError(t("telegramUrlHint"));
      return;
    }

    onSaveFarmerProfile({
      farmerName: profileData.farmerName.trim(),
      telegramUrl: profileData.telegramUrl.trim(),
      farmerAvatarUrl: profileData.farmerAvatarUrl.trim(),
      farmerLocation: profileData.farmerLocation.trim()
    });
    setProfileData(initialProfileState);
    setProfileError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextFieldErrors = {};
    const priceValue = Number(formData.priceUsdPerKg);
    if (!formData.priceUsdPerKg.trim() || Number.isNaN(priceValue) || priceValue <= 0) {
      nextFieldErrors.priceUsdPerKg = t("priceGreaterThanZero");
    }

    if (!formData.fishType.trim()) {
      nextFieldErrors.fishType = t("selectFishType");
    } else if (formData.fishType === "Other" && !formData.otherFishName.trim()) {
      nextFieldErrors.otherFishName = t("enterFishName");
    }

    if (!formData.sizeOption.trim()) {
      nextFieldErrors.sizeOption = t("selectSizeRange");
    } else if (formData.sizeOption === "Other" && !formData.otherSizeRange.trim()) {
      nextFieldErrors.otherSizeRange = t("enterSizeRange");
    }

    if (!formData.quantityStatus.trim()) {
      nextFieldErrors.quantityStatus = t("selectQuantityStatus");
    }

    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      setError(t("fillRequired"));
      return;
    }

    const fishName =
      formData.fishType === "Other"
        ? formData.otherFishName.trim()
        : formData.fishType.trim();
    const sizeRange =
      formData.sizeOption === "Other"
        ? formData.otherSizeRange.trim()
        : formData.sizeOption.trim();
    const quantityNote = formData.quantityStatus.trim();

    const normalizedPhotoUrl = formData.photoUrl.trim();
    const defaultPhotoUrl =
      fishName === "Catfish"
        ? "/images/default-catfish.jpg"
        : fishName === "Tilapia"
          ? "/images/default-tilapia.jpg"
          : "/images/default-fish.jpg";

    const newListing = {
      id: Date.now().toString(),
      fishName,
      sizeRange,
      priceUsdPerKg: priceValue,
      photoUrl: normalizedPhotoUrl || defaultPhotoUrl,
      quantityNote,
      farmerName: farmerProfile.farmerName,
      telegramUrl: farmerProfile.telegramUrl,
      updatedText: "Updated just now",
      farmerAvatarUrl: farmerProfile.farmerAvatarUrl,
      farmerLocation: farmerProfile.farmerLocation
    };

    setError("");
    setFieldErrors({});
    onAddListing(newListing);
    setFormData(initialListingState);
    navigate("/");
  };

  if (!hasProfile) {
    return (
      <section className="page">
        <h2 className="page-title">{t("setProfileTitle")}</h2>
        <form className="form" onSubmit={handleProfileSubmit}>
          {profileError ? <p className="form-error">{profileError}</p> : null}

          <div className="form-row">
            <label htmlFor="farmerName">{t("farmerName")} *</label>
            <input
              id="farmerName"
              name="farmerName"
              type="text"
              value={profileData.farmerName}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="telegramUrl">{t("telegramUrl")} *</label>
            <input
              id="telegramUrl"
              name="telegramUrl"
              type="url"
              value={profileData.telegramUrl}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="farmerAvatarUrl">{t("farmerAvatarOptional")}</label>
            <select
              id="farmerAvatarUrl"
              name="farmerAvatarUrl"
              value={profileData.farmerAvatarUrl}
              onChange={handleProfileChange}
            >
              <option value="">{t("defaultAvatarOption")}</option>
              <option value="/images/avatars/ouk-hak.jpg">Ouk Hak</option>
              <option value="/images/avatars/sambath.jpg">Sambath</option>
              <option value="/images/avatars/naep-thon.jpg">Naep Thon</option>
              <option value="/images/avatars/sab-saron.jpg">Sab Saron</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="farmerLocation">{t("farmerLocation")}</label>
            <input
              id="farmerLocation"
              name="farmerLocation"
              type="text"
              value={profileData.farmerLocation}
              onChange={handleProfileChange}
            />
          </div>

          <button type="submit" className="button">
            {t("saveProfile")}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="page">
      <h2 className="page-title">{t("addListingTitle")}</h2>
      <p className="muted">
        {t("farmerProfileLabel")} {farmerProfile.farmerName}
      </p>
      <form className="form" onSubmit={handleSubmit}>
        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-row">
          <label htmlFor="fishType">{t("fishType")} *</label>
          <select
            id="fishType"
            name="fishType"
            value={formData.fishType}
            onChange={handleChange}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="Catfish">{t("fishTypeCatfish")}</option>
            <option value="Tilapia">{t("fishTypeTilapia")}</option>
            <option value="Snakehead">{t("fishTypeSnakehead")}</option>
            <option value="Other">{t("optionOther")}</option>
          </select>
          {fieldErrors.fishType ? (
            <p className="form-field-error">{fieldErrors.fishType}</p>
          ) : null}
          {formData.fishType === "Other" ? (
            <input
              id="otherFishName"
              name="otherFishName"
              type="text"
              placeholder={t("enterFishNamePlaceholder")}
              value={formData.otherFishName}
              onChange={handleChange}
            />
          ) : null}
          {fieldErrors.otherFishName ? (
            <p className="form-field-error">{fieldErrors.otherFishName}</p>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="sizeOption">{t("sizeRange")} *</label>
          <select
            id="sizeOption"
            name="sizeOption"
            value={formData.sizeOption}
            onChange={handleChange}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="100-150g">{t("size100_150")}</option>
            <option value="150-200g">{t("size150_200")}</option>
            <option value="200-250g">{t("size200_250")}</option>
            <option value="Other">{t("optionOther")}</option>
          </select>
          {fieldErrors.sizeOption ? (
            <p className="form-field-error">{fieldErrors.sizeOption}</p>
          ) : null}
          {formData.sizeOption === "Other" ? (
            <input
              id="otherSizeRange"
              name="otherSizeRange"
              type="text"
              placeholder={t("enterSizeRangePlaceholder")}
              value={formData.otherSizeRange}
              onChange={handleChange}
            />
          ) : null}
          {fieldErrors.otherSizeRange ? (
            <p className="form-field-error">{fieldErrors.otherSizeRange}</p>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="priceUsdPerKg">{t("pricePerKg")} *</label>
          <input
            id="priceUsdPerKg"
            name="priceUsdPerKg"
            type="number"
            step="0.01"
            value={formData.priceUsdPerKg}
            onChange={handleChange}
          />
          {fieldErrors.priceUsdPerKg ? (
            <p className="form-field-error">{fieldErrors.priceUsdPerKg}</p>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="photoUrl">{t("photoUrlOptional")}</label>
          <input
            id="photoUrl"
            name="photoUrl"
            type="url"
            value={formData.photoUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="quantityStatus">{t("quantityStatus")} *</label>
          <select
            id="quantityStatus"
            name="quantityStatus"
            value={formData.quantityStatus}
            onChange={handleChange}
          >
            <option value="">{t("selectPlaceholder")}</option>
            <option value="Plenty">{t("quantityPlenty")}</option>
            <option value="Few left">{t("quantityFewLeft")}</option>
            <option value="Almost sold out">{t("quantityAlmostSoldOut")}</option>
          </select>
          {fieldErrors.quantityStatus ? (
            <p className="form-field-error">{fieldErrors.quantityStatus}</p>
          ) : null}
        </div>

        <button type="submit" className="button">
          {t("addListing")}
        </button>
      </form>
    </section>
  );
};

export default FarmerNewListingPage;
