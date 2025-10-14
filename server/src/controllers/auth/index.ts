import type { Context } from "hono";

export const postLoginController = async (c: Context) => {
  try {
    const body = await c.req.parseBody();
    return c.json({ message: "Login successful", data: body });
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }
};

export const postRegisterController = async (c: Context) => {
  try {
    const { username, password, email } = await c.req.json();

    if (!username || !password || !email) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    return c.json({
      message: `User ${username} registered successfully.`,
    });
  } catch (err) {
    return c.json({ error: "Invalid or missing JSON body" }, 400);
  }
};
