"use client";

import { Trophy, Users, ArrowUp, ArrowDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LeaderboardUser = {
    id: string;
    name: string;
    points: number;
    rank: number;
    avatar?: string;
    change: "up" | "down" | "same";
};

type LeaderboardProps = {
    users: LeaderboardUser[];
    currentUserId: string;
};

const Leaderboard = ({ users, currentUserId }: LeaderboardProps) => {
    return (
        <Card className="w-full h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-md font-semibold text-gray-800 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 px-1">
                        <span>Rank</span>
                        <span>Points</span>
                    </div>

                    <div className="space-y-2">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className={`flex items-center justify-between p-2 rounded-md ${user.id === currentUserId ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-6 font-medium">
                                        {user.rank <= 3 ? (
                                            <Trophy className={`h-5 w-5 ${user.rank === 1 ? "text-yellow-500" :
                                                    user.rank === 2 ? "text-gray-400" : "text-amber-700"
                                                }`} />
                                        ) : (
                                            <span className="text-gray-600">{user.rank}</span>
                                        )}
                                    </div>

                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="bg-blue-100 text-blue-800">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <span className="font-medium text-sm">
                                        {user.name}
                                        {user.id === currentUserId && (
                                            <span className="ml-1 text-xs text-blue-600">(You)</span>
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">{user.points}</span>
                                    {user.change === "up" && <ArrowUp className="h-3 w-3 text-green-500" />}
                                    {user.change === "down" && <ArrowDown className="h-3 w-3 text-red-500" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center pt-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            View Full Leaderboard
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Leaderboard;