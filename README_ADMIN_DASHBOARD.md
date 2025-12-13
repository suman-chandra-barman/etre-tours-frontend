# Admin Dashboard - Quick Start Guide

## 🎯 What's Been Created

Your admin dashboard has been designed with **8 metric cards** matching your design:

1. **Total Sale** - Shows total sales with trend
2. **Direct Sales** - Direct sales amount with trend
3. **Cruise Operation** - Cruise operation revenue with trend
4. **Partner Booking** - Partner booking amount with trend
5. **Total Cost** - Total costs with trend
6. **Transport** - Transport costs with trend
7. **Service Provider Fee** - Fixed rate with badge
8. **Net Profit** - Net profit with trend

## 📁 Files Created

1. **`components/admin/cards/StatCard.tsx`** - Reusable stat card component
2. **`types/admin.ts`** - TypeScript interfaces for dashboard data
3. **`app/(admin)/admin/page.tsx`** - Main admin dashboard page
4. **`lib/api/admin.ts`** - API service functions (optional)
5. **`docs/ADMIN_DASHBOARD_API.md`** - Complete API integration guide

## 🚀 Quick API Integration (3 Steps)

### Step 1: Set Your API URL

Create or update `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### Step 2: Update the Fetch Call

In `app/(admin)/admin/page.tsx`, uncomment and modify:

```typescript
// Replace this:
const mockData: DashboardStats = { ... };
setDashboardData(mockData);

// With this:
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`);
const data = await response.json();
setDashboardData(data);
```

### Step 3: Ensure Backend Sends Correct Format

Your backend should return:

```json
{
  "totalSale": 6005,
  "directSales": 850,
  "cruiseOperation": 4280,
  "partnerBooking": 875,
  "totalCost": 1250,
  "transport": 850,
  "serviceProviderFee": 400,
  "netProfit": 1615,
  "trends": {
    "totalSale": "+ 36%",
    "directSales": "+ 36%",
    "cruiseOperation": "+ 36%",
    "partnerBooking": "+ 36%",
    "totalCost": "14%",
    "transport": "14%",
    "netProfit": "+ 26.9%"
  }
}
```

## 🎨 Design Features

✅ **Responsive Grid** - 1 column (mobile), 2 columns (tablet), 4 columns (desktop)
✅ **Trend Indicators** - Green for positive, red for negative
✅ **Fixed Rate Badge** - Red badge on Service Provider Fee card
✅ **Currency Formatting** - Automatic formatting with commas
✅ **Loading State** - Built-in loading indicator
✅ **Error Handling** - Console logging for debugging

## 🔧 Customization Examples

### Add a New Card

In `page.tsx`, add to `getCardData()`:

```typescript
{
  title: "YOUR METRIC",
  value: formatCurrency(dashboardData.yourMetric),
  trend: parseTrend(dashboardData.trends.yourMetric),
}
```

### Change Grid Layout

In `page.tsx`, modify the grid classes:

```typescript
// 3 columns instead of 4:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Auto-Refresh Data

Add this to the `useEffect`:

```typescript
const interval = setInterval(fetchDashboardData, 60000); // Every 60 seconds
return () => clearInterval(interval);
```

## 📊 Current State

The dashboard is currently showing **mock data**. Once you connect your backend API, simply:

1. Update the API endpoint
2. Remove the mock data
3. Your dashboard will be fully dynamic!

## 📖 Need More Help?

Check `docs/ADMIN_DASHBOARD_API.md` for:

- Detailed authentication setup
- Advanced error handling
- Testing strategies
- More customization options

---

**Ready to test?** The dashboard is live and showing mock data. Visit your admin page to see it in action!
