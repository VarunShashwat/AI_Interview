import React from 'react'
import { FaArrowLeft, FaDownload, FaTrophy, FaBrain, FaComments, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'linear-gradient(145deg,#0d1f0d,#0a160a)',
        border: '1px solid rgba(74,222,128,0.25)',
        borderRadius: '12px',
        padding: '10px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '13px' }}>{label}</p>
        <p style={{ color: '#fff', fontSize: '13px' }}>Score: <span style={{ color: '#4ade80', fontWeight: 700 }}>{payload[0].value}/10</span></p>
      </div>
    );
  }
  return null;
};

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f5f6f2' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-green-400 border-t-transparent animate-spin" />
          <p className="text-gray-500 font-medium">Loading Report...</p>
        </div>
      </div>
    );
  }

  const navigate = useNavigate()
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence, icon: <FaBrain size={13} /> },
    { label: "Communication", value: communication, icon: <FaComments size={13} /> },
    { label: "Correctness", value: correctness, icon: <FaCheckCircle size={13} /> },
  ];

  let performanceText = "";
  let shortTagline = "";
  let performanceBadge = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
    performanceBadge = "Excellent";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
    performanceBadge = "Good";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
    performanceBadge = "Needs Work";
  }

  const percentage = (finalScore / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let currentY = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, { align: "center" });
    currentY += 5;
    doc.setDrawColor(34, 197, 94);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
    currentY += 15;

    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 12, { align: "center" });
    currentY += 30;

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");
    doc.setFontSize(12);
    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);
    currentY += 45;

    let advice = finalScore >= 8
      ? "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples."
      : finalScore >= 5
        ? "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples."
        : "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);
    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);
    currentY += 50;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [`${i + 1}`, q.question, `${q.score}/10`, q.feedback]),
      styles: { fontSize: 9, cellPadding: 5, valign: "top" },
      headStyles: { fillColor: [34, 197, 94], textColor: 255, halign: "center" },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 55 },
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: "auto" },
      },
      alternateRowStyles: { fillColor: [249, 250, 251] },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='min-h-screen px-4 sm:px-6 lg:px-10 py-8 relative overflow-hidden'
      style={{ background: '#f5f6f2' }}>

      {/* ── ambient background (matching Step1) ── */}
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
          transition={{ duration: 0.5 }}
          className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>

          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate("/history")}
              className='p-3 rounded-2xl bg-white/90 shadow-md hover:shadow-lg border border-white/80
                         hover:border-green-200 transition-all duration-250 backdrop-blur-sm group'>
              <FaArrowLeft className='text-gray-500 group-hover:text-green-600 transition-colors duration-200' />
            </button>
            <div>
              <div className='inline-flex items-center gap-2 bg-green-400/10 border border-green-400/25
                              text-green-700 text-[11px] font-semibold tracking-[0.16em] uppercase
                              px-4 py-1.5 rounded-full mb-2'>
                <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
                AI Analysis Complete
              </div>
              <h1 className='text-[28px] font-extrabold tracking-[-1px] text-gray-950 leading-none'>
                Interview{' '}
                <span className='text-green-600 italic font-serif font-normal'>Analytics</span>
              </h1>
              <p className='text-gray-400 text-[13px] mt-1'>AI-powered performance insights</p>
            </div>
          </div>

          <motion.button
            onClick={downloadPDF}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            className='group relative overflow-hidden inline-flex items-center gap-2.5 text-white px-6 py-3.5
                       rounded-2xl text-[14px] font-bold shadow-lg transition-all duration-300'
            style={{ background: 'linear-gradient(135deg,#111 0%,#1a1a1a 100%)', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <span className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 rounded-2xl'
              style={{ background: 'linear-gradient(135deg,#16a34a 0%,#22c55e 55%,#4ade80 100%)' }} />
            <FaDownload className='relative text-[13px]' />
            <span className='relative'>Download PDF</span>
          </motion.button>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

          {/* ════ LEFT COLUMN ════ */}
          <div className='space-y-5'>

            {/* Score Card — dark panel like Step1 left */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='relative rounded-[24px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)]
                         border border-white/10'
              style={{ background: 'linear-gradient(145deg,#0d1f0d 0%,#0a160a 50%,#0d1a0d 100%)' }}>

              {/* panel glows */}
              <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-10 -left-10 w-[240px] h-[240px] rounded-full'
                  style={{ background: 'radial-gradient(circle,rgba(74,222,128,0.12) 0%,transparent 65%)' }} />
                <div className='absolute bottom-0 right-0 w-[180px] h-[180px] rounded-full'
                  style={{ background: 'radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 65%)' }} />
                <div className='absolute inset-0'
                  style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
              </div>

              <div className='relative z-10 p-8 text-center'>
                <div className='inline-flex items-center gap-2 bg-green-400/10 border border-green-400/25
                                text-green-400 text-[11px] font-semibold tracking-[0.14em] uppercase
                                px-4 py-1.5 rounded-full mb-6'>
                  <FaTrophy size={10} />
                  Final Score
                </div>

                {/* Circular progress */}
                <div className='relative w-32 h-32 mx-auto mb-5'>
                  {/* outer glow ring */}
                  <div className='absolute inset-[-6px] rounded-full opacity-20'
                    style={{ background: 'conic-gradient(#4ade80 0%, transparent 60%)' }} />
                  <CircularProgressbar
                    value={percentage}
                    text={`${finalScore}/10`}
                    styles={buildStyles({
                      textSize: '20px',
                      pathColor: '#4ade80',
                      textColor: '#ffffff',
                      trailColor: 'rgba(255,255,255,0.08)',
                      strokeLinecap: 'round',
                    })}
                  />
                </div>

                {/* performance badge */}
                <div className='inline-flex items-center gap-2 bg-green-500/15 border border-green-400/30
                                text-green-400 px-4 py-1.5 rounded-full text-[13px] font-bold mb-3'>
                  {performanceBadge}
                </div>

                <p className='text-white font-semibold text-[14px] leading-snug mb-1'>{performanceText}</p>
                <p className='text-gray-500 text-[12px]'>{shortTagline}</p>

                {/* divider */}
                <div className='mt-6 pt-6 border-t border-white/[0.07]'>
                  <div className='flex items-center justify-center gap-5 text-[12px]'>
                    <div className='text-center'>
                      <p className='text-white font-bold text-[16px]'>{questionWiseScore.length}</p>
                      <p className='text-gray-500'>Questions</p>
                    </div>
                    <span className='w-px h-8 bg-white/10' />
                    <div className='text-center'>
                      <p className='text-green-400 font-bold text-[16px]'>{finalScore}/10</p>
                      <p className='text-gray-500'>Score</p>
                    </div>
                    <span className='w-px h-8 bg-white/10' />
                    <div className='text-center'>
                      <p className='text-white font-bold text-[16px]'>{percentage.toFixed(0)}%</p>
                      <p className='text-gray-500'>Percentile</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skill Evaluation — white card */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='bg-white/90 backdrop-blur-sm rounded-[24px] shadow-[0_4px_32px_rgba(0,0,0,0.07)]
                         border border-white/80 p-7'>
              <h3 className='text-[15px] font-extrabold tracking-[-0.5px] text-gray-900 mb-6 flex items-center gap-2'>
                <span className='w-1 h-5 rounded-full bg-green-500 inline-block' />
                Skill Evaluation
              </h3>

              <div className='space-y-5'>
                {skills.map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.1 }}>
                    <div className='flex justify-between items-center mb-2'>
                      <div className='flex items-center gap-2 text-gray-600 text-[13px] font-semibold'>
                        <span className='w-6 h-6 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600'>
                          {s.icon}
                        </span>
                        {s.label}
                      </div>
                      <span className='text-green-600 font-bold text-[14px]'>{s.value}<span className='text-gray-300 font-normal'>/10</span></span>
                    </div>
                    <div className='bg-gray-100 h-2.5 rounded-full overflow-hidden'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.value * 10}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                        className='h-full rounded-full'
                        style={{ background: 'linear-gradient(90deg,#16a34a,#4ade80)' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ════ RIGHT COLUMN ════ */}
          <div className='lg:col-span-2 space-y-5'>

            {/* Performance Trend */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className='bg-white/90 backdrop-blur-sm rounded-[24px] shadow-[0_4px_32px_rgba(0,0,0,0.07)]
                         border border-white/80 p-7'>
              <h3 className='text-[15px] font-extrabold tracking-[-0.5px] text-gray-900 mb-6 flex items-center gap-2'>
                <span className='w-1 h-5 rounded-full bg-green-500 inline-block' />
                Performance Trend
              </h3>

              <div className='h-60'>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={questionScoreData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="score" stroke="#22c55e" fill="url(#areaGrad)" strokeWidth={2.5} dot={{ fill: '#22c55e', r: 4, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#16a34a' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Question Breakdown */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className='bg-white/90 backdrop-blur-sm rounded-[24px] shadow-[0_4px_32px_rgba(0,0,0,0.07)]
                         border border-white/80 p-7'>
              <h3 className='text-[15px] font-extrabold tracking-[-0.5px] text-gray-900 mb-6 flex items-center gap-2'>
                <span className='w-1 h-5 rounded-full bg-green-500 inline-block' />
                Question Breakdown
              </h3>

              <div className='space-y-4'>
                {questionWiseScore.map((q, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className='group relative rounded-2xl border border-gray-100 overflow-hidden
                               hover:border-green-200 hover:shadow-[0_4px_20px_rgba(34,197,94,0.08)]
                               transition-all duration-250'
                    style={{ background: 'linear-gradient(135deg,#fafafa 0%,#f9fafb 100%)' }}>

                    {/* number accent */}
                    <div className='absolute top-0 left-0 w-1 h-full rounded-l-2xl'
                      style={{
                        background: q.score >= 7
                          ? 'linear-gradient(180deg,#22c55e,#4ade80)'
                          : q.score >= 5
                            ? 'linear-gradient(180deg,#f59e0b,#fcd34d)'
                            : 'linear-gradient(180deg,#ef4444,#f87171)'
                      }} />

                    <div className='pl-5 pr-5 pt-4 pb-4'>
                      <div className='flex items-start justify-between gap-3 mb-3'>
                        <div className='flex items-start gap-3 flex-1 min-w-0'>
                          {/* Q number badge — dark like Step1 */}
                          <div className='flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center
                                          text-[11px] font-extrabold text-green-400'
                            style={{ background: 'linear-gradient(145deg,#0d1f0d,#0a160a)', border: '1px solid rgba(74,222,128,0.2)' }}>
                            Q{i + 1}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-[13px] text-gray-400 font-medium mb-0.5'>Question {i + 1}</p>
                            <p className='font-semibold text-gray-800 text-[14px] leading-snug'>
                              {q.question || "Question not available"}
                            </p>
                          </div>
                        </div>

                        {/* Score badge */}
                        <div className='flex-shrink-0 flex flex-col items-center'>
                          <div className='px-3 py-1 rounded-full text-[12px] font-bold border'
                            style={{
                              background: q.score >= 7 ? 'rgba(34,197,94,0.08)' : q.score >= 5 ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)',
                              color: q.score >= 7 ? '#16a34a' : q.score >= 5 ? '#d97706' : '#dc2626',
                              borderColor: q.score >= 7 ? 'rgba(34,197,94,0.25)' : q.score >= 5 ? 'rgba(245,158,11,0.25)' : 'rgba(239,68,68,0.25)',
                            }}>
                            {q.score ?? 0}/10
                          </div>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div className='relative rounded-xl p-4 overflow-hidden'
                        style={{ background: 'linear-gradient(135deg,rgba(240,253,244,0.8),rgba(220,252,231,0.4))', border: '1px solid rgba(134,239,172,0.3)' }}>
                        <div className='absolute top-0 right-0 w-20 h-20 pointer-events-none'
                          style={{ background: 'radial-gradient(circle at 80% 20%,rgba(187,247,208,0.4) 0%,transparent 65%)' }} />
                        <p className='text-[10px] text-green-600 font-bold tracking-[0.1em] uppercase mb-1.5'>AI Feedback</p>
                        <p className='text-[13px] text-gray-700 leading-relaxed relative'>
                          {q.feedback && q.feedback.trim() !== "" ? q.feedback : "No feedback available for this question."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Step3Report