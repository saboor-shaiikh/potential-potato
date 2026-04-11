import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Using EmailJS standard environment setup correctly mapped
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        <div className="contact-header">
          <h2 className="contact-heading">Hire Now</h2>
          <p className="contact-tagline">"lets build something, that shouldn't exist yet"</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <input 
              type="text" 
              name="user_name" 
              className="contact-input" 
              placeholder="Your Name" 
              required 
            />
          </div>
          
          <div className="input-group">
            <input 
              type="email" 
              name="user_email" 
              className="contact-input" 
              placeholder="Your Email" 
              required 
            />
          </div>
          
          <div className="input-group">
            <textarea 
              name="message" 
              className="contact-textarea" 
              placeholder="Your Message..." 
              required 
            ></textarea>
          </div>

          <div className="contact-actions">
            <button type="submit" className="hire-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Transmitting...' : 'Hire Now'} 
              <Send size={18} />
            </button>
            <span className="action-divider">or</span>
            <a href="mailto:connect.saboor@gmail.com" className="email-direct-btn">
              Email Me Now
            </a>
          </div>

          {submitStatus === 'success' && (
            <p className="status-message status-success">
              <CheckCircle size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom' }}/> 
              Transmission received. I will respond to your signal shortly.
            </p>
          )}
          
          {submitStatus === 'error' && (
            <p className="status-message status-error">
              <AlertCircle size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom' }}/> 
              Transmission failed due to space weather interference. Please try again or drop me an email directly.
            </p>
          )}

        </form>

      </div>
    </section>
  );
};

export default Contact;
