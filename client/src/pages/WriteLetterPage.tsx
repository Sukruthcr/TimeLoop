import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import axios from 'axios';

interface LetterFormData {
  subject: string;
  message: string;
  deliveryDate: string;
  isPublic: boolean;
  email: string;
}

interface Notification {
  type: 'success' | 'error';
  message: string;
}

const validationSchema = Yup.object({
  subject: Yup.string()
    .required('Subject is required')
    .max(100, 'Subject must be 100 characters or less'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
  deliveryDate: Yup.date()
    .required('Delivery date is required')
    .min(new Date(), 'Delivery date must be in the future'),
  isPublic: Yup.boolean(),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
});

const deliveryOptions = [
  { value: '6months', label: '6 months' },
  { value: '1year', label: '1 year' },
  { value: '3years', label: '3 years' },
  { value: '5years', label: '5 years' },
  { value: '10years', label: '10 years' },
];

export default function WriteLetterPage() {
  const { user, token } = useAuth();
  const [notification, setNotification] = useState<Notification | null>(null);

  const formik = useFormik<LetterFormData>({
    initialValues: {
      subject: '',
      message: '',
      deliveryDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isPublic: false,
      email: user?.email || ''
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!token) {
        setNotification({
          type: 'error',
          message: 'Please sign in to send a letter.'
        });
        return;
      }

      try {
        await axios.post('/api/letters', values, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setNotification({
          type: 'success',
          message: '✨ Your letter has been sent to the future! You will receive it on the specified date.'
        });
        formik.resetForm();
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } catch (error: any) {
        console.error('Failed to submit letter:', error);
        setNotification({
          type: 'error',
          message: error.response?.data?.error || 'Failed to send letter. Please try again.'
        });
      }
    }
  });

  const calculateDeliveryDate = (option: string) => {
    const date = new Date();
    switch (option) {
      case '6months':
        date.setMonth(date.getMonth() + 6);
        break;
      case '1year':
        date.setFullYear(date.getFullYear() + 1);
        break;
      case '3years':
        date.setFullYear(date.getFullYear() + 3);
        break;
      case '5years':
        date.setFullYear(date.getFullYear() + 5);
        break;
      case '10years':
        date.setFullYear(date.getFullYear() + 10);
        break;
    }
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {notification && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md animate-fade-in ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          Write to Your Future Self
        </h1>
        <p className="text-xl text-black/80">
          Send your thoughts, dreams, and aspirations through time ✨
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <div>
                <input
                  id="subject"
                  type="text"
                  {...formik.getFieldProps('subject')}
                  placeholder="Dear Future Me..."
                  className="w-full text-2xl font-semibold bg-transparent border-0 border-b-2 border-black/20 text-black placeholder-black/60 focus:ring-0 focus:border-black"
                />
                {formik.touched.subject && formik.errors.subject && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.subject}</div>
                )}
              </div>

              <div>
                <textarea
                  id="message"
                  {...formik.getFieldProps('message')}
                  rows={12}
                  placeholder="Start writing your letter..."
                  className="w-full bg-transparent border-0 text-lg text-black placeholder-black/60 focus:ring-0 resize-none"
                />
                {formik.touched.message && formik.errors.message && (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.message}</div>
                )}
              </div>
            </div>

            <div className="md:w-72 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-black mb-3">Delivery Details</h3>
                <div className="mb-4">
                  <label className="block text-sm text-black/80 mb-1">Email to receive the letter:</label>
                  <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 bg-black/10 border border-black/20 rounded-lg text-black focus:ring-black focus:border-black"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-black mb-3">When should we deliver it?</h3>
                <div className="space-y-2">
                  {deliveryOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => formik.setFieldValue('deliveryDate', calculateDeliveryDate(option.value))}
                      className="w-full py-2 px-4 rounded-lg text-center transition-all bg-black/10 hover:bg-black/20 text-black"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block text-sm text-black/80 mb-1">Or choose a specific date:</label>
                  <input
                    id="deliveryDate"
                    type="date"
                    {...formik.getFieldProps('deliveryDate')}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 bg-black/10 border border-black/20 rounded-lg text-black focus:ring-black focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    id="isPublic"
                    type="checkbox"
                    {...formik.getFieldProps('isPublic')}
                    className="w-4 h-4 text-black focus:ring-black rounded border-black/30"
                  />
                  <span className="text-sm text-black">Make this letter public</span>
                </label>
                <p className="mt-1 text-xs text-black/70">
                  Public letters can be read by other users for inspiration
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black/90 transition-colors"
              >
                Send to the Future
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 