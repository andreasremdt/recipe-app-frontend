export default function stringifyFormData(formData: FormData) {
  return JSON.stringify(Object.fromEntries(formData.entries()));
}
