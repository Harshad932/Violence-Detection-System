# Violence Detection System (React Frontend Prototype)

An AI-powered video surveillance and violence detection interface built with React, Vite, Tailwind CSS, and Lucide React.

## 🚀 Key Features

1. **Overview & Landing Page (`/`)**:
   - Comprehensive explanation of automated violence detection in surveillance videos.
   - Clarifies the binary classification: **Violent** (brawls, assaults, physical altercation) vs. **Non-Violent** (pedestrian walking, conversations, peaceful activity).
   - Interactive surveillance feed mockups and 3-step pipeline breakdown.
   - Quick navigation to the Login Portal.

2. **Security Portal Login (`/login`)**:
   - Authentication screen with static credentials verification.
   - **Username**: `user1`
   - **Password**: `1234`
   - Includes one-click **Autofill** demo credentials button.
   - Validates user input with inline error feedback.

3. **Detection Studio & Analysis Dashboard (`/detect`)**:
   - **Drag-and-Drop Video Uploader**: Upload any `.mp4`, `.webm`, or `.ogg` surveillance clip.
   - **Quick Test Sample Presets**: Don't have a video handy? One-click load pre-configured test video clips.
   - **Integrated HTML5 Video Player**: Play, pause, scrub, and inspect footage.
   - **Simulated AI Scanner**: Animated laser scanner and multi-phase deep learning progress indicator (extracting frames, temporal motion vectors, anomaly scoring).
   - **Definitive Output**: 
     - Status: **VIOLENT** (Red threat alert) or **NON-VIOLENT** (Emerald green safe).
     - **Confidence Score & Percentage Bar** (e.g. 94.8% vs 5.2%).
     - Inference telemetry (analyzed frame count, detection window, latency).
   - **Presentation/Viva Mode Switcher**: Easily toggle the target outcome (Auto Smart, Violent, Non-Violent) to demonstrate both states during evaluations.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🔐 Demo Credentials
- **Username:** `user1`
- **Password:** `1234`
