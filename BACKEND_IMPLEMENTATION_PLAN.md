# Backend Implementation Plan - Admin Panel

## Overview

Complete backend API implementation for the Fly Arzan Admin Panel based on `admin-requirements.txt` and current dashboard design.

---

## 1. Authentication & Authorization

### 1.1 Google OAuth Integration

**Endpoint**: `POST /api/auth/google`

- Implement Google OAuth 2.0 flow
- Store user credentials securely
- Generate JWT tokens
- Return user profile and access token

**Endpoint**: `GET /api/auth/me`

- Verify JWT token
- Return current user profile
- Include roles and permissions

### 1.2 Session Management

**Endpoint**: `GET /api/auth/sessions`

- List all active sessions for current user
- Include device info, IP, location, last active time
- Support pagination

**Endpoint**: `DELETE /api/auth/sessions/:sessionId`

- Terminate specific session
- Invalidate session token
- Log security event

**Endpoint**: `GET /api/auth/devices`

- List all devices used by user
- Include device type, browser, OS
- Show last login time

### 1.3 RBAC (Role-Based Access Control)

**Endpoint**: `GET /api/auth/roles`

- List all available roles
- Include permissions for each role

**Endpoint**: `POST /api/auth/users/:userId/roles`

- Assign role to user
- Require admin permission

**Endpoint**: `GET /api/auth/permissions`

- List all permissions
- Group by module

---

## 2. Analytics & Metrics

### 2.1 Dashboard Overview

**Endpoint**: `GET /api/admin/dashboard/metrics`

```json
{
  "totalSearches": { "value": 48237, "change": 12.4 },
  "clickoutRate": { "value": 34.2, "change": 5.1 },
  "uniqueVisitors": { "value": 18740, "change": 7.8 },
  "apiHealth": { "value": 99.8, "change": 0.2 }
}
```

**Endpoint**: `GET /api/admin/dashboard/search-timeseries`

- Query params: `startDate`, `endDate`, `interval` (hourly, daily, weekly)
- Return time-series data for searches and clickouts

**Endpoint**: `GET /api/admin/dashboard/top-routes`

- Query params: `limit`, `startDate`, `endDate`
- Return top searched routes with conversion rates

**Endpoint**: `GET /api/admin/dashboard/device-distribution`

- Return breakdown by device type (desktop, mobile, tablet)

**Endpoint**: `GET /api/admin/dashboard/geo-distribution`

- Return visitor counts by country
- Include percentage breakdown

**Endpoint**: `GET /api/admin/dashboard/api-services`

- Return status of all API services
- Include latency, uptime percentage

### 2.2 Engagement Metrics

**Endpoint**: `GET /api/admin/analytics/engagement`

- Query params: `startDate`, `endDate`, `interval`
- Return:
  - Session counts
  - Average duration
  - Bounce rate
  - CTR (Click-through rate)
  - Time-series data

**Endpoint**: `GET /api/admin/analytics/user-behavior`

- Return funnel data (searches → results → details → clickouts)
- Device-specific metrics
- Top pages visited

### 2.3 Search Routes Analytics

**Endpoint**: `GET /api/admin/analytics/routes`

- Query params: `startDate`, `endDate`, `limit`, `sortBy`
- Return:
  - Top routes by search volume
  - Clickout rates per route
  - Regional distribution
  - Travel class breakdown

**Endpoint**: `GET /api/admin/analytics/trending-routes`

- Return routes with highest growth
- Compare with previous period

### 2.4 Trend Charts

**Endpoint**: `GET /api/admin/analytics/trends`

- Query params: `metric`, `startDate`, `endDate`, `interval`
- Metrics: `searches`, `prices`, `users`, `conversions`
- Return time-series data with trend indicators

### 2.5 Search Logs

**Endpoint**: `GET /api/admin/logs/search-logs`

- Query params:
  - `page`, `limit`
  - `origin`, `destination`
  - `tripType`, `travelClass`
  - `os`, `browser`, `deviceType`
  - `country`, `startDate`, `endDate`
- Return paginated search logs with all metadata

**Endpoint**: `GET /api/admin/logs/filter-options`

- Return available filter values:
  - Unique origins/destinations
  - OS types, browsers, device types
  - Countries, travel classes

**Endpoint**: `GET /api/admin/logs/export`

- Query params: same as search-logs
- Format: `csv`, `json`, `excel`
- Return downloadable file

---

## 3. Monitoring

### 3.1 API Health Monitoring

**Endpoint**: `GET /api/admin/monitoring/health`

- Return status of all services:
  - Backend API
  - Amadeus API
  - Database
  - Redis Cache
  - External services
- Include:
  - Status (operational, degraded, down)
  - Response time (p50, p95, p99)
  - Uptime percentage
  - Last incident time

**Endpoint**: `GET /api/admin/monitoring/health/history`

- Query params: `service`, `startDate`, `endDate`
- Return historical uptime and response time data

**Endpoint**: `GET /api/admin/monitoring/incidents`

- Return recent incidents
- Include severity, duration, resolution time

### 3.2 Alerts System

**Endpoint**: `GET /api/admin/monitoring/alerts`

- Query params: `severity`, `status`, `service`
- Return all alerts with:
  - Severity (critical, warning, info)
  - Status (active, acknowledged, resolved)
  - Timestamp, message, affected service

**Endpoint**: `POST /api/admin/monitoring/alerts/:alertId/acknowledge`

- Mark alert as acknowledged
- Log who acknowledged and when

**Endpoint**: `POST /api/admin/monitoring/alerts/:alertId/resolve`

- Mark alert as resolved
- Include resolution notes

