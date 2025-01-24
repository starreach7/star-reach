import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Celebrity } from '../types';

interface TrendingTalentProps {
    celebrities: Celebrity[];
}

const TrendingCreators = ({ celebrities }: TrendingTalentProps) => {
    return (
        <section className="py-16 bg-gray-900 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-white">Trending Creators</h2>
                    <div className="flex items-center text-primary-400">
                        <Sparkles className="h-5 w-5 mr-2" />
                        <span>Updated hourly</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {celebrities.map((creator, index) => (
                        <Link to={`/celebrity/${creator.id}`}
                            key={index}
                            className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 transition-all group cursor-pointer hover:transform hover:scale-105 transition duration-300"
                        >
                            <div className="relative mb-4">
                                <img
                                    src={creator.image}
                                    alt={creator.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-lg" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">{creator.name}</h3>
                            <p className="text-primary-400 text-sm mb-2">{creator.category}</p>
                            <div className="text-gray-400 text-sm">
                                {creator.bookings.toLocaleString()} bookings
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingCreators;