"use client"
import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { postCallNoToken } from "@/lib/api"
import { setToken } from "@/lib/token"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const payload = {
        userName: email,
        password: password,
      }
      const result = await postCallNoToken("/login", payload)
      if (result.status) {
        toast.success(result.message)
        setToken(result?.data?.token)
        window.location.href = "/dashboard"
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4">
      {/* Background animation elements */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <motion.button
        whileHover={{ x: -2 }}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors z-10"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Home page</span>
      </motion.button>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-20 left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-white z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-2 border-white/30 rounded-full flex items-center justify-center"
        >
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </motion.div>
        <span className="text-xl font-bold tracking-wider">Ez Logistic</span>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-xl border border-white/10 z-10"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-sm"
          >
            Admin portal access only
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
              Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/30"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/30"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Remember me */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center"
          >
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-blue-600 bg-white/5 border-white/10 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-white/70">
              Remember this device
            </label>
          </motion.div>

          {/* Sign in Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 transition-all duration-200 shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Authenticating...
                </>
              ) : (
                "Sign in"
              )}
            </motion.button>
          </motion.div>

          {/* Sign up link - Removed for admin panel */}
          {/* <div className="text-center pt-4 border-t border-white/10">
            <span className="text-white/50 text-sm">
              Having trouble?{" "}
              <a href="#" className="text-white hover:text-blue-300 font-medium transition-colors">
                Contact support
              </a>
            </span>
          </div> */}
        </form>
      </motion.div>
    </div>
  )
}