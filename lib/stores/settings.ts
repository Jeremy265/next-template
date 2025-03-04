import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ApiMeasure } from "../type";

type Settings = {
    meteoFranceApiKey: string;
    delayBeforeRetrieveOrder: number;
    delayBeforeNextStation: number;
    maxRetry: number;
    numberOfClosestStations: number;
    paramsToExport: { title: keyof ApiMeasure }[];
};

interface SettingState {
    settings: Settings;
    setSettings: (settings: Settings) => void;
    resetSettings: () => void;
}
const defaultSettings: Settings = {
    maxRetry: 3,
    delayBeforeRetrieveOrder: 2000,
    delayBeforeNextStation: 5000,
    numberOfClosestStations: 20,
    meteoFranceApiKey:
        "eyJ4NXQiOiJZV0kxTTJZNE1qWTNOemsyTkRZeU5XTTRPV014TXpjek1UVmhNbU14T1RSa09ETXlOVEE0Tnc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJUSE9NQUpAY2FyYm9uLnN1cGVyIiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJUSE9NQUoiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6IkRlZmF1bHRBcHBsaWNhdGlvbiIsImlkIjoxNzMzMCwidXVpZCI6IjU4YTA2MjQ1LTM1YWUtNGM1OC04N2UxLTY5NjgzZGQzYjE0MSJ9LCJpc3MiOiJodHRwczpcL1wvcG9ydGFpbC1hcGkubWV0ZW9mcmFuY2UuZnI6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsiNTBQZXJNaW4iOnsidGllclF1b3RhVHlwZSI6InJlcXVlc3RDb3VudCIsImdyYXBoUUxNYXhDb21wbGV4aXR5IjowLCJncmFwaFFMTWF4RGVwdGgiOjAsInN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6InNlYyJ9fSwia2V5dHlwZSI6IlBST0RVQ1RJT04iLCJzdWJzY3JpYmVkQVBJcyI6W3sic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJEb25uZWVzUHVibGlxdWVzQ2xpbWF0b2xvZ2llIiwiY29udGV4dCI6IlwvcHVibGljXC9EUENsaW1cL3YxIiwicHVibGlzaGVyIjoiYWRtaW5fbWYiLCJ2ZXJzaW9uIjoidjEiLCJzdWJzY3JpcHRpb25UaWVyIjoiNTBQZXJNaW4ifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiRG9ubmVlc1B1YmxpcXVlc09ic2VydmF0aW9uIiwiY29udGV4dCI6IlwvcHVibGljXC9EUE9ic1wvdjEiLCJwdWJsaXNoZXIiOiJiYXN0aWVuZyIsInZlcnNpb24iOiJ2MSIsInN1YnNjcmlwdGlvblRpZXIiOiI1MFBlck1pbiJ9XSwiZXhwIjoxODIwMjE0MjQ4LCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzI1NTQxNDQ4LCJqdGkiOiI5MDdkMDYwZi1iYTFhLTRiYTMtYTUzNi01ZmE2NjcwNTQ5NTQifQ==.OFwbuDYY_gvOKjuDx4jRFOKQmQaMNte4Unm0o78AhgEwVX_pFGb7-7nqLzEIbtjFefKkXQYWJ4uQLe5UNDoOVBHBOvUtjvP9LndQURRtZAjKKfXofxQ1g_nGiH4BUuvOZgkye_A3EblRLzFdohwKfauslFITDWNVZdcmrpbRFI8f26MKg_v2jNx94fLc-sZd6MRAeru9OuWmud_WamvVg9lDx_Kai1f6uyXvmqK2S0XS8O1H83J60aLbcPaW-HdhllhUjxaBQ9dPzvpiFiOKnMgMiVG1GGDB4yv9og3jVd7lhvZXsQ1oKTYUMvrqRbZPRu7imCzEDLBZvLrtBf8OnA==",
    paramsToExport: [{ title: "RR" }, { title: "TN" }, { title: "TX" }],
};

export const useSettingsStore = create<SettingState>()(
    devtools(
        persist(
            (set) => ({
                settings: defaultSettings,
                setSettings: (settings) => set(() => ({ settings })),
                resetSettings: () => set(() => ({ settings: defaultSettings })),
            }),
            {
                name: "settings",
            }
        )
    )
);
