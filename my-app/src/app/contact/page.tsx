"use client";
import React, { useState } from 'react';
import { Send, Phone, Mail, User, MessageSquare, BookOpen } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar Info */}
        <div className="bg-indigo-600 md:w-1/3 p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
            <p className="text-indigo-100 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-indigo-300" />
                <span>+91 9515245408</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-indigo-300" />
                <span>ankit@example.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="md:w-2/3 p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-sm font-semibold text-gray-600">Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  required
                  type="text"
                  placeholder="Ankit Tiwari"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  required
                  type="email"
                  placeholder="ankit@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Phone</label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="tel"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Subject</label>
              <div className="relative mt-1">
                <BookOpen className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Message</label>
            <div className="relative mt-1">
              <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea 
                required
                rows={4}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
          </div>

          <button 
            disabled={status === 'loading'}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : (
              <>Send Message <Send size={18} /></>
            )}
          </button>

          {status === 'success' && <p className="text-green-600 text-center font-medium">Message sent successfully!</p>}
          {status === 'error' && <p className="text-red-600 text-center font-medium">Something went wrong. Try again.</p>}
        </form>
      </div>
    </div>
  );
}