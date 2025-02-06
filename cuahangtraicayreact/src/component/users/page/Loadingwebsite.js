import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const LoadingScreen = () => {
  const particlesRef = useRef([]);

  useEffect(() => {
    const particles = particlesRef.current;
    particles.forEach((particle) => {
      const animateParticle = () => {
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        const randomScale = Math.random() * 0.8 + 0.6;
        particle.style.transition = "transform 3s ease-in-out, opacity 3s ease-in-out";
        particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
        particle.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      };
      const interval = setInterval(animateParticle, 3000);
      return () => clearInterval(interval);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #8fd3f4, #514a9d)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 10s ease infinite",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Particles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          style={{
            position: "absolute",
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      ))}

      {/* Logo */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 0px 50px rgba(255, 255, 255, 0.9)",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/135/135620.png" // Thay logo phù hợp
          alt="logo"
          style={{
            width: "80%",
            height: "80%",
            objectFit: "contain",
          }}
        />
      </motion.div>

      {/* Dòng chữ */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 2,
        }}
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#fff",
          textShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
          marginTop: "20px",
          textTransform: "uppercase",
        }}
      >
        Cửa Hàng Trái Cây Xanh
      </motion.h1>

      {/* Dòng giới thiệu */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 1.5,
        }}
        style={{
          fontSize: "18px",
          color: "#fff",
          textAlign: "center",
          maxWidth: "80%",
          marginTop: "10px",
          fontStyle: "italic",
        }}
      >
        Trái cây tươi ngon mỗi ngày - Sức khỏe cho bạn!
      </motion.p>

      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </motion.div>
  );
};

export default LoadingScreen;
