import type { Context } from "hono";

export const getPatientController = async (c: Context) => {
  const { id } = c.req.param();

  // Fetch patient data from database (mocked here)
  const patient = { id, name: "John Doe", age: 30, condition: "Healthy" };
  return c.json({ patient });
};

export const updatePatientController = async (c: Context) => {
  const { id } = c.req.param();

  try {
    const body = await c.req.parseBody();
    // Update patient data in database (mocked here)
    return c.json({
      message: `Patient ${id} updated successfully`,
      data: body,
    });
  } catch (err) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }
};
