export async function submitForm(
  endpoint: string,
  data: Record<string, unknown>
): Promise<{ success: boolean }> {
  console.log(`[Dorza] POST ${endpoint}`, data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}
