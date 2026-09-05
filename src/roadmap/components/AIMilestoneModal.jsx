/**
 * AIMilestoneModal Component
 * Interactive modal that generates custom business milestones using live Groq / Gemini
 * and injects them directly into the entrepreneur's active roadmap.
 */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Sparkles,
  Bot,
  Zap,
  CheckCircle2,
  Clock,
  FileText,
  ArrowRight,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { aiService } from '../services/aiService';

export default function AIMilestoneModal() {
  const {
    isAIMilestoneModalOpen,
    setIsAIMilestoneModalOpen,
    profile,
    addCustomMilestone,
    setExpandedStageId
  } = useRoadmap();

  const [promptInput, setPromptInput] = useState('');
  const [targetStage, setTargetStage] = useState('GROWTH');
  const [provider, setProvider] = useState('gemini');
  const [loading, setLoading] = useState(false);
  const [generatedMilestone, setGeneratedMilestone] = useState(null);

  if (!isAIMilestoneModalOpen) return null;

  const presetGoals = [
    'Apply for Solar Rooftop 40% Subsidy',
    'NPOP Organic Certification for Agro Export',
    'Onboard on ONDC & GeM Government E-Marketplace',
    'Procure Cold-Chain Refrigerated Transport Unit',
    'GS1 Barcode & Retail Packaging Standardization'
  ];

  const handleGenerate = async (preset) => {
    const query = preset || promptInput;
    if (!query.trim()) return;

    setLoading(true);
    setGeneratedMilestone(null);

    try {
      const response = await aiService.askAI({
        provider,
        task: { title: query },
        context: {
          businessName: profile.businessName,
          sector: profile.industry,
          location: profile.location
        },
        question: `Create a concrete MSME roadmap task milestone for: "${query}". Provide a clear title, why this matters, 4 actionable numbered steps, estimated time, and required documents.`
      });

      if (response) {
        setGeneratedMilestone({
          title: query,
          stage: targetStage,
          description: response.answer || `Custom strategic milestone synthesized by ${response.provider || 'AI'}.`,
          whyThisMatters: response.why || 'Critical for expanding operational capacity and market access.',
          whatToDo: Array.isArray(response.whatToDo)
            ? response.whatToDo
            : [
                'Conduct feasibility assessment for target objective.',
                'Identify verified vendors and government guidelines.',
                'Assemble statutory applications and audit records.',
                'Submit filing and verify milestone completion.'
              ],
          estimatedTime: '3-5 days',
          priority: 'HIGH',
          requiredDocuments: []
        });
      }
    } catch (err) {
      console.error('Failed to generate milestone:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToRoadmap = () => {
    if (!generatedMilestone) return;
    addCustomMilestone(generatedMilestone);
    setExpandedStageId(generatedMilestone.stage);
    setIsAIMilestoneModalOpen(false);
    setGeneratedMilestone(null);
    setPromptInput('');
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsAIMilestoneModalOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-2xl border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                Synthesize Custom AI Milestone
              </h3>
              <p className="text-xs text-slate-400">
                Tailor your business roadmap with specialized goals powered by live AI
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAIMilestoneModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto">
          {/* Engine Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-slate-700">Intelligence Engine:</span>
            </div>
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setProvider('gemini')}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  provider === 'gemini'
                    ? 'bg-emerald-600 text-white shadow-soft-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Saathi Strategy Core
              </button>
              <button
                type="button"
                onClick={() => setProvider('grok')}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  provider === 'grok'
                    ? 'bg-emerald-800 text-white shadow-soft-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Saathi Tactical Core
              </button>
            </div>
          </div>

          {/* Preset Prompts */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Popular MSME Objectives
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presetGoals.map((goal, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptInput(goal);
                    handleGenerate(goal);
                  }}
                  disabled={loading}
                  className="text-left text-xs px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-slate-700 font-medium transition-all"
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Goal Input & Stage selection */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Enter Custom Enterprise Goal
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder="e.g. Set up direct B2B export supply chain to UAE"
                  className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  disabled={loading || !promptInput.trim()}
                  className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs shadow-soft-sm flex items-center gap-1.5 shrink-0 transition-all"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  <span>Generate</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold">Assign to Stage:</span>
              <select
                value={targetStage}
                onChange={(e) => setTargetStage(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="FEASIBILITY">02 Feasibility</option>
                <option value="SUPPORT">03 Govt Support</option>
                <option value="FUNDING">04 Funding</option>
                <option value="REGISTRATION">05 Registration</option>
                <option value="SETUP">06 Setup</option>
                <option value="LAUNCH">07 Launch</option>
                <option value="GROWTH">08 Growth & Scale</option>
              </select>
            </div>
          </div>

          {/* Generated Result Card Preview */}
          {generatedMilestone && (
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300/80 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase">
                      Generated Milestone
                    </span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-xs font-bold text-slate-700">Stage: {generatedMilestone.stage}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                    {generatedMilestone.title}
                  </h4>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{generatedMilestone.estimatedTime}</span>
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-emerald-200">
                {generatedMilestone.whyThisMatters}
              </p>

              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-900 block mb-1">
                  Synthesized Checkpoints
                </span>
                <div className="space-y-1">
                  {generatedMilestone.whatToDo.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleAddToRoadmap}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-soft-sm flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Add to My Roadmap</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}
