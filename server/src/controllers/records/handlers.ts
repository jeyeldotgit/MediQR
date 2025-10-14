import type { Context } from "hono";

export const getPatientRecordsController = async (c: Context) => {
  const { id } = c.req.param();

  // Fetch patient records from database (mocked here)
  const records = [
    { recordId: 1, description: "Annual Checkup", date: "2023-01-15" },
    { recordId: 2, description: "Blood Test", date: "2023-03-22" },
  ];
  return c.json({ patientId: id, records });
};

export const postPatientRecordController = async (c: Context) => {
  const { id } = c.req.param();
  try {
    const body = await c.req.parseBody();
    // Save new record to database (mocked here)
    return c.json({
      message: `New record added for patient ${id}`,
      data: body,
    });
  } catch (err) {
    return c.json({ error: "Invalid JSON body" }, 400);
  }
};
