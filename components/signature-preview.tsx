'use client'

import { forwardRef } from 'react'
import { SocialIcon } from '@/lib/types'
import { ensureHttpsUrl, stripUrlProtocol } from '@/lib/utils'

interface SignaturePreviewProps {
  formData: {
    name: string
    title: string
    email: string
    phone: string
    website: string
    logo: string
    socialIcons: Array<SocialIcon>
  }
}

const SignaturePreview = forwardRef<HTMLDivElement, SignaturePreviewProps>(
  ({ formData }, ref) => {
    const websiteUrl = ensureHttpsUrl(formData.website)
    const websiteText = stripUrlProtocol(formData.website)

    return (
      <div
        ref={ref}
        style={{ fontSize: '14px', color: '#333', width: '100%', display: 'inline-block' }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              {formData.logo && (
                <td
                  style={{ paddingRight: '20px', verticalAlign: 'middle', width: '80px' }}
                  valign="middle"
                >
                  <img
                    src={formData.logo || '/placeholder.svg'}
                    alt="Logo"
                    style={{ width: '80px', height: 'auto', display: 'block' }}
                    crossOrigin="anonymous"
                  />
                </td>
              )}
              <td
                style={{
                  verticalAlign: 'top',
                  borderLeft: formData.logo ? '1px solid #ddd' : 'none',
                  paddingLeft: formData.logo ? '20px' : '0px',
                }}
              >
                <div
                  style={{
                    fontWeight: '600',
                    fontSize: '16px',
                    marginBottom: formData.title ? '0px' : '8px',
                  }}
                >
                  {formData.name || 'John Doe'}
                </div>
                {formData.title && (
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#555',
                      marginBottom: '8px',
                    }}
                  >
                    {formData.title}
                  </div>
                )}
                {formData.email && (
                  <div style={{ marginBottom: '4px' }}>
                    <a
                      href={`mailto:${formData.email}`}
                      style={{ color: '#0066cc', textDecoration: 'none', fontSize: '13px' }}
                    >
                      {formData.email}
                    </a>
                  </div>
                )}
                {formData.phone && (
                  <div style={{ marginBottom: '4px' }}>
                    <a
                      href={`tel:${formData.phone}`}
                      style={{ color: '#333', textDecoration: 'none', fontSize: '13px' }}
                    >
                      {formData.phone}
                    </a>
                  </div>
                )}
                {websiteUrl && (
                  <div style={{ marginBottom: '12px' }}>
                    <a
                      href={websiteUrl}
                      style={{ color: '#0066cc', textDecoration: 'none', fontSize: '13px' }}
                    >
                      {websiteText || websiteUrl}
                    </a>
                  </div>
                )}
                {formData.socialIcons.some(
                  (icon) => icon.name || icon.iconUrl || icon.profileUrl
                ) && (
                  <div
                    style={{
                      marginTop: '12px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      alignItems: 'center',
                    }}
                  >
                    {formData.socialIcons.map((icon, index) => {
                      if (!icon.name && !icon.iconUrl && !icon.profileUrl) {
                        return null
                      }

                      const linkHref = icon.profileUrl || icon.iconUrl || undefined
                      const altText = icon.name ? `${icon.name} icon` : 'Social icon'
                      const content = icon.iconUrl ? (
                        <img
                          src={icon.iconUrl}
                          alt={altText}
                          style={{
                            width: '20px',
                            height: '20px',
                            display: 'block',
                          }}
                          crossOrigin="anonymous"
                        />
                      ) : (
                        <span
                          style={{
                            color: '#0066cc',
                            textDecoration: 'none',
                            fontSize: '12px',
                          }}
                        >
                          {icon.name || 'Social'}
                        </span>
                      )

                      return (
                        <span
                          key={index}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '20px',
                            minHeight: '20px',
                          }}
                        >
                          {linkHref ? (
                            <a
                              href={linkHref}
                              style={{
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </span>
                      )
                    })}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
)

SignaturePreview.displayName = 'SignaturePreview'

export default SignaturePreview
