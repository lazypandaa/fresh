import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-bold">FreshMart</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your one-stop shop for fresh groceries and daily essentials. Quality products delivered to your doorstep.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="/products" className="hover:text-black transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-black transition-colors">Categories</Link></li>
              <li><Link to="/deals" className="hover:text-black transition-colors">Deals & Offers</Link></li>
              <li><Link to="/new" className="hover:text-black transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-black transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-black transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-black transition-colors">Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-black transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">&copy; 2024 FreshMart. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>Made with ❤️ for fresh food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
