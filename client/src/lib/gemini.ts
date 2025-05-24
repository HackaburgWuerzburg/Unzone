const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface CoachResponse {
  message: string;
  encouragement: string;
  coinsAwarded?: number;
}

export class GeminiCoach {
  private responses = {
    completed: [
      "Amazing work! You absolutely crushed that challenge! 🎉",
      "Incredible courage shown today! You're unstoppable! ⭐",
      "Wow! That took real bravery. So proud of you! 💪",
      "You did it! Another step outside your comfort zone! 🚀",
      "Fantastic job! Your growth mindset is inspiring! ✨"
    ],
    skipped: [
      "No worries at all! Self-awareness is actually wisdom.",
      "That's totally okay! Timing matters in growth.",
      "I understand completely. You know yourself best.",
      "Sometimes stepping back is the right move.",
      "All good! Every day brings new opportunities."
    ],
    encouragements: [
      "Every comfort zone exit is a victory!",
      "You're becoming stronger with each challenge!",
      "Growth happens one brave step at a time!",
      "Your courage inspires everyone around you!",
      "Small steps lead to big transformations!"
    ]
  };

  private getRandomResponse(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  private async callGemini(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "I'm here to support you on your growth journey!";
    } catch (error) {
      console.error('Gemini API error:', error);
      return "I'm experiencing some technical difficulties, but I'm still here to cheer you on! 🌟";
    }
  }

  async handleChallengeCompletion(
    challengeTitle: string, 
    userExperience: string,
    userName: string = "friend"
  ): Promise<CoachResponse> {
    const prompt = `You are a warm, encouraging life coach helping someone grow outside their comfort zone. 

Challenge completed: "${challengeTitle}"
User's experience: "${userExperience}"

Respond as a supportive coach in 2-3 sentences. Be personal, celebrate their courage, and acknowledge their specific experience. Give them 5-10 courage coins as a reward. Keep it upbeat and motivating.

Format your response as:
COACH_MESSAGE: [your encouraging response]
COINS: [number between 5-10]`;

    const response = await this.callGemini(prompt);
    
    // Parse the response
    const coachMatch = response.match(/COACH_MESSAGE:\s*(.*?)(?=COINS:|$)/s);
    const coinsMatch = response.match(/COINS:\s*(\d+)/);
    
    return {
      message: coachMatch?.[1]?.trim() || `Amazing work on "${challengeTitle}"! Every step outside your comfort zone is building your confidence. I'm so proud of your courage! 🌟`,
      encouragement: "You're growing stronger with each challenge!",
      coinsAwarded: parseInt(coinsMatch?.[1] || "7")
    };
  }

  async handleChallengeSkip(
    challengeTitle: string,
    reason: string,
    userName: string = "friend"
  ): Promise<CoachResponse> {
    const prompt = `You are a gentle, understanding life coach. Someone skipped a challenge and you want to understand and encourage them.

Challenge skipped: "${challengeTitle}"
Their reason: "${reason}"

Respond as a caring coach in 2-3 sentences. Be understanding, not judgmental. Help them reflect on what might make it easier next time. Still give them 1-2 courage coins for being honest about their feelings.

Format your response as:
COACH_MESSAGE: [your understanding and encouraging response]
COINS: [1 or 2]`;

    const response = await this.callGemini(prompt);
    
    // Parse the response
    const coachMatch = response.match(/COACH_MESSAGE:\s*(.*?)(?=COINS:|$)/s);
    const coinsMatch = response.match(/COINS:\s*(\d+)/);
    
    return {
      message: coachMatch?.[1]?.trim() || `I hear you on "${challengeTitle}". Sometimes we need to honor where we are. That's wisdom, not failure. What would make this feel more manageable for you? 💙`,
      encouragement: "Your honesty shows self-awareness - that's growth too!",
      coinsAwarded: parseInt(coinsMatch?.[1] || "2")
    };
  }

  async getChallengeMotivation(challengeTitle: string): Promise<string> {
    const prompt = `Give a short, upbeat motivational message (1 sentence) for someone about to try this challenge: "${challengeTitle}". Be encouraging and remind them why stepping outside their comfort zone matters.`;
    
    return await this.callGemini(prompt);
  }
}

export const geminiCoach = new GeminiCoach();