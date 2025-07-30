import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { RoomCalendarShowcase } from '@/components/room-calender-showcase';
import MonthPicker from '@/components/month-picker';
import MonthMiniViewer from '@/components/month-mini-viewer';

export interface ComponentConfig {
  name: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  code: string;
  description?: string;
  category?: string;
}

const InteractiveCounter = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" onClick={() => setCount(count - 1)}>-</Button>
      <span className="text-2xl font-semibold w-12 text-center">{count}</span>
      <Button variant="outline" onClick={() => setCount(count + 1)}>+</Button>
    </div>
  );
};

const AnimatedProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex justify-between text-sm">
        <span>Loading...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};

const NotificationCard = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return (
      <Button onClick={() => setIsVisible(true)}>Show Notification</Button>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Notification
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>×</Button>
        </CardTitle>
        <CardDescription>You have a new message</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This is an example notification component with dismiss functionality.</p>
      </CardContent>
    </Card>
  );
};

const StatusAlerts = () => {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      <Alert className="border-green-500 text-green-600">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Operation completed successfully!</AlertDescription>
      </Alert>
      <Alert className="border-red-500 text-red-600">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    </div>
  );
};

const ToggleSettings = () => {
  const [settings, setSettings] = React.useState({
    notifications: true,
    marketing: false,
    analytics: true,
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <Label htmlFor={key} className="capitalize">{key}</Label>
            <Switch
              id={key}
              checked={value}
              onCheckedChange={(checked) =>
                setSettings(prev => ({ ...prev, [key]: checked }))
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const UserProfile = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg">John Doe</CardTitle>
          <CardDescription>Software Developer</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Badge>React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="outline">Next.js</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const VolumeControl = () => {
  const [volume, setVolume] = React.useState([50]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <Label>Volume</Label>
        <span className="text-sm text-muted-foreground">{volume[0]}%</span>
      </div>
      <Slider
        value={volume}
        onValueChange={setVolume}
        max={100}
        step={1}
        className="w-full"
      />
    </div>
  );
};

export const componentRegistry: ComponentConfig[] = [
  {
    name: 'Animated Progress',
    component: AnimatedProgress,
    code: `const AnimatedProgress = () => {
  const [progress, setProgress] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex justify-between text-sm">
        <span>Loading...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};`,
    description: 'Progress bar with animated loading',
    category: 'Feedback',
  },
  {
    name: 'Room Calendar',
    component: RoomCalendarShowcase,
    code: `const RoomCalendar = () => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedLease, setSelectedLease] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState("Francis");

  // Mock room data with leases
  const rooms = [
    {
      id: 1,
      roomName: 'Room 1',
      roomNumber: '101',
      building: 'Francis',
      floor: 1,
      leases: [{
        id: 1,
        tenantName: 'John Doe',
        startMonth: 0,
        endMonth: 5,
        monthlyRent: 85000,
        calendarStatus: 'active'
      }]
    },
    // ... more rooms
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Year navigation and community selector */}
      <Card className="overflow-hidden">
        {/* Calendar grid showing rooms and their lease schedules */}
        {/* Click on leases to see details */}
      </Card>
    </div>
  );
};`,
    description: 'Property management calendar showing room availability and lease schedules',
    category: 'Data Display',
  },
  {
    name: 'Month Picker',
    component: MonthPicker,
    code: `const MonthPicker = () => {
  const [range, setRange] = React.useState({ start: null, end: null });
  return <MonthPicker value={range} onChange={setRange} />;
};`,
    description: 'Interactive month range selector with timeline view and drag-and-drop support.',
    category: 'Forms',
  },
  {
    name: 'Month Mini Viewer',
    component: MonthMiniViewer,
    props: {
      months: [
        { month: 0, year: 2025 },
        { month: 1, year: 2025 },
        { month: 2, year: 2025 },
        { month: 6, year: 2025 },
        { month: 7, year: 2025 },
        { month: 10, year: 2026 },
        { month: 11, year: 2026 },
      ],
    },
    code: `<MonthMiniViewer 
    months={[
        { month: 0, year: 2025 },
        { month: 1, year: 2025 },
        // ... more months
    ]} 
/>`,
    description: 'Compact display for showing selected months with year labels and different sizes',
    category: 'Data Display',
  },
];
