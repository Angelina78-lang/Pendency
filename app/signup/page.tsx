"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-[#060606] flex items-center justify-center px-6 font-sans antialiased">

            {/* Back link */}
            <Link href="/" className="absolute top-6 left-6 text-sm text-white/30 hover:text-white/70 flex items-center gap-1.5 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
            </Link>

            <div className="w-full max-w-sm space-y-7">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="text-base font-bold tracking-tight text-white/70 mb-3">Pendency</div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
                    <p className="text-sm text-white/40">Start analyzing your cases in minutes</p>
                </div>

                {/* Google */}
                <button className="w-full h-11 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20 flex items-center justify-center gap-3 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <div className="relative flex items-center">
                    <div className="flex-1 border-t border-white/5" />
                    <span className="px-3 text-xs text-white/20">or</span>
                    <div className="flex-1 border-t border-white/5" />
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label className="text-sm text-white/40">Full Name</Label>
                        <Input placeholder="Jane Doe" className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-white/30 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-sm text-white/40">Email</Label>
                        <Input type="email" placeholder="name@example.com" className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-white/30 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-sm text-white/40">Password</Label>
                        <Input type="password" placeholder="••••••••" className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-white/30 text-sm" />
                    </div>

                    <Link href="/dashboard" className="block mt-2">
                        <div className="flex items-center justify-between bg-white text-black h-11 rounded-full pl-5 pr-2 cursor-pointer hover:bg-white/90 transition-colors group">
                            <span className="text-sm font-semibold">Create account</span>
                            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    </Link>
                </div>

                <p className="text-center text-sm text-white/25">
                    Already have an account?{" "}
                    <Link href="/login" className="text-white/60 font-semibold hover:text-white transition-colors">
                        Sign in
                    </Link>
                </p>

                <p className="text-center text-xs text-white/15">
                    By signing up, you agree to our Terms and Privacy Policy.
                </p>
            </div>
        </div>
    )
}
