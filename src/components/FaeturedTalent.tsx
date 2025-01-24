import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Celebrity } from '../types';
interface FeaturedTalentProps {
    celebrities: Celebrity[];
}

const FeaturedTalent = ({ celebrities }: FeaturedTalentProps) => {
    return (
        <section className="py-16 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-12 text-white">Featured Talent</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {celebrities.map((talent) => (
                        <Link
                            to={`/celebrity/${talent.id}`}
                            key={talent.id}
                            className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-primary-500 transition-all"
                        >
                            <div className="relative">
                                <img
                                    src={talent.image}
                                    alt={talent.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{talent.name}</h3>
                                            <p className="text-primary-400">{talent.category}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center text-yellow-400 mb-1">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span className="ml-1">{talent.rating}</span>
                                            </div>
                                            <p className="text-2xl font-bold text-white">${talent.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center text-gray-400">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>Responds in {talent.responseTime}</span>
                                </div>
                                <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors">
                                    Book Now
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FeaturedTalent