import { BASE_URL } from "./baseUrl";
import {
  AnalyticsPeriod,
  AdminAnalyticsSummary,
  AdminAnalyticsDailySeries,
} from "../types/adminAnalytics";

export async function fetchAnalyticsSummary(
  restaurantId: number,
  period: AnalyticsPeriod
): Promise<AdminAnalyticsSummary> {
  const url = `${BASE_URL}/api/admin/restaurants/${restaurantId}/analytics/summary?period=${period}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to fetch analytics summary: ${resp.status}`);
  }
  return (await resp.json()) as AdminAnalyticsSummary;
}

export async function fetchAnalyticsDaily(
  restaurantId: number,
  period: AnalyticsPeriod
): Promise<AdminAnalyticsDailySeries> {
  const url = `${BASE_URL}/api/admin/restaurants/${restaurantId}/analytics/daily?period=${period}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to fetch analytics daily: ${resp.status}`);
  }
  return (await resp.json()) as AdminAnalyticsDailySeries;
}

