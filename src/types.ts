export interface Product {
  id: string;
  name: string;
  category: "cleanser" | "toner" | "serum" | "moisturizer" | "sunscreen" | "mask" | "treatment" | "lipstick" | "eyes" | "accessories";
  tags: string[];
  price: number;
  attributes: {
    skinType?: string[];
    concern?: string[];
    finish?: string;
    shade?: string;
  };
  description: string;
}

export interface RoutineStep {
  step: number;
  product_id: string;
  usage_notes: string;
}

export interface TryOnSuggestion {
  category: "lipstick" | "eyes" | "accessories";
  product_id: string;
  reason: string;
}

export interface AuraFitResponse {
  explanation: string;
  key_concerns: string[];
  morning_routine: RoutineStep[];
  evening_routine: RoutineStep[];
  try_on_suggestions: TryOnSuggestion[];
}

export interface SkinAnalysisResult {
  scores: {
    hydration: number; // 0-100 (high is good)
    oiliness: number; // 0-100 (low is balanced)
    texture: number; // 0-100 (high is smooth)
    redness: number; // 0-100 (low is calm)
    acne: number; // 0-100 (low is clear)
  };
  concerns: string[];
}
