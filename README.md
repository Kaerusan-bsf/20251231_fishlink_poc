# FishLink PoC (Phase 0 + Phase 1)

## Setup

```bash
npm install
npm run dev
```

## Pages

- `/` — Today's Picks listing
- `/listings/:id` — Listing detail
- `/farmer/new` — Add new listing form
- `/requests` — Requests list + status updates
- `/requests/new?listingId=...` — Create a new request

## Phase 1 usage

1. Open a listing detail page and click "Create request".
2. Submit quantity to create a Sent request.
3. Go to `/requests` and switch to Farmer view to Accept/Reject.

## Farmer profile setup

You must set the farmer profile once before adding listings. The profile is stored in local state and resets on reload.

## Real listing photos

Place real fish photos under `public/images/real/` and use `/images/real/<filename>.jpg` in listings.

## Language toggle

Use the EN/KM toggle on the top right to switch UI language.

## Main files changed/added

- `src/data/mockListings.js`
- `src/api/listings.js`
- `src/data/mockRequests.js`
- `src/pages/ListingsPage.jsx`
- `src/pages/ListingDetailPage.jsx`
- `src/pages/FarmerNewListingPage.jsx`
- `src/pages/RequestsPage.jsx`
- `src/pages/NewRequestPage.jsx`
- `src/components/ListingCard.jsx`
- `src/styles/app.css`
- `src/App.jsx`
- `src/main.jsx`
