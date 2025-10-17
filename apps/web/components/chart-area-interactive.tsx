'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useIsMobile } from '@/components/dashboard/hooks/use-mobile';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const description = 'An interactive area chart';

const chartData = [
  { date: '2024-04-01', iphone10: 222, iphone12: 150, iphone13: 357 },
  { date: '2024-04-02', iphone10: 97, iphone12: 180, iphone13: 357 },
  { date: '2024-04-03', iphone10: 167, iphone12: 120, iphone13: 357 },
  { date: '2024-04-04', iphone10: 242, iphone12: 260, iphone13: 357 },
  { date: '2024-04-05', iphone10: 373, iphone12: 290, iphone13: 357 },
  { date: '2024-04-06', iphone10: 301, iphone12: 340, iphone13: 357 },
  { date: '2024-04-07', iphone10: 245, iphone12: 180, iphone13: 357 },
  { date: '2024-04-08', iphone10: 409, iphone12: 320, iphone13: 357 },
  { date: '2024-04-09', iphone10: 59, iphone12: 110, iphone13: 357 },
  { date: '2024-04-10', iphone10: 261, iphone12: 190, iphone13: 357 },
  { date: '2024-04-11', iphone10: 327, iphone12: 350, iphone13: 357 },
  { date: '2024-04-12', iphone10: 292, iphone12: 210, iphone13: 357 },
  { date: '2024-04-13', iphone10: 342, iphone12: 380, iphone13: 357 },
  { date: '2024-04-14', iphone10: 137, iphone12: 220, iphone13: 357 },
  { date: '2024-04-15', iphone10: 120, iphone12: 170, iphone13: 357 },
  { date: '2024-04-16', iphone10: 138, iphone12: 190, iphone13: 357 },
  { date: '2024-04-17', iphone10: 446, iphone12: 360, iphone13: 357 },
  { date: '2024-04-18', iphone10: 364, iphone12: 410, iphone13: 357 },
  { date: '2024-04-19', iphone10: 243, iphone12: 180, iphone13: 357 },
  { date: '2024-04-20', iphone10: 89, iphone12: 150, iphone13: 357 },
  { date: '2024-04-21', iphone10: 137, iphone12: 200, iphone13: 357 },
  { date: '2024-04-22', iphone10: 224, iphone12: 170, iphone13: 357 },
  { date: '2024-04-23', iphone10: 138, iphone12: 230, iphone13: 357 },
  { date: '2024-04-24', iphone10: 387, iphone12: 290, iphone13: 357 },
  { date: '2024-04-25', iphone10: 215, iphone12: 250, iphone13: 357 },
  { date: '2024-04-26', iphone10: 75, iphone12: 130, iphone13: 357 },
  { date: '2024-04-27', iphone10: 383, iphone12: 420, iphone13: 357 },
  { date: '2024-04-28', iphone10: 122, iphone12: 180, iphone13: 357 },
  { date: '2024-04-29', iphone10: 315, iphone12: 240, iphone13: 357 },
  { date: '2024-04-30', iphone10: 454, iphone12: 380, iphone13: 357 },
  { date: '2024-05-01', iphone10: 165, iphone12: 220, iphone13: 357 },
  { date: '2024-05-02', iphone10: 293, iphone12: 310, iphone13: 357 },
  { date: '2024-05-03', iphone10: 247, iphone12: 190, iphone13: 357 },
  { date: '2024-05-04', iphone10: 385, iphone12: 420, iphone13: 357 },
  { date: '2024-05-05', iphone10: 481, iphone12: 390, iphone13: 357 },
  { date: '2024-05-06', iphone10: 498, iphone12: 520, iphone13: 357 },
  { date: '2024-05-07', iphone10: 388, iphone12: 300, iphone13: 357 },
  { date: '2024-05-08', iphone10: 149, iphone12: 210, iphone13: 357 },
  { date: '2024-05-09', iphone10: 227, iphone12: 180, iphone13: 357 },
  { date: '2024-05-10', iphone10: 293, iphone12: 330, iphone13: 357 },
  { date: '2024-05-11', iphone10: 335, iphone12: 270, iphone13: 357 },
  { date: '2024-05-12', iphone10: 197, iphone12: 240, iphone13: 357 },
  { date: '2024-05-13', iphone10: 197, iphone12: 160, iphone13: 357 },
  { date: '2024-05-14', iphone10: 448, iphone12: 490, iphone13: 357 },
  { date: '2024-05-15', iphone10: 473, iphone12: 380, iphone13: 357 },
  { date: '2024-05-16', iphone10: 338, iphone12: 400, iphone13: 357 },
  { date: '2024-05-17', iphone10: 499, iphone12: 420, iphone13: 357 },
  { date: '2024-05-18', iphone10: 315, iphone12: 350, iphone13: 357 },
  { date: '2024-05-19', iphone10: 235, iphone12: 180, iphone13: 357 },
  { date: '2024-05-20', iphone10: 177, iphone12: 230, iphone13: 357 },
  { date: '2024-05-21', iphone10: 82, iphone12: 140, iphone13: 357 },
  { date: '2024-05-22', iphone10: 81, iphone12: 120, iphone13: 357 },
  { date: '2024-05-23', iphone10: 252, iphone12: 290, iphone13: 357 },
  { date: '2024-05-24', iphone10: 294, iphone12: 220, iphone13: 357 },
  { date: '2024-05-25', iphone10: 201, iphone12: 250, iphone13: 357 },
  { date: '2024-05-26', iphone10: 213, iphone12: 170, iphone13: 357 },
  { date: '2024-05-27', iphone10: 420, iphone12: 460, iphone13: 357 },
  { date: '2024-05-28', iphone10: 233, iphone12: 190, iphone13: 357 },
  { date: '2024-05-29', iphone10: 78, iphone12: 130, iphone13: 357 },
  { date: '2024-05-30', iphone10: 340, iphone12: 280, iphone13: 357 },
  { date: '2024-05-31', iphone10: 178, iphone12: 230, iphone13: 357 },
  { date: '2024-06-01', iphone10: 178, iphone12: 200, iphone13: 357 },
  { date: '2024-06-02', iphone10: 470, iphone12: 410, iphone13: 357 },
  { date: '2024-06-03', iphone10: 103, iphone12: 160, iphone13: 357 },
  { date: '2024-06-04', iphone10: 439, iphone12: 380, iphone13: 357 },
  { date: '2024-06-05', iphone10: 88, iphone12: 140, iphone13: 357 },
  { date: '2024-06-06', iphone10: 294, iphone12: 250, iphone13: 357 },
  { date: '2024-06-07', iphone10: 323, iphone12: 370, iphone13: 357 },
  { date: '2024-06-08', iphone10: 385, iphone12: 320, iphone13: 357 },
  { date: '2024-06-09', iphone10: 438, iphone12: 480, iphone13: 357 },
  { date: '2024-06-10', iphone10: 155, iphone12: 200, iphone13: 357 },
  { date: '2024-06-11', iphone10: 92, iphone12: 150, iphone13: 357 },
  { date: '2024-06-12', iphone10: 492, iphone12: 420, iphone13: 357 },
  { date: '2024-06-13', iphone10: 81, iphone12: 130, iphone13: 357 },
  { date: '2024-06-14', iphone10: 426, iphone12: 380, iphone13: 357 },
  { date: '2024-06-15', iphone10: 307, iphone12: 350, iphone13: 357 },
  { date: '2024-06-16', iphone10: 371, iphone12: 310, iphone13: 357 },
  { date: '2024-06-17', iphone10: 475, iphone12: 520, iphone13: 357 },
  { date: '2024-06-18', iphone10: 107, iphone12: 170, iphone13: 357 },
  { date: '2024-06-19', iphone10: 341, iphone12: 290, iphone13: 357 },
  { date: '2024-06-20', iphone10: 408, iphone12: 450, iphone13: 357 },
  { date: '2024-06-21', iphone10: 169, iphone12: 210, iphone13: 357 },
  { date: '2024-06-22', iphone10: 317, iphone12: 270, iphone13: 357 },
  { date: '2024-06-23', iphone10: 480, iphone12: 530, iphone13: 357 },
  { date: '2024-06-24', iphone10: 132, iphone12: 180, iphone13: 357 },
  { date: '2024-06-25', iphone10: 141, iphone12: 190, iphone13: 357 },
  { date: '2024-06-26', iphone10: 434, iphone12: 380, iphone13: 357 },
  { date: '2024-06-27', iphone10: 448, iphone12: 490, iphone13: 357 },
  { date: '2024-06-28', iphone10: 149, iphone12: 200, iphone13: 357 },
  { date: '2024-06-29', iphone10: 103, iphone12: 160, iphone13: 357 },
  { date: '2024-06-30', iphone10: 446, iphone12: 400, iphone13: 357 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Sales</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="iphone10"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="iphone12"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              dataKey="iphone13"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
