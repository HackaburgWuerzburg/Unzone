import { Users, Heart, MessageCircle, Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

interface NewCommunityProps {
  onBack?: () => void;
}

export function NewCommunity({ onBack }: NewCommunityProps = {}) {
  const { user } = useAuth();

  // Enhanced leaderboard with proper rankings
  const leaderboard = [
    { name: "Emma Rodriguez", challenges: 28, coins: 892, isUser: false, streak: 14, level: "Courage Master", avatar: "ER" },
    { name: "Alex Chen", challenges: 24, coins: 756, isUser: false, streak: 12, level: "Brave Explorer", avatar: "AC" },
    { name: "Maya Patel", challenges: 20, coins: 634, isUser: false, streak: 9, level: "Growth Seeker", avatar: "MP" },
    { name: "lockinaidtya (You)", challenges: 8, coins: 18, isUser: true, streak: 3, level: "New Adventurer", avatar: "YU" },
    { name: "Jordan Smith", challenges: 15, coins: 478, isUser: false, streak: 7, level: "Comfort Zone Breaker", avatar: "JS" },
    { name: "Sam Wilson", challenges: 12, coins: 389, isUser: false, streak: 5, level: "Rising Star", avatar: "SW" },
  ].sort((a, b) => b.coins - a.coins);

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: '#C4E8C2' }}>
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#46A094] via-[#6BBD99] to-[#AECFA4] px-6 pt-12 pb-8 text-white relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onBack?.()}
          className="absolute top-4 left-4 text-white hover:bg-white/20 z-10"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Community Hub</h1>
          <p className="text-white/90 text-lg">Where courage grows together 🌱</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Community Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-[#46A094] to-[#6BBD99] text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-xs opacity-90">Active Members</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#6BBD99] to-[#AECFA4] text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2" />
              <p className="text-2xl font-bold">15,293</p>
              <p className="text-xs opacity-90">Challenges Done</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#AECFA4] to-[#C4E8C2] text-[#46A094] border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2" />
              <p className="text-2xl font-bold">98%</p>
              <p className="text-xs opacity-90">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Leaderboard */}
        <Card className="bg-white/95 border-[#AECFA4] shadow-2xl">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#46A094] flex items-center justify-center">
                <Trophy className="w-7 h-7 mr-3 text-yellow-500" />
                Weekly Champions
              </h2>
              <p className="text-[#46A094]/70 mt-2">This week's most courageous adventurers</p>
            </div>
            
            <div className="space-y-4">
              {leaderboard.map((person, index) => (
                <div 
                  key={index}
                  className={`relative p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                    person.isUser 
                      ? 'bg-gradient-to-r from-[#6BBD99]/30 to-[#AECFA4]/30 border-2 border-[#6BBD99] shadow-xl' 
                      : 'bg-[#C4E8C2]/40 hover:bg-[#AECFA4]/50 border border-[#AECFA4]/60'
                  }`}
                >
                  {/* Special crown for top 3 */}
                  {index < 3 && (
                    <div className="absolute -top-3 -right-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' : 
                        'bg-gradient-to-br from-amber-400 to-amber-600'
                      }`}>
                        👑
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-xl ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-white' :
                        index === 2 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' :
                        'bg-gradient-to-br from-[#46A094] to-[#6BBD99] text-white'
                      }`}>
                        #{index + 1}
                      </div>
                      
                      <Avatar className="w-14 h-14 ring-4 ring-[#6BBD99]/30">
                        <AvatarFallback className="bg-[#6BBD99] text-white font-bold text-lg">
                          {person.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <p className="font-bold text-[#46A094] text-xl">{person.name}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="bg-[#6BBD99]/20 px-3 py-1 rounded-full text-[#46A094] font-medium text-sm">
                            {person.level}
                          </span>
                          <span className="text-[#46A094]/70 text-sm">🔥 {person.streak} days</span>
                        </div>
                        <p className="text-sm text-[#46A094]/70 mt-1">{person.challenges} challenges completed</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center text-yellow-600 mb-1">
                        <span className="font-bold text-3xl">{person.coins}</span>
                        <span className="ml-2 text-2xl">🪙</span>
                      </div>
                      {person.isUser && (
                        <div className="text-sm text-[#6BBD99] font-bold bg-[#6BBD99]/20 px-2 py-1 rounded-full">
                          That's You! 🎉
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Community Feed */}
        <Card className="bg-white/95 border-[#AECFA4] shadow-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[#46A094] mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-3 text-[#6BBD99]" />
              Live Community Feed
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-[#C4E8C2]/50 to-[#AECFA4]/50 rounded-xl border-l-4 border-[#6BBD99]">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 bg-[#6BBD99] rounded-full mt-1 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#46A094]">🎉 Emma just completed "Give a genuine compliment to a coworker"</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-xs text-[#46A094]/70">2 minutes ago</span>
                      <span className="text-xs bg-[#6BBD99]/20 px-2 py-1 rounded-full text-[#46A094] font-medium">+8 coins earned</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-yellow-100/70 to-yellow-200/70 rounded-xl border-l-4 border-yellow-500">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#46A094]">🏆 Alex earned the "Courage Master" badge!</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-xs text-[#46A094]/70">15 minutes ago</span>
                      <span className="text-xs bg-yellow-400/30 px-2 py-1 rounded-full text-[#46A094] font-medium">25 challenges streak</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-[#C4E8C2]/50 to-[#AECFA4]/50 rounded-xl border-l-4 border-[#6BBD99]">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 bg-[#6BBD99] rounded-full mt-1"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#46A094]">🌱 Maya planted her 20th courage seed in the garden</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-xs text-[#46A094]/70">1 hour ago</span>
                      <span className="text-xs bg-[#6BBD99]/20 px-2 py-1 rounded-full text-[#46A094] font-medium">Garden Level 4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Community Message */}
        <Card className="bg-gradient-to-r from-[#46A094] to-[#6BBD99] text-white border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">You're Part of Something Amazing! 🌟</h3>
            <p className="text-white/90 text-lg leading-relaxed">
              Every challenge you complete inspires others to step outside their comfort zones. 
              Together, we're building a community of courage and growth!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}