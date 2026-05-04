import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle, FaBolt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)
      const amount =
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, { withCredentials: true })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "AceMock",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,
        handler: async function (response) {
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify", response, { withCredentials: true })
          dispatch(setUserData(verifypay.data.user))
          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")
        },
        theme: { color: "#10b981" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      setLoadingPlan(null);
    } catch (error) {
      console.log(error)
      setLoadingPlan(null);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='min-h-screen px-4 py-12 relative overflow-hidden'
      style={{ background: '#f5f6f2' }}>

      {/* ── ambient background ── */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-56 left-1/2 -translate-x-1/2 w-[1100px] h-[620px]'
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(167,243,208,0.48) 0%,rgba(209,250,229,0.16) 55%,transparent 80%)' }} />
        <div className='absolute top-[20%] -right-40 w-[480px] h-[480px] rounded-full'
          style={{ background: 'radial-gradient(circle,rgba(187,247,208,0.2) 0%,transparent 65%)' }} />
        <div className='absolute bottom-10 -left-32 w-[400px] h-[400px] rounded-full'
          style={{ background: 'radial-gradient(circle,rgba(220,252,231,0.24) 0%,transparent 65%)' }} />
        <div className='absolute inset-0'
          style={{ backgroundImage: 'radial-gradient(rgba(22,101,52,0.065) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <svg className='absolute top-0 right-0 w-[380px] opacity-[0.032]' viewBox='0 0 420 420' fill='none'>
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={i} x1={i * 28} y1='0' x2='420' y2={420 - i * 28} stroke='#166534' strokeWidth='1' />
          ))}
        </svg>
      </div>

      <div className='relative max-w-6xl mx-auto'>

        {/* ── Header ── */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
          className='mb-14 flex items-start gap-5'>

          <button
            onClick={() => navigate("/")}
            className='mt-1 group flex items-center justify-center w-11 h-11 rounded-full
                       bg-white/90 backdrop-blur-sm border border-gray-200
                       shadow-sm hover:shadow-md hover:border-green-300
                       hover:bg-green-50 transition-all duration-250 flex-shrink-0'>
            <FaArrowLeft className='text-gray-500 group-hover:text-green-600 transition-colors text-sm' />
          </button>

          <div className='flex-1 text-center'>
            <div className='inline-flex items-center gap-2 bg-green-400/10 border border-green-400/25
                            text-green-700 text-[11px] font-semibold tracking-[0.16em] uppercase
                            px-4 py-1.5 rounded-full mb-4'>
              <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
              Flexible Pricing
            </div>
            <h1 className='text-[38px] md:text-[48px] font-extrabold tracking-[-1.5px] leading-[1.06] text-gray-950'>
              Choose Your{' '}
              <span className='text-green-600 italic font-serif font-normal'>Plan</span>
            </h1>
            <p className='text-gray-500 mt-3 text-[15.5px] leading-relaxed'>
              Flexible pricing to match your interview preparation goals.
            </p>
          </div>

          <div className='w-11 flex-shrink-0' />
        </motion.div>

        {/* ── Plans Grid — extra bottom padding so lifted cards don't clip ── */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10'>
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id
            const isPro = plan.id === 'pro'
            const isLifted = isSelected && !plan.default

            return (
              <motion.div
                key={plan.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{
                  y: isLifted ? -20 : 0,
                  scale: isLifted ? 1.055 : 1,
                  opacity: 1,
                }}
                transition={{
                  y: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
                  scale: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
                  opacity: { duration: 0.55, delay: index * 0.1 },
                }}
                whileHover={!plan.default && !isLifted ? { y: -6, scale: 1.02 } : {}}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                style={{ position: 'relative', zIndex: isLifted ? 10 : 1 }}
                className={`rounded-[24px] overflow-hidden
                  ${plan.default ? 'cursor-default' : 'cursor-pointer'}
                  ${isLifted
                    ? 'shadow-[0_32px_80px_rgba(34,197,94,0.28),0_12px_32px_rgba(0,0,0,0.18)]'
                    : isPro
                      ? 'shadow-[0_8px_40px_rgba(0,0,0,0.15)]'
                      : 'shadow-[0_4px_24px_rgba(0,0,0,0.07)]'
                  }`}>

                {/* ══ PRO — dark panel ══ */}
                {isPro ? (
                  <div className='relative h-full flex flex-col p-8 overflow-hidden'
                    style={{
                      background: 'linear-gradient(145deg,#0d1f0d 0%,#0a160a 50%,#0d1a0d 100%)',
                      border: isLifted ? '1.5px solid rgba(74,222,128,0.45)' : '1px solid rgba(74,222,128,0.15)'
                    }}>

                    <div className='absolute inset-0 pointer-events-none'>
                      <div className='absolute -top-16 -left-16 w-[280px] h-[280px] rounded-full'
                        style={{ background: 'radial-gradient(circle,rgba(74,222,128,0.1) 0%,transparent 65%)' }} />
                      <div className='absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full'
                        style={{ background: 'radial-gradient(circle,rgba(34,197,94,0.07) 0%,transparent 65%)' }} />
                      <div className='absolute inset-0'
                        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
                    </div>

                    {/* header row */}
                    <div className='relative z-10 flex items-center justify-between mb-6'>
                      <div className='inline-flex items-center gap-2 bg-green-400/10 border border-green-400/25
                                      text-green-400 text-[11px] font-semibold tracking-[0.14em] uppercase
                                      px-4 py-1.5 rounded-full'>
                        <FaBolt size={9} />
                        Best Value
                      </div>
                      {isLifted && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                          className='w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.6)]'>
                          <svg width='10' height='10' viewBox='0 0 12 12' fill='none'>
                            <path d='M2 6l3 3 5-5' stroke='white' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
                          </svg>
                        </motion.div>
                      )}
                    </div>

                    <div className='relative z-10 mb-5'>
                      <h3 className='text-[22px] font-extrabold text-white tracking-[-0.5px]'>{plan.name}</h3>
                      <p className='text-gray-500 text-[13px] mt-1.5 leading-relaxed'>{plan.description}</p>
                    </div>

                    <div className='relative z-10 mb-6 pb-6 border-b border-white/[0.08]'>
                      <span className='text-[42px] font-extrabold text-white leading-none tracking-tight'>{plan.price}</span>
                      <div className='mt-2 inline-flex items-center gap-1.5 bg-green-500/15 border border-green-400/25
                                      text-green-400 px-3 py-1 rounded-full text-[12px] font-bold'>
                        <span className='w-1.5 h-1.5 rounded-full bg-green-400' />
                        {plan.credits} Credits
                      </div>
                    </div>

                    <div className='relative z-10 space-y-3 flex-1'>
                      {plan.features.map((feature, i) => (
                        <div key={i} className='flex items-center gap-3'>
                          <div className='w-5 h-5 rounded-full bg-green-500/15 border border-green-400/25
                                          flex items-center justify-center flex-shrink-0'>
                            <svg width='9' height='9' viewBox='0 0 12 12' fill='none'>
                              <path d='M2 6l3 3 5-5' stroke='#4ade80' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                          </div>
                          <span className='text-gray-300 text-[13.5px]'>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      disabled={loadingPlan === plan.id}
                      whileHover={{ scale: loadingPlan === plan.id ? 1 : 1.025 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isSelected) setSelectedPlan(plan.id)
                        else handlePayment(plan)
                      }}
                      className='relative z-10 mt-8 w-full overflow-hidden text-white py-3.5 rounded-2xl
                                 text-[14px] font-bold shadow-lg transition-all duration-300 group
                                 disabled:opacity-60 disabled:cursor-not-allowed'
                      style={{
                        background: 'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)',
                        boxShadow: '0 4px 20px rgba(34,197,94,0.3)'
                      }}>
                      <span className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'
                        style={{ background: 'linear-gradient(135deg,#15803d,#16a34a)' }} />
                      <span className='relative flex items-center justify-center gap-2'>
                        {loadingPlan === plan.id ? (
                          <><svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                          </svg>Processing...</>
                        ) : isSelected ? (
                          <>Proceed to Pay
                            <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
                              <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' />
                            </svg>
                          </>
                        ) : "Select Plan"}
                      </span>
                    </motion.button>
                  </div>

                ) : (
                  /* ══ FREE & BASIC — white card ══ */
                  <div className='relative h-full flex flex-col p-8 bg-white/90 backdrop-blur-sm'
                    style={{
                      borderRadius: '24px',
                      border: isLifted ? '1.5px solid #22c55e' : '1px solid #f0f0f0',
                    }}>

                    {isLifted && (
                      <div className='absolute inset-0 pointer-events-none rounded-[24px]'
                        style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(187,247,208,0.4) 0%,transparent 65%)' }} />
                    )}

                    {/* header row */}
                    <div className='relative z-10 flex items-center justify-between mb-6 min-h-[28px]'>
                      {plan.default ? (
                        <div className='inline-flex items-center gap-2 bg-gray-100 border border-gray-200
                                        text-gray-500 text-[11px] font-semibold tracking-[0.14em] uppercase
                                        px-4 py-1.5 rounded-full'>
                          Default
                        </div>
                      ) : <div />}
                      {isLifted && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                          className='w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.5)]'>
                          <svg width='10' height='10' viewBox='0 0 12 12' fill='none'>
                            <path d='M2 6l3 3 5-5' stroke='white' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
                          </svg>
                        </motion.div>
                      )}
                    </div>

                    <div className='relative z-10 mb-5'>
                      <h3 className='text-[22px] font-extrabold text-gray-900 tracking-[-0.5px]'>{plan.name}</h3>
                      <p className='text-gray-400 text-[13px] mt-1.5 leading-relaxed'>{plan.description}</p>
                    </div>

                    <div className='relative z-10 mb-6 pb-6 border-b border-gray-100'>
                      <span className='text-[42px] font-extrabold text-gray-900 leading-none tracking-tight'>{plan.price}</span>
                      <div className='mt-2 inline-flex items-center gap-1.5 bg-green-50 border border-green-100
                                      text-green-700 px-3 py-1 rounded-full text-[12px] font-bold'>
                        <span className='w-1.5 h-1.5 rounded-full bg-green-400' />
                        {plan.credits} Credits
                      </div>
                    </div>

                    <div className='relative z-10 space-y-3 flex-1'>
                      {plan.features.map((feature, i) => (
                        <div key={i} className='flex items-center gap-3'>
                          <div className='w-5 h-5 rounded-full bg-green-50 border border-green-100
                                          flex items-center justify-center flex-shrink-0'>
                            <FaCheckCircle className='text-green-500 text-[9px]' />
                          </div>
                          <span className='text-gray-600 text-[13.5px]'>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {!plan.default && (
                      <motion.button
                        disabled={loadingPlan === plan.id}
                        whileHover={{ scale: loadingPlan === plan.id ? 1 : 1.025 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isSelected) setSelectedPlan(plan.id)
                          else handlePayment(plan)
                        }}
                        className='relative z-10 mt-8 w-full overflow-hidden py-3.5 rounded-2xl
                                   text-[14px] font-bold transition-all duration-300 group
                                   disabled:opacity-60 disabled:cursor-not-allowed'
                        style={{
                          background: isLifted ? 'linear-gradient(135deg,#111 0%,#1a1a1a 100%)' : '#f3f4f6',
                          color: isLifted ? '#fff' : '#374151',
                          boxShadow: isLifted ? '0 8px 32px rgba(0,0,0,0.15)' : 'none',
                        }}>
                        {isLifted && (
                          <span className='absolute inset-0 opacity-0 group-hover:opacity-100
                                           transition-opacity duration-350 rounded-2xl'
                            style={{ background: 'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)' }} />
                        )}
                        <span className='relative flex items-center justify-center gap-2'>
                          {loadingPlan === plan.id ? (
                            <><svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
                              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                            </svg>Processing...</>
                          ) : isSelected ? (
                            <>Proceed to Pay
                              <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
                                <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' />
                              </svg>
                            </>
                          ) : "Select Plan"}
                        </span>
                      </motion.button>
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mt-4 flex flex-wrap items-center justify-center gap-8 text-[13px] text-gray-400'>
          {[
            { icon: '🔒', text: 'Secure Razorpay Payment' },
            { icon: '⚡', text: 'Instant Credit Activation' },
            { icon: '↩️', text: 'No Hidden Charges' },
          ].map((item, i) => (
            <div key={i} className='flex items-center gap-2'>
              <span>{item.icon}</span>
              <span className='font-medium'>{item.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  )
}

export default Pricing