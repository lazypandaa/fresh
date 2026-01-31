import { useCart } from '../context/CartContext'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../config/api'

const flattenBundlesToProducts = (bundles, cart) => {
  const cartIds = new Set(cart.map(i => Number(i.product_id ?? i.id)))
  const seen = new Set()
  const products = []

  for (const bundle of bundles) {
    for (const p of bundle.products) {
      if (cartIds.has(p.product_id)) continue
      if (seen.has(p.product_id)) continue

      seen.add(p.product_id)
      products.push(p)
    }
  }

  return products
}


export function Cart() {
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart()
  const navigate = useNavigate()

  const [recommendedBundles, setRecommendedBundles] = useState([])
  const [loading, setLoading] = useState(false)

  // 🔥 FETCH RECOMMENDATIONS WHEN CART CHANGES
  useEffect(() => {
    if (cart.length === 0) {
      setRecommendedBundles([])
      return
    }

    const fetchRecommendations = async () => {
      try {
        setLoading(true)

        // ✅ SOURCE OF TRUTH: cart product IDs
        const cartProductIds = cart.map(item =>
          Number(item.product_id ?? item.id)
        )

        const res = await fetch(
          `${API_BASE}/bundles/recommend`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart_product_ids: cartProductIds,
              limit: 6
            })
          }
        )

        if (!res.ok) {
          throw new Error(`Failed: ${res.status}`)
        }

        const data = await res.json()
        // setRecommendedBundles(Array.isArray(data) ? data : [])
        const flattened = flattenBundlesToProducts(data, cart)
        setRecommendedBundles(flattened)


      } catch (err) {
        console.error('Recommendation error:', err)
        setRecommendedBundles([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [cart])

  const handleAddRecommended = (product) => {
    console.log('Adding recommended product:', product)
    const productToAdd = {
      id: product.product_id,
      name: product.name,
      price: product.price ?? 0,
      image_url: product.image_url,
      quantity: 1,
      department: product.department ?? 'recommended'
    }
    console.log('Transformed product:', productToAdd)
    addToCart(productToAdd)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <Card key={item.id}>
              <CardContent className="p-6 flex gap-6">
                <img
                  src={item.image_url}
                  className="w-24 h-24 rounded object-cover"
                  alt={item.name}
                />

                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>

                  <div className="flex gap-2 mt-3 items-center">
                    <Button
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus />
                    </Button>

                    <span className="px-2 font-semibold">
                      {item.quantity}
                    </span>

                    <Button
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    className="mt-3 text-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="mr-2" /> Remove
                  </Button>
                </div>

                <div className="font-bold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* 🔥 RECOMMENDATIONS */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">
               Recommended for you
            </h2>

            {loading && <p>Loading recommendations...</p>}

            {!loading && recommendedBundles.length === 0 && (
              <p className="text-gray-500">
                No recommendations yet.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedBundles.map(product => (
                <Card key={product.product_id}>
                  <CardContent className="p-4 flex gap-4 items-center">
                    
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-16 h-16 rounded object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleAddRecommended(product)}
                    >
                      Add
                    </Button>

                  </CardContent>
                </Card>
              ))}

            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <Card className="sticky top-24 h-fit">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">
              Total: ${cartTotal.toFixed(2)}
            </h2>

            <Button
              className="w-full"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
