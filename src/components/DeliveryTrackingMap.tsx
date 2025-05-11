import type React from "react"
import { Truck, Package, Home, CheckCircle, Clock } from "lucide-react"

type DeliveryStatus = "processing" | "shipped" | "out-for-delivery" | "delivered"

interface DeliveryTrackingMapProps {
  status: DeliveryStatus
}

const DeliveryTrackingMap: React.FC<DeliveryTrackingMapProps> = ({ status }) => {
  const steps = [
    { id: "processing", label: "Order Processing", icon: Clock },
    { id: "shipped", label: "Shipped", icon: Package },
    { id: "out-for-delivery", label: "Out for Delivery", icon: Truck },
    { id: "delivered", label: "Delivered", icon: Home },
  ]

 
  const currentStepIndex = steps.findIndex((step) => step.id === status)

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-medium mb-6 text-center">Delivery Status</h3>

      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-gray-600 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isCompleted = index <= currentStepIndex
            const isActive = index === currentStepIndex

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center z-10
                    ${isCompleted ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-500"}
                    ${isActive ? "ring-4 ring-gray-100" : ""}
                  `}
                >
                  {isCompleted && index < currentStepIndex ? <CheckCircle size={20} /> : <StepIcon size={20} />}
                </div>
                <div className="mt-2 text-sm font-medium text-center">{step.label}</div>
                {isActive && <div className="mt-1 text-xs text-gray-600 animate-pulse">Current Status</div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Estimated delivery information */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          {status === "delivered" ? (
            <span className="font-medium text-green-600">Your order has been delivered!</span>
          ) : (
            <>
              <span className="font-medium">Estimated Delivery:</span> Saturday, May 10th, 2025
            </>
          )}
        </p>

        {/* Delivery details */}
        <p className="text-xs text-gray-500 mt-2">
          {status === "processing" && "Your order is being prepared for shipment."}
          {status === "shipped" && "Your order has left our warehouse and is on its way!"}
          {status === "out-for-delivery" && "Your package is out for delivery with our courier partner."}
          {status === "delivered" && "Thank you for shopping with us!"}
        </p>
      </div>
    </div>
  )
}

export default DeliveryTrackingMap
