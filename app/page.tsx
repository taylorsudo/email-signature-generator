'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, Check } from 'lucide-react'
import SignaturePreview from '@/components/signature-preview'
import SignatureForm from '@/components/signature-form'
import { SocialIcon } from '@/lib/types'

const createEmptySocialIcons = (): SocialIcon[] =>
  Array.from({ length: 3 }, () => ({
    name: '',
    iconUrl: '',
    profileUrl: '',
  }))

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    website: '',
    logo: '',
    socialIcons: createEmptySocialIcons(),
  })

  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const signatureRef = useRef<HTMLDivElement>(null)

  // Load URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlData: typeof formData = {
      ...formData,
      socialIcons: formData.socialIcons.map((icon) => ({ ...icon })),
    }

    if (params.get('name')) urlData.name = params.get('name')!
    if (params.get('title') || params.get('jobTitle')) {
      urlData.title = params.get('title') || params.get('jobTitle') || ''
    }
    if (params.get('email')) urlData.email = params.get('email')!
    if (params.get('phone')) urlData.phone = params.get('phone')!
    if (params.get('website')) urlData.website = params.get('website')!
    const logoParam = params.get('logo') || params.get('logoUrl')
    if (logoParam) urlData.logo = logoParam

    // Parse social icons from URL params
    for (let i = 0; i < 3; i++) {
      const socialName = params.get(`social${i}Name`)
      const socialIcon = params.get(`social${i}Icon`) || ''
      const socialProfile =
        params.get(`social${i}Profile`) ||
        params.get(`social${i}Link`) ||
        ''
      const legacyUrl = params.get(`social${i}Url`) || ''
      const iconUrl = socialIcon || legacyUrl
      const profileUrl = socialProfile || legacyUrl

      if (socialName || iconUrl || profileUrl) {
        urlData.socialIcons[i] = {
          name: socialName || '',
          iconUrl,
          profileUrl,
        }
      }
    }

    // Update state if any URL params were found
    const hasUrlParams = Object.values(urlData).some(
      (val) =>
        val !== '' &&
        (typeof val !== 'object' ||
          (Array.isArray(val) &&
            val.some((item) => Object.values(item).some((v) => v !== ''))))
    )

    if (hasUrlParams) {
      setFormData(urlData)
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSocialChange = (index: number, field: keyof SocialIcon, value: string) => {
    const newSocialIcons = [...formData.socialIcons]
    newSocialIcons[index] = {
      ...newSocialIcons[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      socialIcons: newSocialIcons,
    }))
  }

  const copyToClipboard = async () => {
    const previewElement = signatureRef.current

    if (!previewElement) {
      console.error('Preview element not found')
      return
    }

    const html = previewElement.outerHTML
    const plainText = previewElement.innerText
    const canUseClipboardItem =
      typeof window !== 'undefined' && 'ClipboardItem' in window && navigator?.clipboard?.write

    if (canUseClipboardItem) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plainText], { type: 'text/plain' }),
          }),
        ])
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return
      } catch (err) {
        console.error('Failed to copy rich text via ClipboardItem:', err)
      }
    }

    try {
      const tempContainer = document.createElement('div')
      tempContainer.contentEditable = 'true'
      tempContainer.style.position = 'fixed'
      tempContainer.style.opacity = '0'
      tempContainer.style.pointerEvents = 'none'
      tempContainer.innerHTML = html
      document.body.appendChild(tempContainer)

      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(tempContainer)
      selection?.removeAllRanges()
      selection?.addRange(range)
      document.execCommand('copy')
      selection?.removeAllRanges()
      document.body.removeChild(tempContainer)

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy signature:', err)
    }
  }

  const copyLinkToClipboard = async () => {
    if (typeof window === 'undefined') return

    const baseUrl = `${window.location.origin}${window.location.pathname}`
    const params = new URLSearchParams()

    const setParam = (key: string, value?: string) => {
      if (value) {
        params.set(key, value)
      }
    }

    setParam('name', formData.name)
    setParam('title', formData.title)
    setParam('email', formData.email)
    setParam('phone', formData.phone)
    setParam('website', formData.website)
    setParam('logo', formData.logo)

    formData.socialIcons.forEach((icon, index) => {
      setParam(`social${index}Name`, icon.name)
      setParam(`social${index}Icon`, icon.iconUrl)
      setParam(`social${index}Profile`, icon.profileUrl)
    })

    const fullUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl

    const copyText = async (text: string) => {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
    }

    try {
      await copyText(fullUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-slate-50 dark:to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Email Signature Generator
          </h1>
          <p className="text-muted-foreground mb-3">
            Create a professional email signature in seconds
          </p>
          <div className="flex justify-center space-x-3">
            <a className="github-button" href="https://github.com/taylorsudo/email-signature-generator" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" aria-label="Star taylorsudo/email-signature-generator on GitHub">Star</a>
            <a className="github-button" href="https://github.com/sponsors/taylorsudo" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-heart" data-size="large" aria-label="Sponsor @taylorsudo on GitHub">Sponsor</a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <SignatureForm
              formData={formData}
              onInputChange={handleInputChange}
              onSocialChange={handleSocialChange}
            />
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <Card className="p-8 bg-card">
              <h2 className="text-lg font-semibold text-foreground">
                Preview
              </h2>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-border overflow-x-auto">
                <SignaturePreview ref={signatureRef} formData={formData} />
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={copyToClipboard}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Signature
                  </>
                )}
              </Button>
              <Button
                onClick={copyLinkToClipboard}
                size="lg"
                variant="outline"
                className="w-full border border-border text-foreground [&_svg]:text-muted-foreground"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2 text-muted-foreground" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
