"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Settings</h1>
                <p className="text-neutral-500">Manage your preferences and automation rules.</p>
            </div>

            <div className="bg-[#151515]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Notifications</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-neutral-200">Critical Risk Alerts</Label>
                                <p className="text-xs text-neutral-500">Notify me when a case exceeds 3.0σ deviation.</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-neutral-200">Weekly Digest</Label>
                                <p className="text-xs text-neutral-500">Email summary of all pending cases.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </div>

                <Separator className="bg-white/10" />

                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Automation</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-neutral-200">Auto-Draft Follow-ups</Label>
                                <p className="text-xs text-neutral-500">AI will draft emails when deviation > 1.5σ.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
