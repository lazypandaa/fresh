# API Configuration Update - Complete ✓

## Summary
Successfully updated the FreshMart frontend to use the Azure backend URL.

## Backend URL
- **Azure Backend**: `https://freshmart-backend.ambitiousground-569ca432.centralindia.azurecontainerapps.io/api`

## Changes Made

### 1. Created Centralized Configuration
- **File**: `frontend/src/config/api.js`
- Exports `API_BASE_URL` and `API_BASE` constants
- Single source of truth for all API calls

### 2. Updated Files (17 files total)
All files now import and use `API_BASE` from the centralized config:

#### Utilities
- ✓ `frontend/src/utils/tracker.js`
- ✓ `frontend/src/utils/eventTracker.js`

#### Pages
- ✓ `frontend/src/pages/Home.jsx`
- ✓ `frontend/src/pages/Products.jsx`
- ✓ `frontend/src/pages/Categories.jsx`
- ✓ `frontend/src/pages/Deals.jsx`
- ✓ `frontend/src/pages/Cart.jsx`
- ✓ `frontend/src/pages/Checkout.jsx`
- ✓ `frontend/src/pages/Login.jsx`
- ✓ `frontend/src/pages/Signup.jsx`
- ✓ `frontend/src/pages/Profile.jsx`

#### Components
- ✓ `frontend/src/components/Header.jsx`
- ✓ `frontend/src/components/GuestLogin.jsx`

### 3. API Endpoints Verified
All endpoints match the Swagger documentation:

#### Authentication
- `POST /auth/login`
- `POST /auth/signup`
- `POST /auth/guest-login`

#### Products
- `GET /products?search={query}&limit={limit}`
- `GET /products?limit={limit}&skip={skip}`
- `GET /products?department={name}&limit={limit}`

#### Departments
- `GET /departments`

#### Bundles
- `GET /bundles?page={page}&limit={limit}`
- `POST /bundles/recommend`

#### Orders
- `POST /orders`
- `GET /orders/{email}`

#### Events/Tracking
- `POST /events/track`

## Next Steps

### 1. Install Dependencies (if not already done)
```bash
cd frontend
npm install
```

### 2. Start the Frontend
```bash
npm run dev
```

The frontend should now connect to your Azure backend at:
`https://freshmart-backend.ambitiousground-569ca432.centralindia.azurecontainerapps.io`

### 3. Testing Checklist
- [ ] User Registration (Signup)
- [ ] User Login
- [ ] Guest Login
- [ ] Browse Products
- [ ] Search Products
- [ ] View Categories/Departments
- [ ] Add to Cart
- [ ] View Cart
- [ ] Bundle Recommendations
- [ ] Checkout & Place Order
- [ ] View Profile & Order History
- [ ] Event Tracking (check browser console)

### 4. Troubleshooting

#### CORS Issues
If you encounter CORS errors, verify that the Azure backend has CORS configured to allow your local frontend origin (typically `http://localhost:5173`).

Backend should have:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Connection Issues
1. Verify the Azure backend is running and accessible
2. Test the backend directly: `https://freshmart-backend.ambitiousground-569ca432.centralindia.azurecontainerapps.io/docs`
3. Check browser console for detailed error messages
4. Verify network tab in DevTools to see actual API calls

## Configuration Details

The centralized config file (`frontend/src/config/api.js`) makes it easy to switch between environments:

```javascript
// For Azure
export const API_BASE_URL = 'https://freshmart-backend.ambitiousground-569ca432.centralindia.azurecontainerapps.io/api'

// For local development (if needed)
// export const API_BASE_URL = 'http://localhost:8000/api'
```

Simply change this one line to switch between environments!
