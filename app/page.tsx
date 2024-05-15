'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [gtmCode, setGTMCODE] = useState("")
  const [gtmID, setGTMID] = useState("")
  const [gtmResult, setGTMRESULT] = useState("")
  const [message, setMESSAGE] = useState("")

  function getResult() {
    console.log("AA")
    if (gtmCode.length > 0) {
      setGTMRESULT(gtmCode.replace(/&/g, "&amp;"))
      setMESSAGE('GTM Code converter was successful!')
    } else if (gtmID.length > 0) {
      setGTMRESULT(`<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&amp;l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmID}');</script>
<!-- End Google Tag Manager -->`)
      setMESSAGE('GTM Code converter was successful!')
    }

  }

  function copyToClipboard() {
    if (!navigator.clipboard) {
      return fallbackCopyToClipboard(gtmResult);
    }
    return navigator.clipboard.writeText(gtmResult).then(function () {
      console.log('Copying to clipboard was successful!');
      setMESSAGE('Copying to clipboard was successful!')
    }, function (err) {
      console.error('Failed to copy to clipboard:', err);
      setMESSAGE('Failed to copy to clipboard, Check console')
    });
  }

  function fallbackCopyToClipboard(text: string) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8">
      <h1 className="text-4xl font-light"><strong className="italic font-bold animate-pulse text-2xl">*Fancy*</strong> Google Tag Manager for Blogger</h1>
      <div className="max-w-[800px] container grid w-full gap-2 text-s">
        <h3>Paste your <strong>GTM Code</strong> here</h3>
        <Textarea
          className="min-h-32"
          placeholder="Type your message here."
          onChange={(e) => {
            setMESSAGE('')
            setGTMRESULT('')
            setGTMCODE(e.target.value)
            setGTMID(gtmCode.length > 0 ? '' : gtmID)

          }}
          value={gtmCode}
        />
        <h3>Or, Paste your <strong>GTM ID</strong> here</h3>
        <Input
          type="text"
          placeholder="GTM-XXXXXX"
          onChange={(e) => {
            setMESSAGE('')
            setGTMRESULT('')
            setGTMID(e.target.value)
            setGTMCODE(gtmID.length > 0 ? '' : gtmID)
          }}
          value={gtmID}
        />
        <Button
          className="w-full"
          onClick={getResult}
        >
          Generate
        </Button>
        <div className="relative">
          <div className="absolute right-0 z-50">
            <Button variant="outline" size="icon" className="h-8 w-8 m-2" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea className="min-h-32" placeholder="Generated code here" disabled value={gtmResult} />

        </div>
        <div className="flex justify-between">
          <a href="https://marketlytics.com/analytics-faq/adding-google-tag-manager-to-blogger-blog/#:~:text=Add%20GTM%20container%20codes%20to,template%20and%20click%20edit%20HTML.&text=Now%2C%20GTM%20will%20give%20you,other%20in%20the%20body%20section." className="text-xs text-blue-500">source</a>
          <p className="text-xs text-slate-500">{message}</p>
        </div>
        <a href="/" className="text-xs text-slate-400/50 font-bold text-center">bugged? please contact @nwahid</a>
      </div>
    </main >
  );
}
