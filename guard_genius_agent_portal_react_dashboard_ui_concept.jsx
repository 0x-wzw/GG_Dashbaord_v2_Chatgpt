import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Building2,
  FileText,
  BadgeCheck,
  BarChart3,
  Wallet,
  Bell,
  Search,
  Plus,
  ChevronDown,
  Activity,
  RefreshCw,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// -----------------------------
// Mock data (swap with real API)
// -----------------------------
const kpis = [
  { label: "Quotes Today", value: "128", delta: "+14%", icon: FileText },
  { label: "Policies Issued", value: "42", delta: "+9%", icon: BadgeCheck },
  { label: "Conversion", value: "32.8%", delta: "+2.1%", icon: BarChart3 },
  { label: "Commissions (MTD)", value: "$18,640", delta: "+6%", icon: Wallet },
];

const salesTrend = [
  { name: "Mon", quotes: 96, issued: 28 },
  { name: "Tue", quotes: 110, issued: 33 },
  { name: "Wed", quotes: 118, issued: 37 },
  { name: "Thu", quotes: 104, issued: 31 },
  { name: "Fri", quotes: 128, issued: 42 },
  { name: "Sat", quotes: 82, issued: 22 },
  { name: "Sun", quotes: 64, issued: 16 },
];

const channelPerf = [
  { name: "Branch A", premium: 420, renewals: 68 },
  { name: "Branch B", premium: 360, renewals: 61 },
  { name: "Branch C", premium: 290, renewals: 54 },
  { name: "Branch D", premium: 240, renewals: 49 },
];

const renewals = [
  {
    policyNo: "GG-PL-10293",
    client: "Aria Logistics",
    product: "Guard Pro",
    due: "Feb 19, 2026",
    stage: "Pending Call",
    health: 62,
  },
  {
    policyNo: "GG-PL-11422",
    client: "Nova Retail",
    product: "Guard Basic",
    due: "Feb 22, 2026",
    stage: "Docs Requested",
    health: 48,
  },
  {
    policyNo: "GG-PL-12001",
    client: "Cedar Manufacturing",
    product: "Guard Pro",
    due: "Mar 02, 2026",
    stage: "Quoted",
    health: 71,
  },
  {
    policyNo: "GG-PL-13190",
    client: "BluePeak Services",
    product: "Guard Elite",
    due: "Mar 06, 2026",
    stage: "At Risk",
    health: 35,
  },
];

const activityLog = [
  {
    t: "2m ago",
    who: "Nadia (Agent)",
    action: "Issued policy",
    meta: "GG-PL-14522 • Guard Pro • $12,400 premium",
    badge: "Policy",
  },
  {
    t: "18m ago",
    who: "Imran (Manager)",
    action: "Updated commission tier",
    meta: "Branch B • Tier 2 → Tier 3",
    badge: "Commission",
  },
  {
    t: "1h ago",
    who: "System",
    action: "KYC document verified",
    meta: "Nova Retail • ID + Business Reg",
    badge: "Compliance",
  },
  {
    t: "3h ago",
    who: "Aisha (Agent)",
    action: "Created new quote",
    meta: "Aria Logistics • Guard Elite",
    badge: "Quote",
  },
];

const announcements = [
  {
    title: "New incentive: Q1 Growth Boost",
    desc: "Earn +2% on net new premium for eligible products through Mar 31.",
    tag: "Incentive",
  },
  {
    title: "Compliance update: KYC SLA",
    desc: "KYC verification SLA improved to 15 minutes during business hours.",
    tag: "Compliance",
  },
];

