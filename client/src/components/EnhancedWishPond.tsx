import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface EnhancedWishPondProps {
  isOpen: boolean;
  onClose: () => void;
  userCoins: number;
  onCoinsChanged: (newCoins: number) => void;
}

export function EnhancedWishPond({ isOpen, onClose, userCoins, onCoinsChanged }: EnhancedWishPondProps) {
  const [wish, setWish] = useState("");
  const [coinTossing, setCoinTossing] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  const makeWish = () => {
    if (userCoins <= 0 || !wish.trim()) return;
    
    setCoinTossing(true);
    
    // Coin toss animation sequence
    setTimeout(() => {
      setShowSplash(true);
      setShowGlow(true);
      
      // Deduct coin
      onCoinsChanged(userCoins - 1);
      
      // Hide splash after 600ms
      setTimeout(() => {
        setShowSplash(false);
        setCoinTossing(false);
      }, 600);
      
      // Hide glow and close after 2 seconds
      setTimeout(() => {
        setShowGlow(false);
        setWish("");
        onClose();
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 border-[#AECFA4]">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute -top-2 -right-2 text-[#46A094]"
          >
            <X size={20} />
          </Button>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#46A094] mb-2">Reflection Pond</h2>
            <p className="text-[#46A094]/70">Make a wish and watch the magic happen</p>
          </div>

          {/* Enhanced Magical Pond with Stones */}
          <div className="relative h-64 mb-6">
            {/* Large stone on left */}
            <div className="absolute -left-4 top-8 w-16 h-12 bg-gray-500 rounded-full opacity-80 transform rotate-12 shadow-lg"></div>
            
            {/* Scattered rocks */}
            <div className="absolute -right-2 bottom-4 w-8 h-6 bg-gray-400 rounded-full opacity-70 shadow-md"></div>
            <div className="absolute left-8 -bottom-2 w-6 h-4 bg-gray-600 rounded-full opacity-60 transform -rotate-12 shadow-md"></div>
            <div className="absolute right-12 top-2 w-4 h-3 bg-gray-500 rounded-full opacity-50 shadow-sm"></div>
            
            <div 
              className={`w-full h-full rounded-full bg-gradient-to-br from-[#46A094] via-[#6BBD99] to-[#AECFA4] shadow-2xl border-4 border-[#C4E8C2]/50 transition-all duration-300 ${showGlow ? 'pond-glow' : ''}`}
            >
              {/* Realistic Water Surface */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#46A094]/30 rounded-full"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-full animate-pulse"></div>
              
              {/* Minimal floating elements */}
              <div className="absolute top-8 left-12 w-2 h-2 bg-green-400 rounded-full animate-float opacity-70" style={{ animationDelay: "0s" }}></div>
              <div className="absolute bottom-12 right-16 w-1 h-1 bg-green-300 rounded-full animate-float opacity-60" style={{ animationDelay: "2s" }}></div>
              
              {/* Ripple effects */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 rounded-full animate-ping opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full animate-ping opacity-20" style={{ animationDelay: "1s" }}></div>
              
              {/* Coin toss animation */}
              {coinTossing && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full coin-toss shadow-lg border-2 border-yellow-300"></div>
              )}
              
              {/* Splash effect */}
              {showSplash && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-white rounded-full coin-splash"></div>
                  <div className="w-6 h-6 bg-white/80 rounded-full coin-splash" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-8 h-8 bg-white/60 rounded-full coin-splash" style={{ animationDelay: "0.2s" }}></div>
                </div>
              )}
            </div>
          </div>

          {/* Wish Input */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[#46A094] mb-2">Make a Wish</h3>
              <Textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="What do you wish for on your growth journey?"
                className="min-h-[100px] resize-none border-[#AECFA4] focus:border-[#6BBD99] focus:ring-[#6BBD99]"
                style={{ backgroundColor: '#C4E8C2' }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-yellow-600">
                <span className="text-sm font-medium">Cost: 1 coin</span>
                <span className="ml-1">🪙</span>
              </div>
              <div className="flex items-center text-[#46A094]">
                <span className="text-sm font-medium">You have: {userCoins}</span>
                <span className="ml-1">🪙</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1 border-[#AECFA4] text-[#46A094] hover:bg-[#C4E8C2]"
              >
                Cancel
              </Button>
              <Button 
                onClick={makeWish}
                disabled={userCoins === 0 || !wish.trim() || coinTossing}
                className="flex-1 bg-gradient-to-r from-[#46A094] to-[#6BBD99] text-white hover:from-[#46A094]/90 hover:to-[#6BBD99]/90"
              >
                {coinTossing ? "Tossing..." : "Toss Coin"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}