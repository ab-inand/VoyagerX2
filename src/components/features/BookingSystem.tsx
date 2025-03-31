'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingStep {
  id: number;
  title: string;
  description: string;
}

const bookingSteps: BookingStep[] = [
  {
    id: 1,
    title: 'Select Destination',
    description: 'Choose your dream destination'
  },
  {
    id: 2,
    title: 'Pick Dates',
    description: 'Select your travel dates'
  },
  {
    id: 3,
    title: 'Add Activities',
    description: 'Customize your experience'
  },
  {
    id: 4,
    title: 'Review & Pay',
    description: 'Confirm your booking'
  }
];

interface BookingFormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  activities: string[];
  paymentMethod: string;
}

export default function BookingSystem() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    activities: [],
    paymentMethod: ''
  });

  const handleNext = () => {
    if (currentStep < bookingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Booking submitted:', formData);
    setIsOpen(false);
  };

  return (
    <>
      {/* Booking Button */}
      <motion.button
        className="fixed bottom-8 left-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </motion.button>

      {/* Booking Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Book Your Journey</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-6 py-4">
                <div className="flex justify-between mb-2">
                  {bookingSteps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex-1 text-center ${
                        step.id <= currentStep ? 'text-blue-400' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStep / bookingSteps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Step 1: Destination */}
                    {currentStep === 1 && (
                      <div>
                        <h3 className="text-xl font-bold mb-4">Select Your Destination</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {['Paris', 'Tokyo', 'Dubai', 'New York'].map((city) => (
                            <motion.button
                              key={city}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-4 rounded-xl ${
                                formData.destination === city
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                              }`}
                              onClick={() => setFormData({ ...formData, destination: city })}
                            >
                              {city}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Dates */}
                    {currentStep === 2 && (
                      <div>
                        <h3 className="text-xl font-bold mb-4">Select Travel Dates</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Start Date</label>
                            <input
                              type="date"
                              className="w-full bg-white/10 rounded-lg px-4 py-2"
                              value={formData.startDate}
                              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">End Date</label>
                            <input
                              type="date"
                              className="w-full bg-white/10 rounded-lg px-4 py-2"
                              value={formData.endDate}
                              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                          <input
                            type="number"
                            min="1"
                            className="w-full bg-white/10 rounded-lg px-4 py-2"
                            value={formData.travelers}
                            onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Activities */}
                    {currentStep === 3 && (
                      <div>
                        <h3 className="text-xl font-bold mb-4">Select Activities</h3>
                        <div className="space-y-4">
                          {[
                            'City Tour',
                            'Museum Visit',
                            'Food Tasting',
                            'Adventure Activity',
                            'Spa Treatment',
                            'Shopping Tour'
                          ].map((activity) => (
                            <motion.button
                              key={activity}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full p-4 rounded-xl text-left ${
                                formData.activities.includes(activity)
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                              }`}
                              onClick={() => {
                                const newActivities = formData.activities.includes(activity)
                                  ? formData.activities.filter(a => a !== activity)
                                  : [...formData.activities, activity];
                                setFormData({ ...formData, activities: newActivities });
                              }}
                            >
                              {activity}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Payment */}
                    {currentStep === 4 && (
                      <div>
                        <h3 className="text-xl font-bold mb-4">Payment Method</h3>
                        <div className="space-y-4">
                          {['Credit Card', 'PayPal', 'Crypto'].map((method) => (
                            <motion.button
                              key={method}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full p-4 rounded-xl ${
                                formData.paymentMethod === method
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                              }`}
                              onClick={() => setFormData({ ...formData, paymentMethod: method })}
                            >
                              {method}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-lg ${
                      currentStep === 1
                        ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white"
                    onClick={currentStep === bookingSteps.length ? handleSubmit : handleNext}
                  >
                    {currentStep === bookingSteps.length ? 'Confirm Booking' : 'Next'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 