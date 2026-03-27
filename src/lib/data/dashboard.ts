export const dashboardStats = {
  activeCustomers: { value: 93, change: "+2.18%", trend: "up" as const },
  totalProfit:     { value: 280900, change: "+8.26%", trend: "up" as const },   // in pence
  overduePayments: { value: 7,  change: "-3.15%", trend: "down" as const },
  revenue:         { value: 802000, change: "+12.92%", trend: "up" as const }, // in pence
};

export interface RevenueDataPoint {
  label: string;
  amount: number; // in pence
}

export const revenueChartData: RevenueDataPoint[] = [
  { label: "Mar",  amount: 520000  },
  { label: "Apr",  amount: 680000  },
  { label: "May",  amount: 750000  },
  { label: "Jun",  amount: 890000  },
  { label: "Jul",  amount: 620000  },
  { label: "Aug",  amount: 940000  },
  { label: "Sep",  amount: 1100000 },
  { label: "Oct",  amount: 830000  },
  { label: "Nov",  amount: 970000  },
  { label: "Dec",  amount: 1250000 },
  { label: "Jan",  amount: 580000  },
  { label: "Feb",  amount: 710000  },
  { label: "Mar",  amount: 820000  },
];
