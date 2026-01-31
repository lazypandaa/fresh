import { API_BASE } from '../config/api.js'

// Disable tracking if experiencing issues (set to false to enable)
const DISABLE_TRACKING = true

class EventTracker {
  constructor() {
    // this.sessionId = this.generateSessionId()
    this.sessionId = localStorage.getItem("session_id") 
     || this.generateSessionId()
    localStorage.setItem('session_id', this.sessionId)
    this.cartState = { items: 0, value: 0 }
    this.updateUserId()
    // Don't init session immediately - wait for user state to be determined
    if (!DISABLE_TRACKING) {
      setTimeout(() => this.initSession(), 100)
    }
  }

  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  updateUserId() {
    // First check for logged-in user email
    const userEmail = localStorage.getItem('user_email')
    console.log('Checking user_email from localStorage:', userEmail)
    
    if (userEmail && userEmail !== 'null' && userEmail !== '') {
      this.userId = userEmail
      console.log('Set userId to logged-in email:', this.userId)
      return
    }
    
    // Then check for guest user
    const guestUser = JSON.parse(localStorage.getItem('guestUser') || 'null')
    console.log('Checking guestUser from localStorage:', guestUser)
    
    if (guestUser && guestUser.guest_id) {
      this.userId = guestUser.guest_id
      console.log('Set userId to guest:', this.userId)
      return
    }
    
    if (guestUser && guestUser.email) {
      this.userId = guestUser.email.split('@')[0]
      console.log('Set userId to guest email prefix:', this.userId)
      return
    }
    
    // Default to anonymous
    this.userId = 'anonymous_' + this.sessionId
    console.log('Set userId to anonymous:', this.userId)
  }

  getUserId() {
    this.updateUserId() // Always get fresh user ID
    return this.userId
  }

  async initSession() {
    if (DISABLE_TRACKING) return
    
    try {
      const userId = this.getUserId()
      const isLoggedIn = !userId.startsWith('anonymous_')
      const finalUserId = isLoggedIn ? userId : null
      
      console.log('Session init - userId:', userId, 'isLoggedIn:', isLoggedIn, 'sending:', finalUserId)
      
      // Use the working events endpoint
      const response = await fetch(`${API_BASE}/events/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: finalUserId,
          session_id: this.sessionId,
          event_type: 'session_start',
          product_id: null,
          data: {
            user_agent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            user_type: isLoggedIn ? 'logged_in' : 'anonymous'
          }
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error')
        console.warn(`Session init failed (${response.status}):`, errorText)
        return
      }
      
      console.log(`Session started: ${this.sessionId} for user: ${userId} (${isLoggedIn ? 'logged in' : 'anonymous'})`)
    } catch (error) {
      console.warn('Session init error (non-critical):', error.message)
    }
  }

  async trackSession(action, data = {}) {
    if (DISABLE_TRACKING) return
    
    try {
      const userId = this.getUserId()
      const isLoggedIn = !userId.startsWith('anonymous_')
      const finalUserId = isLoggedIn ? userId : null
      
      console.log(`Tracking session via events: ${action} for user: ${userId} (sending: ${finalUserId})`)
      
      // Use the working events endpoint instead
      const response = await fetch(`${API_BASE}/events/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: finalUserId,
          session_id: this.sessionId,
          event_type: `session_${action}`,
          product_id: null,
          data: {
            url: window.location.href,
            timestamp: new Date().toISOString(),
            user_type: isLoggedIn ? 'logged_in' : 'anonymous',
            ...data
          }
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      console.log('Session tracked successfully via events:', action)
    } catch (error) {
      console.warn('Session tracking failed (non-critical):', error.message)
    }
  }

  updateCartState() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    this.cartState.items = cart.reduce((total, item) => total + item.quantity, 0)
    if (DISABLE_TRACKING) return
    
    this.cartState.value = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  async trackEvent(eventType, productId = null, data = {}) {
    try {
      const userId = this.getUserId()
      // Don't send anonymous users as user_id, send null instead
      const finalUserId = userId.startsWith('anonymous_') ? null : userId
      console.log(`Tracking event: ${eventType} for user: ${userId} (sending: ${finalUserId})`)
      
      const response = await fetch(`${API_BASE}/events/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: finalUserId,
          session_id: this.sessionId,
          event_type: eventType,
          product_id: productId,
          data: data
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.warn(`Event tracking failed (${response.status}):`, errorText)
      }
    } catch (error) {
      console.warn('Event tracking error (non-critical):', error.message)
    if (DISABLE_TRACKING) return
    
    }
  }

  async trackCartEvent(action, productId, quantity = 1) {
    try {
      this.updateCartState()
      const userId = this.getUserId()
      // Don't send anonymous users as user_id, send null instead
      const finalUserId = userId.startsWith('anonymous_') ? null : userId
      console.log(`Tracking cart event: ${action} for user: ${userId} (sending: ${finalUserId})`)
      
      const response = await fetch(`${API_BASE}/events/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: finalUserId,
          session_id: this.sessionId,
          action: action,
          product_id: productId,
          quantity: quantity,
          cart_total_items: this.cartState.items,
          cart_total_value: this.cartState.value
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.warn(`Cart tracking failed (${response.status}):`, errorText)
      }
    } catch (error) {
      console.warn('Cart tracking error (non-critical):', error.message)
    }
  }

  // Event methods
  trackProductView(productId, productData = {}) {
    if (DISABLE_TRACKING) return
    this.trackEvent('product_view', productId, productData)
  }

  trackSearch(query) {
    if (DISABLE_TRACKING) return
    this.trackEvent('search', null, { search_query: query })
  }

  trackCartAdd(productId, productData = {}) {
    if (DISABLE_TRACKING) return
    this.trackCartEvent('add', productId, 1)
    this.trackEvent('cart_add', productId, productData)
  }

  trackCartRemove(productId) {
    if (DISABLE_TRACKING) return
    this.trackCartEvent('remove', productId, 1)
    this.trackEvent('cart_remove', productId)
  }

  trackPurchase(orderData) {
    if (DISABLE_TRACKING) return
    this.trackEvent('purchase', null, orderData)
    this.trackSession('purchase', orderData)
  }

  trackPageView(page) {
    if (DISABLE_TRACKING) return
    this.trackSession('page_view', { page })
  }
  

  endSession() {
    if (DISABLE_TRACKING) return
    this.trackSession('end')
  }
}

export const tracker = new EventTracker()

// Track page unload
window.addEventListener('beforeunload', () => {
  tracker.endSession()
})