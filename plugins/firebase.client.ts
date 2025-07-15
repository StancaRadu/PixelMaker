import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "pixelmaker-hakuo.firebaseapp.com",
    projectId: "pixelmaker-hakuo",
    storageBucket: "pixelmaker-hakuo.firebasestorage.app",
    messagingSenderId: "744613965812",
    appId: "1:744613965812:web:2f6d2345fcfb22658853a1",
    measurementId: "G-CL8B7SHEWB"
  }

  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)

  return {
    provide: {
      firebase: app,
      analytics,
    }
  }
})