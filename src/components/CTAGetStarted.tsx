import React from 'react'
import Link from 'next/link'

const CTAGetStarted = () => {
    return (
        <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
                <p className="text-xl mb-8 opacity-90">
                        {`Let's collaborate to bring your vision to life with innovative solutions
                                and exceptional results.`}
                </p>
                <Link
                        href="/contact"
                        className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300"
                >
                        Get Started Today
                </Link>
        </div>
    )
}

export default CTAGetStarted