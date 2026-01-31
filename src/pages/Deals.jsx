import { useState, useEffect } from 'react'
import { Package, TrendingUp, Users, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { API_BASE } from '../config/api'

const MOCK_BUNDLES = [
  {
    id: "mock1",
    bundle_id: 101,
    bundle_rank: 1,
    support: 0.15,
    confidence: 0.85,
    lift: 2.5,
    products: [
      { product_id: 1011, name: "Organic Bananas", image_url: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=100&h=100&fit=crop" },
      { product_id: 1012, name: "Whole Milk", image_url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&h=100&fit=crop" }
    ]
  },
  {
    id: "mock2",
    bundle_id: 102,
    bundle_rank: 2,
    support: 0.12,
    confidence: 0.78,
    lift: 2.1,
    products: [
      { product_id: 1021, name: "Whole Wheat Bread", image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop" },
      { product_id: 1022, name: "Free Range Eggs", image_url: "https://images.unsplash.com/photo-1518492104633-130d32229471?w=100&h=100&fit=crop" },
      { product_id: 1023, name: "Salted Butter", image_url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=100&h=100&fit=crop" }
    ]
  },
  {
    id: "mock3",
    bundle_id: 103,
    bundle_rank: 3,
    support: 0.10,
    confidence: 0.75,
    lift: 1.9,
    products: [
      { product_id: 1031, name: "Italian Pasta", image_url: "https://images.unsplash.com/photo-1551462147-37885acc36f1?w=100&h=100&fit=crop" },
      { product_id: 1032, name: "Tomato Basil Sauce", image_url: "https://images.unsplash.com/photo-1528751014936-320d93c049d5?w=100&h=100&fit=crop" },
      { product_id: 1033, name: "Parmesan Cheese", image_url: "https://images.unsplash.com/photo-1618413996963-8120d91244e6?w=100&h=100&fit=crop" }
    ]
  },
  {
    id: "mock4",
    bundle_id: 104,
    bundle_rank: 4,
    support: 0.08,
    confidence: 0.72,
    lift: 1.8,
    products: [
      { product_id: 1041, name: "Ground Coffee", image_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop" },
      { product_id: 1042, name: "Almond Milk", image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop" }
    ]
  },
  {
    id: "mock5",
    bundle_id: 105,
    bundle_rank: 5,
    support: 0.07,
    confidence: 0.68,
    lift: 1.7,
    products: [
      { product_id: 1051, name: "Tortilla Chips", image_url: "https://images.unsplash.com/photo-1632766343585-78c641885b54?w=100&h=100&fit=crop" },
      { product_id: 1052, name: "Fresh Salsa", image_url: "https://images.unsplash.com/photo-1574823296180-2a0be964cb77?w=100&h=100&fit=crop" },
      { product_id: 1053, name: "Guacamole", image_url: "https://images.unsplash.com/photo-1600189020845-728b9d034449?w=100&h=100&fit=crop" }
    ]
  },
  {
    id: "mock6",
    bundle_id: 106,
    bundle_rank: 6,
    support: 0.06,
    confidence: 0.65,
    lift: 1.6,
    products: [
      { product_id: 1061, name: "Green Salad Mix", image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&h=100&fit=crop" },
      { product_id: 1062, name: "Cherry Tomatoes", image_url: "https://images.unsplash.com/photo-1596561230491-1cb3f9e9cf27?w=100&h=100&fit=crop" },
      { product_id: 1063, name: "Balsamic Dressing", image_url: "https://images.unsplash.com/photo-1611119777995-1f9e236371a5?w=100&h=100&fit=crop" }
    ]
  }
]

export function Deals() {
  const [bundles, setBundles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const bundlesPerPage = 12

  useEffect(() => {
    fetchBundles()
  }, []) // Only fetch once on mount

  const fetchBundles = async () => {
    try {
      const response = await fetch(`${API_BASE}/bundles`)
      
      let data = []
      if (response.ok) {
        data = await response.json()
      }
      
      // Use mock data if API returns empty or fails
      if (!Array.isArray(data) || data.length === 0) {
        console.log('Using mock bundles data')
        setBundles(MOCK_BUNDLES)
      } else {
        setBundles(data)
      }
    } catch (err) {
      console.warn('Failed to fetch bundles, using mock data:', err)
      setBundles(MOCK_BUNDLES)
    } finally {
      setLoading(false)
    }
  }

  // Client-side pagination logic
  const totalContents = bundles.length
  const totalPages = Math.max(1, Math.ceil(totalContents / bundlesPerPage))
  
  const indexOfLastBundle = currentPage * bundlesPerPage
  const indexOfFirstBundle = indexOfLastBundle - bundlesPerPage
  const currentBundles = bundles.slice(indexOfFirstBundle, indexOfLastBundle)

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading deals...</div>
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Special Deals & Bundles</h1>
        <p className="text-gray-600 text-lg">Discover our top product combinations based on customer preferences</p>
        <p className="text-sm text-gray-500 mt-2">Showing page {currentPage} of {totalPages}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentBundles.map((bundle) => (
          <div key={bundle.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Bundle #{bundle.bundle_id}</span>
              </div>
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                Rank #{bundle.bundle_rank}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-gray-600 text-sm font-medium">Products in this bundle:</span>
                <div className="mt-2 space-y-2">
                  {bundle.products.map((product) => (
                    <div key={product.product_id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                        onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=40&h=40&fit=crop'}
                      />
                      <span className="text-sm font-medium">{product.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-xs text-gray-500">Support</div>
                  <div className="font-semibold text-green-600">{(bundle.support * 100).toFixed(2)}%</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-500">Confidence</div>
                  <div className="font-semibold text-blue-600">{(bundle.confidence * 100).toFixed(1)}%</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-xs text-gray-500">Lift</div>
                  <div className="font-semibold text-orange-600">{bundle.lift.toFixed(1)}x</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}