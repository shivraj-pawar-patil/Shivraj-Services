import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ThemeDemo() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Theme Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates the light and dark theme functionality
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Primary Card</CardTitle>
            <CardDescription className="text-muted-foreground">
              This card uses theme-aware colors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              The background and text colors automatically adapt to the current theme.
            </p>
            <div className="flex gap-2">
              <Button>Primary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
            <div className="flex gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Color Palette</CardTitle>
            <CardDescription className="text-muted-foreground">
              Theme color variables in action
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 bg-background text-foreground border rounded">
                Background
              </div>
              <div className="p-2 bg-card text-card-foreground border rounded">
                Card
              </div>
              <div className="p-2 bg-primary text-primary-foreground border rounded">
                Primary
              </div>
              <div className="p-2 bg-secondary text-secondary-foreground border rounded">
                Secondary
              </div>
              <div className="p-2 bg-muted text-muted-foreground border rounded">
                Muted
              </div>
              <div className="p-2 bg-accent text-accent-foreground border rounded">
                Accent
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Interactive Elements</CardTitle>
            <CardDescription className="text-muted-foreground">
              Form elements and inputs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Sample Input</label>
              <input 
                type="text" 
                placeholder="Type something..." 
                className="w-full p-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Textarea</label>
              <textarea 
                placeholder="Enter your message..."
                className="w-full p-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Theme Instructions</CardTitle>
          <CardDescription className="text-muted-foreground">
            How to use the theme system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Enhanced Theme Toggle</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Click the theme toggle button in the navbar to switch between light, dark, and system themes. The new themes feature improved colors and better contrast.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <span className="font-medium">Light:</span> Clean, modern light theme with blue accents</li>
                <li>• <span className="font-medium">Dark:</span> Sleek dark theme with vibrant blue highlights</li>
                <li>• <span className="font-medium">System:</span> Automatically follows your OS preference</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">CSS Classes</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Use these Tailwind classes for theme-aware styling:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code className="bg-muted px-1 rounded">bg-background</code> - Main background</li>
                <li>• <code className="bg-muted px-1 rounded">text-foreground</code> - Main text color</li>
                <li>• <code className="bg-muted px-1 rounded">border-border</code> - Border color</li>
                <li>• <code className="bg-muted px-1 rounded">bg-card</code> - Card background</li>
                <li>• <code className="bg-muted px-1 rounded">text-muted-foreground</code> - Muted text</li>
                <li>• <code className="bg-muted px-1 rounded">bg-primary</code> - Primary accent color</li>
                <li>• <code className="bg-muted px-1 rounded">theme-transition</code> - Smooth transitions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Enhanced Theme Features</CardTitle>
          <CardDescription className="text-muted-foreground">
            New improvements and enhancements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Improved Colors</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Better contrast ratios for accessibility</li>
                <li>• Modern blue accent colors</li>
                <li>• Refined dark theme with deeper blacks</li>
                <li>• Enhanced light theme with subtle grays</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Visual Enhancements</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Smooth theme transition animations</li>
                <li>• Enhanced scrollbar styling</li>
                <li>• Improved focus indicators</li>
                <li>• Better card shadows and depth</li>
              </ul>
            </div>
          </div>
          
          {/* Color Palette Showcase */}
          <div className="mt-6">
            <h3 className="font-semibold text-foreground mb-3">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center">
                <div className="w-full h-12 bg-primary rounded-lg mb-2"></div>
                <div className="text-xs text-muted-foreground">Primary</div>
              </div>
              <div className="text-center">
                <div className="w-full h-12 bg-secondary rounded-lg mb-2"></div>
                <div className="text-xs text-muted-foreground">Secondary</div>
              </div>
              <div className="text-center">
                <div className="w-full h-12 bg-muted rounded-lg mb-2"></div>
                <div className="text-xs text-muted-foreground">Muted</div>
              </div>
              <div className="text-center">
                <div className="w-full h-12 bg-accent rounded-lg mb-2"></div>
                <div className="text-xs text-muted-foreground">Accent</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
