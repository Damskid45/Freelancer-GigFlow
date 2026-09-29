# GigFlow

GigFlow is a full-stack freelance marketplace prototype with a React/Vite frontend and an Express/TypeScript API.

## Run locally

### Backend

```powershell
cd backend
npm install
npm run dev
```

The API listens on `http://localhost:4000`.

### Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Connected marketplace flows

The frontend now talks to the Express API for:

- Marketplace categories and gig catalog
- Gig detail retrieval
- Orders and checkout creation
- Favorites
- Conversations and sending messages
- Creating/publishing a service
- API-backed local development persistence

The development API stores mutable demo data in `backend/.data/store.json`. This keeps the project usable without requiring PostgreSQL for the local UI/API demo. The SQL schema remains in `database/schema.sql` for the next persistence stage.

## API endpoints

- `GET /health`
- `GET /api/categories`
- `GET /api/gigs`
- `GET /api/gigs/:id`
- `POST /api/gigs`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/favorites`
- `POST /api/favorites/:gigId`
- `GET /api/messages`
- `POST /api/messages/:chatId`

Set `VITE_API_URL` if the API is hosted somewhere other than `http://localhost:4000`.

## Account, payments and verification

The connected build includes:
- Email/password registration and sign-in.
- Password reset flow for development/local testing.
- Google Identity Services integration when `VITE_GOOGLE_CLIENT_ID` and backend `GOOGLE_CLIENT_ID` are configured with the same Google OAuth client ID.
- Protected profile, dashboard, orders, messages, create-service and brief pages.
- Editable profile details and profile-picture upload.
- Payment-method management using masked card/bank details only.
- Government-ID verification submission state (`not_started`, `pending`, `verified`, `rejected`) before freelancer work should be enabled.

### Production security note
This local build deliberately does not persist full card numbers, CVV/PINs, or government-ID images. A production deployment should use a PCI-compliant payment processor and a secure KYC/identity-verification provider with encrypted document storage and an admin review workflow. The Google sign-in button requires a configured Google OAuth client ID.


## Client-project architecture

GigFlow is intended to be delivered as a client-owned product. The developer does not need to own the client's production payment, bank, identity-verification, domain, or business accounts.

- Use test/sandbox credentials while developing integrations.
- Keep production secrets in the deployment environment, never in source code or Git.
- The client supplies production Paystack/payment credentials when their business account is ready.
- The client supplies any production KYC/identity-verification account and compliance information.
- `.env.example` files document the required configuration without containing secrets.

Paystack test mode is suitable for development because test transactions do not move real money; live processing uses separate live keys and requires the business to be activated.
