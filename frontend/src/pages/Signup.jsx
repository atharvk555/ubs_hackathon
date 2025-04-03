import React, { useState } from 'react';
import { Book, Mail, Lock, UserCheck } from 'lucide-react';
import { Link, useNavigate} from 'react-router-dom';


export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate=useNavigate()
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res=await axios.post(`${Backend_url}/api/user/signup`,{email,password,role})
        if(res){
          localStorage.setItem('token',res.data.token)
        }
        navigate('/login')
      }catch(e){
        console.log(e);
      }
      console.log('Signup attempt with:', { email, password, role });
    };
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
          <div className="flex items-center justify-center mb-6">
            <Book className="h-10 w-10 text-blue-600" />
            <span className="ml-2 text-3xl font-bold text-blue-800">BooKs4All</span>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create your account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCheck className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  name="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="donor">Donor</option>
                  <option value="school">School</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 py-3 px-4 rounded-md text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Create account
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };