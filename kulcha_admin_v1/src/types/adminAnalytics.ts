export type AnalyticsPeriod = "today" | "7d" | "30d";

export interface AdminAnalyticsSummary {
  period: AnalyticsPeriod;
  from_date: string;
  to_date: string;
  orders_count: number;
  revenue: number;
  avg_check: number;
  delivery_orders: number;
  dine_in_orders: number;
}

export interface AdminAnalyticsDailyPoint {
  date: string;
  orders_count: number;
  revenue: number;
}

export interface AdminAnalyticsDailySeries {
  period: AnalyticsPeriod;
  from_date: string;
  to_date: string;
  points: AdminAnalyticsDailyPoint[];
}

