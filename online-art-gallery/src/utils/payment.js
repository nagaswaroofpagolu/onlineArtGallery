/**
 * Razorpay Payment Integration Utility
 * Handles payment order creation, checkout, and verification
 */

import { isLoggedIn } from './auth.js';

// Backend API base URL
const BACKEND_URL = 'http://localhost:8082';

/**
 * Load Razorpay checkout script dynamically
 */
export function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      return resolve(true);
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Razorpay SDK failed to load. Please check your internet connection.'));
    document.body.appendChild(script);
  });
}

/**
 * Create a payment order on the backend
 * @param {number} amount - Amount in rupees (e.g., 2500)
 * @returns {Promise<Object>} Order details { id, amount, currency, key }
 */
async function createOrderOnServer(amount) {
  // 🔐 Security Check: Ensure user is logged in
  if (!isLoggedIn()) {
    alert('You must login before making a purchase.');
    window.location.href = '/login';
    throw new Error('Authentication required. Please login to continue.');
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ amount: Number(amount) })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Could not create order. Please try again.');
    }

    const orderData = await response.json();
    console.log('✅ Order created:', orderData);
    return orderData;
  } catch (error) {
    console.error('❌ Order creation error:', error);
    throw error;
  }
}

/**
 * Verify payment signature on the backend
 * @param {Object} payload - Payment response from Razorpay
 * @returns {Promise<Object>} Verification result
 */
async function verifyPaymentOnServer(payload) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/payments/verify`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Payment verification failed');
    }

    const verificationData = await response.json();
    console.log('✅ Payment verified:', verificationData);
    return verificationData;
  } catch (error) {
    console.error('❌ Verification error:', error);
    throw error;
  }
}

/**
 * Main function to handle artwork purchase with Razorpay
 * @param {Object} options - Purchase options
 * @param {Object} options.art - Artwork details { id, title, description, price, image, artist }
 * @param {Object} options.user - User details { name, email }
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 */
export async function buyArtwork({ art, user, onSuccess, onError }) {
  try {
    // 🔐 Security Check: Ensure user is logged in before starting payment
    if (!isLoggedIn()) {
      alert('Please login to continue your purchase.');
      window.location.href = '/login';
      throw new Error('Authentication required. Please login to purchase artwork.');
    }

    // Step 1: Load Razorpay script
    console.log('📦 Loading Razorpay SDK...');
    await loadRazorpayScript();

    // Step 2: Create order on backend
    console.log('🔨 Creating order for ₹' + art.price);
    const order = await createOrderOnServer(Number(art.price));

    // Step 3: Open Razorpay Checkout
    console.log('💳 Opening Razorpay checkout...');
    const options = {
      key: order.key, // Razorpay key from backend
      amount: order.amount, // Amount in paise
      currency: order.currency, // INR
      name: 'Online Art Gallery',
      description: `Purchase: ${art.title}`,
      image: art.image || 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200',
      order_id: order.orderId || order.id, // Support both field names
      prefill: {
        name: user?.name || 'Guest User',
        email: user?.email || 'guest@example.com'
      },
      theme: {
        color: '#FBBF24'
      },
      handler: async function (response) {
        // Step 4: Payment successful, verify on backend
        console.log('✅ Payment completed, verifying...');
        try {
          const verification = await verifyPaymentOnServer({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verification.verified === true || verification.success === true) {
            console.log('✅ Payment verification successful!');
            onSuccess && onSuccess({ 
              response, 
              verification,
              artwork: art 
            });
          } else {
            throw new Error('Payment verification failed. Please contact support.');
          }
        } catch (err) {
          console.error('❌ Verification failed:', err);
          onError && onError(err);
        }
      },
      modal: {
        ondismiss: function() {
          console.log('ℹ️ Payment popup closed by user');
          onError && onError(new Error('Payment cancelled by user'));
        }
      }
    };

    const razorpayCheckout = new window.Razorpay(options);
    razorpayCheckout.open();

  } catch (err) {
    console.error('❌ Purchase error:', err);
    onError && onError(err);
  }
}

export default buyArtwork;
