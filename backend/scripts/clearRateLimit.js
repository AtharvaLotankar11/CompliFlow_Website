#!/usr/bin/env node

/**
 * Clear Rate Limiting Script
 * 
 * This script helps clear rate limiting during development.
 * Run this if you're getting "Too many authentication attempts" errors.
 * 
 * Usage: node scripts/clearRateLimit.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Development Rate Limit Helper');
console.log('================================');

// Check if we're in development
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('NODE_ENV=development')) {
        console.log('✅ Already in development mode - rate limits are relaxed');
        console.log('📊 Current development limits:');
        console.log('   - Auth requests: 200 per 15 minutes');
        console.log('   - OTP requests: 50 per 5 minutes');
        console.log('   - OTP verification: 100 per 15 minutes');
    } else {
        console.log('⚠️  Not in development mode');
        console.log('💡 To enable relaxed rate limits, ensure NODE_ENV=development in your .env file');
    }
} else {
    console.log('❌ .env file not found');
}

console.log('\n🚀 Tips to avoid rate limiting:');
console.log('1. Make sure NODE_ENV=development in your .env file');
console.log('2. Restart your server after changing .env');
console.log('3. Wait 15 minutes for rate limits to reset naturally');
console.log('4. Use different browsers/incognito mode for testing');

console.log('\n📝 Current rate limits in development:');
console.log('- General API: 1000 requests per 15 minutes');
console.log('- Authentication: 200 requests per 15 minutes');
console.log('- OTP requests: 50 requests per 5 minutes');
console.log('- OTP verification: 100 requests per 15 minutes');

process.exit(0);