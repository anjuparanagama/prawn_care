export default function Sign() {
    return (
        <div class="h-screen flex items-center justify-center p-4">
            <div class="flex w-full max-w-6xl bg-white">
                <div class="form-container w-1/2 p-12 pt-16 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Create an Account</h1>
                    
                    <form id="registrationForm" class="space-y-6">
                        <div class="space-y-1">
                            <label for="serviceId" class="block text-sm pb-2 font-medium text-gray-700">Service ID</label>
                            <input 
                                type="text" 
                                id="serviceId" 
                                placeholder="Enter your service ID" 
                                class="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <div class="space-y-1">
                            <label for="email" class="block text-sm pb-2 font-medium text-gray-700">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="your@email.com" 
                                class="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <div class="space-y-1">
                            <label for="password" class="block text-sm pb-2 font-medium text-gray-700">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="••••••••" 
                                class="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <div class="space-y-1">
                            <label for="confirmPassword" class="block text-sm pb-2 font-medium text-gray-700">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                placeholder="••••••••" 
                                class="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <div class="space-y-1">
                            <label for="phone" class="block text-sm font-medium pb-2 text-gray-700">Phone Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                placeholder="+94 7X XXX XXXX" 
                                class="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            class="w-3/4 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Register
                        </button>
                        
                        <div class="text-left text-sm text-gray-600">
                            <p>Already have an account? <a href="/Login" class="text-indigo-600 hover:text-indigo-500">Sign in</a></p>
                        </div>
                    </form>
                </div>
                
                <div class="illustration-container w-1/2 flex items-center justify-center">
                    <img 
                        src="/images/log.png" 
                        alt="Signup illustration" 
                        class="w-full h-auto object-contain rounded-lg"
                    />
                </div>
            </div>
        </div>      
    );
}