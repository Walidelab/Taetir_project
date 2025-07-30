import db from '../db/db.js'


export const createSession = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = req.user.id;
    const { connectionId, title, objectives, startTime, endTime, format } = req.body;

    // Basic validation
    if (!connectionId || !title || !startTime || !endTime || !format) {
        return res.status(400).json({ message: "Missing required session details." });
    }

    try {
        // Security check: Ensure the logged-in user is part of the connection
        const connectionCheck = await db.query(
            `SELECT id FROM connections WHERE id = $1 AND (mentee_id = $2 OR mentor_id = $2) AND status = 'accepted'`,
            [connectionId, userId]
        );

        if (connectionCheck.rows.length === 0) {
            return res.status(403).json({ message: "You are not part of this connection or it is not active." });
        }
        
        const query = `
            INSERT INTO sessions (connection_id, title, objectives, start_time, end_time, format, status)
            VALUES ($1, $2, $3, $4, $5, $6, 'scheduled')
            RETURNING *;
        `;
        const values = [connectionId, title, objectives, startTime, endTime, format];
        
        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error creating session:", error);
        next(error);
    }
};

export const getSessionsForMonth = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    const userId = req.user.id;
    const { year, month } = req.query;

    if (!year || !month) {
        return res.status(400).json({ message: "Year and month are required." });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const query = `
        SELECT
            s.id,
            s.title,
            s.start_time AS "startTime",
            s.end_time AS "endTime",
            s.status,
            s.format,
            p.first_name || ' ' || p.last_name AS "participantName"
        FROM
            sessions s
        JOIN
            connections c ON s.connection_id = c.id
        JOIN
            profiles p ON p.user_id = (CASE WHEN c.mentor_id = $1 THEN c.mentee_id ELSE c.mentor_id END)
        WHERE
            (c.mentor_id = $1 OR c.mentee_id = $1)
            AND s.start_time >= $2 AND s.start_time < $3
        ORDER BY
            s.start_time;
    `;

    try {
        const result = await db.query(query, [userId, startDate, endDate]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching sessions:", error);
        next(error);
    }
};

export const updateSessionStatus = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    const userId = req.user.id;
    const { sessionId } = req.params;
    const { status } = req.body;

    if (status !== 'completed') {
        return res.status(400).json({ message: "Only 'completed' status is allowed." });
    }

    try {
        const securityCheck = await db.query(
            `SELECT s.id FROM sessions s JOIN connections c ON s.connection_id = c.id WHERE s.id = $1 AND (c.mentor_id = $2 OR c.mentee_id = $2)`,
            [sessionId, userId]
        );

        if (securityCheck.rows.length === 0) {
            return res.status(403).json({ message: "You do not have permission to update this session." });
        }

        const query = `UPDATE sessions SET status = $1 WHERE id = $2 RETURNING *;`;
        const result = await db.query(query, [status, sessionId]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating session status:", error);
        next(error);
    }
};
