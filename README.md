<!DOCTYPE html>
<html>
<head>
E-commerce Backend API Documentation
</head>
<body>

<h1>E-commerce Backend API Documentation</h1>

<h2>Prerequisites</h2>
<ul>
  <li>Node.js v14.17.6</li>
  <li>MongoDB</li>
  <li>Run <code>npm run dev</code> in both the backend and frontend directories after installation.</li>
</ul>

<h2>Endpoints</h2>

<h3>User Authentication</h3>

<h4>Register a New User</h4>
<p><strong>POST</strong> <code>/auth/register</code></p>
<p><strong>Request:</strong>
<pre>
{
  "email": string,
  "password": string,
  "username": string
}
</pre></p>
<p><strong>Response:</strong> Created user data</p>

<h4>Verify User Account</h4>
<p><strong>POST</strong> <code>/auth/verify</code></p>
<p><strong>Request:</strong>
<pre>
{
  "email": string,
  "username": string,
  "code": string
}
</pre></p>
<p><strong>Response:</strong> Verification status</p>

<h4>User Login</h4>
<p><strong>POST</strong> <code>/auth/login</code></p>
<p><strong>Request:</strong>
<pre>
{
  "password": string,
  "username": string
}
</pre></p>
<p><strong>Response:</strong> Access token</p>

<h3>Products</h3>

<h4>Get All Products</h4>
<p><strong>GET</strong> <code>/products</code></p>
<p><strong>Response:</strong> Array of all products</p>

<h3>Cart Management (Protected Routes)</h3>

<h4>Get User Cart</h4>
<p><strong>GET</strong> <code>/cart</code></p>
<p><strong>Request:</strong> Bearer token required</p>
<p><strong>Response:</strong>
<pre>
{
  "products": [
    {
      "id": string,
      "quantity": number
    }
  ]
}
</pre></p>

<h4>Update Cart</h4>
<p><strong>POST</strong> <code>/cart/update</code></p>
<p><strong>Request:</strong>
<pre>
{
  "products": [
    {
      "id": string,
      "quantity": number
    }
  ]
}
</pre></p>
<p><strong>Response:</strong> Cart updated status</p>

<h4>Generate Coupon</h4>
<p><strong>POST</strong> <code>/cart/generateCoupon</code></p>
<p><strong>Response:</strong>
<pre>
{
  "name": string // Coupon name
}
</pre></p>

<h4>Checkout</h4>
<p><strong>POST</strong> <code>/cart/checkout</code></p>
<p>Business logic executed in the backend</p>

<h4>Apply Coupon</h4>
<p><strong>POST</strong> <code>/cart/applycoupon</code></p>
<p><strong>Request:</strong>
<pre>
{
  "coupon": string // Coupon name
}
</pre></p>

<p>Please note that the code structure and some types may not be optimal due to time constraints. Ensure you provide the required input data for each API endpoint as specified in the requests. Protected routes require a bearer token for access.</p>



</body>
</html>
