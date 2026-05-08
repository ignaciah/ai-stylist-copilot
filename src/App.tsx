import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Camera, 
  ChevronRight, 
  Sun, 
  Moon, 
  ExternalLink, 
  RefreshCw,
  AlertCircle,
  Filter,
  ArrowRight
} from "lucide-react";
import { PRODUCT_CATALOG } from "./constants";
import { SkinAnalysisResult, AuraFitResponse, Product } from "./types";
import { getAuraFitAdvice } from "./services/geminiService";

// UI Components
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-wider font-semibold text-white/60">
    {children}
  </span>
);

const SKIN_TYPES = ["all", "dry", "oily", "combination", "sensitive", "normal"] as const;
type SkinType = typeof SKIN_TYPES[number];

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AuraFitResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType>("all");

  const simulateAnalysis = async () => {
    setIsScanning(true);
    setLoading(true);
    setError(null);

    const mockAnalysis: SkinAnalysisResult = {
      scores: {
        hydration: 45,
        oiliness: 30,
        texture: 60,
        redness: 75,
        acne: 20
      },
      concerns: ["Dryness on cheeks", "Mild redness around nose", "Early fine lines"]
    };

    try {
      await new Promise(r => setTimeout(r, 2000));
      const advice = await getAuraFitAdvice(mockAnalysis);
      setResult(advice);
    } catch (err) {
      setError("Analysis failed. Please check your connection and try scanning again.");
    } finally {
      setIsScanning(false);
      setLoading(false);
    }
  };

  const getProduct = (id: string): Product | undefined => {
    return PRODUCT_CATALOG.find(p => p.id === id);
  };

  const filteredProducts = useMemo(() => {
    if (selectedSkinType === "all") return PRODUCT_CATALOG.filter(p => !["lipstick", "eyes", "accessories"].includes(p.category));
    
    return PRODUCT_CATALOG.filter(p => {
      if (["lipstick", "eyes", "accessories"].includes(p.category)) return false;
      const types = p.attributes.skinType || [];
      return types.includes("all") || types.includes(selectedSkinType);
    });
  }, [selectedSkinType]);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[50%] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24">
        <header className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 mb-6"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/50">AuraFit Concierge</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8"
          >
            Your Skin,<br />Refined.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto text-white/60 text-lg leading-relaxed"
          >
            Powered by advanced AI and Perfect Corp analysis to bring you a truly bespoke beauty experience.
          </motion.p>
        </header>

        <section className="space-y-24">
          {!result && !loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              <button 
                onClick={simulateAnalysis}
                className="w-full group relative overflow-hidden bg-white text-black py-6 px-8 rounded-full font-semibold text-lg flex items-center justify-center gap-3 transition-transform active:scale-95"
              >
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Camera className="w-6 h-6" />
                Start Skin Scan
              </button>
              <p className="mt-4 text-center text-white/40 text-xs uppercase tracking-widest">Requires Camera Access</p>
            </motion.div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 space-y-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-white/10" />
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 w-24 h-24 rounded-full border-t-2 border-white"
                />
              </div>
              <div className="text-center">
                <p className="text-xl font-light italic mb-2">Analyzing your unique glow...</p>
                <p className="text-white/40 text-xs uppercase tracking-widest">Powered by Perfect Corp API</p>
              </div>
            </div>
          )}

          {error && (
            <Card className="max-w-md mx-auto border-red-500/50 bg-red-500/5 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
              <p className="text-white/60 mb-6">{error}</p>
              <button 
                onClick={simulateAnalysis}
                className="bg-white text-black px-6 py-2 rounded-full font-semibold"
              >
                Try Again
              </button>
            </Card>
          )}

          <AnimatePresence>
            {result && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="flex justify-start">
                   <button 
                     onClick={() => setResult(null)}
                     className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest"
                   >
                     <RefreshCw className="w-4 h-4" />
                     New Analysis
                   </button>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  <div className="md:col-span-2">
                    <Badge>Analysis Summary</Badge>
                    <h2 className="text-3xl font-light mt-4 mb-6 leading-relaxed italic">
                      {result.explanation}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {result.key_concerns.map(concern => (
                        <div key={concern} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                          {concern}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm self-start">
                    <h3 className="text-xs uppercase tracking-widest text-white/40 mb-6">Expert Scores</h3>
                    <div className="space-y-6">
                      {[
                        { label: 'Hydration', value: 45 },
                        { label: 'Integrity', value: 75 },
                        { label: 'Luminosity', value: 60 }
                      ].map(stat => (
                        <div key={stat.label}>
                          <div className="flex justify-between text-xs mb-2 uppercase tracking-tighter italic font-light">
                            <span>{stat.label}</span>
                            <span>{stat.value}%</span>
                          </div>
                          <div className="h-[1px] bg-white/10 w-full relative">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.value}%` }}
                              className="absolute top-0 left-0 h-full bg-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                        <Sun className="w-5 h-5 text-amber-200" />
                      </div>
                      <h3 className="text-xl font-light">Morning Ritual</h3>
                    </div>
                    <div className="space-y-4">
                      {result.morning_routine.map((step) => {
                        const product = getProduct(step.product_id);
                        return (
                          <div key={step.step} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-[10px] font-mono text-white/30 tracking-tighter italic">Step 0{step.step}</span>
                              {product && <span className="text-xs font-semibold">${product.price}</span>}
                            </div>
                            <h4 className="text-lg font-medium mb-1">{product?.name || "Product Suggestion"}</h4>
                            <p className="text-sm text-white/60 mb-4">{step.usage_notes}</p>
                            {product && (
                              <div className="flex gap-2 flex-wrap">
                                {product.tags.map(tag => (
                                  <span key={tag} className="text-[10px] uppercase tracking-widest text-white/30 border border-white/5 px-2 py-0.5 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                        <Moon className="w-5 h-5 text-indigo-300" />
                      </div>
                      <h3 className="text-xl font-light">Evening Ritual</h3>
                    </div>
                    <div className="space-y-4">
                      {result.evening_routine.map((step) => {
                        const product = getProduct(step.product_id);
                        return (
                          <div key={step.step} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-[10px] font-mono text-white/30 tracking-tighter italic">Step 0{step.step}</span>
                              {product && <span className="text-xs font-semibold">${product.price}</span>}
                            </div>
                            <h4 className="text-lg font-medium mb-1">{product?.name || "Product Suggestion"}</h4>
                            <p className="text-sm text-white/60 mb-4">{step.usage_notes}</p>
                            {product && (
                                <div className="flex gap-2 flex-wrap">
                                  {product.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-widest text-white/30 border border-white/5 px-2 py-0.5 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {result.try_on_suggestions && result.try_on_suggestions.length > 0 && (
                  <div className="pt-12 border-t border-white/10">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <Badge>Virtual Experience</Badge>
                        <h3 className="text-4xl font-light mt-4 tracking-tight">Enhance Your Look</h3>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      {result.try_on_suggestions.map((suggestion, idx) => {
                        const product = getProduct(suggestion.product_id);
                        return (
                          <div key={idx} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-8 flex flex-col justify-end">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                            <div className="relative z-20">
                              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 block">{suggestion.category}</span>
                              <h4 className="text-xl font-medium mb-3">{product?.name || "Beauty Suggestion"}</h4>
                              <p className="text-xs text-white/60 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                {suggestion.reason}
                              </p>
                              <button className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold py-3 px-6 bg-white text-black rounded-full w-fit">
                                <ExternalLink className="w-3 h-3" />
                                Try On Now
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <section className="pt-24 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="max-w-xl">
                <Badge>Product Catalog</Badge>
                <h2 className="text-5xl font-light mt-4 tracking-tighter leading-tight">Discover Aura Essentials</h2>
                <p className="mt-4 text-white/50 text-lg">Browse our curated collection of high-performance skincare, filtered for your unique biology.</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {SKIN_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedSkinType(type)}
                    className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all border ${
                      selectedSkinType === type 
                        ? "bg-white text-black border-white" 
                        : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group flex flex-col justify-between p-8 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all min-h-[320px]"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <Badge>{product.category}</Badge>
                        <span className="text-lg font-light">${product.price}</span>
                      </div>
                      <h4 className="text-2xl font-medium leading-tight mb-4 group-hover:text-white/90 transition-colors uppercase tracking-tighter italic">
                        {product.name}
                      </h4>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex gap-1">
                        {product.attributes.skinType?.slice(0, 2).map(type => (
                          <span key={type} className="text-[8px] uppercase tracking-tighter font-bold px-1.5 py-0.5 rounded bg-white/5 text-white/30">
                            {type}
                          </span>
                        ))}
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <Filter className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 italic">No products found for this skin type yet.</p>
              </div>
            )}
          </section>

          <div className="py-24 text-center border-t border-white/5 mt-24">
            <h2 className="text-5xl font-light tracking-tighter mb-8 italic">Ready to transform?</h2>
            <button className="bg-white text-black px-12 py-6 rounded-full font-bold text-xl flex items-center justify-center gap-3 mx-auto transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Bag All Essentials
              <ChevronRight className="w-6 h-6" />
            </button>
            <p className="mt-8 text-white/40 text-sm">Powered by YouCan Checkout API</p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white/40" />
            <span className="text-lg font-light tracking-widest text-white/40 uppercase">AuraFit</span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Skin Safety</a>
            <a href="#" className="hover:text-white transition-colors">API Docs</a>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/20">© 2026 AuraFit Global</p>
        </div>
      </footer>
    </div>
  );
}

