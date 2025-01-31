# Sanjivani - Hospital Emergency Response System

## Project Overview
Sanjivani is a comprehensive hospital emergency response system designed to streamline the process of finding and accessing medical care during emergencies. It includes features for hospital management, ambulance tracking, and first aid information.

## Backend Documentation

### Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- Socket.IO for real-time communication

### API Routes

#### Hospital Routes
- `GET /api/get-hospital`
  - Description: Finds the most relevant hospital based on the emergency description.
  - Query Params: `prompt` (string) - Description of the emergency
  - Response: JSON object with selected service and list of relevant hospitals

#### Ambulance Routes
- `GET /ambulance/new`
  - Description: Creates a new ambulance instance
  - Response: Renders 'ambulance/new' view with ambulanceId

- `POST /ambulance/new`
  - Description: Registers a new ambulance
  - Body: `{ number, driverName, mobile }`
  - Response: JSON with new ambulanceId

- `GET /ambulance/:id/rider`
  - Description: Renders the rider view for a specific ambulance
  - Params: `id` (string) - Ambulance ID
  - Response: Renders 'ambulance/rider' view

- `GET /ambulance/:id/track`
  - Description: Renders the tracking view for a specific ambulance
  - Params: `id` (string) - Ambulance ID
  - Response: Renders 'ambulance/track' view

#### Admin Routes
- `GET /admin/:id/:attribute`
  - Description: Retrieves a specific attribute of a hospital admin
  - Params: 
    - `id` (string) - Admin ID
    - `attribute` (string) - Attribute to retrieve (e.g., 'availableDoctors', 'availableFacilities')
  - Response: JSON with requested attribute data

- `POST /admin/:id/:attribute/update`
  - Description: Updates a specific attribute of a hospital admin
  - Params:
    - `id` (string) - Admin ID
    - `attribute` (string) - Attribute to update
  - Body: `{ updateData }`
  - Response: JSON with updated attribute data

#### Doctor Routes
- `GET /doctor`
  - Description: Retrieves all doctors
  - Response: JSON array of all doctors

- `GET /doctor/:id`
  - Description: Retrieves a specific doctor by ID
  - Params: `id` (string) - Doctor ID
  - Response: JSON object of the doctor

- `PUT /doctor/:id/:attribute/update`
  - Description: Updates a specific attribute of a doctor
  - Params:
    - `id` (string) - Doctor ID
    - `attribute` (string) - Attribute to update (e.g., 'name', 'email', 'phoneNumber')
  - Body: Updated value for the attribute
  - Response: JSON with updated doctor data

#### User Routes
- `POST /user/new`
  - Description: Creates a new user
  - Body: `{ username, email, phoneNumber, password}`
  - Response: JSON object of the created user

- `PUT /user/:id`
  - Description: Updates an existing user
  - Params: `id` (string) - User ID
  - Body: `{ username, email, phoneNumber }` (At least one field required)
  - Response: JSON object with updated user data

- `GET /user`
  - Description: Fetches all users
  - Response: JSON array of all users

- `GET /user/:id`
  - Description: Fetches a particular user by ID
  - Params: `id` (string) - User ID
  - Response: JSON object of the user

- `GET /user/:id/:attribute`
  - Description: Fetches a specific attribute of a user
  - Params:
    - `id` (string) - User ID
    - `attribute` (string) - Attribute to retrieve (e.g., 'email', 'phoneNumber')
  - Response: JSON object with the requested attribute

### Models

1. Hospital
   - name (String)
   - address (String)
   - location (GeoJSON Point)
   - bedsAvailable (Number)
   - services (Array of Service ObjectIds)
   - doctors (Array of Doctor ObjectIds)

2. Doctor
   - name (String)
   - phoneNumber (String)
   - specialty (String)
   - opdTimings (String)
   - day (Array of Strings)

3. Ambulance
   - number (String)
   - driverName (String)
   - mobile (String)
   - status (String)
   - currentLocation (Object with lat and lng)
   - destination (Object with lat and lng)

4. User
   - username (String)
   - email (String)
   - phoneNumber (String)

5. Service
   - name (String)
   - description (String)

6. HospitalAdmin
   - username (String)
   - password (String)
   - hospital (Hospital ObjectId)
   - availableFacilities (Array of Strings)
   - ambulances (Array of Ambulance ObjectIds)
   - availableDoctors (Array of Strings)
   - bloodBank (Array of Strings)

### Real-time Features
- Socket.IO is used for real-time updates of ambulance locations.
- Event: 'riderLocation' - Updates the location of an ambulance
- Event: 'riderLocationUpdate' - Broadcasts updated location to clients

### External APIs
- Google Generative AI (Gemini) for natural language processing of emergency descriptions
- OSRM (Open Source Routing Machine) for route calculations

## Frontend Documentation

The frontend is built using React and Vite. Key features include:

- React Router for navigation
- Tailwind CSS for styling
- Components for Hospital Dashboard, Ambulance Tracking, and Emergency Search

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file (refer to `.env.example`)
4. Start the backend server: `npm start`
5. Navigate to the frontend directory: `cd views/sanjivani-main`
6. Start the frontend development server: `npm run dev`

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
