# Vehicle Service Management System — Backend

This is the complete backend described in your workshop's build guide. It's already
built and tested — you just need to connect it to your own free MongoDB database and
run two commands.

## What this actually is (plain English)

Think of it like a restaurant:

- **Routes** (`routes/`) = the waiter. It listens for a request ("give me all customers")
  and passes it to the right person.
- **Controllers** (`controllers/`) = the chef. It does the actual work — read data, save
  data, check a password, etc.
- **Models** (`models/`) = the recipe card. It defines what a "Customer", "Vehicle",
  "ServiceRequest", or "User" is allowed to look like.
- **MongoDB** = the fridge. It's where everything actually gets stored.

So a request to create a customer flows: **Postman → route → controller → model → MongoDB**,
and the answer flows back the same way.

The project currently has:
- Full CRUD (Create/Read/Update/Delete) for **Customers**, **Vehicles**, and **Service Requests**
- **Register** and **Login** with hashed passwords and JWT tokens
- A ready-made `authMiddleware.js` for protecting routes later (not wired in yet — that's
  intentionally the *next* step after this guide, along with the React frontend)

## 1. Install Node.js (skip if already installed)

Download the LTS version from https://nodejs.org and install it. Check it worked by
opening a terminal (PowerShell on Windows) and running:
```
node -v
npm -v
```

## 2. Create a free MongoDB Atlas database

This is the one part only you can do, since it needs your own account.

1. Go to https://www.mongodb.com/cloud/atlas/register and sign up (free).
2. Create a free cluster (any name, e.g. `VehicleServiceCluster`).
3. **Database Access** → Add a database user (username + password). Avoid symbols like
   `@ # % /` in the password — they break the connection string. Letters and numbers only.
4. **Network Access** → Add IP Address → allow `0.0.0.0/0` (allow from anywhere — fine
   for a college project, not for production).
5. On your cluster, click **Connect → Drivers → Node.js**, and copy the connection
   string. It looks like:
   ```
   mongodb+srv://USERNAME:<db_password>@CLUSTER.mongodb.net/?appName=VehicleServiceCluster
   ```
6. Replace `<db_password>` with your real password, and add `vehicle_service_db` as the
   database name right after `.net/`.

## 3. Add your connection string to `.env`

Open `backend/.env` and replace the `MONGO_URI` line with your real one:
```
MONGO_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/vehicle_service_db?appName=VehicleServiceCluster
```
`PORT` and `JWT_SECRET` are already filled in — no need to touch those.

## 4. Install dependencies and run

```
cd backend
npm install
npm run dev
```

Expected output:
```
Server running on port 5001
MongoDB Connected
```

If you see `MongoDB Connection Error`, it's almost always the connection string
(wrong password, special characters, or forgot to add the database name).

## 5. Test it

Open http://localhost:5001/ in a browser — you should see:
```json
{"message":"Vehicle Service Management API is running"}
```

For the real APIs, import **`Vehicle-Service-Management.postman_collection.json`**
(in this same folder) into Postman: **Import → select the file**. Every endpoint from
the guide is already set up — Register, Login, and full CRUD for Customers, Vehicles,
and Service Requests. Run "Create Customer" first, then copy the returned `_id` into
the collection's `customerId` variable so the Vehicle/Service Request requests can use it.

## Common errors (from the guide's own troubleshooting notes)

| Symptom | Fix |
|---|---|
| `MongoDB Connection Error: Invalid connection string` | Password has special characters, or `<db_password>` wasn't replaced |
| `User already exists` | Use a different email, or delete the test user in Atlas |
| `Invalid email or password` | Double-check the exact email/password used at registration |
| JWT errors | Restart the server after editing `.env` — it's only read on startup |
| Port already in use | Something else is using 5001; change `PORT` in `.env` |

## What's *not* built yet (on purpose)

Per the guide, these come after this stage: locking Customer/Vehicle/Service Request
routes behind login (using `authMiddleware.js`, which already exists), admin-only
permissions, and the React frontend. Happy to help with any of those next.
