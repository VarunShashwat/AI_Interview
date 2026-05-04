import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)
        const formdata = new FormData()
        formdata.append("resume", resumeFile)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })
            console.log(result.data)
            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
            setAnalyzing(false);
        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/generate-questions", { role, experience, mode, resumeText, projects, skills }, { withCredentials: true })
            console.log(result.data)
            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }
            setLoading(false)
            onStart(result.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden'
            style={{ background: '#f5f6f2' }}>

            {/* ── same ambient background as Home ── */}
            <div className='absolute inset-0 pointer-events-none'>
                {/* top aurora */}
                <div className='absolute -top-56 left-1/2 -translate-x-1/2 w-[1100px] h-[620px]'
                    style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(167,243,208,0.48) 0%,rgba(209,250,229,0.16) 55%,transparent 80%)' }} />
                {/* right float */}
                <div className='absolute top-[20%] -right-40 w-[480px] h-[480px] rounded-full'
                    style={{ background: 'radial-gradient(circle,rgba(187,247,208,0.2) 0%,transparent 65%)' }} />
                {/* left float */}
                <div className='absolute bottom-10 -left-32 w-[400px] h-[400px] rounded-full'
                    style={{ background: 'radial-gradient(circle,rgba(220,252,231,0.24) 0%,transparent 65%)' }} />
                {/* dot grid */}
                <div className='absolute inset-0'
                    style={{ backgroundImage: 'radial-gradient(rgba(22,101,52,0.065) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
                {/* diagonal corner SVG */}
                <svg className='absolute top-0 right-0 w-[380px] opacity-[0.032]' viewBox='0 0 420 420' fill='none'>
                    {Array.from({ length: 18 }).map((_, i) => (
                        <line key={i} x1={i * 28} y1='0' x2='420' y2={420 - i * 28} stroke='#166534' strokeWidth='1' />
                    ))}
                </svg>
            </div>

            {/* ── main card ── */}
            <div className='relative w-full max-w-6xl'>
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.65 }}
                    className='grid md:grid-cols-2 rounded-[28px] overflow-hidden
                               shadow-[0_8px_64px_rgba(0,0,0,0.1),0_2px_16px_rgba(0,0,0,0.06)]
                               border border-white/80'>

                    {/* ════════════════════════════════
                        LEFT PANEL
                    ════════════════════════════════ */}
                    <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className='relative flex flex-col justify-between p-12 overflow-hidden'
                        style={{ background: 'linear-gradient(145deg,#0d1f0d 0%,#0a160a 50%,#0d1a0d 100%)' }}>

                        {/* left panel background glows */}
                        <div className='absolute inset-0 pointer-events-none'>
                            <div className='absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full'
                                style={{ background: 'radial-gradient(circle,rgba(74,222,128,0.12) 0%,transparent 65%)' }} />
                            <div className='absolute bottom-0 right-0 w-[280px] h-[280px] rounded-full'
                                style={{ background: 'radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 65%)' }} />
                            {/* diagonal stripe overlay */}
                            <svg className='absolute inset-0 w-full h-full opacity-[0.04]' preserveAspectRatio='none'>
                                <defs>
                                    <pattern id='diagL' width='40' height='40' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
                                        <line x1='0' y1='0' x2='0' y2='40' stroke='#4ade80' strokeWidth='1' />
                                    </pattern>
                                </defs>
                                <rect width='100%' height='100%' fill='url(#diagL)' />
                            </svg>
                            {/* dot grid */}
                            <div className='absolute inset-0'
                                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
                        </div>

                        {/* top section */}
                        <div className='relative z-10'>
                            {/* label pill */}
                            <div className='inline-flex items-center gap-2 bg-green-400/10 border border-green-400/25
                                            text-green-400 text-[11px] font-semibold tracking-[0.16em] uppercase
                                            px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm'>
                                <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
                                AI Powered
                            </div>

                            <h2 className='text-[36px] md:text-[42px] font-extrabold tracking-[-1.5px]
                                           leading-[1.06] text-white mb-5'>
                                Start Your{' '}
                                <span className='text-green-400 italic font-serif font-normal'>AI Interview</span>
                            </h2>

                            <p className='text-gray-400 text-[15px] leading-[1.72] mb-10 max-w-xs'>
                                Practice real interview scenarios powered by AI.
                                Improve communication, technical skills, and confidence.
                            </p>

                            {/* feature rows */}
                            <div className='space-y-3'>
                                {[
                                    { icon: <FaUserTie />, label: 'Choose Role & Experience', sub: 'Tailored to your level' },
                                    { icon: <FaMicrophoneAlt />, label: 'Smart Voice Interview', sub: 'Dynamic follow-ups' },
                                    { icon: <FaChartLine />, label: 'Performance Analytics', sub: 'Real-time scoring' },
                                ].map((item, index) => (
                                    <motion.div key={index}
                                        initial={{ y: 24, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.35 + index * 0.13 }}
                                        whileHover={{ x: 4, scale: 1.02 }}
                                        className='group flex items-center gap-4 bg-white/[0.05] hover:bg-white/[0.09]
                                                   border border-white/[0.07] hover:border-green-400/30
                                                   p-4 rounded-2xl cursor-pointer transition-all duration-250 backdrop-blur-sm'>
                                        <div className='w-10 h-10 rounded-xl bg-green-400/10 border border-green-400/20
                                                        flex items-center justify-center text-green-400 text-[16px]
                                                        group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500
                                                        group-hover:shadow-[0_4px_16px_rgba(34,197,94,0.3)]
                                                        transition-all duration-250 flex-shrink-0'>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className='text-white font-semibold text-[14px] leading-none mb-1'>{item.label}</p>
                                            <p className='text-gray-500 text-[12px]'>{item.sub}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* bottom trust strip */}
                        <div className='relative z-10 mt-10 pt-8 border-t border-white/[0.08]'>
                            <div className='flex flex-wrap items-center gap-5'>
                                {[
                                    { num: '50K+', label: 'Interviews' },
                                    { num: '94%', label: 'Success rate' },
                                    { num: '4.9★', label: 'Rating' },
                                ].map((s, i) => (
                                    <div key={i} className='flex items-center gap-2'>
                                        {i > 0 && <span className='w-px h-4 bg-white/10' />}
                                        <span className='text-white font-bold text-[14px]'>{s.num}</span>
                                        <span className='text-gray-500 text-[12px]'>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ════════════════════════════════
                        RIGHT PANEL — FORM
                    ════════════════════════════════ */}
                    <motion.div
                        initial={{ x: 60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className='bg-white/95 backdrop-blur-sm p-12 flex flex-col justify-center'>

                        {/* form header */}
                        <div className='mb-8'>
                            <div className='inline-flex items-center gap-2 bg-gray-50 border border-gray-200
                                            text-gray-400 text-[11px] font-semibold tracking-[0.16em] uppercase
                                            px-4 py-1.5 rounded-full mb-4 shadow-sm'>
                                <span className='w-1.5 h-1.5 rounded-full bg-green-400' />
                                Setup
                            </div>
                            <h2 className='text-[30px] font-extrabold tracking-[-1px] leading-[1.1] text-gray-950'>
                                Interview{' '}
                                <span className='text-green-600 italic font-serif font-normal'>SetUp</span>
                            </h2>
                            <p className='text-gray-400 text-[13.5px] mt-1.5'>
                                Fill in details to generate your personalised questions
                            </p>
                        </div>

                        <div className='space-y-4'>

                            {/* Role input */}
                            <div className='relative group'>
                                <div className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400
                                                group-focus-within:text-green-500 transition-colors duration-200'>
                                    <FaUserTie size={15} />
                                </div>
                                <input type='text' placeholder='Enter role (e.g. Frontend Developer)'
                                    className='w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-200
                                               rounded-2xl text-[14px] text-gray-800 placeholder-gray-400
                                               focus:ring-2 focus:ring-green-500/30 focus:border-green-400
                                               focus:bg-white outline-none transition-all duration-200'
                                    onChange={(e) => setRole(e.target.value)} value={role} />
                            </div>

                            {/* Experience input */}
                            <div className='relative group'>
                                <div className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400
                                                group-focus-within:text-green-500 transition-colors duration-200'>
                                    <FaBriefcase size={15} />
                                </div>
                                <input type='text' placeholder='Experience (e.g. 2 years)'
                                    className='w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-200
                                               rounded-2xl text-[14px] text-gray-800 placeholder-gray-400
                                               focus:ring-2 focus:ring-green-500/30 focus:border-green-400
                                               focus:bg-white outline-none transition-all duration-200'
                                    onChange={(e) => setExperience(e.target.value)} value={experience} />
                            </div>

                            {/* Mode select */}
                            <div className='relative'>
                                <select value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className='w-full py-3.5 px-4 bg-gray-50/80 border border-gray-200
                                               rounded-2xl text-[14px] text-gray-700 appearance-none
                                               focus:ring-2 focus:ring-green-500/30 focus:border-green-400
                                               focus:bg-white outline-none transition-all duration-200 cursor-pointer'>
                                    <option value="Technical">Technical Interview</option>
                                    <option value="HR">HR Interview</option>
                                </select>
                                {/* custom chevron */}
                                <div className='absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none text-gray-400'>
                                    <svg width='14' height='14' viewBox='0 0 16 16' fill='none'>
                                        <path d='M4 6l4 4 4-4' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </div>
                            </div>

                            {/* Resume upload */}
                            {!analysisDone && (
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => document.getElementById("resumeUpload").click()}
                                    className='group relative border-2 border-dashed border-gray-200 rounded-2xl p-7
                                               text-center cursor-pointer hover:border-green-400 hover:bg-green-50/40
                                               transition-all duration-250 overflow-hidden'>

                                    {/* hover glow */}
                                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none'
                                        style={{ background: 'radial-gradient(circle at 50% 60%,rgba(187,247,208,0.25) 0%,transparent 70%)' }} />

                                    <div className='relative z-10'>
                                        <div className='w-12 h-12 rounded-2xl bg-green-50 border border-green-100
                                                        flex items-center justify-center mx-auto mb-3
                                                        group-hover:bg-green-500 group-hover:border-green-500
                                                        group-hover:shadow-[0_6px_20px_rgba(34,197,94,0.3)]
                                                        transition-all duration-250'>
                                            <FaFileUpload className='text-green-600 group-hover:text-white text-[18px] transition-colors duration-250' />
                                        </div>

                                        <input type="file"
                                            accept="application/pdf"
                                            id="resumeUpload"
                                            className='hidden'
                                            onChange={(e) => setResumeFile(e.target.files[0])} />

                                        <p className='text-gray-600 font-semibold text-[14px]'>
                                            {resumeFile ? resumeFile.name : "Click to upload resume"}
                                        </p>
                                        <p className='text-gray-400 text-[12px] mt-1'>
                                            {resumeFile ? "PDF ready to analyse" : "Optional · PDF only"}
                                        </p>

                                        {resumeFile && (
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={(e) => { e.stopPropagation(); handleUploadResume() }}
                                                className='relative overflow-hidden mt-5 text-white px-7 py-2.5 rounded-full
                                                           text-[13px] font-semibold shadow-lg transition-all duration-300
                                                           inline-flex items-center gap-2'
                                                style={{
                                                    background: analyzing
                                                        ? 'linear-gradient(135deg,#374151,#4b5563)'
                                                        : 'linear-gradient(135deg,#111 0%,#1a1a1a 100%)',
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.18)'
                                                }}>
                                                {/* shimmer */}
                                                <span className='absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300'
                                                    style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)' }} />
                                                <span className='relative flex items-center gap-2'>
                                                    {analyzing ? (
                                                        <>
                                                            <svg className='animate-spin w-3.5 h-3.5' viewBox='0 0 24 24' fill='none'>
                                                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                                                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                                                            </svg>
                                                            Analyzing...
                                                        </>
                                                    ) : "Analyze Resume"}
                                                </span>
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Resume analysis result */}
                            {analysisDone && (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45 }}
                                    className='relative bg-gray-50/80 border border-gray-200 rounded-2xl p-5 space-y-4 overflow-hidden'>

                                    {/* success glow */}
                                    <div className='absolute top-0 right-0 w-32 h-32 pointer-events-none'
                                        style={{ background: 'radial-gradient(circle at 80% 20%,rgba(187,247,208,0.3) 0%,transparent 65%)' }} />

                                    <div className='flex items-center gap-2.5 relative'>
                                        <div className='w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0'>
                                            <svg width='13' height='13' viewBox='0 0 16 16' fill='none'>
                                                <path d='M3 8l3.5 3.5L13 4' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                            </svg>
                                        </div>
                                        <h3 className='text-[15px] font-bold text-gray-900'>
                                            Resume Analysis Result
                                        </h3>
                                    </div>

                                    {projects.length > 0 && (
                                        <div className='relative'>
                                            <p className='font-semibold text-gray-700 text-[13px] mb-2 flex items-center gap-1.5'>
                                                <span className='w-1 h-1 rounded-full bg-gray-400 inline-block' />
                                                Projects
                                            </p>
                                            <ul className='space-y-1.5'>
                                                {projects.map((p, i) => (
                                                    <li key={i} className='flex items-start gap-2 text-gray-600 text-[13px]'>
                                                        <span className='w-1 h-1 rounded-full bg-green-400 mt-1.5 flex-shrink-0' />
                                                        {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {skills.length > 0 && (
                                        <div className='relative'>
                                            <p className='font-semibold text-gray-700 text-[13px] mb-2 flex items-center gap-1.5'>
                                                <span className='w-1 h-1 rounded-full bg-gray-400 inline-block' />
                                                Skills
                                            </p>
                                            <div className='flex flex-wrap gap-1.5'>
                                                {skills.map((s, i) => (
                                                    <span key={i}
                                                        className='bg-green-50 text-green-700 border border-green-100
                                                                   px-3 py-1 rounded-full text-[12px] font-semibold'>
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Start Interview button */}
                            <motion.button
                                onClick={handleStart}
                                disabled={!role || !experience || loading}
                                whileHover={{ scale: !role || !experience || loading ? 1 : 1.025 }}
                                whileTap={{ scale: !role || !experience || loading ? 1 : 0.97 }}
                                className='group relative w-full overflow-hidden text-white py-4 rounded-full
                                           text-[15px] font-bold shadow-lg transition-all duration-300
                                           disabled:cursor-not-allowed disabled:opacity-60'
                                style={{
                                    background: (!role || !experience || loading)
                                        ? 'linear-gradient(135deg,#374151,#4b5563)'
                                        : 'linear-gradient(135deg,#111 0%,#1a1a1a 100%)',
                                    boxShadow: (!role || !experience || loading) ? 'none' : '0 8px 32px rgba(0,0,0,0.18)',
                                }}>
                                {/* green sweep on hover */}
                                {(!loading && role && experience) && (
                                    <span className='absolute inset-0 opacity-0 group-hover:opacity-100
                                                     transition-opacity duration-350 rounded-full'
                                        style={{ background: 'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)' }} />
                                )}
                                <span className='relative flex items-center justify-center gap-2.5'>
                                    {loading ? (
                                        <>
                                            <svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
                                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                                            </svg>
                                            Starting...
                                        </>
                                    ) : (
                                        <>
                                            Start Interview
                                            <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                                                <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' />
                                            </svg>
                                        </>
                                    )}
                                </span>
                            </motion.button>

                            <p className='text-center text-gray-400 text-[12px] flex items-center justify-center gap-1.5'>
                                <svg width='12' height='12' viewBox='0 0 16 16' fill='none'>
                                    <rect x='2' y='6' width='12' height='9' rx='2' stroke='#9ca3af' strokeWidth='1.5' />
                                    <path d='M5 6V4a3 3 0 016 0v2' stroke='#9ca3af' strokeWidth='1.5' strokeLinecap='round' />
                                </svg>
                                Your data is private and never stored
                            </p>

                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Step1SetUp