// -----------------------------
// Small helpers
// -----------------------------
function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "success" | "warning" | "danger" }) {
  const map: Record<string, string> = {
    default: "bg-muted text-foreground",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
    danger: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[tone]}`}>{children}</span>
  );
}

function healthTone(v: number) {
  if (v >= 70) return "success";
  if (v >= 45) return "warning";
  return "danger";
}

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

// -----------------------------
// Main UI concept
// -----------------------------
export default function GuardGeniusDashboardConcept() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 text-foreground">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 p-4 md:grid-cols-[280px_1fr] md:p-6">
        <Sidebar />
        <div className="flex min-w-0 flex-col gap-4">
          <TopBar />

          {/* KPI Row */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {kpis.map((k) => (
              <KpiCard key={k.label} {...k} />
            ))}
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <motion.div variants={fade} initial="hidden" animate="show" transition={{ duration: 0.35, delay: 0.05 }} className="xl:col-span-2">
              <SalesCard />
            </motion.div>

            <motion.div variants={fade} initial="hidden" animate="show" transition={{ duration: 0.35, delay: 0.08 }} className="xl:col-span-1">
              <AnnouncementsCard />
            </motion.div>

            <motion.div variants={fade} initial="hidden" animate="show" transition={{ duration: 0.35, delay: 0.12 }} className="xl:col-span-2">
              <RenewalsCard />
            </motion.div>

            <motion.div variants={fade} initial="hidden" animate="show" transition={{ duration: 0.35, delay: 0.16 }} className="xl:col-span-1">
              <ActivityCard />
            </motion.div>
          </div>

          {/* Secondary tabs */}
          <motion.div variants={fade} initial="hidden" animate="show" transition={{ duration: 0.35, delay: 0.2 }}>
            <Tabs defaultValue="channel" className="w-full">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold tracking-tight">Operations</h2>
                  <p className="text-sm text-muted-foreground">Channel performance, commissions, compliance, and training — in one place.</p>
                </div>
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="channel">Channel</TabsTrigger>
                  <TabsTrigger value="commission">Commission</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="training">Training</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="channel" className="mt-4">
                <ChannelCard />
              </TabsContent>
              <TabsContent value="commission" className="mt-4">
                <CommissionCard />
              </TabsContent>
              <TabsContent value="compliance" className="mt-4">
                <ComplianceCard />
              </TabsContent>
              <TabsContent value="training" className="mt-4">
                <TrainingCard />
              </TabsContent>
            </Tabs>
          </motion.div>

          <footer className="py-6 text-center text-xs text-muted-foreground">
            Guard Genius • Agent Portal Concept UI • Replace mock data with API hooks
          </footer>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Sidebar
// -----------------------------
function Sidebar() {
  const nav = [
    { icon: Shield, label: "Overview", active: true },
    { icon: FileText, label: "Quotations" },
    { icon: BadgeCheck, label: "Policies" },
    { icon: RefreshCw, label: "Renewals" },
    { icon: Wallet, label: "Commissions" },
    { icon: Building2, label: "Channels" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Users, label: "Users & Roles" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="sticky top-4 h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border bg-card/60 shadow-sm backdrop-blur md:top-6 md:h-[calc(100vh-3rem)]">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 p-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">Guard Genius</div>
            <div className="truncate text-xs text-muted-foreground">Agent Portal</div>
          </div>
        </div>

        <div className="px-4">
          <Separator />
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {nav.map((n) => (
            <button
              key={n.label}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-muted/70 ${
                n.active ? "bg-muted font-medium" : "text-muted-foreground"
              }`}
            >
              <n.icon className="h-4 w-4" />
              <span className="truncate">{n.label}</span>
              {n.label === "Renewals" ? <Badge className="ml-auto" variant="secondary">8</Badge> : null}
            </button>
          ))}
        </nav>

        <div className="p-3">
          <Card className="rounded-2xl">
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-muted">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium">Need help?</div>
                  <div className="text-xs text-muted-foreground">Guided onboarding & tutorials inside.</div>
                  <Button size="sm" variant="secondary" className="mt-2 w-full rounded-xl">
                    Open Training
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button variant="ghost" className="mt-3 w-full justify-start rounded-xl text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
}

// -----------------------------
// Top bar
// -----------------------------
function TopBar() {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <div className="text-base font-semibold tracking-tight">Super Admin Console</div>
            <div className="text-xs text-muted-foreground">Governance, channel oversight, rules & platform health</div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-ce
// -----------------------------
function KpiCard({ label, value, delta, icon: Icon }: { label: string; value: string; delta: string; icon: any }) {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <Chip tone="success">{delta}</Chip>
        </div>
        <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

// -----------------------------
// Sales trend
// -----------------------------
function SalesCard() {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Sales & Issuance Trend</CardTitle>
            <p className="text-sm text-muted-foreground">Quotes created vs policies issued (last 7 days)</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="h-9 rounded-xl">
              Export
            </Button>
            <Button variant="outline" className="h-9 rounded-xl">
              Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesTrend} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="q" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="i" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} width={30} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="quotes" stroke="hsl(var(--primary))" fill="url(#q)" strokeWidth={2} />
              <Area type="monotone" dataKey="issued" stroke="hsl(var(--muted-foreground))" fill="url(#i)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <MiniStat title="Avg. Quote Time" value="2m 14s" hint="From lead → quote" />
          <MiniStat title="Bind Rate" value="19.4%" hint="Quotes → bound" />
          <MiniStat title="Certificate SLA" value="< 5m" hint="Issuance speed" />
        </div>
      </CardContent>
    </Card>
  );
}

