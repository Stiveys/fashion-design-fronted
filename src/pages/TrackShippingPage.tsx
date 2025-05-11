import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const TrackShippingPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to checkout page with trackingOnly flag
    navigate("/checkout?trackingOnly=true")
  }, [navigate])

  return null
}

export default TrackShippingPage
