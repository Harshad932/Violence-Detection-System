# Violence Detection System (React Frontend)

An AI-powered video surveillance and violence detection interface built with React, Vite, Tailwind CSS, and Lucide React, integrated with a Spring Boot JWT Authentication Backend.

---

## ⚙️ Backend Integration & API Configuration

The frontend is configured to communicate with the Spring Boot backend service:

### 1. Environment Variable (`.env`)
```properties
VITE_API_BASE_URL=http://localhost:8080
```
Change this in `.env` if your backend runs on a different port or domain.

### 2. Endpoints Implemented

| Endpoint | Method | Authentication | Payload / Request | Response |
| :--- | :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Public | `{ username, password, email }` (Password min 8 chars) | 201 Created with message string |
| `/auth/login` | `POST` | Public | `{ username, password }` | 200 OK with `{ token: "..." }` |
| `/api/users/me` | `GET` | Bearer JWT Token | Header: `Authorization: Bearer <token>` | 200 OK with `{ userId, username, email }` |

> [!NOTE]
> The video upload, video playback, and violence detection inference continue to run as an interactive simulation on the frontend as requested, until your deep learning / ML model API endpoint is implemented in the backend.

### 3. Spring Boot CORS Configuration Tip
If your frontend runs on `http://localhost:5173` and backend runs on `http://localhost:8080`, ensure your Spring Boot Security configuration allows CORS requests. For example:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:5173"));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("*"));
    configuration.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```
And in your `SecurityFilterChain`:
```java
http.cors(Customizer.withDefaults())
    .csrf(csrf -> csrf.disable())
    // ...
```

---

## 🚀 Key Pages & Navigation

1. **Home / Overview (`/`)** [Public]:
   - Explains the violence detection system and classification logic.
   - Shows active Spring Boot endpoint connectivity badges.
   - Links to **Create Account** and **Sign In**.

2. **Register (`/register`)** [Public]:
   - Validates username, email, and password (enforcing backend's minimum 8 characters rule).
   - Posts to `/auth/register`.
   - On success: redirects to `/login` with pre-filled username.

3. **Login (`/login`)** [Public]:
   - Posts credentials to `/auth/login`.
   - Stores the returned JWT token.
   - Automatically retrieves the authenticated user's profile from `/api/users/me`.
   - Redirects to `/detect`.

4. **Detection Studio (`/detect`)** [Protected]:
   - Protected route requiring a valid JWT session.
   - Displays logged-in analyst information (Username, Email, User ID).
   - Video file upload dropzone + preloaded test samples.
   - HTML5 video playback player.
   - "Check Video for Violence" simulation with multi-phase frame analysis and animated scanner.
   - Output banner: **VIOLENT** vs. **NON-VIOLENT** with confidence percentage gauge.

---

## 🛠️ Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 3. Build for Production
```bash
npm run build
```