function MiniStat({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border bg-background/40 p-3">
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="text-lg font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

// -----------------------------
// Announcements
// -----------------------------
function AnnouncementsCard() {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Communication Hub</CardTitle>
          <Button variant="ghost" size="sm" className="rounded-xl">
            View all
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Announcements & operational alerts</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {announcements.map((a) => (
          <div key={a.title} className="rounded-2xl border bg-background/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold leading-tight">{a.title}</div>
              <Badge variant="secondary" className="rounded-full">
                {a.tag}
              </Badge>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{a.desc}</div>
          </div>
        ))}

        <div className="rounded-2xl border bg-background/40 p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">System Status</div>
            <Chip tone="success">All green</Chip>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="rounded-xl bg-muted/40 p-2">Quote Engine: OK</div>
            <div className="rounded-xl bg-muted/40 p-2">KYC: OK</div>
            <div className="rounded-xl bg-muted/40 p-2">Payments: OK</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// -----------------------------
// Renewals table
// -----------------------------
function RenewalsCard() {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Renewals & Portfolio</CardTitle>
            <p className="text-sm text-muted-foreground">Upcoming renewals requiring action</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="h-9 rounded-xl">
              Assign
            </Button>
            <Button variant="outline" className="h-9 rounded-xl">
              Bulk actions
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="w-[220px]">Renewal Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renewals.map((r) => (
                <TableRow key={r.policyNo} className="hover:bg-muted/40">
                  <TableCell className="font-medium">{r.policyNo}</TableCell>
                  <TableCell>{r.client}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full">
                      {r.product}
                    </Badge>
                  </TableCell>
                  <TableCell>{r.due}</TableCell>
                  <TableCell>
                    <Chip tone={r.stage === "At Risk" ? "danger" : r.stage === "Quoted" ? "success" : "warning"}>{r.stage}</Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={r.health} className="h-2" />
                      <span className="text-xs text-muted-foreground">{r.health}%</span>
                      <Chip tone={healthTone(r.health)}>{healthTone(r.health).toUpperCase()}</Chip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// -----------------------------
// Activity log
// -----------------------------
function ActivityCard() {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Activity Log</CardTitle>
          <Button variant="ghost" size="sm" className="rounded-xl">
            Audit view
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Real-time accountability across roles</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {activityLog.map((a, idx) => (
          <div key={idx} className="rounded-2xl border bg-background/40 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="default">{a.badge}</Chip>
                  <div className="text-sm font-semibold">{a.action}</div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{a.who} • {a.t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{a.meta}</div>
              </div>
              <Activity className="mt-1 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// -----------------------------
// Tabs: Channel
// -----------------------------
function ChannelCard() {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Multi-Tier Channel Management</CardTitle>
            <p className="text-sm text-muted-foreground">Performance by branch with rollups for teams and agents</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="h-9 rounded-xl">Branch View</Button>
            <Button variant="outline" className="h-9 rounded-xl">Team View</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-background/40 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">Premium (k)</div>
            <Badge variant="secondary" className="rounded-full">This month</Badge>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelPerf} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={30} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
                />
                <Bar dataKey="premium" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border bg-background/40 p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Top Branch</div>
              <Chip tone="success">Branch A</Chip>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Strong conversion and renewal follow-through</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-xl bg-muted/40 p-2">
                <div className="text-muted-foreground">Conv.</div>
                <div className="font-semibold">34.2%</div>
              </div>
              <div className="rounded-xl bg-muted/40 p-2">
                <div className="text-muted-foreground">Renewals</div>
                <div className="font-semibold">68</div>
              </div>
              <div className="rounded-xl bg-muted/40 p-2">
                <div className="text-muted-foreground">Active</div>
                <div className="font-semibold">312</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-background/40 p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Actionable insights</div>
              <Badge variant="secondary" className="rounded-full">AI-ready</Badge>
            </div>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>• Branch D conversion lagging — recommend refresher training</li>
              <li>• Renewal risk rising for Guard Elite accounts in Retail vertical</li>
              <li>• Team B2 fastest quote-to-bind speed (replicate playbook)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// -----------------------------
// Tabs: Commission
// -----------------------------
function CommissionCard() {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Commission & Incentives</CardTitle>
            <p className="text-sm text-muted-foreground">Transparent earnings, tiers, and payout forecasting</p>
          </div>
          <Button className="h-9 rounded-xl">Configure tiers</Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-background/40 p-3 lg:col-span-1">
          <div className="text-sm font-semibold">Earnings Snapshot</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">$18,640</div>
          <div className="text-sm text-muted-foreground">Month-to-date</div>
          <Separator className="my-3" />
          <div className="space-y-2 text-sm">
            <Row label="Base commission" value="$14,920" />
            <Row label="Incentives" value="$3,120" />
            <Row label="Adjustments" value="$600" />
          </div>
          <Button variant="secondary" className="mt-3 w-full rounded-xl">Download statement</Button>
        </div>

        <div className="rounded-2xl border bg-background/40 p-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Tier Progress</div>
              <div className="text-sm text-muted-foreground">Current tier: <span className="font-medium text-foreground">Tier 3</span></div>
            </div>
            <Chip tone="success">Next tier in 12%</Chip>
          </div>
          <div className="mt-3 space-y-3">
            <div className="rounded-2xl border bg-muted/20 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Net new premium target</span>
                <span className="font-medium">$220k / $250k</span>
              </div>
              <Progress value={88} className="mt-2 h-2" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-muted/20 p-3">
                <div className="text-xs text-muted-foreground">Incentive rule</div>
                <div className="mt-1 text-sm font-semibold">Q1 Growth Boost</div>
                <div className="mt-2 text-sm text-muted-foreground">+2% on eligible net new premium</div>
              </div>
              <div className="rounded-2xl border bg-muted/20 p-3">
                <div className="text-xs text-muted-foreground">Forecast payout</div>
                <div className="mt-1 text-sm font-semibold">$22,400</div>
                <div className="mt-2 text-sm text-muted-foreground">Estimated end-of-month</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

// -----------------------------
// Tabs: Compliance
// -----------------------------
function ComplianceCard() {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Document & Compliance Management</CardTitle>
            <p className="text-sm text-muted-foreground">KYC vault, audit trails, and verification workflows</p>
          </div>
          <Button variant="secondary" className="h-9 rounded-xl">Upload documents</Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-background/40 p-3">
          <div className="text-sm font-semibold">KYC Queue</div>
          <p className="mt-1 text-sm text-muted-foreground">Items pending verification</p>
          <Separator className="my-3" />
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Pending</span>
              <Chip tone="warning">12</Chip>
            </div>
            <div className="flex items-center justify-between">
              <span>Flagged</span>
              <Chip tone="danger">3</Chip>
            </div>
            <div className="flex items-center justify-between">
              <span>Verified today</span>
              <Chip tone="success">28</Chip>
            </div>
          </div>
          <Button className="mt-3 w-full rounded-xl">Open KYC queue</Button>
        </div>

        <div className="rounded-2xl border bg-background/40 p-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Audit Trail Sample</div>
              <div className="text-sm text-muted-foreground">Every document change is logged</div>
            </div>
            <Badge variant="secondary" className="rounded-full">Immutable logs</Badge>
          </div>
          <div className="mt-3 overflow-hidden rounded-2xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Entity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {["10:14", "10:03", "09:44", "09:12"].map((t, i) => (
                  <TableRow key={t} className="hover:bg-muted/40">
                    <TableCell>{t}</TableCell>
                    <TableCell>{i === 0 ? "System" : i === 1 ? "Nadia" : i === 2 ? "Imran" : "Aisha"}</TableCell>
                    <TableCell>{i === 0 ? "Verified" : i === 1 ? "Uploaded" : i === 2 ? "Updated" : "Viewed"}</TableCell>
                    <TableCell>{i === 0 ? "Nova Retail KYC" : i === 1 ? "Aria Logistics ID" : i === 2 ? "Commission Rule" : "Policy GG-PL-12001"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// -----------------------------
// Tabs: Training
// -----------------------------
function TrainingCard() {
  return (
    <Card className="rounded-2xl border bg-card/60 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Built-In Training & Onboarding</CardTitle>
            <p className="text-sm text-muted-foreground">Interactive guides to accelerate adoption</p>
          </div>
          <Button className="h-9 rounded-xl">Start onboarding</Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border bg-background/40 p-3">
          <div className="text-sm font-semibold">Onboarding Progress</div>
          <p className="mt-1 text-sm text-muted-foreground">Agency Manager pathway</p>
          <div className="mt-3">
            <Progress value={70} className="h-2" />
            <div className="mt-2 text-xs text-muted-foreground">7/10 steps complete</div>
          </div>
          <Separator className="my-3" />
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Configure channel hierarchy</li>
            <li>• Set commission tiers</li>
            <li>• Invite agents</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-background/40 p-3 lg:col-span-2">
          <div className="text-sm font-semibold">Recommended modules</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { title: "Quote → Bind in 5 minutes", mins: 6, tag: "Workflow" },
              { title: "Handling renewals like a pro", mins: 9, tag: "Playbook" },
              { title: "KYC & compliance basics", mins: 7, tag: "Compliance" },
              { title: "Incentives & payout clarity", mins: 5, tag: "Commission" },
            ].map((m) => (
              <div key={m.title} className="rounded-2xl border bg-muted/20 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold leading-tight">{m.title}</div>
                  <Badge variant="secondary" className="rounded-full">{m.tag}</Badge>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{m.mins} min • Interactive</div>
                <Button variant="secondary" size="sm" className="mt-3 rounded-xl">Launch</Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
