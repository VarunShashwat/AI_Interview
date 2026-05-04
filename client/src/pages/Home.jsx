import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';


/* ─────────────────────────────────────────────
   Tiny reusable section-header
───────────────────────────────────────────── */
function SectionHeader({ label, title, accent }) {
  return (
    <div className='text-center mb-16'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className='inline-flex items-center gap-2.5 bg-white border border-gray-200/80
                   text-gray-500 text-[11px] font-semibold tracking-[0.18em] uppercase
                   px-4 py-1.5 rounded-full mb-5 shadow-sm'>
        <span className='w-1.5 h-1.5 rounded-full bg-green-400' />
        {label}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className='text-[42px] md:text-[54px] font-bold tracking-tight leading-[1.08] text-gray-950'>
        {title}{' '}
        <span className='text-green-600 italic font-serif font-normal'>{accent}</span>
      </motion.h2>
    </div>
  )
}


function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex flex-col' style={{ background: '#f5f6f2' }}>
      <Navbar />

      {/* ══════════════════════════════════════
          GLOBAL BACKGROUND LAYER
      ══════════════════════════════════════ */}
      <div className='flex-1 relative overflow-hidden'>

        {/* layered mesh background */}
        <div className='absolute inset-0 pointer-events-none'>
          {/* top centre aurora */}
          <div className='absolute -top-56 left-1/2 -translate-x-1/2 w-[1100px] h-[600px]'
            style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(167,243,208,0.52) 0%,rgba(209,250,229,0.18) 55%,transparent 80%)' }} />
          {/* right float */}
          <div className='absolute top-[30%] -right-48 w-[500px] h-[500px] rounded-full'
            style={{ background: 'radial-gradient(circle,rgba(187,247,208,0.22) 0%,transparent 65%)' }} />
          {/* left float */}
          <div className='absolute top-[55%] -left-32 w-[420px] h-[420px] rounded-full'
            style={{ background: 'radial-gradient(circle,rgba(220,252,231,0.28) 0%,transparent 65%)' }} />
          {/* micro dot grid */}
          <div className='absolute inset-0'
            style={{ backgroundImage: 'radial-gradient(rgba(22,101,52,0.07) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
          {/* diagonal line accent — top-right corner */}
          <svg className='absolute top-0 right-0 w-[420px] opacity-[0.035]' viewBox='0 0 420 420' fill='none'>
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={i} x1={i * 28} y1='0' x2='420' y2={420 - i * 28} stroke='#166534' strokeWidth='1' />
            ))}
          </svg>
        </div>

        <div className='px-6 relative'>
          <div className='max-w-6xl mx-auto'>

            {/* ══════════════════════════════════════
                HERO
            ══════════════════════════════════════ */}
            <section className='pt-24 pb-36 text-center'>

              {/* pill */}
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='inline-flex items-center gap-2 bg-white/95 backdrop-blur-md
                           border border-green-200 text-green-700 text-xs font-semibold
                           tracking-wide px-5 py-2 rounded-full shadow-md shadow-green-100/60 mb-10'>
                <HiSparkles size={13} className='text-green-500' />
                AI Powered Smart Interview Platform
                <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
              </motion.div>

              {/* headline */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className='text-[52px] md:text-[76px] font-extrabold leading-[1.04]
                           tracking-[-2px] text-gray-950 max-w-[820px] mx-auto mb-4'>
                Practice Interviews
                <br />
                <span className='relative inline-block mt-1'>
                  {/* multi-layer highlight */}
                  <span className='absolute inset-x-0 bottom-0 h-[48%] rounded-xl -z-10'
                    style={{ background: 'linear-gradient(90deg,rgba(134,239,172,0.45),rgba(74,222,128,0.28))' }} />
                  <span className='absolute inset-x-0 -bottom-1.5 h-1 rounded-full -z-10'
                    style={{ background: 'linear-gradient(90deg,#16a34a,#4ade80)' }} />
                  <span className='text-green-600'>with AI Intelligence</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.18 }}
                className='text-gray-500 mt-7 max-w-[480px] mx-auto text-[17.5px] leading-[1.7] font-normal'>
                Role-based mock interviews with smart follow-ups,
                adaptive difficulty and real-time performance evaluation.
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className='flex flex-wrap justify-center gap-3 mt-10'>

                <motion.button
                  onClick={() => { if (!userData) { setShowAuth(true); return; } navigate("/interview") }}
                  whileHover={{ scale: 1.035 }}
                  whileTap={{ scale: 0.97 }}
                  className='group relative overflow-hidden text-white px-11 py-4 rounded-full
                             text-[15px] font-semibold shadow-xl transition-all duration-300'
                  style={{ background: 'linear-gradient(135deg,#111 0%,#1a1a1a 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.18),0 2px 8px rgba(0,0,0,0.12)' }}>
                  {/* sweep shimmer on hover */}
                  <span className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full'
                    style={{ background: 'linear-gradient(135deg,#16a34a 0%,#22c55e 60%,#4ade80 100%)' }} />
                  <span className='relative flex items-center gap-2.5'>
                    Start Interview
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                      <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => { if (!userData) { setShowAuth(true); return; } navigate("/history") }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className='border border-gray-200 bg-white/85 backdrop-blur-sm text-gray-700
                             px-11 py-4 rounded-full text-[15px] font-medium
                             hover:border-green-300 hover:bg-white hover:shadow-lg
                             transition-all duration-300 shadow-sm'>
                  View History
                </motion.button>
              </motion.div>

              {/* social proof */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.48 }}
                className='flex flex-wrap items-center justify-center gap-5 mt-12'>
                {[
                  { num: '50K+', label: 'Interviews done' },
                  { num: '94%', label: 'Success rate' },
                  { num: '4.9 ★', label: 'User rating' },
                ].map((s, i) => (
                  <div key={i} className='flex items-center gap-2'>
                    {i > 0 && <span className='w-px h-4 bg-gray-300' />}
                    <span className='text-gray-900 font-bold text-[15px]'>{s.num}</span>
                    <span className='text-gray-400 text-sm'>{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </section>


            {/* ══════════════════════════════════════
                HOW IT WORKS — step cards
            ══════════════════════════════════════ */}
            <section className='mb-36'>
              <SectionHeader label='How it works' title='Three steps to' accent='interview-ready' />

              <div className='flex flex-col md:flex-row justify-center items-stretch gap-5'>
                {[
                  { icon: <BsRobot size={22} />, step: 'STEP 1', title: 'Role & Experience Selection', desc: 'AI adjusts difficulty based on selected job role.', rotate: '-rotate-[2.5deg]', accent: 'group-hover:from-emerald-400/20 group-hover:to-green-300/10' },
                  { icon: <BsMic size={22} />,   step: 'STEP 2', title: 'Smart Voice Interview',       desc: 'Dynamic follow-up questions based on your answers.', rotate: 'rotate-[2deg] md:-mt-5', accent: 'group-hover:from-blue-400/15 group-hover:to-indigo-300/10' },
                  { icon: <BsClock size={22} />, step: 'STEP 3', title: 'Timer Based Simulation',     desc: 'Real interview pressure with time tracking.', rotate: '-rotate-[1.5deg]', accent: 'group-hover:from-violet-400/15 group-hover:to-purple-300/10' },
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.13 }}
                    whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
                    className={`group relative flex-1 bg-white rounded-[22px] border border-gray-100/90
                                p-9 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.13)]
                                hover:border-green-200 transition-all duration-350 overflow-hidden ${item.rotate}`}>

                    {/* per-card gradient wash on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 ${item.accent} transition-opacity duration-400 pointer-events-none`} />

                    {/* top line */}
                    <div className='flex items-center gap-3 mb-7'>
                      <span className='text-[10.5px] font-black tracking-[0.22em] text-gray-300 group-hover:text-green-500 transition-colors duration-300'>{item.step}</span>
                      <span className='flex-1 h-px bg-gray-100 group-hover:bg-green-100 transition-colors duration-300' />
                    </div>

                    {/* icon */}
                    <div className='relative w-13 h-13 mb-6'>
                      <div className='w-12 h-12 rounded-2xl flex items-center justify-center text-green-600
                                      bg-green-50 border border-green-100 shadow-sm
                                      group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500
                                      group-hover:shadow-[0_8px_24px_rgba(34,197,94,0.3)]
                                      transition-all duration-300'>
                        {item.icon}
                      </div>
                      {/* pulse ring on hover */}
                      <div className='absolute inset-0 rounded-2xl border-2 border-green-400 opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500' />
                    </div>

                    <h3 className='font-bold text-gray-900 text-[17px] leading-snug mb-2.5'>{item.title}</h3>
                    <p className='text-sm text-gray-500 leading-relaxed'>{item.desc}</p>

                    {/* corner shine */}
                    <div className='absolute top-0 right-0 w-28 h-28 rounded-[22px]
                                    bg-gradient-to-bl from-green-50/90 to-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none' />
                  </motion.div>
                ))}
              </div>
            </section>


            {/* ══════════════════════════════════════
                ADVANCED AI CAPABILITIES
            ══════════════════════════════════════ */}
            <section className='mb-36'>
              <SectionHeader label='Capabilities' title='Advanced' accent='AI Features' />

              <div className='grid md:grid-cols-2 gap-5'>
                {[
                  { image: evalImg,      icon: <BsBarChart size={18} />,       tag: 'Evaluation', tagCls: 'bg-blue-50 text-blue-600 border-blue-100',   iconBg: 'bg-blue-600',   title: 'AI Answer Evaluation',    desc: 'Scores communication, technical accuracy and confidence.' },
                  { image: resumeImg,    icon: <BsFileEarmarkText size={18} />, tag: 'Resume',     tagCls: 'bg-violet-50 text-violet-600 border-violet-100', iconBg: 'bg-violet-600', title: 'Resume Based Interview',  desc: 'Project-specific questions based on uploaded resume.' },
                  { image: pdfImg,       icon: <BsFileEarmarkText size={18} />, tag: 'Reports',    tagCls: 'bg-amber-50 text-amber-600 border-amber-100',  iconBg: 'bg-amber-500',  title: 'Downloadable PDF Report', desc: 'Detailed strengths, weaknesses and improvement insights.' },
                  { image: analyticsImg, icon: <BsBarChart size={18} />,        tag: 'Analytics',  tagCls: 'bg-green-50 text-green-700 border-green-100',  iconBg: 'bg-green-600',  title: 'History & Analytics',     desc: 'Track progress with performance graphs and topic analysis.' },
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ y: -5 }}
                    className='group relative bg-white border border-gray-100 rounded-[22px] p-8
                               shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.11)]
                               hover:border-green-150 transition-all duration-350 overflow-hidden'>

                    {/* top-right glow wash */}
                    <div className='absolute top-0 right-0 w-52 h-52 opacity-0 group-hover:opacity-100
                                    transition-opacity duration-500 pointer-events-none'
                      style={{ background: 'radial-gradient(circle at 80% 20%,rgba(187,247,208,0.35) 0%,transparent 65%)' }} />

                    <div className='flex flex-col md:flex-row items-center gap-8'>

                      {/* image panel */}
                      <div className='w-full md:w-[44%] bg-gradient-to-br from-gray-50 to-gray-100/50
                                      rounded-2xl border border-gray-100 p-5 flex justify-center
                                      group-hover:from-green-50/60 group-hover:to-emerald-50/30 transition-colors duration-400'>
                        <img src={item.image} alt={item.title}
                          className='w-full h-auto object-contain max-h-52 drop-shadow-md' />
                      </div>

                      <div className='w-full md:w-[56%]'>
                        {/* tag */}
                        <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold
                                         tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full
                                         border mb-5 ${item.tagCls}`}>
                          <span className='w-1 h-1 rounded-full bg-current' />
                          {item.tag}
                        </div>

                        {/* icon badge */}
                        <div className={`w-11 h-11 rounded-xl ${item.iconBg} text-white flex items-center
                                          justify-center mb-5 shadow-lg transition-transform duration-300
                                          group-hover:scale-110 group-hover:rotate-3`}>
                          {item.icon}
                        </div>

                        <h3 className='font-bold text-gray-900 text-[20px] mb-2.5 leading-snug'>{item.title}</h3>
                        <p className='text-gray-500 text-[14px] leading-relaxed'>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>


            {/* ══════════════════════════════════════
                MULTIPLE INTERVIEW MODES
            ══════════════════════════════════════ */}
            <section className='mb-36'>
              <SectionHeader label='Interview Modes' title='Multiple Interview' accent='Modes' />

              <div className='grid md:grid-cols-2 gap-5'>
                {[
                  { img: hrImg,         tag: 'HR',      tagCls: 'bg-blue-50 text-blue-600 border-blue-100',      imgBg: 'from-blue-50 to-indigo-50/60 border-blue-100',     glow: 'rgba(96,165,250,0.15)',   title: 'HR Interview Mode',    desc: 'Behavioral and communication based evaluation.' },
                  { img: techImg,       tag: 'Tech',    tagCls: 'bg-violet-50 text-violet-600 border-violet-100', imgBg: 'from-violet-50 to-purple-50/60 border-violet-100', glow: 'rgba(167,139,250,0.15)', title: 'Technical Mode',       desc: 'Deep technical questioning based on selected role.' },
                  { img: confidenceImg, tag: 'Voice',   tagCls: 'bg-amber-50 text-amber-600 border-amber-100',    imgBg: 'from-amber-50 to-orange-50/60 border-amber-100',   glow: 'rgba(251,191,36,0.15)',  title: 'Confidence Detection', desc: 'Basic tone and voice analysis insights.' },
                  { img: creditImg,     tag: 'Premium', tagCls: 'bg-green-50 text-green-700 border-green-100',    imgBg: 'from-green-50 to-emerald-50/60 border-green-100',  glow: 'rgba(74,222,128,0.18)',  title: 'Credits System',       desc: 'Unlock premium interview sessions easily.' },
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                    className='group relative bg-white border border-gray-100 rounded-[22px] p-8
                               shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.11)]
                               transition-all duration-350 overflow-hidden'>

                    {/* per-mode glow */}
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
                      style={{ background: `radial-gradient(circle at 85% 50%,${mode.glow} 0%,transparent 60%)` }} />

                    <div className='flex items-center justify-between gap-6'>
                      <div className='flex-1 min-w-0'>
                        <div className={`inline-flex items-center text-[11px] font-bold tracking-[0.16em]
                                          uppercase px-3.5 py-1.5 rounded-full border mb-5 ${mode.tagCls}`}>
                          {mode.tag}
                        </div>
                        <h3 className='font-bold text-gray-900 text-[19px] mb-2.5 leading-snug'>{mode.title}</h3>
                        <p className='text-gray-500 text-[14px] leading-relaxed'>{mode.desc}</p>
                      </div>

                      {/* image box */}
                      <div className={`w-[92px] h-[92px] rounded-2xl border bg-gradient-to-br
                                        flex items-center justify-center flex-shrink-0
                                        group-hover:scale-110 group-hover:shadow-xl
                                        transition-all duration-350 ${mode.imgBg}`}>
                        <img src={mode.img} alt={mode.title} className='w-[58px] h-[58px] object-contain drop-shadow-sm' />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>


            {/* ══════════════════════════════════════
                FINAL CTA STRIP
            ══════════════════════════════════════ */}
            <motion.section
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className='relative mb-20 rounded-[28px] overflow-hidden text-center py-24 px-10'
              style={{ background: 'linear-gradient(135deg,#0a0f0a 0%,#0d1a0d 40%,#0a120a 100%)' }}>

              {/* layered glows */}
              <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] rounded-full'
                  style={{ background: 'radial-gradient(ellipse,rgba(74,222,128,0.13) 0%,transparent 65%)', filter: 'blur(2px)' }} />
                <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px]'
                  style={{ background: 'radial-gradient(ellipse,rgba(134,239,172,0.07) 0%,transparent 70%)' }} />
              </div>

              {/* noise / dot grid */}
              <div className='absolute inset-0 opacity-[0.032]'
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px,transparent 1px)', backgroundSize: '22px 22px' }} />

              {/* diagonal accent lines */}
              <svg className='absolute inset-0 w-full h-full opacity-[0.04]' preserveAspectRatio='none'>
                <defs>
                  <pattern id='diag' width='40' height='40' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
                    <line x1='0' y1='0' x2='0' y2='40' stroke='#4ade80' strokeWidth='1' />
                  </pattern>
                </defs>
                <rect width='100%' height='100%' fill='url(#diag)' />
              </svg>

              <div className='relative z-10'>
                <div className='inline-flex items-center gap-2 text-green-400 text-[11px] font-semibold
                               tracking-[0.18em] uppercase mb-6 bg-green-400/10 px-4 py-2 rounded-full
                               border border-green-400/25 backdrop-blur-sm'>
                  <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
                  Ready to level up?
                </div>

                <h2 className='text-white text-[44px] md:text-[58px] font-extrabold tracking-[-1.5px] leading-[1.06] mb-4'>
                  Ace your next{' '}
                  <span className='text-green-400 italic font-serif font-normal'>interview</span>
                </h2>

                <p className='text-gray-400 text-[17px] mb-11 max-w-[420px] mx-auto leading-[1.7]'>
                  Join thousands of candidates already practicing with AI.
                </p>

                <motion.button
                  onClick={() => { if (!userData) { setShowAuth(true); return; } navigate("/interview") }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className='relative overflow-hidden text-white px-14 py-4.5 rounded-full text-[15px]
                             font-semibold inline-flex items-center gap-2.5 transition-all duration-300'
                  style={{
                    background: 'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)',
                    boxShadow: '0 0 0 1px rgba(74,222,128,0.3),0 8px 32px rgba(34,197,94,0.35)',
                  }}>
                  {/* shimmer sweep */}
                  <span className='absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300'
                    style={{ background: 'linear-gradient(100deg,transparent 20%,rgba(255,255,255,0.15) 50%,transparent 80%)' }} />
                  <span className='relative'>Start Free Interview</span>
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='relative'>
                    <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.9' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </motion.button>

                {/* trust micro-copy */}
                <p className='text-gray-600 text-[13px] mt-6 flex items-center justify-center gap-2'>
                  <svg width='13' height='13' viewBox='0 0 16 16' fill='none'>
                    <path d='M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.6l-3.7 2 .7-4.1L2 5.6l4.2-.6L8 1z' fill='#4ade80' />
                  </svg>
                  No credit card required · Free to start
                </p>
              </div>
            </motion.section>

          </div>{/* /max-w */}
        </div>{/* /px-6 */}
      </div>{/* /flex-1 */}

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home