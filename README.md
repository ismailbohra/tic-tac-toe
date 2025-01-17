# Tic Tac Toe Game  

A modern and interactive **Tic Tac Toe game** with real-time multiplayer functionality and AI-powered gameplay. This project combines engaging gameplay with robust backend support to offer a seamless user experience across three different modes.  

## 🎮 Features  

### 1. **Play Against AI**  
   - Test your skills against an AI that uses the **Minimax Algorithm** to make optimal moves.  
   - The AI dynamically adapts to gameplay, offering a challenging experience.  

### 2. **Quick Match**  
   - Instantly get paired with another live player for a fast-paced game.  
   - Real-time matchmaking powered by **Socket.IO** and dynamic room allocation.  

### 3. **Room Mode**  
   - Create a private room to play with friends.  
   - Share a unique room link for others to join.  

---

## 🛠️ Tech Stack  

### Frontend  
- **React.js**: For building a responsive and interactive user interface.  
- **Material-UI (MUI)**: For sleek and customizable components.  
- **React Router**: For seamless navigation between routes.  

### Backend  
- **Node.js**: To handle server-side logic and API endpoints.  
- **Socket.IO**: For real-time bidirectional communication.  
- **Express.js**: A lightweight and flexible Node.js framework.  

### Libraries & Tools  
- **CORS**: To handle cross-origin requests.  
- **nodemon**: For hot-reloading during development.  

---

## 📂 Project Structure  

### Frontend (`/client`)  
- **/pages**: Contains React components for individual screens (e.g., `UserForm`, `RoomGame`).  
- **/components**: Reusable UI components.  
- **/utils**: Helper functions for gameplay logic.  

### Backend (`/server`)  
- **/routes**: API endpoints for joining, creating, and managing rooms.  
- **/socket**: Handles WebSocket communication for real-time functionality.  
- **/models**: Logic for rooms, players, and game states.  

---

## 🚀 How It Works  

### Game Modes  
1. **AI Mode**:  
   - The game board interacts with a backend-powered AI that uses the **Minimax Algorithm** to calculate the best move.  

2. **Quick Match**:  
   - Players are matched in real time using a temporary variable to manage matchmaking.  
   - Once two players are paired, they are assigned a room, and gameplay begins.  

3. **Room Mode**:  
   - A player creates a room and gets a unique link to share.  
   - Other players can join via the link to start the game.  

---

## 📜 APIs  

### Backend Endpoints  
| Method | Endpoint              | Description                            |  
|--------|-----------------------|----------------------------------------|  
| POST   | `/api/rooms/create`   | Creates a new room.                   |  
| POST   | `/api/rooms/join`     | Joins an existing room.               |  
| POST   | `/api/rooms/exit`     | Exits a room and cleans up resources. |  

### WebSocket Events  
| Event         | Description                                   |  
|---------------|-----------------------------------------------|  
| `joinRoom`    | Joins a specific room by `roomId`.            |  
| `joinQuickRoom` | Matches players dynamically for quick games. |  
| `makeMove`    | Handles player moves and updates game state.  |  
| `gameOver`    | Emits when the game concludes with a winner.  |  
| `drwa`        | Emits when the game concludes to draw.        |  

---

## ⚙️ How to Run  

### Prerequisites  
Ensure you have the following installed:  
- Node.js  
- npm or yarn  

### Setup  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/ismailbohra/tic-tac-toe  
   cd tic-tac-toe  
   ```  

2. Install dependencies for both client and server:  
   ```bash  
   cd client  
   npm install  
   cd ../server  
   npm install  
   ```  

3. Start the backend server:  
   ```bash  
   npm run dev  
   ```  

4. Start the frontend development server:  
   ```bash  
   cd ../client  
   npm start  
   ```  

5. Open the application in your browser at `http://localhost:5173`.  

---

## 🌟 Future Enhancements  
- Add a **leaderboard** to track top players in multiplayer mode.  
- Enhance the AI with different difficulty levels.  
- Add animations and sounds for a more engaging user experience.  
- Implement support for mobile devices with a responsive design.  

---

## 🤝 Contributions  
Contributions, issues, and feature requests are welcome!  
Feel free to fork the repository and create a pull request.  

---

## 📧 Contact  
For any questions or feedback, feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/ismailbohraa) or email me at `ismailbohra99@gmail.com`.  
