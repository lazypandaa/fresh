import { useCart } from '../context/CartContext'
import { CheckCircle, X } from 'lucide-react'

export function CartNotification() {
  const { showNotification, lastAddedProduct } = useCart()

  if (!showNotification || !lastAddedProduct) return null

  return (
    <div className="fixed top-24 right-6 z-50 animate-slide-in-right">
      <div className="bg-white border-2 border-black rounded-xl shadow-2xl p-4 min-w-[320px]">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1">Added to Cart!</h3>
            <p className="text-sm text-gray-600">{lastAddedProduct.name}</p>
            <p className="text-sm font-semibold mt-1">${lastAddedProduct.price.toFixed(2)}</p>
          </div>
          <div className="flex-shrink-0">
            <img
              src={lastAddedProduct.image_url}
              alt={lastAddedProduct.name}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64x64?text=No+Image'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
