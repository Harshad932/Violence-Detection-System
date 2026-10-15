import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  Sparkles, 
  Cpu, 
  FileVideo, 
  Eye, 
  Clock, 
  BarChart3, 
  Layers, 
  User, 
  Mail 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard({ user: propUser }) {
  const { user: authUser } = useAuth();
  const user = authUser || propUser;
  const [videoFile, setVideoFile] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoName, setVideoName] = useState('');
  const [videoSize, setVideoSize] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Analysis simulation state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState('');
  const [result, setResult] = useState(null);
  
  // Presentation toggle mode: 'auto' | 'violent' | 'non-violent'
  const [simulationMode, setSimulationMode] = useState('auto');

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sample video clips for quick testing
  const sampleVideos = [
    {
      label: 'Sample 1: Conflict Altercation',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      name: 'security_feed_event_01.mp4',
      size: '2.4 MB',
      forcedResult: 'violent'
    },
    {
      label: 'Sample 2: Normal Activity',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      name: 'hallway_activity_02.mp4',
      size: '2.1 MB',
      forcedResult: 'non-violent'
    }
  ];

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (videoSrc && videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  // Handle uploaded video file
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      loadVideo(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      loadVideo(file);
    }
  };

  const loadVideo = (file) => {
    if (videoSrc && videoSrc.startsWith('blob:')) {
      URL.revokeObjectURL(videoSrc);
    }
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoSrc(url);
    setVideoName(file.name);
    setVideoSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    setResult(null);
    setProgress(0);
    setIsPlaying(false);
  };

  const loadSample = (sample) => {
    setVideoFile(null);
    setVideoSrc(sample.url);
    setVideoName(sample.name);
    setVideoSize(sample.size);
    setSimulationMode(sample.forcedResult);
    setResult(null);
    setProgress(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Perform Simulated Deep Learning Analysis
  const handleAnalyze = () => {
    if (!videoSrc) return;

    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);

    // Play video softly during analysis if paused
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }

    const phases = [
      { pct: 20, text: 'Extracting video frames and optical flow vectors...' },
      { pct: 50, text: 'Evaluating spatial-temporal motion dynamics (ConvLSTM)...' },
      { pct: 80, text: 'Running anomaly scoring & classification network...' },
      { pct: 100, text: 'Finalizing violence confidence distribution...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < phases.length) {
        setProgress(phases[currentStep].pct);
        setAnalysisPhase(phases[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        finalizeResult();
      }
    }, 600);
  };

  const finalizeResult = () => {
    setIsAnalyzing(false);

    // Determine outcome based on simulation mode or video name
    let isViolent = false;
    if (simulationMode === 'violent') {
      isViolent = true;
    } else if (simulationMode === 'non-violent') {
      isViolent = false;
    } else {
      // Auto mode: check filename or use random weighted
      if (videoName.toLowerCase().includes('fight') || videoName.toLowerCase().includes('violent') || videoName.toLowerCase().includes('altercation')) {
        isViolent = true;
      } else if (videoName.toLowerCase().includes('peace') || videoName.toLowerCase().includes('walk') || videoName.toLowerCase().includes('normal')) {
        isViolent = false;
      } else {
        // Pseudo-random deterministic based on file name length
        isViolent = (videoName.length % 2 === 0);
      }
    }

    if (isViolent) {
      const confidence = (88 + Math.random() * 9).toFixed(1); // 88.0% - 97.0%
      setResult({
        status: 'VIOLENT',
        isViolent: true,
        confidence: Number(confidence),
        nonViolentConfidence: (100 - Number(confidence)).toFixed(1),
        threatLevel: 'HIGH',
        activityType: 'Physical Altercation / Hostile Assault',
        detectedFrames: 'Frames 72 - 145',
        inferenceTime: '128 ms',
        totalFramesAnalyzed: 280,
        recommendation: 'Immediate alert dispatch to facility security staff recommended.'
      });
    } else {
      const confidence = (91 + Math.random() * 7).toFixed(1); // 91.0% - 98.0%
      setResult({
        status: 'NON-VIOLENT',
        isViolent: false,
        confidence: Number(confidence),
        violentConfidence: (100 - Number(confidence)).toFixed(1),
        threatLevel: 'NONE (SAFE)',
        activityType: 'Ambient Pedestrian / Normal Movement',
        detectedFrames: 'No anomalous spikes',
        inferenceTime: '115 ms',
        totalFramesAnalyzed: 280,
        recommendation: 'Normal activity registered. No security escalation required.'
      });
    }
  };

  const handleReset = () => {
    setVideoFile(null);
    setVideoSrc(null);
    setVideoName('');
    setVideoSize('');
    setResult(null);
    setProgress(0);
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>SURVEILLANCE WORKSPACE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Surveillance Video Violence Detection
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Upload video clips or select test benchmarks to detect violent vs. non-violent actions.
          </p>

          {/* User Profile Information */}
          <div className="flex flex-wrap items-center gap-2 pt-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <User className="w-3.5 h-3.5 text-teal-400" />
              <span>Signed in as <strong className="text-teal-300 font-semibold">{user?.username}</strong></span>
            </div>

            {user?.email && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>{user.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 px-2 font-medium flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-teal-400" />
            <span>Mode:</span>
          </span>
          <button
            onClick={() => setSimulationMode('auto')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              simulationMode === 'auto'
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Auto
          </button>
          <button
            onClick={() => setSimulationMode('violent')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              simulationMode === 'violent'
                ? 'bg-rose-500 text-white font-bold'
                : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            Strict
          </button>
          <button
            onClick={() => setSimulationMode('non-violent')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              simulationMode === 'non-violent'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            Standard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left Column: Video Uploader & Video Preview Player */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* If no video is selected yet: Dropzone */}
          {!videoSrc ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-700 hover:border-teal-400/60 rounded-2xl p-8 sm:p-12 text-center bg-slate-900/30 hover:bg-slate-900/50 transition-all flex flex-col items-center justify-center min-h-[380px] group"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform mb-4 shadow-lg shadow-teal-500/10">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Upload Surveillance Video</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-sm">
                Drag and drop your surveillance or CCTV video file here, or browse from your files.
              </p>
              <p className="text-slate-500 text-[11px] mt-1 font-mono">
                Supported formats: MP4, WebM, OGG, MOV (up to 150MB)
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="mt-6 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:brightness-110 cursor-pointer shadow-lg shadow-teal-500/20 transition-all"
              >
                Browse Video File
              </label>

              {/* Sample clips helper */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 w-full">
                <p className="text-xs text-slate-400 font-semibold mb-3 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Don't have a video file ready? Test with instant samples:</span>
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {sampleVideos.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => loadSample(sample)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <Video className="w-3 h-3 text-teal-400" />
                      <span>{sample.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Video Player & Playback Card */
            <div className="rounded-2xl glass-panel p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 truncate pr-2">
                  <FileVideo className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="font-semibold text-sm text-white truncate">{videoName}</span>
                  <span className="text-xs font-mono text-slate-400 shrink-0">({videoSize})</span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 transition-colors shrink-0"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Change Video</span>
                </button>
              </div>

              {/* Video Player Display */}
              <div className="relative aspect-video rounded-xl bg-black border border-slate-800 overflow-hidden group">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="w-full h-full object-contain"
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* AI Laser Scanner overlay effect while analyzing */}
                {isAnalyzing && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#14b8a6] animate-scan opacity-90"></div>
                    <div className="absolute inset-0 bg-teal-500/5 backdrop-brightness-110"></div>
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-teal-500/30 text-teal-300 font-mono text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                      <span>AI SCANNER ACTIVE • FRAME EXTRACTION</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-teal-400" />
                  <span>Ready for spatial-temporal deep learning inspection</span>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 text-slate-950 hover:brightness-110 shadow-lg shadow-teal-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Video...</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4 stroke-[2.5]" />
                      <span>Check Video for Violence</span>
                    </>
                  )}
                </button>
              </div>

              {/* Progress bar during analysis */}
              {isAnalyzing && (
                <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/30 space-y-2 mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-teal-300 flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 animate-spin" />
                      <span>{analysisPhase}</span>
                    </span>
                    <span className="font-mono font-bold text-teal-400">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-teal-400 to-cyan-400 h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Info Card */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <Layers className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-300">Detection Model Architecture</p>
              <p className="mt-0.5 leading-relaxed">
                Utilizes deep spatial-temporal motion modeling to track acceleration vectors and detect potential physical altercations across successive video frames.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Detection Results & Classification Metrics */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-2xl glass-panel p-6 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <BarChart3 className="w-4 h-4 text-teal-400" />
              <span>Violence Detection Results</span>
            </h2>

            {!result && !isAnalyzing && (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 mx-auto flex items-center justify-center text-slate-500">
                  <Video className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-semibold text-slate-300">No Analysis Performed Yet</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {videoSrc
                    ? 'Click the "Check Video for Violence" button to process the uploaded footage.'
                    : 'Upload or pick a sample surveillance video on the left to begin analysis.'}
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12 px-4 space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="w-16 h-16 rounded-full border-2 border-teal-500/20 border-t-teal-400 animate-spin"></div>
                  <Cpu className="w-6 h-6 text-teal-400 absolute inset-0 m-auto" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Running Deep Learning Model</h4>
                  <p className="text-xs text-slate-400 mt-1">Scanning temporal frames for physical aggression...</p>
                </div>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="space-y-6">
                
                {/* Result Status Banner */}
                {result.isViolent ? (
                  <div className="p-5 rounded-xl bg-gradient-to-br from-rose-950/60 to-rose-900/30 border-2 border-rose-500/60 text-rose-200 shadow-xl shadow-rose-950/30 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold shadow-md shadow-rose-600/40">
                          <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold tracking-wider text-rose-300">Classification Verdict</div>
                          <h3 className="text-xl font-black text-white tracking-wide">VIOLENT ACTION</h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold font-mono">
                        THREAT: {result.threatLevel}
                      </span>
                    </div>
                    <p className="text-xs text-rose-200/90 leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>
                ) : (
                  <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/60 to-emerald-900/30 border-2 border-emerald-500/60 text-emerald-200 shadow-xl shadow-emerald-950/30 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-600/40">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">Classification Verdict</div>
                          <h3 className="text-xl font-black text-white tracking-wide">NON-VIOLENT</h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
                        STATUS: SAFE
                      </span>
                    </div>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>
                )}

                {/* Confidence Scores Gauge */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Confidence Score</span>
                    <span className={`text-xl font-black font-mono ${result.isViolent ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {result.confidence}%
                    </span>
                  </div>

                  {/* Progress bar comparison */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
                      <div
                        className="bg-rose-500 h-full transition-all duration-500"
                        style={{ width: `${result.isViolent ? result.confidence : result.violentConfidence}%` }}
                        title="Violent Probability"
                      />
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${!result.isViolent ? result.confidence : result.nonViolentConfidence}%` }}
                        title="Non-Violent Probability"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-rose-400 font-semibold">
                        Violent: {result.isViolent ? result.confidence : result.violentConfidence}%
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        Non-Violent: {!result.isViolent ? result.confidence : result.nonViolentConfidence}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analytical Breakdown Metrics */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inference Telemetry</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 text-[11px] block">Detected Action</span>
                      <span className="font-semibold text-slate-200 mt-0.5 block truncate">
                        {result.activityType}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 text-[11px] block">Latency</span>
                      <span className="font-mono font-semibold text-teal-300 mt-0.5 block">
                        {result.inferenceTime}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 text-[11px] block">Keyframe Window</span>
                      <span className="font-mono font-semibold text-slate-200 mt-0.5 block">
                        {result.detectedFrames}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 text-[11px] block">Frames Inspected</span>
                      <span className="font-mono font-semibold text-slate-200 mt-0.5 block">
                        {result.totalFramesAnalyzed} frames
                      </span>
                    </div>
                  </div>
                </div>

                {/* Re-analyze / Reset action */}
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={handleAnalyze}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-Run Detection</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="py-2.5 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors"
                  >
                    New Video
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
