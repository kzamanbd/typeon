import {
    ArrowRight,
    Award,
    Brain,
    Check,
    Crown,
    Diamond,
    Globe,
    Heart,
    Keyboard,
    Sparkles,
    Star,
    TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PricingPage: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

    const pricingPlans = [
        {
            name: 'Free',
            description: 'Perfect for getting started with typing practice',
            price: { monthly: 0, annual: 0 },
            color: 'from-gray-400 to-gray-600',
            popular: false,
            features: [
                'Basic typing lessons',
                'Simple practice mode',
                'Basic speed tracking',
                'Limited text selection',
                'Community support',
                'Local progress saving',
            ],
            limitations: ['Max 30 minutes per session', 'Basic analytics only', 'No custom lessons', 'Ad-supported'],
            icon: Keyboard,
            buttonText: 'Get Started Free',
            buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
        },
        {
            name: 'Pro',
            description: 'Ideal for serious learners and professionals',
            price: { monthly: 9.99, annual: 99.99 },
            color: 'from-blue-500 to-purple-600',
            popular: true,
            features: [
                'All Free features',
                'Unlimited practice time',
                'Advanced analytics & insights',
                'Custom lesson creation',
                'Multi-language support',
                'Cloud sync across devices',
                'Priority email support',
                'Export progress reports',
                'Advanced typing metrics',
                'Personalized learning paths',
            ],
            limitations: [],
            icon: Crown,
            buttonText: 'Start Pro Trial',
            buttonStyle: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105',
        },
        {
            name: 'Enterprise',
            description: 'Built for teams, schools, and organizations',
            price: { monthly: 29.99, annual: 299.99 },
            color: 'from-purple-600 to-indigo-700',
            popular: false,
            features: [
                'All Pro features',
                'Team management dashboard',
                'Bulk user management',
                'Advanced reporting',
                'SSO integration',
                'Custom branding',
                'Dedicated account manager',
                'API access',
                'Training sessions',
                'Priority phone support',
                'Custom integrations',
                'Compliance reporting',
            ],
            limitations: [],
            icon: Diamond,
            buttonText: 'Contact Sales',
            buttonStyle: 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white hover:scale-105',
        },
    ];

    const testimonials = [
        {
            name: 'Sarah Mitchell',
            role: 'Software Engineer at Google',
            content: 'Pro plan helped me improve from 60 to 95 WPM in just 2 months. The analytics are incredible!',
            rating: 5,
            avatar: '👩‍💻',
        },
        {
            name: 'David Chen',
            role: 'Content Manager',
            content: 'Enterprise features saved our team countless hours. The reporting dashboard is a game-changer.',
            rating: 5,
            avatar: '👨‍💼',
        },
        {
            name: 'Emily Rodriguez',
            role: 'University Student',
            content:
                'Free plan was perfect for my studies. Upgraded to Pro for the advanced features - worth every penny!',
            rating: 5,
            avatar: '👩‍🎓',
        },
    ];

    const faqs = [
        {
            question: 'Can I switch between plans anytime?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we handle prorated billing automatically.',
        },
        {
            question: 'What happens to my data if I cancel?',
            answer: 'Your data remains accessible for 30 days after cancellation. You can export all your progress and statistics during this period.',
        },
        {
            question: 'Do you offer student discounts?',
            answer: 'Absolutely! Students get 50% off Pro and Enterprise plans with a valid student email address.',
        },
        {
            question: 'Is there a free trial for paid plans?',
            answer: 'Yes! Pro plan includes a 14-day free trial. Enterprise customers get a 30-day trial with full access to all features.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise customers. All transactions are secured with 256-bit SSL encryption.',
        },
    ];

    const comparisonFeatures = [
        { feature: 'Practice Sessions', free: '30 min/day', pro: 'Unlimited', enterprise: 'Unlimited' },
        {
            feature: 'Lesson Library',
            free: 'Basic (20 lessons)',
            pro: 'Complete (100+ lessons)',
            enterprise: 'Complete + Custom',
        },
        { feature: 'Analytics', free: 'Basic WPM/Accuracy', pro: 'Advanced Insights', enterprise: 'Team Analytics' },
        { feature: 'Languages', free: 'English only', pro: 'English + Bengali', enterprise: 'All + Custom' },
        { feature: 'Cloud Sync', free: '❌', pro: '✅', enterprise: '✅' },
        { feature: 'Custom Lessons', free: '❌', pro: '✅', enterprise: '✅' },
        { feature: 'Team Management', free: '❌', pro: '❌', enterprise: '✅' },
        { feature: 'API Access', free: '❌', pro: '❌', enterprise: '✅' },
        { feature: 'Support', free: 'Community', pro: 'Email', enterprise: 'Phone + Dedicated' },
    ];

    const benefits = [
        {
            icon: TrendingUp,
            title: 'Proven Results',
            description: 'Average 40% improvement in typing speed within 30 days',
        },
        {
            icon: Brain,
            title: 'AI-Powered Learning',
            description: 'Personalized lessons adapt to your progress and weak points',
        },
        {
            icon: Globe,
            title: 'Multi-Language Support',
            description: 'Practice in English, Bengali, and more languages',
        },
        {
            icon: Award,
            title: 'Achievement System',
            description: 'Gamified learning with badges and milestone rewards',
        },
    ];

    return (
        <div className='min-h-screen bg-white'>
            {/* Hero Section */}
            <div className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10'></div>

                {/* Floating Elements */}
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl'></div>
                    <div className='absolute -top-20 -right-20 h-60 w-60 rounded-full bg-purple-300/20 blur-3xl'></div>
                    <div className='absolute -bottom-10 left-1/2 h-50 w-50 rounded-full bg-indigo-300/20 blur-3xl'></div>
                </div>

                <div className='relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8'>
                    <div className='text-center'>
                        <h1 className='mb-6 text-4xl font-bold text-gray-900 sm:text-6xl lg:text-7xl'>
                            Choose Your{' '}
                            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                Perfect Plan
                            </span>
                        </h1>
                        <p className='mx-auto mb-8 max-w-3xl text-xl text-gray-700 sm:text-2xl'>
                            Accelerate your typing journey with plans designed for every learner. From beginners to
                            enterprises, we have the perfect solution for you.
                        </p>

                        {/* Billing Toggle */}
                        <div className='mb-12 flex items-center justify-center'>
                            <div className='flex rounded-full bg-white/80 p-1 backdrop-blur-sm'>
                                <button
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                                        billingCycle === 'monthly'
                                            ? 'bg-blue-500 text-white shadow'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}>
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle('annual')}
                                    className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all ${
                                        billingCycle === 'annual'
                                            ? 'bg-blue-500 text-white shadow'
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}>
                                    Annual
                                    <span className='absolute -top-2 -right-2 rounded-full bg-green-500 px-2 py-1 text-xs text-white'>
                                        Save 20%
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <section className='py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative rounded-3xl border bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                                    plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200'
                                }`}>
                                {plan.popular && (
                                    <div className='absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-sm font-semibold text-white'>
                                        Most Popular
                                    </div>
                                )}

                                <div className='mb-6 text-center'>
                                    <div
                                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${plan.color} text-white`}>
                                        <plan.icon size={32} />
                                    </div>
                                    <h3 className='text-2xl font-bold text-gray-900'>{plan.name}</h3>
                                    <p className='mt-2 text-gray-600'>{plan.description}</p>
                                </div>

                                <div className='mb-6 text-center'>
                                    <div className='text-4xl font-bold text-gray-900'>
                                        ${plan.price[billingCycle]}
                                        {plan.price[billingCycle] > 0 && (
                                            <span className='text-lg font-normal text-gray-600'>
                                                /{billingCycle === 'monthly' ? 'month' : 'year'}
                                            </span>
                                        )}
                                    </div>
                                    {billingCycle === 'annual' && plan.price.annual > 0 && (
                                        <div className='mt-1 text-sm text-green-600'>
                                            Save ${(plan.price.monthly * 12 - plan.price.annual).toFixed(2)} per year
                                        </div>
                                    )}
                                </div>

                                <div className='mb-8'>
                                    <h4 className='mb-4 font-semibold text-gray-900'>Features included:</h4>
                                    <ul className='space-y-3'>
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className='flex items-start gap-3'>
                                                <Check className='mt-0.5 h-5 w-5 text-green-500' />
                                                <span className='text-gray-700'>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {plan.limitations.length > 0 && (
                                        <div className='mt-4'>
                                            <h5 className='mb-2 text-sm font-medium text-gray-500'>Limitations:</h5>
                                            <ul className='space-y-1'>
                                                {plan.limitations.map((limitation, limitIndex) => (
                                                    <li key={limitIndex} className='text-sm text-gray-500'>
                                                        • {limitation}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className={`w-full rounded-full px-6 py-4 font-semibold transition-all duration-300 ${plan.buttonStyle} shadow-lg`}>
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section className='bg-gray-50 py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold text-gray-900'>Compare All Features</h2>
                        <p className='mx-auto max-w-2xl text-xl text-gray-600'>
                            Detailed comparison of features across all plans
                        </p>
                    </div>

                    <div className='overflow-x-auto rounded-xl bg-white shadow'>
                        <table className='w-full'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Feature</th>
                                    <th className='px-6 py-4 text-center text-sm font-semibold text-gray-900'>Free</th>
                                    <th className='px-6 py-4 text-center text-sm font-semibold text-gray-900'>Pro</th>
                                    <th className='px-6 py-4 text-center text-sm font-semibold text-gray-900'>
                                        Enterprise
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {comparisonFeatures.map((item, index) => (
                                    <tr key={index} className='hover:bg-gray-50'>
                                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>{item.feature}</td>
                                        <td className='px-6 py-4 text-center text-sm text-gray-700'>{item.free}</td>
                                        <td className='px-6 py-4 text-center text-sm text-gray-700'>{item.pro}</td>
                                        <td className='px-6 py-4 text-center text-sm text-gray-700'>
                                            {item.enterprise}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className='py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold text-gray-900'>Why Upgrade to Pro?</h2>
                        <p className='mx-auto max-w-2xl text-xl text-gray-600'>
                            Unlock advanced features that accelerate your learning journey
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
                        {benefits.map((benefit, index) => (
                            <div key={index} className='text-center'>
                                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
                                    <benefit.icon size={28} />
                                </div>
                                <h3 className='mb-2 text-lg font-semibold text-gray-900'>{benefit.title}</h3>
                                <p className='text-gray-600'>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className='bg-gray-50 py-20'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold text-gray-900'>What Our Users Say</h2>
                        <p className='mx-auto max-w-2xl text-xl text-gray-600'>
                            Real success stories from our community
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className='rounded-2xl bg-white p-8 shadow'>
                                <div className='mb-4 flex gap-1'>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                                    ))}
                                </div>
                                <p className='mb-6 text-gray-600'>"{testimonial.content}"</p>
                                <div className='flex items-center gap-3'>
                                    <div className='text-2xl'>{testimonial.avatar}</div>
                                    <div>
                                        <div className='font-semibold text-gray-900'>{testimonial.name}</div>
                                        <div className='text-gray-500'>{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className='py-20'>
                <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold text-gray-900'>Frequently Asked Questions</h2>
                        <p className='text-xl text-gray-600'>Everything you need to know about our pricing plans</p>
                    </div>

                    <div className='space-y-6'>
                        {faqs.map((faq, index) => (
                            <div key={index} className='rounded-lg border border-gray-200 bg-white p-6'>
                                <h3 className='mb-3 text-lg font-semibold text-gray-900'>{faq.question}</h3>
                                <p className='text-gray-600'>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='bg-gradient-to-r from-blue-600 to-purple-700 py-20'>
                <div className='mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
                    <div className='mb-6 flex justify-center'>
                        <Sparkles className='h-16 w-16 text-yellow-300' />
                    </div>
                    <h2 className='mb-6 text-4xl font-bold text-white'>Start Your Free Trial Today</h2>
                    <p className='mb-8 text-xl text-blue-100'>
                        No credit card required. Cancel anytime. Experience all Pro features for 14 days.
                    </p>
                    <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                        <Link
                            to='/lessons'
                            className='group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-blue-600 shadow transition-all duration-300 hover:scale-105 hover:shadow-2xl'>
                            <Heart size={20} />
                            Start Free Trial
                            <ArrowRight className='transition-transform group-hover:translate-x-1' size={20} />
                        </Link>
                        <button className='rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20'>
                            Talk to Sales
                        </button>
                    </div>
                    <p className='mt-4 text-sm text-blue-200'>
                        Join over 10,000+ users who improved their typing skills with Typeon
                    </p>
                </div>
            </section>
        </div>
    );
};
