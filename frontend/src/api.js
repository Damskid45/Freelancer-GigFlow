const API = "http://localhost:4000";
export async function request(path, init = {}) { const response = await fetch(`${API}${path}`, { ...init, headers: { "Content-Type": "application/json", ...(init.headers || {}) } }); if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error?.message || `Request failed with ${response.status}`);
} return response.json(); }
export async function searchGigs(query) { return request(`/gigs?search=${encodeURIComponent(query)}`); }
export async function apiSendMessage(chatId, body) {
  return request(`/api/messages/${encodeURIComponent(chatId)}`, {
    method: 'POST',
    body: JSON.stringify({ body })
  });
}

export async function authRegister(payload){return request('/api/auth/register',{method:'POST',body:JSON.stringify(payload)});}
export async function authLogin(payload){return request('/api/auth/login',{method:'POST',body:JSON.stringify(payload)});}
export async function authForgotPassword(email){return request('/api/auth/forgot-password',{method:'POST',body:JSON.stringify({email})});}
export async function authResetPassword(token,password){return request('/api/auth/reset-password',{method:'POST',body:JSON.stringify({token,password})});}
export async function getMe(){return request('/api/me',{headers:{Authorization:`Bearer ${localStorage.getItem('gigflow_token')||''}`}});}
export async function updateMe(payload){return request('/api/me',{method:'PATCH',headers:{Authorization:`Bearer ${localStorage.getItem('gigflow_token')||''}`},body:JSON.stringify(payload)});}
export async function submitIdVerification(payload){return request('/api/me/id-verification',{method:'POST',headers:{Authorization:`Bearer ${localStorage.getItem('gigflow_token')||''}`},body:JSON.stringify(payload)});}
export async function getPaymentMethods(){return request('/api/me/payment-methods',{headers:{Authorization:`Bearer ${localStorage.getItem('gigflow_token')||''}`}});}
export async function addPaymentMethod(payload){return request('/api/me/payment-methods',{method:'POST',headers:{Authorization:`Bearer ${localStorage.getItem('gigflow_token')||''}`},body:JSON.stringify(payload)});}
export async function deletePaymentMethod(id){return request(`/api/me/payment-methods/${encodeURIComponent(id)}`,{method:'DELETE',headers:{Authorization:`Bearer ${localStorage.getItem('gigflow_token')||''}`}});}
export async function googleLogin(credential){return request('/api/auth/google',{method:'POST',body:JSON.stringify({credential})});}

export async function apiCreateOrder(gigId){return request('/api/orders',{method:'POST',headers:{Authorization:`Bearer ${localStorage.getItem('gigflow_token')||''}`},body:JSON.stringify({gigId})});}
