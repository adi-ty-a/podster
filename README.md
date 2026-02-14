# 🎥 Podster

## Production-Grade Real-Time Video Calling & Recording Platform

Podster is a scalable real-time video communication platform built using
WebRTC with a custom signaling server.\
It enables users to join live video rooms, record sessions directly in
the browser, and upload recordings securely to AWS S3 using multipart
uploads.

------------------------------------------------------------------------

# 🚀 Core Features

-   🔴 Real-time peer-to-peer video calling (WebRTC)
-   🔁 Custom signaling server using Socket.io
-   🎙️ In-browser recording with MediaRecorder API
-   ☁️ Secure multipart uploads to AWS S3
-   🔐 JWT authentication & cookie-based sessions
-   📦 Scalable backend architecture
-   🧩 Clean frontend/backend separation
-   💰 Cost-efficient media handling (server does NOT process video
    streams)

------------------------------------------------------------------------

# 🛠 Tech Stack

## Frontend

-   Next.js
-   WebRTC (Browser APIs)
-   MediaRecorder API
-   Tailwind CSS
-   Axios

## Backend

-   Node.js
-   Express
-   Socket.io
-   JWT Authentication

## Cloud & Storage

-   AWS S3 (Multipart Upload)
-   Pre-signed URLs
-   Secure cookie handling

------------------------------------------------------------------------

# 🧠 High-Level Architecture

Client (Next.js) │ │ WebRTC Media (P2P) │ Socket.io Signaling Server
(Express) │ │ REST APIs (Auth + S3 URL Generation) │ AWS S3 (Multipart
Upload Storage)

------------------------------------------------------------------------

# 🔹 Video Call Flow

1.  User joins a room.
2.  Socket.io establishes signaling between peers.
3.  WebRTC negotiates SDP & ICE candidates.
4.  Media streams flow peer-to-peer (server not in media path).

------------------------------------------------------------------------

# 🔹 Recording & Upload Flow

1.  Browser records session via MediaRecorder.
2.  Recording is split into chunks.
3.  Backend generates S3 pre-signed multipart URLs.
4.  Client uploads chunks directly to S3.
5.  Backend finalizes multipart upload.

✅ Server never handles large media files\
✅ Reduced infrastructure cost\
✅ Horizontally scalable design

------------------------------------------------------------------------

# 🔐 Security & SaaS Considerations

-   JWT-based authentication
-   Cookie session validation
-   Signed & time-limited S3 upload URLs
-   Recommended per-user storage quotas
-   Recommended rate limiting
-   Backend never streams media

------------------------------------------------------------------------

# 📦 Installation

## 1️⃣ Clone Repository

git clone https://github.com/yourusername/podster.git cd podster

## 2️⃣ Install Dependencies

Frontend: cd client npm install

Backend: cd server npm install

## 3️⃣ Environment Variables (.env)

PORT=5000 JWT_SECRET=your_secret AWS_ACCESS_KEY= AWS_SECRET_KEY=
AWS_REGION= S3_BUCKET_NAME=

## 4️⃣ Run Development Servers

Backend: npm run dev

Frontend: npm run dev

------------------------------------------------------------------------

# 🌍 Deployment Strategy

-   Frontend → Vercel / VPS
-   Backend → VPS / AWS EC2
-   Storage → AWS S3
-   CI/CD → Production branch auto-deploy
-   Development branch for feature builds

------------------------------------------------------------------------

# 📈 Scalability Roadmap

-   Redis adapter for scaling Socket.io
-   TURN server for NAT traversal
-   Horizontal scaling with load balancer
-   Room persistence in database
-   Recording dashboard
-   SaaS billing integration
-   WebRTC metrics monitoring

------------------------------------------------------------------------

# 🎯 Resume-Ready Summary

Podster is a production-style real-time video platform demonstrating:

-   Deep understanding of WebRTC internals
-   Custom signaling server implementation
-   Secure multipart upload architecture
-   Cloud-native storage strategy
-   Cost-aware SaaS design thinking
-   Scalable backend engineering

------------------------------------------------------------------------

# 🏗 Advanced Technical Notes (For Recruiters)

-   Media streams are peer-to-peer (server not bandwidth bottleneck).
-   Backend only handles signaling & signed URL generation.
-   Multipart upload avoids memory spikes for large recordings.
-   Architecture is ready for horizontal scaling.
-   Designed with cost control and abuse prevention in mind.

------------------------------------------------------------------------

# 📜 License

MIT License
