import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { SocialIcon } from '@/lib/types'

interface SignatureFormProps {
  formData: {
    name: string
    title: string
    email: string
    phone: string
    website: string
    logo: string
    socialIcons: Array<SocialIcon>
  }
  onInputChange: (field: string, value: string) => void
  onSocialChange: (index: number, field: keyof SocialIcon, value: string) => void
}

export default function SignatureForm({
  formData,
  onInputChange,
  onSocialChange,
}: SignatureFormProps) {
  return (
    <Card className="p-8 bg-card h-fit space-y-6">
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Signature Details
        </h3>

        <div className="space-y-4">
          {/* Logo */}
          <div>
            <Label htmlFor="logo" className="text-foreground">
              Logo
            </Label>
            <Input
              id="logo"
              type="url"
              placeholder="https://example.com/logo.png"
              value={formData.logo}
              onChange={(e) => onInputChange('logo', e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-foreground">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Marketing Manager"
              value={formData.title}
              onChange={(e) => onInputChange('title', e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-foreground">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Website */}
          <div>
            <Label htmlFor="website" className="text-foreground">
              Website
            </Label>
            <Input
              id="website"
              type="text"
              inputMode="url"
              placeholder="example.com"
              value={formData.website}
              onChange={(e) => onInputChange('website', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="pt-10 border-t border-border space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Social Media Links
        </h3>
        <p className="text-sm text-muted-foreground -mt-2">
          Will show up as text links if icons are not provided.
        </p>
        <div className="space-y-4">
          {formData.socialIcons.map((icon, index) => (
            <div
              key={index}
              className="rounded-lg border border-border p-4 sm:grid sm:grid-cols-3 sm:gap-4 space-y-4 sm:space-y-0"
            >
              <div className="space-y-1">
                <Label htmlFor={`social${index}Name`} className="text-sm text-foreground">
                  Link Name {index + 1}
                </Label>
                <Input
                  id={`social${index}Name`}
                  type="text"
                  placeholder="e.g., LinkedIn, Twitter"
                  value={icon.name}
                  onChange={(e) => onSocialChange(index, 'name', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`social${index}Profile`} className="text-sm text-foreground">
                  Profile URL
                </Label>
                <Input
                  id={`social${index}Profile`}
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={icon.profileUrl}
                  onChange={(e) => onSocialChange(index, 'profileUrl', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`social${index}Icon`} className="text-sm text-foreground">
                  Icon Image URL
                </Label>
                <Input
                  id={`social${index}Icon`}
                  type="url"
                  placeholder="https://example.com/icon.png"
                  value={icon.iconUrl}
                  onChange={(e) => onSocialChange(index, 'iconUrl', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
