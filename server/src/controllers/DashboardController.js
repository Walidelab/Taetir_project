import db from "../db/db.js"

/**
 * Controller to fetch aggregated statistics for the user's dashboard.
 */
export const getDashboardStats = async (req, res, next) => {
  // Ensure a user is logged in to fetch their stats
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = req.user.id;
  const userRole = req.user.role; // 'mentor' or 'mentee'

  try {
    // We'll run all our queries in parallel for better performance
    const [
      connectionsResult,
      sessionsResult,
      ratingResult
    ] = await Promise.all([
      // Query 1: Get the count of active connections
      db.query(
        `SELECT COUNT(*) FROM connections WHERE (mentor_id = $1 OR mentee_id = $1) AND status = 'accepted'`,
        [userId]
      ),
      // Query 2: Get the count of sessions completed this month
      db.query(
        `SELECT COUNT(*) FROM sessions s JOIN connections c ON s.connection_id = c.id WHERE (c.mentor_id = $1 OR c.mentee_id = $1) AND s.status = 'completed' AND s.start_time >= date_trunc('month', current_date)`,
        [userId]
      ),
      // Query 3: Get the average rating from reviews
      db.query(
        `SELECT AVG(rating) as average_rating FROM reviews WHERE reviewee_id = $1`,
        [userId]
      )
    ]);

    // Extract the numbers from the query results
    const activeConnections = parseInt(connectionsResult.rows[0].count, 10);
    const sessionsThisMonth = parseInt(sessionsResult.rows[0].count, 10);
    // Coalesce ensures that if there are no ratings, we default to 0 instead of null
    const averageRating = parseFloat(ratingResult.rows[0].average_rating || 0).toFixed(1);

    // Construct the final JSON response object
    const stats = {
      activeConnections,
      sessionsThisMonth,
      averageRating: parseFloat(averageRating),
      connectionChangePercent: 12,
      sessionChangePercent: 5.2,
      ratingChange: 0.1
    };

    res.status(200).json(stats);
    console.log(stats)

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    next(error); // Pass the error to your global error handler
  }
};


// src/routes/dashboardRoutes.js

