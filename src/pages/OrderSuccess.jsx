import { CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

export function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline" className="border-2">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