**Endpoint**: `GET /api/admin/monitoring/alert-trends`

- Return alert counts over time
- Group by severity and service

**Endpoint**: `POST /api/admin/monitoring/alerts/configure`

- Configure alert thresholds
- Set notification channels (Slack, Email)

### 3.3 System Logs

**Endpoint**: `GET /api/admin/monitoring/logs`

- Query params:
  - `level` (error, warning, info)
  - `service`, `startDate`, `endDate`
  - `search` (text search in logs)
- Return paginated system logs

**Endpoint**: `GET /api/admin/monitoring/logs/stats`

- Return log statistics:
  - Total logs
  - Errors, warnings, info counts
  - Breakdown by service

---

## 4. User Management

### 4.1 Users

**Endpoint**: `GET /api/admin/users`

- Query params: `page`, `limit`, `search`, `role`, `status`
- Return paginated user list

**Endpoint**: `GET /api/admin/users/:userId`

- Return detailed user profile
- Include activity history, sessions, devices

**Endpoint**: `PUT /api/admin/users/:userId`

- Update user details
- Change role, status

**Endpoint**: `DELETE /api/admin/users/:userId`

- Soft delete user account

---

## 5. Feedback Management

**Endpoint**: `GET /api/admin/feedback`

- Query params: `page`, `limit`, `status`, `rating`
- Return user feedback submissions

**Endpoint**: `PUT /api/admin/feedback/:feedbackId`

- Update feedback status (pending, reviewed, resolved)

---

## 6. Settings

**Endpoint**: `GET /api/admin/settings`

- Return all admin settings

**Endpoint**: `PUT /api/admin/settings`

- Update admin settings
- Include notification preferences, thresholds

---

## 7. Export Functionality

All endpoints that return lists should support export:

- Add query param: `export=true&format=csv|json|excel`
- Return downloadable file with proper headers

**Common Export Endpoints**:

- `/api/admin/dashboard/export`
- `/api/admin/analytics/export`
- `/api/admin/logs/export`
- `/api/admin/monitoring/export`

---

## 8. Real-time Updates

### WebSocket Endpoints

**Connection**: `ws://api/admin/realtime`

**Channels**:

- `dashboard.metrics` - Real-time metric updates
- `monitoring.alerts` - New alerts
- `monitoring.health` - Service status changes
- `analytics.live` - Live search activity

---

## 9. Database Schema

### Tables Required

#### `users`

- id, email, name, google_id
- role_id, status, created_at, updated_at

#### `sessions`

- id, user_id, token, device_info
- ip_address, location, last_active, created_at

#### `search_logs`

- id, user_id, origin, destination
- trip_type, travel_class, passengers
- device_type, browser, os, country
- timestamp, clickout (boolean)

#### `api_health_logs`

- id, service_name, status
- response_time, timestamp

#### `alerts`

- id, service, severity, status
- message, created_at, acknowledged_at, resolved_at

#### `system_logs`

- id, level, service, message
- details, timestamp

#### `feedback`

- id, user_id, rating, message
- status, created_at

---

## 10. Security Considerations

### Authentication

- JWT tokens with 24h expiration
- Refresh tokens with 30d expiration
- Secure HTTP-only cookies

### Authorization

- Middleware to check user roles
- Permission-based access control
- Audit logging for admin actions

### Rate Limiting

- 100 requests/minute per user
- 1000 requests/hour per IP

### Data Protection

- Encrypt sensitive data at rest
- Use HTTPS for all endpoints
- Sanitize all inputs
- Implement CORS properly

---

## 11. Performance Optimization

### Caching Strategy

- Redis for:
  - Dashboard metrics (5 min TTL)
  - API health status (1 min TTL)
  - Filter options (1 hour TTL)

### Database Indexing

- Index on: `user_id`, `timestamp`, `origin`, `destination`
- Composite indexes for common queries

### Pagination

- Default: 50 items per page
- Max: 100 items per page

---

## 12. Implementation Priority

### Phase 1 (Week 1-2): Core Features

1. ✅ Authentication (Google OAuth, JWT)
2. ✅ Dashboard metrics endpoint
3. ✅ Search logs endpoint
4. ✅ Basic API health monitoring

### Phase 2 (Week 3-4): Analytics

1. ✅ Engagement metrics
2. ✅ Routes analytics
3. ✅ Trend charts
4. ✅ Export functionality

### Phase 3 (Week 5-6): Monitoring

1. ✅ Alerts system
2. ✅ System logs
3. ✅ Real-time updates (WebSocket)

### Phase 4 (Week 7-8): Advanced Features

1. ✅ RBAC implementation
2. ✅ Session management
3. ✅ User management
4. ✅ Feedback system

---

## 13. Testing Requirements

### Unit Tests

- All API endpoints
- Authentication middleware
- Data transformation functions

### Integration Tests

- End-to-end API flows
- Database operations
- External API integrations

### Load Tests

- 1000 concurrent users
- Response time < 200ms for 95% of requests

---

## 14. Deployment

### Environment Variables

```env
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AMADEUS_API_KEY=
SLACK_WEBHOOK_URL=
EMAIL_SERVICE_API_KEY=
```

### Infrastructure

- Backend: Node.js/Express or NestJS
- Database: PostgreSQL
- Cache: Redis
- Queue: Bull/BullMQ for background jobs
- Monitoring: Sentry for error tracking

---

## 15. API Documentation

- Use Swagger/OpenAPI for documentation
- Include request/response examples
- Document all error codes
- Provide Postman collection

---

This plan covers all requirements from `admin-requirements.txt` and provides a complete backend architecture for the admin panel.
