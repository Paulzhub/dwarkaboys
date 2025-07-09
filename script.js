@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  overscroll-behavior: auto; /* Allow browser UI on overscroll */
  background-color: #000000; /* Fallback for landing page */
}

body::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

#landing, #profiles {
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  position: relative;
  will-change: transform; /* Optimize rendering */
}

#landing.active, #profiles.active {
  transform: translateY(0);
}

#landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000000;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

#landing h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 4rem;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 40px rgba(255, 255, 255, 0.8); /* White neon glow */
  margin: 0 0 40px;
}

.group-picture {
  width: auto;
  max-width: 50vw;
  max-height: 50vh;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;
  transition: transform 1.5s ease;
  will-change: transform; /* Optimize rendering */
}

.group-picture:hover {
  transform: scale(1.2);
  z-index: 1;
}

#profiles {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  height: auto;
  scrollbar-width: none; /* Firefox */
}

#profiles::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.profile {
  width: 100vw;
  max-width: 100vw;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  scroll-snap-align: center;
  overflow: hidden;
  transform: translateX(10px);
  transition: transform 0.5s ease;
  will-change: transform; /* Optimize rendering */
}

.profile.active {
  transform: translateX(0);
}

.profile:nth-child(1) {
  background-color: #239FA9; /* Cyan for Mark */
  border: 1px solid #1C8087;
}

.profile:nth-child(1) .profile-title,
.profile:nth-child(1) .description {
  color: #f7e9e9; /* White for Mark */
}

.profile:nth-child(2) {
  background-color: #E34664; /* Red-pink for Rudy */
  border: 1px solid #C93B56;
}

.profile:nth-child(3) {
  background-color: #2178AE; /* Blue for Danny */
  border: 1px solid #1B6190;
}

.profile:nth-child(3) .profile-title,
.profile:nth-child(3) .description {
  color: #f7e9e9; /* White for Danny */
}

.profile:nth-child(4) {
  background-color: #F5E6DB; /* Light beige for Elle */
  border: 1px solid #E8D2C2;
}

.profile:nth-child(5) {
  background-color: #6A1D3A; /* Deep red for Paulz */
  border: 1px solid #57162F;
}

.profile:nth-child(5) .profile-title,
.profile:nth-child(5) .description {
  color: #f7e9e9; /* White for Paulz */
}

.profile:nth-child(6) {
  background-color: #B9D2D1; /* Light teal for Sylvia */
  border: 1px solid #A3BABA;
}

.profile-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  color: #1f2937;
  text-transform: uppercase;
  margin: 0 0 20px;
}

.profile-picture {
  width: auto;
  max-width: 50vw;
  max-height: 50vh;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  opacity: 1; /* Ensure full opacity */
  transition: transform 1.5s ease;
  will-change: transform; /* Optimize rendering */
}

.profile-picture:hover {
  transform: scale(1.2);
  z-index: 1;
}

.description {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: #1f2937;
  text-align: center;
  margin-top: 30px;
  max-width: 80%;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  #landing h1 {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
  .group-picture {
    max-width: 40vw;
    max-height: 40vh;
  }
  .profile-title {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  .profile-picture {
    max-width: 40vw;
    max-height: 40vh;
  }
  .description {
    font-size: 1rem;
    max-width: 90%;
    margin-top: 25px;
  }
  #landing, #profiles, .profile {
    transition-duration: 0.4s;
  }
}

@media (max-width: 480px) {
  #landing h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  .group-picture {
    max-width: 30vw;
    max-height: 30vh;
  }
  .profile-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  .profile-picture {
    max-width: 30vw;
    max-height: 30vh;
  }
  .profile {
    padding: 10px;
  }
  .description {
    font-size: 0.9rem;
    margin-top: 20px;
  }
  #landing, #profiles, .profile {
    transition-duration: 0.3s;
  }
}
