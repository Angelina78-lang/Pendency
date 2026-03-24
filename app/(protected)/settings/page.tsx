"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
    return (
        <div className="w-full max-w-3xl mx-auto px-6 pb-24 space-y-8 flex flex-col items-center mt-8">
            <div className="flex flex-col items-center justify-center mb-6 px-4 text-center">
                <h1 className="text-xl md:text-[22px] font-semibold tracking-tight text-[#EDEDED] mb-3">Settings</h1>
                <p className="text-[#A1A1AA] text-sm max-w-lg leading-relaxed font-normal">Manage your automation rules, preferences, and enterprise security.</p>
            </div>

            <div className="w-full bg-[#1C1C1C] border border-transparent hover:border-[#272727] transition-colors rounded-2xl p-8 space-y-8 shadow-xl">
                <div>
                    <h2 className="text-sm font-semibold text-[#EDEDED] mb-5 uppercase tracking-wide">Notifications</h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-[#EDEDED] text-[15px] font-medium">Critical Risk Alerts</Label>
                                <p className="text-[13px] text-[#A1A1AA]">Notify me immediately when an institution crosses 3.0σ deviation.</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-[#EDEDED] text-[15px] font-medium">Weekly Executive Digest</Label>
                                <p className="text-[13px] text-[#A1A1AA]">Receive an aggregated roll-up of all global pendencies.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </div>

                <Separator className="bg-[#272727]" />

                <div>
                    <h2 className="text-sm font-semibold text-[#EDEDED] mb-5 uppercase tracking-wide">Intelligence Automation</h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-[#EDEDED] text-[15px] font-medium">Auto-Draft Follow-ups</Label>
                                <p className="text-[13px] text-[#A1A1AA]">AI engine will automatically queue email drafts when delay risk &gt; 1.5σ.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-full flex justify-end">
                <Button className="bg-[#EDEDED] text-[#141414] hover:bg-white text-xs h-9 rounded-full px-5 font-semibold">
                    Save Changes
                </Button>
            </div>
        </div>
    )
}
