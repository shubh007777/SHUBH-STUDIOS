import React, { useState } from 'react';
import { Lock, CheckCircle2, ShieldCheck, Mail, AlertCircle } from 'lucide-react';
import { changePassword } from '../../lib/api';

export const AdminSettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8" id="admin-settings-container">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Admin Account Settings</h1>
        <p className="text-neutral-400 text-xs font-mono mt-1">
          Authorized account management for Shubh Portfolio
        </p>
      </div>

      {/* Account Info Box */}
      <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 space-y-4">
        <h2 className="text-sm font-mono tracking-wider uppercase text-amber-400 font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Account Credentials
        </h2>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
          <div>
            <span className="block text-neutral-400 font-mono text-[10px] uppercase">Authorized Email</span>
            <span className="block font-bold text-white text-sm mt-0.5">kumarshubh8750@gmail.com</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase">
            Active Admin
          </span>
        </div>
      </div>

      {/* Password Update Form */}
      <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 space-y-6">
        <h2 className="text-sm font-mono tracking-wider uppercase text-amber-400 font-bold flex items-center gap-2">
          <Lock className="w-4 h-4" /> Change Password
        </h2>

        {message && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4" id="settings-password-form">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Update Admin Password'}
          </button>
        </form>
      </div>
    </div>
  );
};
