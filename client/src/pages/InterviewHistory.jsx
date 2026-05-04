import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
import { motion } from "motion/react"

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])

    return (
        <div className='min-h-screen flex flex-col' style={{ background: '#f5f6f2' }}>

            {/* ── same ambient background as Home ── */}
            <div className='fixed inset-0 pointer-events-none overflow-hidden -z-10'>
                <div className='absolute -top-56 left-1/2 -translate-x-1/2 w-[1100px] h-[600px]'
                    style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(167,243,208,0.45) 0%,rgba(209,250,229,0.15) 55%,transparent 80%)' }} />
                <div className='absolute top-[25%] -right-48 w-[500px] h-[500px] rounded-full'
                    style={{ background: 'radial-gradient(circle,rgba(187,247,208,0.18) 0%,transparent 65%)' }} />
                <div className='absolute top-[60%] -left-32 w-[420px] h-[420px] rounded-full'
                    style={{ background: 'radial-gradient(circle,rgba(220,252,231,0.22) 0%,transparent 65%)' }} />
                <div className='absolute inset-0'
                    style={{ backgroundImage: 'radial-gradient(rgba(22,101,52,0.065) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
                <svg className='absolute top-0 right-0 w-[380px] opacity-[0.032]' viewBox='0 0 420 420' fill='none'>
                    {Array.from({ length: 18 }).map((_, i) => (
                        <line key={i} x1={i * 28} y1='0' x2='420' y2={420 - i * 28} stroke='#166534' strokeWidth='1' />
                    ))}
                </svg>
            </div>

            {/* ── page content ── */}
            <div className='flex-1 py-12 px-6'>
                <div className='w-[90vw] lg:w-[70vw] max-w-[900px] mx-auto'>

                    {/* ── PAGE HEADER ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        className='mb-12 flex items-start gap-5 flex-wrap'>

                        <button
                            onClick={() => navigate("/")}
                            className='mt-1 group flex items-center justify-center w-11 h-11 rounded-full
                                       bg-white/90 backdrop-blur-sm border border-gray-200
                                       shadow-sm hover:shadow-md hover:border-green-300
                                       hover:bg-green-50 transition-all duration-250'>
                            <FaArrowLeft className='text-gray-500 group-hover:text-green-600 transition-colors text-sm' />
                        </button>

                        <div>
                            <div className='inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm
                                            border border-green-200 text-green-700 text-[11px] font-semibold
                                            tracking-[0.16em] uppercase px-4 py-1.5 rounded-full
                                            shadow-sm mb-3'>
                                <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
                                Your Progress
                            </div>

                            <h1 className='text-[38px] md:text-[48px] font-extrabold tracking-[-1.5px]
                                           leading-[1.06] text-gray-950'>
                                Interview{' '}
                                <span className='text-green-600 italic font-serif font-normal'>History</span>
                            </h1>
                            <p className='text-gray-500 mt-2 text-[15.5px] leading-relaxed'>
                                Track your past interviews and performance reports
                            </p>
                        </div>
                    </motion.div>

                    {/* ── STATS ROW ── */}
                    {interviews.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className='grid grid-cols-3 gap-4 mb-10'>
                            {[
                                {
                                    label: 'Total Sessions',
                                    value: interviews.length,
                                    suffix: '',
                                    color: 'from-green-50 to-emerald-50/60 border-green-100',
                                    dot: 'bg-green-500',
                                },
                                {
                                    label: 'Completed',
                                    value: interviews.filter(i => i.status === 'completed').length,
                                    suffix: '',
                                    color: 'from-blue-50 to-indigo-50/60 border-blue-100',
                                    dot: 'bg-blue-500',
                                },
                                {
                                    label: 'Avg Score',
                                    value: interviews.length
                                        ? (interviews.reduce((a, b) => a + (b.finalScore || 0), 0) / interviews.length).toFixed(1)
                                        : '—',
                                    suffix: '/10',
                                    color: 'from-violet-50 to-purple-50/60 border-violet-100',
                                    dot: 'bg-violet-500',
                                },
                            ].map((s, i) => (
                                <div key={i}
                                    className={`bg-gradient-to-br ${s.color} border rounded-2xl px-6 py-5 shadow-sm`}>
                                    <div className='flex items-center gap-2 mb-1.5'>
                                        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                                        <span className='text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-400'>{s.label}</span>
                                    </div>
                                    <div className='text-[30px] font-extrabold tracking-tight text-gray-900 leading-none'>
                                        {s.value}<span className='text-[18px] font-bold text-gray-400'>{s.suffix}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* ── EMPTY STATE ── */}
                    {interviews.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.15 }}
                            className='relative bg-white/90 backdrop-blur-sm border border-gray-100
                                        rounded-[22px] p-16 text-center overflow-hidden
                                        shadow-[0_4px_24px_rgba(0,0,0,0.06)]'>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                            w-[340px] h-[180px] pointer-events-none'
                                style={{ background: 'radial-gradient(ellipse,rgba(187,247,208,0.3) 0%,transparent 70%)' }} />
                            <div className='relative z-10'>
                                <div className='w-16 h-16 rounded-2xl bg-green-50 border border-green-100
                                                flex items-center justify-center mx-auto mb-5 shadow-sm'>
                                    <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                                        <path d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                                            stroke='#16a34a' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </div>
                                <h3 className='text-gray-800 font-bold text-xl mb-2'>No interviews yet</h3>
                                <p className='text-gray-500 text-[15px] leading-relaxed mb-8 max-w-xs mx-auto'>
                                    No interviews found. Start your first interview.
                                </p>
                                <button
                                    onClick={() => navigate('/')}
                                    className='group relative overflow-hidden bg-gray-900 text-white
                                               px-9 py-3 rounded-full text-[14px] font-semibold
                                               shadow-lg transition-all duration-300 inline-flex items-center gap-2'>
                                    <span className='absolute inset-0 opacity-0 group-hover:opacity-100
                                                     transition-opacity duration-300 rounded-full'
                                        style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)' }} />
                                    <span className='relative'>Start Interview</span>
                                    <svg width='14' height='14' viewBox='0 0 16 16' fill='none' className='relative'>
                                        <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        /* ── INTERVIEW CARDS ── */
                        <div className='grid gap-4'>
                            {interviews.map((item, index) => {

                                const score = item.finalScore || 0;
                                const scoreColor = score >= 7 ? '#16a34a' : score >= 5 ? '#d97706' : '#dc2626';
                                const scoreBg = score >= 7
                                    ? 'rgba(22,163,74,0.08)' : score >= 5
                                    ? 'rgba(217,119,6,0.08)' : 'rgba(220,38,38,0.08)';
                                const scoreBorder = score >= 7
                                    ? 'rgba(22,163,74,0.2)' : score >= 5
                                    ? 'rgba(217,119,6,0.2)' : 'rgba(220,38,38,0.2)';
                                const isCompleted = item.status === 'completed';

                                return (
                                    <motion.div key={index}
                                        initial={{ opacity: 0, y: 28 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.45, delay: index * 0.07 }}
                                        onClick={() => navigate(`/report/${item._id}`)}
                                        whileHover={{ y: -3 }}
                                        className='group relative bg-white/90 backdrop-blur-sm border border-gray-100
                                                   rounded-[20px] cursor-pointer overflow-hidden
                                                   shadow-[0_2px_14px_rgba(0,0,0,0.05)]
                                                   hover:shadow-[0_16px_48px_rgba(0,0,0,0.11)]
                                                   hover:border-green-200 transition-all duration-300'>

                                        {/* left accent bar */}
                                        <div className='absolute left-0 top-0 w-1 h-full rounded-l-[20px] transition-all duration-300'
                                            style={{
                                                background: isCompleted
                                                    ? 'linear-gradient(180deg,#22c55e,#4ade80)'
                                                    : 'linear-gradient(180deg,#f59e0b,#fcd34d)'
                                            }} />

                                        {/* hover glow */}
                                        <div className='absolute inset-0 opacity-0 group-hover:opacity-100
                                                        transition-opacity duration-500 pointer-events-none'
                                            style={{ background: 'radial-gradient(circle at 95% 50%,rgba(187,247,208,0.18) 0%,transparent 60%)' }} />

                                        <div className='relative pl-7 pr-6 py-6'>
                                            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                                                {/* LEFT — role + meta */}
                                                <div className='flex items-center gap-4 flex-1 min-w-0'>

                                                    {/* index badge — dark panel style */}
                                                    <div className='flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center
                                                                    text-[12px] font-extrabold text-green-400 transition-all duration-300
                                                                    group-hover:shadow-[0_4px_16px_rgba(34,197,94,0.25)]'
                                                        style={{
                                                            background: 'linear-gradient(145deg,#0d1f0d,#0a160a)',
                                                            border: '1px solid rgba(74,222,128,0.2)'
                                                        }}>
                                                        {String(index + 1).padStart(2, '0')}
                                                    </div>

                                                    <div className='flex-1 min-w-0'>
                                                        {/* role title */}
                                                        <h3 className='text-[17px] font-bold text-gray-900 leading-snug
                                                                       group-hover:text-green-700 transition-colors duration-250 truncate'>
                                                            {item.role}
                                                        </h3>

                                                        {/* NO resumeText / description rendered here intentionally */}

                                                        {/* pills row */}
                                                        <div className='flex flex-wrap items-center gap-2 mt-2.5'>
                                                            {/* experience */}
                                                            <span className='inline-flex items-center gap-1.5 bg-gray-50 text-gray-500
                                                                             text-[11px] font-semibold tracking-wide uppercase
                                                                             px-3 py-1 rounded-full border border-gray-200'>
                                                                <svg width='10' height='10' viewBox='0 0 16 16' fill='none'>
                                                                    <circle cx='8' cy='8' r='6' stroke='currentColor' strokeWidth='1.8' />
                                                                    <path d='M8 5v3l2 2' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
                                                                </svg>
                                                                {item.experience}
                                                            </span>

                                                            {/* mode */}
                                                            <span className='inline-flex items-center gap-1.5 bg-blue-50 text-blue-600
                                                                             text-[11px] font-semibold tracking-wide uppercase
                                                                             px-3 py-1 rounded-full border border-blue-100'>
                                                                <svg width='10' height='10' viewBox='0 0 16 16' fill='none'>
                                                                    <path d='M2 4h12M2 8h8M2 12h5' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
                                                                </svg>
                                                                {item.mode}
                                                            </span>

                                                            {/* date */}
                                                            <span className='inline-flex items-center gap-1.5 text-gray-400 text-[11px] font-medium'>
                                                                <svg width='11' height='11' viewBox='0 0 16 16' fill='none'>
                                                                    <rect x='2' y='3' width='12' height='11' rx='2' stroke='#9ca3af' strokeWidth='1.5' />
                                                                    <path d='M5 1v3M11 1v3M2 7h12' stroke='#9ca3af' strokeWidth='1.5' strokeLinecap='round' />
                                                                </svg>
                                                                {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* RIGHT — score + status + arrow */}
                                                <div className='flex items-center gap-4 md:flex-shrink-0 pl-15 md:pl-0'>

                                                    {/* Score pill */}
                                                    <div className='flex flex-col items-center px-5 py-3 rounded-2xl border'
                                                        style={{ background: scoreBg, borderColor: scoreBorder }}>
                                                        <span className='text-[22px] font-extrabold leading-none' style={{ color: scoreColor }}>
                                                            {score}
                                                            <span className='text-[13px] font-bold' style={{ color: scoreColor, opacity: 0.5 }}>/10</span>
                                                        </span>
                                                        <span className='text-[10px] font-bold tracking-wider uppercase mt-0.5' style={{ color: scoreColor, opacity: 0.7 }}>Score</span>
                                                    </div>

                                                    {/* Status badge */}
                                                    <span className={`px-3.5 py-2 rounded-xl text-[11px] font-bold tracking-wide uppercase border flex flex-col items-center gap-1
                                                        ${isCompleted
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                                        }`}>
                                                        <span className={`inline-block w-2 h-2 rounded-full
                                                            ${isCompleted ? "bg-emerald-500" : "bg-amber-400"}`} />
                                                        {item.status}
                                                    </span>

                                                    {/* Arrow button */}
                                                    <div className='w-9 h-9 rounded-xl border border-gray-100 bg-gray-50
                                                                    flex items-center justify-center flex-shrink-0
                                                                    group-hover:bg-green-500 group-hover:border-green-500
                                                                    transition-all duration-300'>
                                                        <svg width='14' height='14' viewBox='0 0 16 16' fill='none'
                                                            className='text-gray-400 group-hover:text-white transition-colors duration-300'>
                                                            <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InterviewHistory