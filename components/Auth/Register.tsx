
import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { storageService } from '../../services/storage';

interface RegisterProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
  onBackToLanding?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess, onSwitchToLogin, onBackToLanding }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    pinCode: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    else if (!formData.email.endsWith('@gmail.com')) newErrors.email = 'Use Gmail';

    if (!formData.address) newErrors.address = 'Required';
    if (!formData.pinCode) newErrors.pinCode = 'Required';
    else if (!/^\d{6}$/.test(formData.pinCode)) newErrors.pinCode = 'Must be 6 digits';

    if (formData.password.length < 6) newErrors.password = 'Too short (min 6)';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mismatch';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (validate()) {
      setIsSubmitting(true);
      try {
        const users = await storageService.getUsers();
        if (users.find(u => u.email === formData.email)) {
          setErrors({ email: 'Identity already registered' });
          setIsSubmitting(false);
          return;
        }

        const { confirmPassword, ...dataToSave } = formData;
        await storageService.registerUser(dataToSave);
        onSuccess();
      } catch (err: any) {
        setApiError(err.message || 'An unexpected error occurred during registration.');
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => {
        const n = { ...prev };
        delete n[e.target.name];
        return n;
      });
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto animate-slide-up px-4">
      <div className="glass-panel rounded-[3.5rem] p-8 lg:p-16 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <button
            onClick={onBackToLanding}
            className="absolute -top-8 left-0 text-slate-500 hover:text-indigo-400 font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-2 transition-all group lg:-left-8"
          >
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            Back to Home
          </button>

          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white tracking-tighter mb-4 text-glow">Join the Network</h2>
            <p className="text-slate-300 text-lg font-bold uppercase tracking-widest opacity-80">Safe • Verified • Hyper-Local</p>
          </div>

          {apiError && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-sm font-bold flex items-center gap-3">
              <i className="fas fa-exclamation-triangle"></i>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Profile Side */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Personal Profile</h3>
                </div>
                <Input
                  label="Full Legal Name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  icon="fa-signature"
                  required
                />
                <Input
                  label="Gmail Address"
                  name="email"
                  type="email"
                  placeholder="john@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon="fa-at"
                  required
                />
                <Input
                  label="Phone (Optional)"
                  name="phone"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  icon="fa-phone"
                />
              </div>

              {/* Security/Location Side */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <i className="fas fa-map-marked-alt"></i>
                  </div>
                  <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Residency Info</h3>
                </div>
                <Input
                  label="Verified PIN Code"
                  name="pinCode"
                  placeholder="000000"
                  value={formData.pinCode}
                  onChange={handleChange}
                  error={errors.pinCode}
                  icon="fa-location-crosshairs"
                  maxLength={6}
                  required
                />
                <Input
                  label="Home Address"
                  name="address"
                  placeholder="Street No, Building, Unit"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  icon="fa-map-pin"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Passkey"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    icon="fa-key"
                    required
                  />
                  <Input
                    label="Repeat"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    icon="fa-check-double"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5">
              <Button
                type="submit"
                fullWidth
                size="lg"
                variant="secondary"
                className="h-20 rounded-3xl font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-[1.01] active:scale-[0.98]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <i className="fas fa-circle-notch animate-spin text-xl"></i>
                    <span>Processing Identity...</span>
                  </div>
                ) : (
                  "Submit Application for Review"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="font-black text-indigo-400 hover:text-white transition-all ml-1 underline underline-offset-4"
              >
                Sign In Instead
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
